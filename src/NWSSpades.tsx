import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCircleQuestion } from 'react-icons/fa6';

interface NWSSpadesProps {
  isMultiplayer?: boolean;
  syncedGameState?: unknown;
  onUpdateGameState?: (state: unknown) => void;
  onBack?: () => void;
  playerIndex?: number;
  isSpectator?: boolean;
  isHost?: boolean;
}

type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs' | 'joker';
type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A'
  | 'LJ'
  | 'BJ';

interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  sortValue: number;
}

interface PlayerState {
  id: string;
  name: string;
  hand: Card[];
  bid: number | null;
  tricks: number;
  isAI: boolean;
  team: 0 | 1;
}

interface PlayedCard {
  playerIndex: number;
  card: Card;
}

interface GameState {
  players: PlayerState[];
  dealer: number;
  currentPlayer: number;
  phase: 'bidding' | 'playing' | 'roundEnd';
  round: number;
  trick: PlayedCard[];
  leadSuit: Suit | null;
  spadesBroken: boolean;
  teamScores: [number, number];
  teamBags: [number, number];
  teamRoundBids: [number, number];
  winnerTeam: 0 | 1 | null;
  lastMessage: string;
}

const RANK_ORDER: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const cardLabel = (card: Card) => {
  if (card.rank === 'BJ') return 'Big Joker';
  if (card.rank === 'LJ') return 'Little Joker';
  const suitSymbol =
    card.suit === 'spades'
      ? '♠'
      : card.suit === 'hearts'
      ? '♥'
      : card.suit === 'diamonds'
      ? '♦'
      : '♣';
  return `${card.rank}${suitSymbol}`;
};

const getTrumpStrength = (card: Card): number => {
  if (card.rank === 'BJ') return 100;
  if (card.rank === 'LJ') return 99;
  if (card.suit === 'spades' && card.rank === '2') return 98;
  if (card.suit === 'spades') return 70 + RANK_ORDER.indexOf(card.rank);
  return -1;
};

const createDeck = (): Card[] => {
  const suits: Array<'spades' | 'hearts' | 'diamonds' | 'clubs'> = ['spades', 'hearts', 'diamonds', 'clubs'];
  const deck: Card[] = [];

  suits.forEach((suit) => {
    RANK_ORDER.forEach((rank) => {
      if ((suit === 'diamonds' || suit === 'hearts') && rank === '2') return;
      const sortValue = suit === 'spades' ? 70 + RANK_ORDER.indexOf(rank) : 10 + RANK_ORDER.indexOf(rank);
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        sortValue
      });
    });
  });

  deck.push({ id: 'joker-little', suit: 'joker', rank: 'LJ', sortValue: 99 });
  deck.push({ id: 'joker-big', suit: 'joker', rank: 'BJ', sortValue: 100 });
  return deck;
};

const shuffle = <T,>(items: T[]) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const sortHand = (hand: Card[]) => {
  const suitOrder: Record<Suit, number> = { joker: 4, spades: 3, hearts: 2, diamonds: 1, clubs: 0 };
  return [...hand].sort((a, b) => {
    if (a.suit !== b.suit) return suitOrder[b.suit] - suitOrder[a.suit];
    return b.sortValue - a.sortValue;
  });
};

const makeRoundState = (
  round: number,
  dealer: number,
  teamScores: [number, number],
  teamBags: [number, number],
  playerNames?: Array<{ id: string; name: string; isAI: boolean }>
): GameState => {
  const deck = shuffle(createDeck());
  const players: PlayerState[] = [0, 1, 2, 3].map((i) => {
    const hand = sortHand(deck.slice(i * 13, i * 13 + 13));
    const fromRoom = playerNames?.[i];
    return {
      id: fromRoom?.id ?? `player_${i}`,
      name: fromRoom?.name ?? (i === 0 ? 'You' : `Player ${i + 1}`),
      hand,
      bid: null,
      tricks: 0,
      isAI: fromRoom?.isAI ?? i !== 0,
      team: i % 2 === 0 ? 0 : 1
    };
  });

  return {
    players,
    dealer,
    currentPlayer: (dealer + 1) % 4,
    phase: 'bidding',
    round,
    trick: [],
    leadSuit: null,
    spadesBroken: false,
    teamScores,
    teamBags,
    teamRoundBids: [0, 0],
    winnerTeam: null,
    lastMessage: `Round ${round}: place your bids`
  };
};

const getLegalCards = (hand: Card[], trick: PlayedCard[], leadSuit: Suit | null, spadesBroken: boolean): Card[] => {
  if (trick.length === 0) {
    const nonTrump = hand.filter((c) => c.suit !== 'spades' && c.suit !== 'joker');
    if (spadesBroken || nonTrump.length === 0) return hand;
    return nonTrump;
  }

  if (leadSuit === 'spades') {
    const trumpCards = hand.filter((c) => c.suit === 'spades' || c.suit === 'joker');
    return trumpCards.length > 0 ? trumpCards : hand;
  }

  const suited = hand.filter((c) => c.suit === leadSuit);
  return suited.length > 0 ? suited : hand;
};

const compareCardsForTrick = (a: Card, b: Card, leadSuit: Suit): number => {
  const aTrump = getTrumpStrength(a);
  const bTrump = getTrumpStrength(b);

  if (aTrump >= 0 || bTrump >= 0) return aTrump - bTrump;

  const aLead = a.suit === leadSuit;
  const bLead = b.suit === leadSuit;
  if (aLead && !bLead) return 1;
  if (!aLead && bLead) return -1;
  return a.sortValue - b.sortValue;
};

const getTrickWinner = (trick: PlayedCard[], leadSuit: Suit): number => {
  let winning = trick[0];
  for (let i = 1; i < trick.length; i += 1) {
    if (compareCardsForTrick(trick[i].card, winning.card, leadSuit) > 0) {
      winning = trick[i];
    }
  }
  return winning.playerIndex;
};

const aiChooseBid = (hand: Card[]): number => {
  const highTrump = hand.filter((c) => getTrumpStrength(c) >= 90).length;
  const spades = hand.filter((c) => c.suit === 'spades').length;
  const aces = hand.filter((c) => c.rank === 'A').length;
  const kings = hand.filter((c) => c.rank === 'K').length;
  const estimate = Math.max(1, Math.min(7, Math.round(0.6 * spades + 1.1 * highTrump + 0.5 * aces + 0.25 * kings)));
  return estimate;
};

const aiChooseCard = (state: GameState, aiIndex: number): Card | null => {
  const ai = state.players[aiIndex];
  const legal = getLegalCards(ai.hand, state.trick, state.leadSuit, state.spadesBroken);
  if (legal.length === 0) return null;
  if (state.trick.length === 0) return legal[legal.length - 1];

  const leadSuit = state.leadSuit!;
  const currentWinner = getTrickWinner(state.trick, leadSuit);
  const winningCard = state.trick.find((t) => t.playerIndex === currentWinner)!.card;
  const winningCandidates = legal.filter((card) => compareCardsForTrick(card, winningCard, leadSuit) > 0);
  if (winningCandidates.length > 0) return winningCandidates[winningCandidates.length - 1];
  return legal[legal.length - 1];
};

const NWSSpades: React.FC<NWSSpadesProps> = ({
  isMultiplayer = false,
  syncedGameState,
  onUpdateGameState,
  onBack,
  playerIndex = 0,
  isSpectator = false,
  isHost = false
}) => {
  const [localState, setLocalState] = useState<GameState>(() => makeRoundState(1, 3, [0, 0], [0, 0]));
  const gameState = useMemo(() => {
    if (!isMultiplayer || !syncedGameState || typeof syncedGameState !== 'object') return localState;
    const state = syncedGameState as Partial<GameState>;
    if (!Array.isArray(state.players) || !Array.isArray(state.trick) || !Array.isArray(state.teamScores)) {
      return localState;
    }
    return state as GameState;
  }, [isMultiplayer, syncedGameState, localState]);

  const gameStateRef = useRef(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);
  const setGameState = useCallback((updater: GameState | ((prev: GameState) => GameState)) => {
    const next = typeof updater === 'function' ? updater(gameStateRef.current) : updater;
    if (isMultiplayer && onUpdateGameState) onUpdateGameState(next);
    else setLocalState(next);
  }, [isMultiplayer, onUpdateGameState]);

  const [showHints, setShowHints] = useState(true);
  const [selectedBid, setSelectedBid] = useState(3);

  const isOurTurn = gameState.currentPlayer === playerIndex;
  const canInteract = !isSpectator && (!isMultiplayer || isOurTurn);
  const currentPlayerState = gameState.players[gameState.currentPlayer];
  const ourPlayer = gameState.players[playerIndex];
  const legalCards = ourPlayer
    ? getLegalCards(ourPlayer.hand, gameState.trick, gameState.leadSuit, gameState.spadesBroken)
    : [];

  const applyBid = useCallback((bidValue: number) => {
    setGameState((prev) => {
      const players = prev.players.map((p, i) => (i === prev.currentPlayer ? { ...p, bid: bidValue } : p));
      const allBid = players.every((p) => p.bid !== null);
      if (!allBid) {
        return {
          ...prev,
          players,
          currentPlayer: (prev.currentPlayer + 1) % 4,
          lastMessage: `${players[prev.currentPlayer].name} bid ${bidValue}`
        };
      }

      const teamRoundBids: [number, number] = [0, 0];
      players.forEach((p) => {
        if ((p.bid ?? 0) > 0) teamRoundBids[p.team] += p.bid ?? 0;
      });

      return {
        ...prev,
        players,
        teamRoundBids,
        phase: 'playing',
        trick: [],
        leadSuit: null,
        currentPlayer: (prev.dealer + 1) % 4,
        lastMessage: 'Bidding complete. Play begins.'
      };
    });
  }, [setGameState]);

  const finishRound = useCallback((state: GameState): GameState => {
    const tricksByTeam: [number, number] = [0, 0];
    state.players.forEach((p) => {
      tricksByTeam[p.team] += p.tricks;
    });

    const nextScores: [number, number] = [...state.teamScores] as [number, number];
    const nextBags: [number, number] = [...state.teamBags] as [number, number];

    ([0, 1] as const).forEach((team) => {
      const baseBid = state.teamRoundBids[team];
      const tricks = tricksByTeam[team];
      const playersOnTeam = state.players.filter((p) => p.team === team);

      if (tricks >= baseBid) {
        nextScores[team] += baseBid * 10;
        if (baseBid >= 10) nextScores[team] += 50;
        const bags = tricks - baseBid;
        nextScores[team] += bags;
        nextBags[team] += bags;
      } else {
        nextScores[team] -= baseBid * 10;
      }

      playersOnTeam.forEach((p) => {
        if (p.bid === 0) {
          nextScores[team] += p.tricks === 0 ? 100 : -100;
        }
      });

      while (nextBags[team] >= 10) {
        nextBags[team] -= 10;
        nextScores[team] -= 100;
      }
    });

    const winnerTeam = nextScores[0] >= 500 ? 0 : nextScores[1] >= 500 ? 1 : null;
    if (winnerTeam !== null) {
      return {
        ...state,
        phase: 'roundEnd',
        teamScores: nextScores,
        teamBags: nextBags,
        winnerTeam,
        lastMessage: `Team ${winnerTeam + 1} wins the game!`
      };
    }

    return makeRoundState(
      state.round + 1,
      (state.dealer + 1) % 4,
      nextScores,
      nextBags,
      state.players.map((p) => ({ id: p.id, name: p.name, isAI: p.isAI }))
    );
  }, []);

  const playCard = useCallback((card: Card) => {
    setGameState((prev) => {
      const player = prev.players[prev.currentPlayer];
      const legal = getLegalCards(player.hand, prev.trick, prev.leadSuit, prev.spadesBroken);
      if (!legal.find((c) => c.id === card.id)) return prev;

      const updatedPlayers = [...prev.players];
      updatedPlayers[prev.currentPlayer] = {
        ...player,
        hand: player.hand.filter((c) => c.id !== card.id)
      };

      const trick = [...prev.trick, { playerIndex: prev.currentPlayer, card }];
      const leadSuit = prev.leadSuit ?? (card.suit === 'joker' ? 'spades' : card.suit);
      const spadesBroken = prev.spadesBroken || card.suit === 'spades' || card.suit === 'joker';

      if (trick.length < 4) {
        return {
          ...prev,
          players: updatedPlayers,
          trick,
          leadSuit,
          spadesBroken,
          currentPlayer: (prev.currentPlayer + 1) % 4
        };
      }

      const winner = getTrickWinner(trick, leadSuit);
      updatedPlayers[winner] = {
        ...updatedPlayers[winner],
        tricks: updatedPlayers[winner].tricks + 1
      };

      const handsEmpty = updatedPlayers.every((p) => p.hand.length === 0);
      const postTrick: GameState = {
        ...prev,
        players: updatedPlayers,
        trick: [],
        leadSuit: null,
        spadesBroken,
        currentPlayer: winner,
        lastMessage: `${updatedPlayers[winner].name} won the trick`
      };

      return handsEmpty ? finishRound(postTrick) : postTrick;
    });
  }, [finishRound, setGameState]);

  const startNewGame = useCallback(() => {
    const names = gameState.players?.map((p) => ({ id: p.id, name: p.name, isAI: p.isAI })) ?? undefined;
    setGameState(makeRoundState(1, 3, [0, 0], [0, 0], names));
  }, [gameState.players, setGameState]);

  useEffect(() => {
    if (!isMultiplayer || !isHost || isSpectator) return;
    if (gameState.winnerTeam !== null) return;
    const actor = gameState.players[gameState.currentPlayer];
    if (!actor?.isAI) return;

    const timer = setTimeout(() => {
      if (gameState.phase === 'bidding') {
        applyBid(aiChooseBid(actor.hand));
        return;
      }
      if (gameState.phase === 'playing') {
        const card = aiChooseCard(gameState, gameState.currentPlayer);
        if (card) playCard(card);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [gameState, isMultiplayer, isHost, isSpectator, applyBid, playCard]);

  useEffect(() => {
    if (isMultiplayer || localState.players.length) return;
    setLocalState(makeRoundState(1, 3, [0, 0], [0, 0]));
  }, [isMultiplayer, localState.players.length]);

  return (
    <div className="game-shell">
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
              NWS Spades {isMultiplayer && '(Multiplayer)'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {showHints && (
              <button
                onClick={() => {}}
                className="game-icon-button bg-emerald text-white"
                title="Spades with Jokers + 2♠ high trump"
              >
                <FaCircleQuestion className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="game-panel mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div>
              <h3 className="text-lg font-semibold text-champagne">Round {gameState.round}</h3>
              <p className="text-ivory/80">{gameState.phase === 'bidding' ? 'Bidding' : 'Trick Play'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Team 1</h3>
              <p className="text-2xl font-bold text-ivory">{gameState.teamScores[0]}</p>
              <p className="text-sm text-ivory/70">Bags: {gameState.teamBags[0]}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Team 2</h3>
              <p className="text-2xl font-bold text-ivory">{gameState.teamScores[1]}</p>
              <p className="text-sm text-ivory/70">Bags: {gameState.teamBags[1]}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Current Turn</h3>
              <p className="text-ivory">{currentPlayerState?.name ?? '...'}</p>
              <p className="text-sm text-ivory/70">Spades broken: {gameState.spadesBroken ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2 bg-onyxLight rounded-lg p-5">
            <h2 className="text-2xl font-bold text-champagne mb-4">Table</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {gameState.players.map((p, index) => (
                <div
                  key={p.id}
                  className={`rounded-lg p-3 border ${
                    index === gameState.currentPlayer
                      ? 'border-champagne bg-champagne/10'
                      : 'border-champagne/20 bg-onyx'
                  }`}
                >
                  <div className="font-semibold text-champagne">{p.name}</div>
                  <div className="text-sm text-ivory/80">Team {p.team + 1}</div>
                  <div className="text-sm text-ivory/80">Bid: {p.bid === null ? '-' : p.bid}</div>
                  <div className="text-sm text-ivory/80">Tricks: {p.tricks}</div>
                  <div className="text-xs text-ivory/60 mt-1">{index === playerIndex ? 'You' : p.isAI ? 'AI' : 'Human'}</div>
                </div>
              ))}
            </div>

            <div className="game-panel-soft mb-4 min-h-[120px]">
              <h3 className="text-champagne font-semibold mb-3">Current Trick</h3>
              {gameState.trick.length === 0 ? (
                <p className="text-ivory/70 text-sm">No cards played yet</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gameState.trick.map((t) => (
                    <div key={`${t.playerIndex}-${t.card.id}`} className="bg-onyxLight rounded p-2 border border-champagne/20">
                      <div className="text-sm text-champagne">{gameState.players[t.playerIndex].name}</div>
                      <div className="text-lg font-bold">{cardLabel(t.card)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="game-panel-soft">
              <div className="text-sm text-ivory/80">{gameState.lastMessage}</div>
              {gameState.phase === 'roundEnd' && gameState.winnerTeam !== null && (
                <div className="mt-3 text-green-300 font-semibold">Team {gameState.winnerTeam + 1} reached 500 and wins.</div>
              )}
            </div>
          </div>

          <div className="game-panel">
            <h2 className="text-xl font-bold text-champagne mb-4">Your Hand</h2>
            {!ourPlayer ? (
              <p className="text-sm text-ivory/70">Spectator mode.</p>
            ) : (
              <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
                {sortHand(ourPlayer.hand).map((card) => {
                  const isLegal = legalCards.some((c) => c.id === card.id);
                  return (
                    <button
                      key={card.id}
                      disabled={gameState.phase !== 'playing' || !canInteract || !isLegal}
                      onClick={() => playCard(card)}
                      className={`w-full text-left px-3 py-2 rounded border transition-colors ${
                        isLegal
                          ? 'border-champagne/30 bg-onyx hover:bg-champagne/20'
                          : 'border-champagne/10 bg-onyx/60 text-ivory/50 cursor-not-allowed'
                      }`}
                    >
                      <span className="font-semibold">{cardLabel(card)}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {gameState.phase === 'bidding' && (
          <div className="game-panel mb-6">
            <h3 className="text-xl font-semibold text-champagne mb-3">Bidding</h3>
            <p className="text-sm text-ivory/80 mb-4">Set your bid (0 = Nil). Team bid 10+ earns a bonus if made.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedBid(n)}
                  className={`px-3 py-1.5 rounded border ${
                    selectedBid === n
                      ? 'bg-champagne text-onyx border-champagne'
                      : 'bg-onyx border-champagne/20 text-ivory'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              disabled={!canInteract || gameState.phase !== 'bidding'}
              onClick={() => applyBid(selectedBid)}
              className="px-5 py-2 bg-emerald text-white font-semibold rounded-lg hover:bg-emeraldLight disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Bid ({selectedBid})
            </button>
            {!canInteract && <p className="text-sm text-ivory/60 mt-3">Waiting for {currentPlayerState?.name}...</p>}
          </div>
        )}

        {showHints && (
          <div className="game-panel mb-6">
            <h3 className="text-champagne font-semibold mb-2">House Rules</h3>
            <ul className="text-sm text-ivory/80 space-y-1">
              <li>• Jokers and 2♠ are top trump cards</li>
              <li>• 2♦ and 2♥ are removed from deck</li>
              <li>• Must follow lead suit when possible</li>
              <li>• Cannot lead spades until broken (unless only trump left)</li>
              <li>• Team bid 10+ made = bonus +50</li>
            </ul>
          </div>
        )}

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={startNewGame}
            disabled={isMultiplayer && !isHost}
            className="px-6 py-3 bg-champagne text-onyx font-bold rounded-lg hover:bg-champagneLight transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          {isMultiplayer && (
            <div className="px-4 py-3 rounded-lg bg-onyxLight border border-champagne/20 text-sm text-ivory/80">
              {isSpectator ? 'Spectating' : canInteract ? 'Your Turn' : 'Waiting'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NWSSpades;
