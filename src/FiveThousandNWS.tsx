import React, { useState, useEffect, useCallback } from 'react';
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

interface TutorialStep {
  type: 'message' | 'highlight' | 'waitFor' | 'scriptedMove';
  text?: string;
  target?: string;
  action?: string;
  cards?: Card[];
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

// Game Logic
const createDeck = (): Card[] => {
  const deck: Card[] = [];
  
  // Add regular cards
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      let value: number;
      if (rank === 'A') value = 15;
      else if (['J', 'Q', 'K'].includes(rank)) value = 10;
      else value = parseInt(rank);
      
      deck.push({
        id: `${rank}${suit.charAt(0).toUpperCase()}`,
        suit,
        rank,
        value,
        isWild: false
      });
    });
  });
  
  // Add Jokers
  deck.push({
    id: 'BJ',
    suit: 'joker',
    rank: 'Big Joker',
    value: 20,
    isWild: true,
    isBigJoker: true
  });
  
  deck.push({
    id: 'LJ',
    suit: 'joker',
    rank: 'Little Joker',
    value: 15,
    isWild: true,
    isLittleJoker: true
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

const getWildRankValue = (rank: string): number => {
  if (rank === 'A') return 11;
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  return parseInt(rank);
};

const dealInitialCards = (deck: Card[], numPlayers: number): { players: Player[], wildRank: string, wildRankValue: number, remainingDeck: Card[] } => {
  const players: Player[] = [
    {
      id: 'hero',
      name: 'You',
      hand: [],
      melds: [],
      score: 0,
      isAI: false,
      isCurrentPlayer: true,
      color: THEME.champagne
    }
  ];

  // Add AI players based on numPlayers
  const colors = [THEME.emerald, THEME.blue, THEME.red, THEME.gold];
  for (let i = 0; i < numPlayers - 1; i++) {
    players.push({
      id: `ai${i + 1}`,
      name: `AI Player ${i + 1}`,
      hand: [],
      melds: [],
      score: 0,
      isAI: true,
      isCurrentPlayer: false,
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

// AI Logic
const getAIMove = (player: Player, gameState: GameState, difficulty: any): { action: 'draw' | 'discard' | 'meld'; card?: Card; meldCards?: Card[] } => {
  // Simple AI: draw from deck, try to meld if possible, discard lowest card
  const random = Math.random();
  
  if (random < 0.3 && player.hand.length > 0) {
    // Try to create a meld
    const meldResult = findBestMeld(player.hand);
    if (meldResult.isValid) {
      return { action: 'meld', meldCards: meldResult.cards };
    }
  }
  
  // Draw from deck
  if (gameState.deck.length > 0) {
    return { action: 'draw' };
  }
  
  // Discard lowest card
  const lowestCard = player.hand.reduce((lowest, card) => 
    card.value < lowest.value ? card : lowest
  );
  
  return { action: 'discard', card: lowestCard };
};

const findBestMeld = (hand: Card[]): { isValid: boolean; cards?: Card[] } => {
  // Simple meld finding: look for sets first, then runs
  const rankGroups = hand.reduce((groups, card) => {
    if (!groups[card.rank]) groups[card.rank] = [];
    groups[card.rank].push(card);
    return groups;
  }, {} as Record<string, Card[]>);

  // Find sets
  for (const [rank, cards] of Object.entries(rankGroups)) {
    if (cards.length >= 3) {
      const meldResult = isValidMeld(cards.slice(0, 3));
      if (meldResult.isValid) {
        return { isValid: true, cards: cards.slice(0, 3) };
      }
    }
  }

  return { isValid: false };
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

// Main Five Thousand NWS Component
const FiveThousandNWS: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
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

  const [aiDifficulty, setAiDifficulty] = useState(AI_DIFFICULTIES[1]);
  const [aiPlayerCount, setAiPlayerCount] = useState<number>(3); // 3 AI players by default
  const [showHints, setShowHints] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isAITurn, setIsAITurn] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  // Create AI players based on count
  const createAIPlayers = useCallback((count: number) => {
    const aiPlayers = [];
    const colors = [THEME.emerald, THEME.blue, THEME.red, THEME.gold];
    
    for (let i = 0; i < count; i++) {
      aiPlayers.push({
        id: `ai${i + 1}`,
        name: `AI Player ${i + 1}`,
        hand: [],
        melds: [],
        score: 0,
        isAI: true,
        isCurrentPlayer: false,
        color: colors[i % colors.length]
      });
    }
    return aiPlayers;
  }, []);

  // Update game state when AI player count changes
  useEffect(() => {
    if (gameState.gamePhase === 'dealing') {
      const aiPlayers = createAIPlayers(aiPlayerCount);
      const humanPlayer = {
        id: 'hero',
        name: 'You',
        hand: [],
        melds: [],
        score: 0,
        isAI: false,
        isCurrentPlayer: true,
        color: THEME.champagne
      };
      
      setGameState(prev => ({
        ...prev,
        players: [humanPlayer, ...aiPlayers]
      }));
    }
  }, [aiPlayerCount, createAIPlayers, gameState.gamePhase]);

  const currentPlayer = gameState.players[gameState.currentPlayer];
  const isHeroTurn = currentPlayer?.id === 'hero';

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  // AI turn handling
  useEffect(() => {
    if (gameState.gamePhase === 'playing' && 
        gameState.players[gameState.currentPlayer]?.isAI && 
        !isAITurn) {
      setIsAITurn(true);
      setTimeout(() => {
        performAITurn();
        setIsAITurn(false);
      }, 1000);
    }
  }, [gameState.currentPlayer, gameState.gamePhase, gameState.players, isAITurn]);

  const performAITurn = useCallback(() => {
    const currentPlayer = gameState.players[gameState.currentPlayer];
    if (!currentPlayer?.isAI) return;

    // AI logic: Try to create melds first, then draw a card, then discard
    const possibleMelds = findPossibleMelds(currentPlayer.hand);
    
    if (possibleMelds.length > 0) {
      // Create the best meld
      const bestMeld = possibleMelds[0]; // Simple strategy: take first available meld
      createMeld(bestMeld);
    } else {
      // Draw a card
      drawCard();
      
      // After drawing, try to create melds again
      setTimeout(() => {
        const newPossibleMelds = findPossibleMelds(currentPlayer.hand);
        if (newPossibleMelds.length > 0) {
          createMeld(newPossibleMelds[0]);
        } else {
          // Discard the worst card
          const worstCard = findWorstCard(currentPlayer.hand);
          if (worstCard) {
            discardCard(worstCard);
          }
        }
      }, 500);
    }
  }, [gameState.players, gameState.currentPlayer]);

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
  }, []);

  const isConsecutiveRun = useCallback((cards: Card[]): boolean => {
    for (let i = 1; i < cards.length; i++) {
      if (cards[i].value !== cards[i-1].value + 1) {
        return false;
      }
    }
    return true;
  }, []);

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
  }, [aiPlayerCount]);

  const drawCard = useCallback(() => {
    if (gameState.gamePhase !== 'playing' || !isHeroTurn || gameState.deck.length === 0) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[prev.currentPlayer];
      const card = prev.deck[prev.deck.length - 1];
      
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
  }, [gameState.gamePhase, isHeroTurn, gameState.deck.length]);

  const discardCard = useCallback((card: Card) => {
    if (gameState.gamePhase !== 'playing' || !isHeroTurn) return;

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
  }, [gameState.gamePhase, isHeroTurn]);

  const createMeld = useCallback((cards: Card[]) => {
    if (gameState.gamePhase !== 'playing' || !isHeroTurn) return;

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
  }, [gameState.gamePhase, isHeroTurn]);

  // AI turn handling
  useEffect(() => {
    if (gameState.gamePhase === 'playing' && currentPlayer?.isAI && !isAITurn) {
      setIsAITurn(true);
      setTimeout(() => {
        const aiMove = getAIMove(currentPlayer, gameState, aiDifficulty);
        
        if (aiMove.action === 'draw' && gameState.deck.length > 0) {
          drawCard();
        } else if (aiMove.action === 'discard' && aiMove.card) {
          discardCard(aiMove.card);
        } else if (aiMove.action === 'meld' && aiMove.meldCards) {
          createMeld(aiMove.meldCards);
        }
        
        setTimeout(() => {
          setIsAITurn(false);
        }, 1000);
      }, 1000);
    }
  }, [gameState.gamePhase, currentPlayer, isAITurn, aiDifficulty, drawCard, discardCard, createMeld]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-onyx to-onyxLight text-ivory">
      {/* Header */}
      <div className="bg-onyxLight border-b border-champagne/20 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/hub"
              className="p-2 rounded-lg bg-onyxLight text-champagne hover:bg-emerald transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold text-champagne">5000 NWS</h1>
          </div>
          <div className="flex items-center space-x-4">
            {showHints && (
              <button
                onClick={() => {/* TODO: Show hint */}}
                className="p-2 rounded-lg bg-emerald text-white hover:bg-emeraldLight transition-colors"
                disabled={isAITurn}
              >
                <FaCircleQuestion className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-onyxLight text-champagne hover:bg-emerald transition-colors"
            >
              <FaGear className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Game Info */}
        <div className="bg-onyxLight rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
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
            <div className="bg-onyxLight rounded-lg p-4">
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
            <div key={player.id} className="bg-onyxLight rounded-lg p-4">
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
          <div className="bg-onyxLight rounded-lg p-6 mb-6">
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
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                disabled={gameState.deck.length === 0}
              >
                Draw Card ({gameState.deck.length})
              </button>
              
              {selectedCards.length > 0 && (
                <button
                  onClick={() => createMeld(selectedCards)}
                  className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Meld
                </button>
              )}
              
              {selectedCards.length === 1 && (
                <button
                  onClick={() => discardCard(selectedCards[0])}
                  className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Discard Card
                </button>
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
            className="px-6 py-3 bg-champagne text-onyx font-bold rounded-lg hover:bg-champagneLight transition-colors"
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
