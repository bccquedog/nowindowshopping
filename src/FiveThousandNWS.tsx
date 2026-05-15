import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaGear,
  FaCircleQuestion,
  FaXmark
} from 'react-icons/fa6';

// Types
interface Card {
  id: string;
  suit: 'spades' | 'hearts' | 'diamonds' | 'clubs' | 'joker';
  rank: string;
  value: number;
  isWild: boolean;
  isBigJoker?: boolean;
  isLittleJoker?: boolean;
  isWildRank?: boolean;
}

interface Meld {
  id: string;
  cards: Card[];
  type: 'set' | 'run';
  owner: string;
}

interface Player {
  id: string;
  name: string;
  hand: Card[];
  melds: Meld[];
  score: number;
  isAI: boolean;
  isCurrentPlayer: boolean;
  color: string;
}

interface GameState {
  players: Player[];
  currentPlayer: number;
  deck: Card[];
  discardPile: Card[];
  wildRank: string;
  wildRankValue: number;
  gamePhase: 'dealing' | 'playing' | 'complete';
  roundNumber: number;
  winner: string | null;
  gameWinner: string | null;
}

// Constants
const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'] as const;
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;

const AI_DIFFICULTIES = [
  { name: 'Easy', aggression: 0.3, riskTolerance: 0.2 },
  { name: 'Standard', aggression: 0.5, riskTolerance: 0.5 },
  { name: 'Tough', aggression: 0.7, riskTolerance: 0.8 }
];

// Luxury Theme Colors
const THEME = {
  onyx: '#0F1115',
  onyxLight: '#14161B',
  champagne: '#D9C38C',
  champagneLight: '#E6D4A3',
  ivory: '#F7F4EE',
  emerald: '#0F3D3E',
  emeraldLight: '#1A5A5B',
  gold: '#B8860B',
  red: '#DC2626',
  green: '#059669',
  blue: '#3B82F6'
};

// Game Logic - exported for multiplayer initializers
export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      let value: number;
      if (rank === 'A') value = 15;
      else if (['J', 'Q', 'K'].includes(rank)) value = 10;
      else value = parseInt(rank);
      deck.push({ id: `${rank}${suit.charAt(0).toUpperCase()}`, suit, rank, value, isWild: false });
    });
  });
  deck.push({ id: 'BJ', suit: 'joker', rank: 'Big Joker', value: 20, isWild: true, isBigJoker: true });
  deck.push({ id: 'LJ', suit: 'joker', rank: 'Little Joker', value: 15, isWild: true, isLittleJoker: true });
  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getWildRankValue = (rank: string): number => {
  if (rank === 'A') return 11;
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  return parseInt(rank);
};

export const dealInitialCards = (deck: Card[], numPlayers: number, forMultiplayer = false): { players: Player[], wildRank: string, wildRankValue: number, remainingDeck: Card[] } => {
  const colors = [THEME.champagne, THEME.emerald, THEME.blue, THEME.red, THEME.gold, '#059669', '#8B5CF6', '#EC4899', '#F59E0B'];
  const players: Player[] = [];
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      id: forMultiplayer ? (i === 0 ? 'hero' : `player_${i}`) : (i === 0 ? 'hero' : `ai${i}`),
      name: forMultiplayer ? (i === 0 ? 'You' : `Player ${i + 1}`) : (i === 0 ? 'You' : `AI Player ${i}`),
      hand: [],
      melds: [],
      score: 0,
      isAI: !forMultiplayer && i > 0,
      isCurrentPlayer: i === 0,
      color: colors[i % colors.length]
    });
  }

  // Deal first card to each player to determine wild rank
  const firstCards: Card[] = [];
  for (let i = 0; i < numPlayers; i++) {
    const card = deck.pop()!;
    firstCards.push(card);
    players[i].hand.push(card);
  }

  // Determine wild rank from first player's card
  const wildRank = firstCards[0].rank;
  const wildRankValue = getWildRankValue(wildRank);

  // Mark wild cards
  players.forEach(player => {
    player.hand.forEach(card => {
      if (card.rank === wildRank || card.suit === 'joker') {
        card.isWild = true;
        if (card.rank === wildRank) {
          card.isWildRank = true;
        }
      }
    });
  });

  // Deal extra cards based on wild rank value
  const extraCards = wildRankValue;
  for (let i = 0; i < extraCards; i++) {
    for (let j = 0; j < numPlayers; j++) {
      if (deck.length > 0) {
        const card = deck.pop()!;
        if (card.rank === wildRank || card.suit === 'joker') {
          card.isWild = true;
          if (card.rank === wildRank) {
            card.isWildRank = true;
          }
        }
        players[j].hand.push(card);
      }
    }
  }

  return { players, wildRank, wildRankValue, remainingDeck: deck };
};

const getCardDisplay = (card: Card) => {
  if (card.suit === 'joker') {
    return card.isBigJoker ? '🃏' : '🃏';
  }

  const suitSymbols = {
    spades: '♠',
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣'
  };

  return `${card.rank}${suitSymbols[card.suit]}`;
};

const getCardColor = (card: Card) => {
  if (card.isWild) return 'text-purple-600';
  if (card.suit === 'joker') return 'text-purple-600';
  if (card.suit === 'hearts' || card.suit === 'diamonds') return 'text-red-600';
  return 'text-gray-800';
};

const isValidMeld = (cards: Card[]): { isValid: boolean; type?: 'set' | 'run' } => {
  if (cards.length < 3) return { isValid: false };

  // Check for set (same rank)
  const ranks = cards.map(c => c.rank).filter(r => r !== 'Big Joker' && r !== 'Little Joker');
  const uniqueRanks = Array.from(new Set(ranks));

  if (uniqueRanks.length === 1) {
    return { isValid: true, type: 'set' };
  }

  // Check for run (sequential same suit)
  const nonWildCards = cards.filter(c => !c.isWild);
  if (nonWildCards.length < 2) return { isValid: false };

  const suit = nonWildCards[0].suit;
  if (!nonWildCards.every(c => c.suit === suit)) return { isValid: false };

  const values = nonWildCards.map(c => {
    if (c.rank === 'A') return 14;
    if (c.rank === 'K') return 13;
    if (c.rank === 'Q') return 12;
    if (c.rank === 'J') return 11;
    return parseInt(c.rank);
  }).sort((a, b) => a - b);

  // Check if sequential
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i-1] + 1) return { isValid: false };
  }

  return { isValid: true, type: 'run' };
};

// Card Component
const CardComponent: React.FC<{
  card: Card;
  isPlayable?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}> = ({ card, isPlayable = false, isSelected = false, onClick, size = 'medium' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-8 h-12 text-xs';
      case 'large': return 'w-16 h-24 text-lg';
      default: return 'w-12 h-18 text-sm';
    }
  };

  return (
    <motion.div
      className={`${getSizeClasses()} bg-white rounded-lg border-2 shadow-lg cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-champagne bg-champagneLight' : 'border-gray-300'
      } ${isPlayable ? 'hover:border-champagne hover:scale-105' : 'opacity-50'}`}
      onClick={isPlayable ? onClick : undefined}
      whileHover={isPlayable ? { scale: 1.05 } : {}}
    >
      <div className="w-full h-full p-1 flex flex-col justify-between">
        <div className={`text-xs font-bold ${getCardColor(card)}`}>
          {card.rank}
        </div>
        <div className={`text-lg font-bold ${getCardColor(card)}`}>
          {getCardDisplay(card)}
        </div>
        <div className={`text-xs font-bold ${getCardColor(card)} rotate-180`}>
          {card.rank}
        </div>
      </div>
    </motion.div>
  );
};

interface FiveThousandNWSProps {
  isMultiplayer?: boolean;
  syncedGameState?: unknown;
  onUpdateGameState?: (state: unknown) => void;
  onBack?: () => void;
  playerIndex?: number;
  isSpectator?: boolean;
}

const getDefaultFiveThousandState = (): GameState => ({
  players: [],
  currentPlayer: 0,
  deck: [],
  discardPile: [],
  wildRank: '',
  wildRankValue: 0,
  gamePhase: 'dealing',
  roundNumber: 1,
  winner: null,
  gameWinner: null
});

// Main Five Thousand NWS Component
const FiveThousandNWS: React.FC<FiveThousandNWSProps> = ({
  isMultiplayer = false,
  syncedGameState,
  onUpdateGameState,
  onBack,
  playerIndex = 0,
  isSpectator = false
}) => {
  const [localState, setLocalState] = useState<GameState>(getDefaultFiveThousandState);

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

  const isHeroTurn = isMultiplayer ? (gameState.currentPlayer === playerIndex && !isSpectator) : (gameState.players[gameState.currentPlayer]?.id === 'hero');
  const canInteract = isMultiplayer ? (gameState.currentPlayer === playerIndex && !isSpectator) : true;

  const [aiDifficulty, setAiDifficulty] = useState(AI_DIFFICULTIES[1]);
  const [aiPlayerCount, setAiPlayerCount] = useState<number>(3); // 3 AI players by default
  const [showHints, setShowHints] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isAITurn, setIsAITurn] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [hasDrawnThisTurn, setHasDrawnThisTurn] = useState(false);

  const currentPlayer = gameState.players[gameState.currentPlayer];

  // Reset turn-only selections whenever the active player changes.
  useEffect(() => {
    if (gameState.gamePhase === 'playing') {
      setHasDrawnThisTurn(false);
      setSelectedCards([]);
    }
  }, [gameState.currentPlayer, gameState.gamePhase]);

  const isConsecutiveRun = useCallback((cards: Card[]): boolean => {
    for (let i = 1; i < cards.length; i++) {
      if (cards[i].value !== cards[i-1].value + 1) {
        return false;
      }
    }
    return true;
  }, []);

  const findPossibleMelds = useCallback((hand: Card[]): Card[][] => {
    const melds: Card[][] = [];

    // Find sets (3 or 4 of same rank)
    const rankGroups = hand.reduce((groups, card) => {
      const rank = card.rank;
      if (!groups[rank]) groups[rank] = [];
      groups[rank].push(card);
      return groups;
    }, {} as Record<string, Card[]>);

    Object.values(rankGroups).forEach(group => {
      if (group.length >= 3) {
        melds.push(group.slice(0, 3));
        if (group.length >= 4) {
          melds.push(group);
        }
      }
    });

    // Find runs (3+ consecutive cards of same suit)
    const suitGroups = hand.reduce((groups, card) => {
      const suit = card.suit;
      if (!groups[suit]) groups[suit] = [];
      groups[suit].push(card);
      return groups;
    }, {} as Record<string, Card[]>);

    Object.values(suitGroups).forEach(group => {
      if (group.length >= 3) {
        // Sort by rank value for run detection
        group.sort((a, b) => a.value - b.value);

        for (let i = 0; i <= group.length - 3; i++) {
          const run = group.slice(i, i + 3);
          if (isConsecutiveRun(run)) {
            melds.push(run);
          }
        }
      }
    });

    return melds;
  }, [isConsecutiveRun]);

  const findWorstCard = useCallback((hand: Card[]): Card | null => {
    if (hand.length === 0) return null;

    // Prefer to discard high-value cards that aren't part of potential melds
    const sortedHand = [...hand].sort((a, b) => b.value - a.value);
    return sortedHand[0];
  }, []);

  const startNewGame = useCallback(() => {
    const deck = shuffleDeck(createDeck());
    const totalPlayers = aiPlayerCount + 1; // Human player + AI players
    const { players, wildRank, wildRankValue, remainingDeck } = dealInitialCards(deck, totalPlayers);

    setGameState({
      players,
      currentPlayer: 0,
      deck: remainingDeck,
      discardPile: [],
      wildRank,
      wildRankValue,
      gamePhase: 'playing',
      roundNumber: 1,
      winner: null,
      gameWinner: null
    });
    setHasDrawnThisTurn(false);
    setSelectedCards([]);
  }, [aiPlayerCount, setGameState]);

  // Initialize game (skip in multiplayer - state comes from room).
  useEffect(() => {
    if (isMultiplayer) return;
    startNewGame();
  }, [isMultiplayer, startNewGame]);

  const drawCard = useCallback(() => {
    if (gameState.gamePhase !== 'playing' || !isHeroTurn || !canInteract || gameState.deck.length === 0 || hasDrawnThisTurn) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[prev.currentPlayer];
      const card = { ...prev.deck[prev.deck.length - 1] };

      if (card.rank === prev.wildRank || card.suit === 'joker') {
        card.isWild = true;
        if (card.rank === prev.wildRank) {
          card.isWildRank = true;
        }
      }

      player.hand.push(card);

      return {
        ...prev,
        players: newPlayers,
        deck: prev.deck.slice(0, -1)
      };
    });

    setHasDrawnThisTurn(true);
  }, [gameState.gamePhase, isHeroTurn, canInteract, gameState.deck.length, hasDrawnThisTurn, setGameState]);

  const discardCard = useCallback((card: Card) => {
    if (gameState.gamePhase !== 'playing' || !isHeroTurn || !canInteract || !hasDrawnThisTurn) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[prev.currentPlayer];

      // Remove card from hand
      player.hand = player.hand.filter(c => c.id !== card.id);

      // Add to discard pile
      const newDiscardPile = [card, ...prev.discardPile];

      // Check if player has won
      let newGamePhase = prev.gamePhase;
      let winner = prev.winner;

      if (player.hand.length === 0) {
        newGamePhase = 'complete';
        winner = player.id;
      }

      // Move to next player
      const nextPlayer = (prev.currentPlayer + 1) % newPlayers.length;

      return {
        ...prev,
        players: newPlayers,
        currentPlayer: nextPlayer,
        discardPile: newDiscardPile,
        gamePhase: newGamePhase,
        winner
      };
    });

    // Reset draw flag for next turn
    setHasDrawnThisTurn(false);
    setSelectedCards([]);
  }, [gameState.gamePhase, isHeroTurn, canInteract, hasDrawnThisTurn, setGameState]);

  const createMeld = useCallback((cards: Card[]) => {
    if (gameState.gamePhase !== 'playing' || !isHeroTurn || !canInteract) return;

    const meldResult = isValidMeld(cards);
    if (!meldResult.isValid) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[prev.currentPlayer];

      // Remove cards from hand
      cards.forEach(card => {
        player.hand = player.hand.filter(c => c.id !== card.id);
      });

      // Create meld
      const newMeld: Meld = {
        id: `meld_${Date.now()}`,
        cards: [...cards],
        type: meldResult.type!,
        owner: player.id
      };

      player.melds.push(newMeld);

      return {
        ...prev,
        players: newPlayers
      };
    });

    setSelectedCards([]);
  }, [gameState.gamePhase, isHeroTurn, canInteract, setGameState]);

  // AI turn handling (skip in multiplayer)
  const performAITurn = useCallback(() => {
    setGameState(prev => {
      if (prev.gamePhase !== 'playing') return prev;

      const newPlayers = prev.players.map(player => ({
        ...player,
        hand: [...player.hand],
        melds: player.melds.map(meld => ({ ...meld, cards: [...meld.cards] })),
        isCurrentPlayer: false
      }));
      const player = newPlayers[prev.currentPlayer];

      if (!player?.isAI) return prev;

      const deck = [...prev.deck];
      const discardPile = [...prev.discardPile];
      const markWild = (card: Card): Card => {
        const isWild = card.rank === prev.wildRank || card.suit === 'joker' || card.isWild;
        return {
          ...card,
          isWild,
          isWildRank: card.rank === prev.wildRank || card.isWildRank
        };
      };

      if (deck.length > 0) {
        player.hand.push(markWild(deck.pop()!));
      }

      const possibleMeld = findPossibleMelds(player.hand)[0];
      if (possibleMeld) {
        const meldResult = isValidMeld(possibleMeld);
        if (meldResult.isValid) {
          const meldCardIds = new Set(possibleMeld.map(card => card.id));
          player.hand = player.hand.filter(card => !meldCardIds.has(card.id));
          player.melds.push({
            id: `meld_${Date.now()}_${player.id}`,
            cards: [...possibleMeld],
            type: meldResult.type!,
            owner: player.id
          });
        }
      }

      const discard = findWorstCard(player.hand);
      if (discard) {
        player.hand = player.hand.filter(card => card.id !== discard.id);
        discardPile.unshift(discard);
      }

      const winner = player.hand.length === 0 ? player.id : prev.winner;
      const nextPlayer = (prev.currentPlayer + 1) % newPlayers.length;
      newPlayers[nextPlayer] = {
        ...newPlayers[nextPlayer],
        isCurrentPlayer: true
      };

      return {
        ...prev,
        players: newPlayers,
        currentPlayer: nextPlayer,
        deck,
        discardPile,
        gamePhase: winner ? 'complete' : prev.gamePhase,
        winner
      };
    });
  }, [findPossibleMelds, findWorstCard, setGameState]);

  useEffect(() => {
    if (isMultiplayer) return;
    if (gameState.gamePhase === 'playing' && currentPlayer?.isAI && !isAITurn) {
      setIsAITurn(true);
      const timer = window.setTimeout(() => {
        performAITurn();
        setIsAITurn(false);
      }, 900);

      return () => window.clearTimeout(timer);
    }
  }, [isMultiplayer, gameState.gamePhase, currentPlayer, isAITurn, performAITurn]);

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="game-header">
        <div className="game-header-inner">
          <div className="flex items-center space-x-4">
            {isMultiplayer && onBack ? (
              <button
                onClick={onBack}
                className="game-back-button"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/hub"
                className="game-back-button"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
            )}
            <h1 className="text-3xl font-bold text-champagne">
              5000 NWS {isMultiplayer && '(Multiplayer)'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {showHints && (
              <button
                onClick={() => {}}
                className="game-icon-button bg-emerald text-white"
                disabled={isAITurn}
                title="Hints coming soon"
              >
                <FaCircleQuestion className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="game-icon-button"
            >
              <FaGear className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Game Info */}
        <div className="game-panel mb-6">
          <div className="game-stat-grid">
            <div>
              <h3 className="text-lg font-semibold text-champagne">5000 NWS</h3>
              <p className="text-ivory/80">NWS House Rules with custom joker values</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Wild Rank</h3>
              <p className="text-2xl font-bold text-ivory">{gameState.wildRank}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Extra Cards</h3>
              <p className="text-xl font-bold text-ivory">{gameState.wildRankValue}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Deck</h3>
              <p className="text-ivory">{gameState.deck.length}</p>
            </div>
          </div>
        </div>

        {/* Discard Pile */}
        {gameState.discardPile.length > 0 && (
          <div className="flex justify-center mb-6">
            <div className="game-panel">
              <h3 className="text-lg font-semibold text-champagne mb-2 text-center">Discard Pile</h3>
              <div className="flex space-x-2">
                {gameState.discardPile.slice(0, 5).map((card, index) => (
                  <CardComponent key={index} card={card} size="small" />
                ))}
                {gameState.discardPile.length > 5 && (
                  <div className="w-8 h-12 bg-gray-600 rounded-lg flex items-center justify-center text-white text-xs">
                    +{gameState.discardPile.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Players */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {gameState.players.map((player, index) => (
            <div key={player.id} className="game-panel">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${player.id === 'hero' ? 'text-champagne' : 'text-ivory'}`}>
                  {player.name} {player.id === 'hero' && '(You)'}
                </h3>
                <div
                  className="w-4 h-4 rounded-full border border-white"
                  style={{ backgroundColor: player.color }}
                />
              </div>
              <div className="text-sm text-ivory/80 space-y-1">
                <div>Score: {player.score}</div>
                <div>Cards: {player.hand.length}</div>
                <div>Melds: {player.melds.length}</div>
                {player.isCurrentPlayer && <div className="text-champagne font-bold">Current Turn</div>}
              </div>

              {/* Player's Melds */}
              {player.melds.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-xs font-semibold text-champagne mb-1">Melds:</h4>
                  <div className="flex flex-wrap gap-1">
                    {player.melds.map((meld, meldIndex) => (
                      <div key={meldIndex} className="flex space-x-1">
                        {meld.cards.map((card, cardIndex) => (
                          <CardComponent key={cardIndex} card={card} size="small" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hero's Hand */}
        {currentPlayer?.id === 'hero' && (
          <div className="game-panel mb-6">
            <h3 className="text-lg font-semibold text-champagne mb-4">Your Hand</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPlayer.hand.map((card) => (
                <CardComponent
                  key={card.id}
                  card={card}
                  isPlayable={gameState.gamePhase === 'playing'}
                  isSelected={selectedCards.some(c => c.id === card.id)}
                  onClick={() => {
                    if (selectedCards.some(c => c.id === card.id)) {
                      setSelectedCards(selectedCards.filter(c => c.id !== card.id));
                    } else {
                      setSelectedCards([...selectedCards, card]);
                    }
                  }}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={drawCard}
                className={`px-6 py-3 text-white font-bold rounded-lg transition-colors ${
                  hasDrawnThisTurn || gameState.deck.length === 0
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={hasDrawnThisTurn || gameState.deck.length === 0}
              >
                {hasDrawnThisTurn ? 'Already Drew' : `Draw Card (${gameState.deck.length})`}
              </button>

              {selectedCards.length > 0 && (
                <button
                  onClick={() => createMeld(selectedCards)}
                  className="game-success-action"
                >
                  Create Meld
                </button>
              )}

              {selectedCards.length === 1 && hasDrawnThisTurn && (
                <button
                  onClick={() => discardCard(selectedCards[0])}
                  className="game-danger-action"
                >
                  Discard Card
                </button>
              )}

              {hasDrawnThisTurn && selectedCards.length === 0 && (
                <div className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg">
                  Select a card to discard
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Thinking Indicator */}
        {isAITurn && (
          <div className="text-center">
            <p className="text-champagne text-lg">AI is thinking...</p>
          </div>
        )}

        {/* Game Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={startNewGame}
            className="game-primary-action"
          >
            New Game
          </button>
          <button
            onClick={() => setShowHints(!showHints)}
            className={`px-6 py-3 font-bold rounded-lg transition-colors ${
              showHints ? 'bg-emerald text-white' : 'bg-onyxLight text-champagne'
            }`}
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-onyxLight rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-champagne">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-ivory/60 hover:text-ivory"
              >
                <FaXmark className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory mb-2">
                  AI Difficulty
                </label>
                <select
                  value={aiDifficulty.name}
                  onChange={(e) => {
                    const difficulty = AI_DIFFICULTIES.find(d => d.name === e.target.value);
                    if (difficulty) setAiDifficulty(difficulty);
                  }}
                  className="w-full bg-onyx text-ivory rounded-lg p-2 border border-champagne/20"
                >
                  {AI_DIFFICULTIES.map(difficulty => (
                    <option key={difficulty.name} value={difficulty.name}>
                      {difficulty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory mb-2">
                  Number of AI Players
                </label>
                <select
                  className="w-full bg-onyx text-ivory rounded-lg p-2 border border-champagne/20"
                  value={aiPlayerCount}
                  onChange={(e) => setAiPlayerCount(parseInt(e.target.value))}
                >
                  <option value={1}>1 AI Player</option>
                  <option value={2}>2 AI Players</option>
                  <option value={3}>3 AI Players</option>
                  <option value={4}>4 AI Players</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory mb-2">
                  Show Hints
                </label>
                <input
                  type="checkbox"
                  checked={showHints}
                  onChange={(e) => setShowHints(e.target.checked)}
                  className="mr-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiveThousandNWS;
