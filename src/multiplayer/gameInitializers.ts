/**
 * Initial game state factories for multiplayer.
 * Each game type provides a function to create initial state from room settings.
 */

import { createInitialBoard, getAllLegalMoves } from '../CheckersLux';
import { createBoard } from '../Tycoon';
import { createDeck, shuffleDeck, dealInitialCards } from '../FiveThousandNWS';
import { getInitialHoldemState as createInitialHoldemState } from '../HoldemLux';

export function getInitialCheckersState() {
  const pieces = createInitialBoard();
  const legalMoves = getAllLegalMoves(pieces, 'dark');
  return {
    pieces,
    currentPlayer: 'dark' as const,
    selectedPiece: null,
    legalMoves,
    gamePhase: 'playing' as const,
    winner: null as 'dark' | 'light' | null,
    moveHistory: [] as Array<{ from: { row: number; col: number }; to: { row: number; col: number }; captures: unknown[]; promotes: boolean; sequence: unknown[] }>,
    moveCount: 0,
    lastMove: null,
    forcedCapture: false
  };
}

export function getInitialTycoonState(numPlayers: number, aiIndices: number[] = []) {
  const colors = ['#D9C38C', '#0F3D3E', '#3B82F6', '#B8860B', '#DC2626', '#059669', '#8B5CF6', '#EC4899', '#F59E0B'];
  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    const isAI = aiIndices.includes(i);
    players.push({
      id: isAI ? `ai_${i}` : (i === 0 ? 'hero' : `player_${i}`),
      name: isAI ? `AI Player ${i + 1}` : (i === 0 ? 'You' : `Player ${i + 1}`),
      position: 0,
      money: 1500,
      properties: [] as string[],
      getOutOfJailCards: 0,
      isInJail: false,
      jailTurns: 0,
      passGoCount: 0,
      jailedBeforeFirstPass: false,
      isAI,
      color: colors[i % colors.length]
    });
  }
  const board = createBoard();
  const propertyTiles = board.filter((t) => t.type === 'property');
  const properties = propertyTiles.map((tile) => ({
    id: tile.id,
    name: tile.name,
    color: tile.color!,
    price: tile.price!,
    rent: tile.rent!,
    houseCost: tile.houseCost!,
    position: tile.position,
    owner: null as string | null,
    houses: 0,
    isMortgaged: false
  }));
  return {
    players,
    currentPlayer: 0,
    properties,
    gamePhase: 'rolling' as const,
    dice: [0, 0],
    doublesCount: 0,
    auctionProperty: null,
    auctionBids: {} as Record<string, number>,
    auctionTimer: 0,
    tradeProposal: null,
    gameBoard: board,
    chanceDeck: [] as unknown[],
    chestDeck: [] as unknown[],
    winner: null as string | null
  };
}

export function getInitialBlackjackState(numPlayers: number, aiIndices: number[] = []) {
  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    const isAI = aiIndices.includes(i);
    players.push({
      id: isAI ? `ai_${i}` : `player_${i}`,
      name: isAI ? `AI Player ${i + 1}` : (i === 0 ? 'You' : `Player ${i + 1}`),
      hands: [],
      bankroll: 1000,
      currentBet: 0,
      isActive: true,
      seat: i,
      isAI
    });
  }
  return {
    players,
    dealer: { cards: [], upCard: null },
    shoe: [],
    discardTray: [],
    currentPlayer: 0,
    currentHand: 0,
    gamePhase: 'betting' as const,
    roundNumber: 1,
    shoePenetration: 0
  };
}

export function getInitialFiveThousandState(numPlayers: number, aiIndices: number[] = []) {
  const deck = shuffleDeck(createDeck());
  const { players, wildRank, wildRankValue, remainingDeck } = dealInitialCards(deck, numPlayers, true);
  players.forEach((p: { isAI?: boolean }, i: number) => {
    (p as { isAI?: boolean }).isAI = aiIndices.includes(i);
  });
  return {
    players,
    currentPlayer: 0,
    deck: remainingDeck,
    discardPile: [] as unknown[],
    wildRank,
    wildRankValue,
    gamePhase: 'playing' as const,
    roundNumber: 1,
    winner: null,
    gameWinner: null
  };
}

export function getInitialSpadesState(numPlayers: number, aiIndices: number[] = []) {
  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    const isAI = aiIndices.includes(i);
    players.push({
      id: isAI ? `ai_${i}` : `player_${i}`,
      name: isAI ? `AI Player ${i + 1}` : (i === 0 ? 'You' : `Player ${i + 1}`),
      hand: [],
      bid: null,
      tricks: 0,
      isAI,
      team: i % 2 === 0 ? 0 : 1
    });
  }
  return {
    players,
    dealer: 3,
    currentPlayer: 0,
    phase: 'bidding' as const,
    round: 1,
    spadesBroken: false,
    teamScores: [0, 0] as [number, number],
    teamBags: [0, 0] as [number, number],
    teamRoundBids: [0, 0] as [number, number],
    winnerTeam: null as 0 | 1 | null,
    lastMessage: 'Place your bids',
    trick: [],
    leadSuit: null as 'spades' | 'hearts' | 'diamonds' | 'clubs' | 'joker' | null
  };
}

export function getInitialHoldemState(numPlayers: number, aiIndices: number[] = []) {
  const state = createInitialHoldemState(numPlayers);
  if (aiIndices.length > 0 && state.players) {
    state.players.forEach((p: { isAI?: boolean }, i: number) => {
      (p as { isAI?: boolean }).isAI = aiIndices.includes(i);
    });
  }
  return state;
}
