import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay } from 'react-icons/fa6';

// Types
type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

interface Card {
  suit: Suit;
  rank: Rank;
  id: string;
}

interface Player {
  id: string;
  name: string;
  stack: number;
  holeCards: Card[];
  currentBet: number;
  totalBetThisRound: number;
  isFolded: boolean;
  isAllIn: boolean;
  isDealer: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
  isAI?: boolean;
  seat: number;
}

type Street = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

interface GameState {
  players: Player[];
  deck: Card[];
  communityCards: Card[];
  pot: number;
  currentBet: number;
  minRaise: number;
  smallBlind: number;
  bigBlind: number;
  street: Street;
  currentPlayerIndex: number;
  dealerIndex: number;
  handHistory: string[];
  lastAggressorIndex: number | null;
  gamePhase: 'lobby' | 'playing' | 'handComplete';
  buyIn: number;
}

interface AIDifficulty {
  name: string;
  aggression: number;
  riskTolerance: number;
  bluffFrequency: number;
  thinkTime: number;
}

// Constants
const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const AI_DIFFICULTIES: AIDifficulty[] = [
  { name: 'Easy', aggression: 0.3, riskTolerance: 0.2, bluffFrequency: 0.1, thinkTime: 1000 },
  { name: 'Standard', aggression: 0.5, riskTolerance: 0.5, bluffFrequency: 0.25, thinkTime: 1500 },
  { name: 'Tough', aggression: 0.8, riskTolerance: 0.8, bluffFrequency: 0.4, thinkTime: 2000 }
];

// Hand ranking values
const HAND_RANKS = {
  highCard: 0,
  pair: 1,
  twoPair: 2,
  threeOfKind: 3,
  straight: 4,
  flush: 5,
  fullHouse: 6,
  fourOfKind: 7,
  straightFlush: 8,
  royalFlush: 9
};

const RANK_VALUES: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

// Create deck
const createDeck = (): Card[] => {
  const deck: Card[] = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({ suit, rank, id: `${rank}${suit[0]}` });
    });
  });
  return deck;
};

const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Hand evaluation
const getBestHand = (holeCards: Card[], communityCards: Card[]): { rank: number; name: string; kickers: number[] } => {
  const all = [...holeCards, ...communityCards];
  if (all.length < 5) return { rank: HAND_RANKS.highCard, name: 'High Card', kickers: [] };

  const bySuit = all.reduce((acc, c) => {
    if (!acc[c.suit]) acc[c.suit] = [];
    acc[c.suit].push(c);
    return acc;
  }, {} as Record<Suit, Card[]>);

  const byRank = all.reduce((acc, c) => {
    const v = RANK_VALUES[c.rank];
    if (!acc[v]) acc[v] = [];
    acc[v].push(c);
    return acc;
  }, {} as Record<number, Card[]>);

  const sortedValues = [...new Set(all.map(c => RANK_VALUES[c.rank]))].sort((a, b) => b - a);

  const isFlush = Object.values(bySuit).some(arr => arr.length >= 5);
  const flushSuit = Object.entries(bySuit).find(([, arr]) => arr.length >= 5)?.[0] as Suit | undefined;
  const flushCards = flushSuit ? bySuit[flushSuit].map(c => RANK_VALUES[c.rank]).sort((a, b) => b - a) : [];

  const isStraight = (vals: number[]): number | null => {
    const s = [...new Set(vals)].sort((a, b) => b - a);
    for (let i = 0; i <= s.length - 5; i++) {
      if (s[i] - s[i + 4] === 4) return s[i];
    }
    if (s.includes(14)) {
      const low = s.filter(x => x !== 14).concat([1]);
      const lowSorted = [...new Set(low)].sort((a, b) => b - a);
      for (let i = 0; i <= lowSorted.length - 5; i++) {
        if (lowSorted[i] - lowSorted[i + 4] === 4) return lowSorted[i];
      }
    }
    return null;
  };

  const counts = Object.entries(byRank).map(([v, arr]) => ({ v: parseInt(v), count: arr.length })).sort((a, b) => b.count - a.count || b.v - a.v);
  const quads = counts.find(c => c.count === 4);
  const trips = counts.find(c => c.count === 3);
  const pairs = counts.filter(c => c.count === 2);

  const straightHigh = isStraight(sortedValues);
  const flushStraightHigh = flushSuit ? isStraight(flushCards) : null;

  if (flushStraightHigh !== null && flushStraightHigh === 14) return { rank: HAND_RANKS.royalFlush, name: 'Royal Flush', kickers: [] };
  if (flushStraightHigh !== null) return { rank: HAND_RANKS.straightFlush, name: 'Straight Flush', kickers: [flushStraightHigh] };
  if (quads) return { rank: HAND_RANKS.fourOfKind, name: 'Four of a Kind', kickers: [quads.v, ...sortedValues.filter(x => x !== quads.v).slice(0, 1)] };
  if (trips && pairs.length >= 1) return { rank: HAND_RANKS.fullHouse, name: 'Full House', kickers: [trips.v, pairs[0].v] };
  if (isFlush) return { rank: HAND_RANKS.flush, name: 'Flush', kickers: flushCards.slice(0, 5) };
  if (straightHigh !== null) return { rank: HAND_RANKS.straight, name: 'Straight', kickers: [straightHigh] };
  if (trips) return { rank: HAND_RANKS.threeOfKind, name: 'Three of a Kind', kickers: [trips.v, ...sortedValues.filter(x => x !== trips.v).slice(0, 2)] };
  if (pairs.length >= 2) return { rank: HAND_RANKS.twoPair, name: 'Two Pair', kickers: [pairs[0].v, pairs[1].v, ...sortedValues.filter(x => x !== pairs[0].v && x !== pairs[1].v).slice(0, 1)] };
  if (pairs.length === 1) return { rank: HAND_RANKS.pair, name: 'Pair', kickers: [pairs[0].v, ...sortedValues.filter(x => x !== pairs[0].v).slice(0, 3)] };
  return { rank: HAND_RANKS.highCard, name: 'High Card', kickers: sortedValues.slice(0, 5) };
};

const compareHands = (h1: { rank: number; kickers: number[] }, h2: { rank: number; kickers: number[] }): number => {
  if (h1.rank !== h2.rank) return h1.rank - h2.rank;
  for (let i = 0; i < Math.max(h1.kickers.length, h2.kickers.length); i++) {
    const k1 = h1.kickers[i] ?? 0;
    const k2 = h2.kickers[i] ?? 0;
    if (k1 !== k2) return k1 - k2;
  }
  return 0;
};

const findNextActionablePlayer = (players: Player[], startIndex: number): number | null => {
  if (players.length === 0) return null;

  for (let offset = 0; offset < players.length; offset++) {
    const index = (startIndex + offset) % players.length;
    const player = players[index];
    if (!player.isFolded && !player.isAllIn && player.stack > 0) {
      return index;
    }
  }

  return null;
};

const tableBetsAreSettled = (players: Player[]): boolean => {
  const activePlayers = players.filter(player => !player.isFolded);
  if (activePlayers.length <= 1) return true;

  const maxBet = Math.max(...activePlayers.map(player => player.totalBetThisRound));
  return activePlayers.every(player => player.isAllIn || player.totalBetThisRound === maxBet);
};

// Initial state factory for multiplayer
export function getInitialHoldemState(numPlayers: number) {
  const buyIn = 200;
  const smallBlind = 0;
  const bigBlind = 0;
  const players: Player[] = [];
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      id: i === 0 ? 'hero' : `player_${i}`,
      name: i === 0 ? 'You' : `Player ${i + 1}`,
      stack: buyIn,
      holeCards: [],
      currentBet: 0,
      totalBetThisRound: 0,
      isFolded: false,
      isAllIn: false,
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: false,
      isAI: i > 0,
      seat: i
    });
  }
  const deck = shuffleDeck(createDeck());
  return {
    players,
    deck,
    communityCards: [] as Card[],
    pot: 0,
    currentBet: bigBlind,
    minRaise: bigBlind,
    smallBlind,
    bigBlind,
    street: 'preflop' as Street,
    currentPlayerIndex: 0,
    dealerIndex: 0,
    handHistory: [] as string[],
    lastAggressorIndex: null as number | null,
    gamePhase: 'lobby' as const,
    buyIn
  };
}

interface HoldemLuxProps {
  isMultiplayer?: boolean;
  syncedGameState?: unknown;
  onUpdateGameState?: (state: unknown) => void;
  onBack?: () => void;
  playerIndex?: number;
  isSpectator?: boolean;
  isHost?: boolean;
}

const HoldemLux: React.FC<HoldemLuxProps> = ({
  isMultiplayer = false,
  syncedGameState,
  onUpdateGameState,
  onBack,
  playerIndex = 0,
  isSpectator = false,
  isHost = false
}) => {
  const [localState, setLocalState] = useState<GameState>(() => getInitialHoldemState(2));
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>(AI_DIFFICULTIES[1]);
  const [numAIPlayers, setNumAIPlayers] = useState(1);
  const [buyIn, setBuyIn] = useState(200);
  const [betAmount, setBetAmount] = useState(0);

  const gameState = (isMultiplayer && syncedGameState ? syncedGameState : localState) as GameState;
  const gameStateRef = useRef(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);
  const setGameState = useCallback((updater: GameState | ((prev: GameState) => GameState)) => {
    if (isMultiplayer && onUpdateGameState) {
      const next = typeof updater === 'function' ? updater(gameStateRef.current) : updater;
      onUpdateGameState(next);
      return;
    }

    setLocalState(updater as React.SetStateAction<GameState>);
  }, [isMultiplayer, onUpdateGameState]);

  const canInteract = isMultiplayer ? (gameState.currentPlayerIndex === playerIndex && !isSpectator) : true;
  const multiStartHandRef = useRef(false);

  // Auto-start first hand when in multiplayer with lobby state (host only, once)
  useEffect(() => {
    if (isMultiplayer && isHost && gameState.gamePhase === 'lobby' && gameState.players.length >= 2 && !multiStartHandRef.current) {
      multiStartHandRef.current = true;
      const timer = setTimeout(() => {
        setGameState(prev => {
          const active = prev.players.filter(p => p.stack > 0);
          if (active.length < 2) return prev;
          const dealerIndex = 0;
          const d = dealerIndex;
          let sb = (d + 1) % prev.players.length;
          while (prev.players[sb].stack <= 0) { sb = (sb + 1) % prev.players.length; if (sb === d) return prev; }
          let bb = (sb + 1) % prev.players.length;
          while (prev.players[bb].stack <= 0) { bb = (bb + 1) % prev.players.length; if (bb === sb) return prev; }
          const deck = shuffleDeck(createDeck());
          const players = prev.players.map((p, i) => ({
            ...p,
            holeCards: [] as Card[],
            currentBet: 0,
            totalBetThisRound: 0,
            isFolded: false,
            isAllIn: false,
            isDealer: i === d,
            isSmallBlind: i === sb,
            isBigBlind: i === bb
          }));
          const sbAmount = Math.min(prev.smallBlind, players[sb].stack);
          const bbAmount = Math.min(prev.bigBlind, players[bb].stack);
          players[sb] = { ...players[sb], currentBet: sbAmount, totalBetThisRound: sbAmount, stack: players[sb].stack - sbAmount };
          players[bb] = { ...players[bb], currentBet: bbAmount, totalBetThisRound: bbAmount, stack: players[bb].stack - bbAmount };
          let deckIdx = 0;
          const deal = () => deck[deckIdx++];
          players.forEach(p => { if (p.stack > 0) p.holeCards = [deal(), deal()]; });
          const pot = sbAmount + bbAmount;
          const minRaiseBase = prev.bigBlind > 0 ? prev.bigBlind : 2;
          let first = (bb + 1) % prev.players.length;
          while (players[first].stack <= 0) { first = (first + 1) % prev.players.length; if (first === bb) break; }
          return {
            ...prev,
            players,
            deck,
            communityCards: [],
            pot,
            currentBet: bbAmount,
            minRaise: minRaiseBase,
            street: 'preflop',
            currentPlayerIndex: first,
            dealerIndex: d,
            handHistory: [prev.smallBlind > 0 || prev.bigBlind > 0 ? `Hand started. SB: $${sbAmount}, BB: $${bbAmount}` : 'Hand started.'],
            lastAggressorIndex: bb,
            gamePhase: 'playing'
          };
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMultiplayer, isHost, gameState.gamePhase, gameState.players.length, setGameState]);

  const startNewHand = useCallback(() => {
    setGameState(prev => {
      const active = prev.players.filter(p => !p.isFolded && p.stack > 0);
      if (active.length < 2) return prev;

      const dealerIndex = (prev.dealerIndex + 1) % prev.players.length;
      let d = dealerIndex;
      while (prev.players[d].stack <= 0) {
        d = (d + 1) % prev.players.length;
        if (d === dealerIndex) return prev;
      }
      let sb = (d + 1) % prev.players.length;
      while (prev.players[sb].stack <= 0) {
        sb = (sb + 1) % prev.players.length;
        if (sb === d) return prev;
      }
      let bb = (sb + 1) % prev.players.length;
      while (prev.players[bb].stack <= 0) {
        bb = (bb + 1) % prev.players.length;
        if (bb === sb) return prev;
      }

      const deck = shuffleDeck(createDeck());
      const players = prev.players.map((p, i) => ({
        ...p,
        holeCards: [] as Card[],
        currentBet: 0,
        totalBetThisRound: 0,
        isFolded: false,
        isAllIn: false,
        isDealer: i === d,
        isSmallBlind: i === sb,
        isBigBlind: i === bb
      }));

      const sbAmount = Math.min(prev.smallBlind, players[sb].stack);
      const bbAmount = Math.min(prev.bigBlind, players[bb].stack);

      players[sb] = { ...players[sb], currentBet: sbAmount, totalBetThisRound: sbAmount, stack: players[sb].stack - sbAmount };
      players[bb] = { ...players[bb], currentBet: bbAmount, totalBetThisRound: bbAmount, stack: players[bb].stack - bbAmount };

      let deckIdx = 0;
      const deal = () => {
        const c = deck[deckIdx++];
        return c;
      };

      players.forEach(p => {
        if (!p.isFolded && p.stack > 0) {
          p.holeCards = [deal(), deal()];
        }
      });

      const pot = sbAmount + bbAmount;
      const currentBet = bbAmount;
      const minRaiseBase = prev.bigBlind > 0 ? prev.bigBlind : 2;
      const firstToAct = (bb + 1) % prev.players.length;
      let first = firstToAct;
      while (players[first].isFolded || players[first].stack <= 0) {
        first = (first + 1) % prev.players.length;
        if (first === firstToAct) break;
      }

      return {
        ...prev,
        players,
        deck,
        communityCards: [],
        pot,
        currentBet,
        minRaise: minRaiseBase,
        street: 'preflop',
        currentPlayerIndex: first,
        dealerIndex: d,
        handHistory: [prev.smallBlind > 0 || prev.bigBlind > 0 ? `Hand started. SB: $${sbAmount}, BB: $${bbAmount}` : 'Hand started.'],
        lastAggressorIndex: bb
      };
    });
  }, [setGameState]);

  const doShowdown = useCallback((prev: GameState): GameState => {
    let state = { ...prev };
    while (state.communityCards.length < 5) {
      const deck = [...state.deck];
      deck.shift();
      const card = deck.shift()!;
      state = { ...state, deck, communityCards: [...state.communityCards, card] };
    }
    const active = state.players.filter(p => !p.isFolded && p.holeCards.length === 2);
    if (active.length === 0) return { ...state, street: 'showdown', gamePhase: 'handComplete' };
    const hands = active.map(p => ({ player: p, hand: getBestHand(p.holeCards, state.communityCards) }));
    hands.sort((a, b) => compareHands(b.hand, a.hand));
    const winner = hands[0];
    const winAmount = state.pot;
    const newPlayers = state.players.map(p => p.id === winner.player.id ? { ...p, stack: p.stack + winAmount } : p);
    return {
      ...state,
      street: 'showdown',
      players: newPlayers,
      handHistory: [...state.handHistory, `${winner.player.name} wins $${winAmount} with ${winner.hand.name}`],
      gamePhase: 'handComplete'
    };
  }, []);

  const getNextStreetState = useCallback((prev: GameState): GameState => {
    if (prev.street === 'preflop') {
      const deck = [...prev.deck];
      deck.shift();
      const flop = [deck.shift()!, deck.shift()!, deck.shift()!];
      const first = findNextActionablePlayer(prev.players, (prev.dealerIndex + 1) % prev.players.length);
      if (first === null) {
        return doShowdown({ ...prev, deck, communityCards: flop, street: 'flop' });
      }
      return {
        ...prev,
        deck,
        communityCards: flop,
        street: 'flop',
        currentBet: 0,
        minRaise: prev.bigBlind > 0 ? prev.bigBlind : 2,
        players: prev.players.map(p => ({ ...p, currentBet: 0, totalBetThisRound: 0 })),
        currentPlayerIndex: first,
        handHistory: [...prev.handHistory, `Flop: ${flop.map(c => c.rank + c.suit[0]).join(' ')}`]
      };
    }
    if (prev.street === 'flop' || prev.street === 'turn') {
      const deck = [...prev.deck];
      deck.shift();
      const card = deck.shift()!;
      const street = prev.street === 'flop' ? 'turn' : 'river';
      const first = findNextActionablePlayer(prev.players, (prev.dealerIndex + 1) % prev.players.length);
      if (first === null) {
        return doShowdown({ ...prev, deck, communityCards: [...prev.communityCards, card], street });
      }
      return {
        ...prev,
        deck,
        communityCards: [...prev.communityCards, card],
        street,
        currentBet: 0,
        minRaise: prev.bigBlind > 0 ? prev.bigBlind : 2,
        players: prev.players.map(p => ({ ...p, currentBet: 0, totalBetThisRound: 0 })),
        currentPlayerIndex: first,
        handHistory: [...prev.handHistory, `${street === 'turn' ? 'Turn' : 'River'}: ${card.rank}${card.suit[0]}`]
      };
    }
    return doShowdown(prev);
  }, [doShowdown]);

  const fold = useCallback(() => {
    if (!canInteract) return;
    setGameState(prev => {
      const p = prev.players[prev.currentPlayerIndex];
      const newPlayers = prev.players.map((pl, i) => i === prev.currentPlayerIndex ? { ...pl, isFolded: true } : pl);
      const active = newPlayers.filter(pl => !pl.isFolded && !pl.isAllIn);
      if (active.length <= 1) {
        return doShowdown({ ...prev, players: newPlayers, handHistory: [...prev.handHistory, `${p.name} folds`] });
      }
      const nextIdx = findNextActionablePlayer(newPlayers, (prev.currentPlayerIndex + 1) % prev.players.length);
      if (nextIdx === null || tableBetsAreSettled(newPlayers)) {
        return getNextStreetState({ ...prev, players: newPlayers, handHistory: [...prev.handHistory, `${p.name} folds`] });
      }
      return { ...prev, players: newPlayers, currentPlayerIndex: nextIdx, handHistory: [...prev.handHistory, `${p.name} folds`] };
    });
  }, [canInteract, setGameState, doShowdown, getNextStreetState]);

  const check = useCallback(() => {
    if (!canInteract) return;
    setGameState(prev => {
      const p = prev.players[prev.currentPlayerIndex];
      const newPlayers = prev.players.map((pl, i) => i === prev.currentPlayerIndex ? { ...pl, currentBet: prev.currentBet, totalBetThisRound: prev.currentBet } : pl);
      const nextIdx = findNextActionablePlayer(newPlayers, (prev.currentPlayerIndex + 1) % prev.players.length);
      if (nextIdx === null || tableBetsAreSettled(newPlayers)) {
        return getNextStreetState({ ...prev, players: newPlayers, handHistory: [...prev.handHistory, `${p.name} checks`] });
      }
      return { ...prev, players: newPlayers, currentPlayerIndex: nextIdx, handHistory: [...prev.handHistory, `${p.name} checks`] };
    });
  }, [canInteract, setGameState, getNextStreetState]);

  const call = useCallback(() => {
    if (!canInteract) return;
    setGameState(prev => {
      const p = prev.players[prev.currentPlayerIndex];
      const toCall = prev.currentBet - p.totalBetThisRound;
      const actual = Math.min(toCall, p.stack);
      const newPlayers = prev.players.map((pl, i) => {
        if (i === prev.currentPlayerIndex) {
          return { ...pl, stack: pl.stack - actual, currentBet: prev.currentBet, totalBetThisRound: pl.totalBetThisRound + actual, isAllIn: actual >= pl.stack };
        }
        return pl;
      });
      const pot = prev.pot + actual;
      const nextIdx = findNextActionablePlayer(newPlayers, (prev.currentPlayerIndex + 1) % prev.players.length);
      if (nextIdx === null || tableBetsAreSettled(newPlayers)) {
        return getNextStreetState({ ...prev, players: newPlayers, pot, handHistory: [...prev.handHistory, `${p.name} calls $${actual}`] });
      }
      return { ...prev, players: newPlayers, pot, currentPlayerIndex: nextIdx, handHistory: [...prev.handHistory, `${p.name} calls $${actual}`] };
    });
  }, [canInteract, setGameState, getNextStreetState]);

  const betOrRaise = useCallback((amount: number) => {
    if (!canInteract || amount <= 0) return;
    setGameState(prev => {
      const p = prev.players[prev.currentPlayerIndex];
      const tableMinimum = prev.currentBet + prev.minRaise;
      const availableTotal = p.totalBetThisRound + p.stack;
      const requestedBet = Number.isFinite(amount) ? amount : tableMinimum;
      const totalBet = Math.min(Math.max(requestedBet, tableMinimum), availableTotal);
      const actual = Math.max(0, totalBet - p.totalBetThisRound);
      if (actual <= 0) return prev;
      const newBet = p.totalBetThisRound + actual;
      const newPlayers = prev.players.map((pl, i) => {
        if (i === prev.currentPlayerIndex) {
          return { ...pl, stack: pl.stack - actual, currentBet: newBet, totalBetThisRound: newBet, isAllIn: actual >= pl.stack };
        }
        return pl;
      });
      const newCurrentBet = Math.max(prev.currentBet, newBet);
      const minRaise = Math.max(prev.minRaise, newCurrentBet - prev.currentBet);
      const nextIdx = findNextActionablePlayer(newPlayers, (prev.currentPlayerIndex + 1) % prev.players.length);
      const actionLabel = newBet >= availableTotal ? 'goes all in for' : 'raises to';
      if (nextIdx === null || tableBetsAreSettled(newPlayers)) {
        return getNextStreetState({ ...prev, players: newPlayers, pot: prev.pot + actual, currentBet: newCurrentBet, minRaise, lastAggressorIndex: prev.currentPlayerIndex, handHistory: [...prev.handHistory, `${p.name} ${actionLabel} $${newBet}`] });
      }
      return { ...prev, players: newPlayers, pot: prev.pot + actual, currentBet: newCurrentBet, minRaise, lastAggressorIndex: prev.currentPlayerIndex, currentPlayerIndex: nextIdx, handHistory: [...prev.handHistory, `${p.name} ${actionLabel} $${newBet}`] };
    });
  }, [canInteract, setGameState, getNextStreetState]);

  // AI turn (single-player or multiplayer with AI players)
  useEffect(() => {
    const current = gameState.players[gameState.currentPlayerIndex];
    if (!current?.isAI || current.isFolded) return;

    const timer = setTimeout(() => {
      const handStrength = current.holeCards.length === 2 && gameState.communityCards.length >= 3
        ? getBestHand(current.holeCards, gameState.communityCards).rank
        : 0;
      const toCall = gameState.currentBet - current.totalBetThisRound;
      const canCheck = toCall <= 0;

      if (Math.random() < 1 - aiDifficulty.aggression && (canCheck || handStrength < HAND_RANKS.pair)) {
        if (canCheck) check();
        else fold();
      } else if (toCall > 0 && Math.random() < aiDifficulty.riskTolerance) {
        call();
      } else {
        const raiseSize = (gameState.bigBlind || 2) * (1 + Math.floor(Math.random() * 3) * aiDifficulty.aggression);
        betOrRaise(current.totalBetThisRound + toCall + Math.max(gameState.minRaise, raiseSize));
      }
    }, aiDifficulty.thinkTime);

    return () => clearTimeout(timer);
  }, [gameState.currentPlayerIndex, gameState.players, isMultiplayer, aiDifficulty, check, fold, call, betOrRaise, gameState.currentBet, gameState.communityCards, gameState.minRaise, gameState.bigBlind]);

  const startGame = useCallback(() => {
    setGameState(prev => {
      const numPlayers = 1 + numAIPlayers;
      const stackAmount = buyIn;
      const players: Player[] = [{ ...prev.players[0], stack: stackAmount, holeCards: [], isFolded: false, isAllIn: false }];
      for (let i = 1; i < numPlayers; i++) {
        players.push({
          id: `player_${i}`,
          name: `Player ${i + 1}`,
          stack: stackAmount,
          holeCards: [],
          currentBet: 0,
          totalBetThisRound: 0,
          isFolded: false,
          isAllIn: false,
          isDealer: false,
          isSmallBlind: false,
          isBigBlind: false,
          isAI: true,
          seat: i
        });
      }
      return { ...prev, players, buyIn: stackAmount, gamePhase: 'playing' };
    });
    setTimeout(startNewHand, 100);
  }, [numAIPlayers, buyIn, setGameState, startNewHand]);

  const CardDisplay: React.FC<{ card: Card; hidden?: boolean }> = ({ card, hidden }) => {
    if (hidden) {
      return (
        <div className="w-12 h-16 sm:w-14 sm:h-20 bg-gradient-to-br from-onyx to-onyxLight rounded-lg border-2 border-champagne/50 flex items-center justify-center">
          <span className="text-champagne/50 text-xl">?</span>
        </div>
      );
    }
    const suitSym = { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' }[card.suit];
    const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
    return (
      <div className={`w-12 h-16 sm:w-14 sm:h-20 bg-white rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
        <span className="text-xs font-bold">{card.rank}</span>
        <span className="text-lg">{suitSym}</span>
      </div>
    );
  };

  if (gameState.gamePhase === 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-onyx via-onyxLight to-onyx text-ivory">
        {/* Decorative background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-champagne/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/[0.02] rounded-full" />
        </div>

        <div className="relative p-6 sm:p-8 max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <Link
              to="/games"
              className="p-3 rounded-xl bg-onyxLight/80 border border-champagne/20 text-champagne hover:bg-champagne/10 hover:border-champagne/40 transition-all"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-champagne tracking-tight">HoldemLux</h1>
              <p className="text-ivory/60 text-sm mt-1">Texas Hold'em · Luxury Edition</p>
            </div>
            <div className="w-12" />
          </motion.div>

          {/* Setup Cards */}
          <div className="space-y-6">
            {/* Buy-in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-onyxLight/60 backdrop-blur-sm rounded-2xl p-6 border border-champagne/20"
            >
              <h3 className="text-champagne font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">💰</span>
                Starting Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {[100, 200, 500, 1000, 2000, 5000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBuyIn(amount)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                      buyIn === amount
                        ? 'bg-champagne text-onyx shadow-lg shadow-champagne/20'
                        : 'bg-onyx/80 text-ivory/80 hover:bg-champagne/20 hover:text-champagne border border-champagne/20'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* AI Opponents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-onyxLight/60 backdrop-blur-sm rounded-2xl p-6 border border-champagne/20"
            >
              <h3 className="text-champagne font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">👥</span>
                AI Opponents
              </h3>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNumAIPlayers(n)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                      numAIPlayers === n
                        ? 'bg-champagne text-onyx shadow-lg shadow-champagne/20'
                        : 'bg-onyx/80 text-ivory/80 hover:bg-champagne/20 hover:text-champagne border border-champagne/20'
                    }`}
                  >
                    {n} {n === 1 ? 'opponent' : 'opponents'}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* AI Difficulty */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-onyxLight/60 backdrop-blur-sm rounded-2xl p-6 border border-champagne/20"
            >
              <h3 className="text-champagne font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">🎯</span>
                AI Difficulty
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {AI_DIFFICULTIES.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => setAiDifficulty(d)}
                    className={`p-4 rounded-xl text-left transition-all border ${
                      aiDifficulty.name === d.name
                        ? 'bg-champagne/20 border-champagne text-champagne'
                        : 'bg-onyx/80 border-champagne/20 text-ivory/80 hover:border-champagne/40 hover:bg-champagne/10'
                    }`}
                  >
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-xs opacity-80 mt-1">{d.name === 'Easy' ? 'Conservative play' : d.name === 'Standard' ? 'Balanced strategy' : 'Aggressive tactics'}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-onyxLight/40 rounded-2xl p-4 border border-champagne/10"
            >
              <p className="text-ivory/60 text-sm text-center">
                You + {numAIPlayers} AI · ${buyIn} stacks · No blinds · Best 5-card hand wins
              </p>
            </motion.div>
          </div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 flex justify-center"
          >
            <motion.button
              onClick={startGame}
              className="px-16 py-4 bg-gradient-to-r from-champagne to-champagneLight text-onyx font-bold rounded-2xl shadow-lg shadow-champagne/25 hover:shadow-champagne/40 transition-all flex items-center gap-3"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPlay className="w-5 h-5" />
              Deal the Cards
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const toCall = currentPlayer ? gameState.currentBet - currentPlayer.totalBetThisRound : 0;
  const canCheck = toCall <= 0;
  const minRaiseAmount = gameState.currentBet + gameState.minRaise;
  const maxRaiseAmount = currentPlayer ? currentPlayer.totalBetThisRound + currentPlayer.stack : minRaiseAmount;
  const canRaise = currentPlayer ? maxRaiseAmount > currentPlayer.totalBetThisRound : false;
  const displayedBetAmount = Math.min(Math.max(betAmount || minRaiseAmount, Math.min(minRaiseAmount, maxRaiseAmount)), maxRaiseAmount);

  return (
    <div className="game-shell">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          {onBack ? (
            <button onClick={onBack} className="game-back-button">
              <FaArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <Link to="/games" className="game-back-button">
              <FaArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <div className="text-center">
            <h1 className="text-xl font-bold text-champagne">HoldemLux</h1>
            <p className="text-sm text-ivory/70">{gameState.street} · Pot: ${gameState.pot}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Community cards */}
        <div className="flex justify-center gap-2 my-6 flex-wrap">
          {gameState.communityCards.map((c, i) => (
            <CardDisplay key={i} card={c} />
          ))}
        </div>

        {/* Players */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {gameState.players.map((p, i) => {
            const isHero = isMultiplayer ? i === playerIndex : (p.id === 'hero' || i === 0);
            const isCurrent = gameState.currentPlayerIndex === i;
            return (
              <motion.div
                key={p.id}
                className={`p-4 rounded-xl border-2 ${isCurrent ? 'border-champagne bg-champagne/10' : 'border-champagne/20 bg-onyxLight'}`}
                animate={{ scale: isCurrent ? 1.02 : 1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-champagne">{p.name}</span>
                  {p.isDealer && <span className="text-xs bg-champagne/30 px-2 py-0.5 rounded">BTN</span>}
                  {gameState.smallBlind > 0 && p.isSmallBlind && <span className="text-xs bg-amber-600/50 px-2 py-0.5 rounded">SB</span>}
                  {gameState.bigBlind > 0 && p.isBigBlind && <span className="text-xs bg-amber-700/50 px-2 py-0.5 rounded">BB</span>}
                </div>
                <div className="flex gap-1 mb-2">
                  {p.holeCards.map((c, j) => (
                    <CardDisplay key={j} card={c} hidden={!isHero && gameState.street !== 'showdown'} />
                  ))}
                </div>
                <div className="text-sm text-ivory/80">Stack: ${p.stack}</div>
                {p.isFolded && <div className="text-red-400 text-xs mt-1">Folded</div>}
              </motion.div>
            );
          })}
        </div>

        {/* Action buttons */}
        {gameState.street !== 'showdown' && canInteract && currentPlayer && !currentPlayer.isFolded && (
          <div className="game-panel flex flex-wrap justify-center gap-3">
            {canCheck ? (
              <button onClick={check} className="game-secondary-action">Check</button>
            ) : (
              <button onClick={fold} className="game-danger-action">Fold</button>
            )}
            {!canCheck && (
              <button onClick={call} className="game-success-action">Call ${toCall}</button>
            )}
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={Math.min(minRaiseAmount, maxRaiseAmount)}
                max={maxRaiseAmount}
                value={displayedBetAmount}
                onChange={e => {
                  const requested = parseInt(e.target.value, 10);
                  if (!Number.isFinite(requested)) {
                    setBetAmount(Math.min(minRaiseAmount, maxRaiseAmount));
                    return;
                  }
                  setBetAmount(Math.min(Math.max(requested, 0), maxRaiseAmount));
                }}
                className="w-24 px-2 py-1 bg-onyx rounded border border-champagne/30 text-ivory"
              />
              <button
                onClick={() => betOrRaise(displayedBetAmount)}
                className="game-primary-action"
                disabled={!canRaise}
              >
                {displayedBetAmount >= maxRaiseAmount ? 'All In' : 'Raise'}
              </button>
            </div>
          </div>
        )}

        {/* Hand complete */}
        {gameState.gamePhase === 'handComplete' && (
          <div className="text-center py-6">
            <p className="text-champagne font-semibold mb-4">{gameState.handHistory[gameState.handHistory.length - 1]}</p>
            <button onClick={() => { setGameState(prev => ({ ...prev, gamePhase: 'playing' })); startNewHand(); }} className="game-primary-action">
              Next Hand
            </button>
          </div>
        )}

        {/* Hand history */}
        <div className="mt-6 max-h-32 overflow-y-auto text-sm text-ivory/70 space-y-1">
          {gameState.handHistory.map((h, i) => (
            <div key={i}>{h}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoldemLux;
