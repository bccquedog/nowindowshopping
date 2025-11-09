import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaPlay, 
  FaPause, 
  FaRotateRight, 
  FaGear, 
  FaLightbulb, 
  FaCircleInfo,
  FaXmark,
  FaCheck,
  FaMinus,
  FaPlus,
  FaArrowLeft
} from 'react-icons/fa6';

// Types
interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  value: number;
  isHidden?: boolean;
}

interface Hand {
  cards: Card[];
  bet: number;
  isDoubled: boolean;
  isSurrendered: boolean;
  isSplit: boolean;
  splitFrom?: number;
}

interface Player {
  id: string;
  name: string;
  hands: Hand[];
  bankroll: number;
  currentBet: number;
  isActive: boolean;
  seat: number;
  isAI?: boolean;
}

interface GameState {
  players: Player[];
  dealer: {
    cards: Card[];
    upCard: Card | null;
  };
  shoe: Card[];
  discardTray: Card[];
  currentPlayer: number;
  currentHand: number;
  gamePhase: 'betting' | 'dealing' | 'playerTurn' | 'dealerTurn' | 'settling' | 'complete';
  roundNumber: number;
  shoePenetration: number;
}

interface GameRules {
  numDecks: number;
  penetrationPct: number;
  standsOnSoft17: boolean;
  doubleAfterSplit: boolean;
  resplitAces: boolean;
  lateSurrender: boolean;
  insurance: boolean;
  blackjackPayout: number;
  minBet: number;
  maxBet: number;
}

interface AIDifficulty {
  name: string;
  description: string;
  basicStrategyAccuracy: number; // 0-1
  betVariation: number; // 0-1
  riskTolerance: number; // 0-1
  decisionSpeed: number; // milliseconds
}

// Constants
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
const CHIP_VALUES = [5, 25, 100, 500, 1000];

// AI Difficulty Levels
const AI_DIFFICULTIES: AIDifficulty[] = [
  {
    name: 'Easy',
    description: 'Makes basic mistakes, conservative betting',
    basicStrategyAccuracy: 0.6,
    betVariation: 0.3,
    riskTolerance: 0.2,
    decisionSpeed: 2000
  },
  {
    name: 'Standard',
    description: 'Follows basic strategy, balanced play',
    basicStrategyAccuracy: 0.85,
    betVariation: 0.5,
    riskTolerance: 0.5,
    decisionSpeed: 1500
  },
  {
    name: 'Expert',
    description: 'Perfect basic strategy, aggressive betting',
    basicStrategyAccuracy: 0.95,
    betVariation: 0.8,
    riskTolerance: 0.8,
    decisionSpeed: 800
  }
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
  green: '#059669'
};

// Basic Strategy Matrix (simplified)
type StrategyTable = Record<string, Record<string, string>>;

const BASIC_STRATEGY: { hard: StrategyTable; soft: StrategyTable } = {
  hard: {
    '8': { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '9': { '2': 'H', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '10': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'H', 'A': 'H' },
    '11': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'D', 'A': 'D' },
    '12': { '2': 'H', '3': 'H', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '13': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '14': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '15': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '16': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '17': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
    '18': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
    '19': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
    '20': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
    '21': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' }
  },
  soft: {
    '13': { '2': 'H', '3': 'H', '4': 'H', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '14': { '2': 'H', '3': 'H', '4': 'H', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '15': { '2': 'H', '3': 'H', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '16': { '2': 'H', '3': 'H', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '17': { '2': 'H', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
    '18': { '2': 'S', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'S', '8': 'S', '9': 'H', '10': 'H', 'A': 'H' },
    '19': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
    '20': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' }
  }
};

// Utility Functions
const createDeck = (): Card[] => {
  const deck: Card[] = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      let value: number;
      if (rank === 'A') value = 11;
      else if (['K', 'Q', 'J'].includes(rank)) value = 10;
      else value = parseInt(rank);
      
      deck.push({ suit, rank, value });
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

const calculateHandValue = (cards: Card[]): { total: number; isSoft: boolean } => {
  let total = 0;
  let aces = 0;
  
  cards.forEach(card => {
    if (card.rank === 'A') {
      aces++;
      total += 11;
    } else {
      total += card.value;
    }
  });
  
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  
  return { total, isSoft: aces > 0 && total <= 21 };
};

const getBasicStrategyAdvice = (playerCards: Card[], dealerUpCard: Card): string => {
  const { total, isSoft } = calculateHandValue(playerCards);
  
  if (total < 8) return 'Hit';
  if (total > 17) return 'Stand';
  
  const dealerRank = ['J', 'Q', 'K'].includes(dealerUpCard.rank) ? '10' : dealerUpCard.rank;
  const strategy = isSoft ? BASIC_STRATEGY.soft : BASIC_STRATEGY.hard;
  
  const totalStr = total.toString() as keyof typeof strategy;
  if (strategy[totalStr] && strategy[totalStr][dealerRank as keyof typeof strategy[typeof totalStr]]) {
    const action = strategy[totalStr][dealerRank as keyof typeof strategy[typeof totalStr]];
    switch (action) {
      case 'H': return 'Hit';
      case 'S': return 'Stand';
      case 'D': return 'Double Down';
      default: return 'Hit';
    }
  }
  
  return 'Hit';
};



// Card Component
const CardComponent: React.FC<{ card: Card; className?: string }> = ({ card, className = '' }) => {
  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  const getSuitColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-gray-800';
  };

  if (card.isHidden) {
    return (
      <motion.div
        className={`w-16 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-champagne shadow-lg ${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-md flex items-center justify-center">
          <div className="text-champagne text-2xl font-bold">?</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`w-16 h-24 bg-white rounded-lg border-2 border-gray-300 shadow-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full h-full p-1 flex flex-col justify-between">
        <div className={`text-xs font-bold ${getSuitColor(card.suit)}`}>
          {card.rank}
        </div>
        <div className={`text-lg font-bold ${getSuitColor(card.suit)}`}>
          {getSuitSymbol(card.suit)}
        </div>
        <div className={`text-xs font-bold ${getSuitColor(card.suit)} rotate-180`}>
          {card.rank}
        </div>
      </div>
    </motion.div>
  );
};

// Chip Component
const ChipComponent: React.FC<{ value: number; onClick?: () => void; selected?: boolean }> = ({ 
  value, 
  onClick, 
  selected = false 
}) => {
  const getChipColor = (value: number) => {
    switch (value) {
      case 5: return 'bg-red-500';
      case 25: return 'bg-green-500';
      case 100: return 'bg-blue-500';
      case 500: return 'bg-purple-500';
      case 1000: return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.button
      className={`w-12 h-12 rounded-full ${getChipColor(value)} border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm ${
        selected ? 'ring-4 ring-champagne' : ''
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      ${value}
    </motion.button>
  );
};

// Main Blackjack Component
const BlackjackLux: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [
      {
        id: '1',
        name: 'Player 1',
        hands: [],
        bankroll: 1000,
        currentBet: 0,
        isActive: true,
        seat: 0
      }
    ],
    dealer: { cards: [], upCard: null },
    shoe: [],
    discardTray: [],
    currentPlayer: 0,
    currentHand: 0,
    gamePhase: 'betting',
    roundNumber: 1,
    shoePenetration: 0
  });

  const [rules] = useState<GameRules>({
    numDecks: 6,
    penetrationPct: 0.75,
    standsOnSoft17: true,
    doubleAfterSplit: true,
    resplitAces: false,
    lateSurrender: true,
    insurance: true,
    blackjackPayout: 1.5,
    minBet: 5,
    maxBet: 1000
  });

  const [selectedChip, setSelectedChip] = useState<number>(25);
  const [showBasicStrategy, setShowBasicStrategy] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<string>('');
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>(AI_DIFFICULTIES[1]); // Standard difficulty
  const [aiPlayerCount, setAiPlayerCount] = useState<number>(2); // 2 AI players by default

  // AI Logic Functions
  const getAIBet = useCallback((player: Player, difficulty: AIDifficulty): number => {
    const baseBet = Math.max(rules.minBet, Math.floor(player.bankroll * 0.05));
    const variation = (Math.random() - 0.5) * 2 * difficulty.betVariation;
    const adjustedBet = Math.floor(baseBet * (1 + variation));
    
    return Math.min(
      Math.max(adjustedBet, rules.minBet),
      Math.min(rules.maxBet, player.bankroll)
    );
  }, [rules.minBet, rules.maxBet]);

  const getAIAction = useCallback((player: Player, hand: Hand, dealerUpCard: Card, difficulty: AIDifficulty): 'hit' | 'stand' | 'double' | 'split' | 'surrender' => {
    const { total, isSoft } = calculateHandValue(hand.cards);
    const dealerRank = ['J', 'Q', 'K'].includes(dealerUpCard.rank) ? '10' : dealerUpCard.rank;
    
    // Get basic strategy advice
    const basicAdvice = getBasicStrategyAdvice(hand.cards, dealerUpCard);
    
    // AI makes mistakes based on difficulty
    const shouldFollowStrategy = Math.random() < difficulty.basicStrategyAccuracy;
    
    if (!shouldFollowStrategy) {
      // AI makes a random mistake
      const actions: ('hit' | 'stand' | 'double' | 'split' | 'surrender')[] = ['hit', 'stand'];
      if (hand.cards.length === 2 && player.bankroll >= hand.bet) actions.push('double');
      if (hand.cards.length === 2 && hand.cards[0].rank === hand.cards[1].rank && player.bankroll >= hand.bet) actions.push('split');
      if (hand.cards.length === 2 && rules.lateSurrender) actions.push('surrender');
      
      return actions[Math.floor(Math.random() * actions.length)];
    }
    
    // Follow basic strategy
    switch (basicAdvice) {
      case 'Hit': return 'hit';
      case 'Stand': return 'stand';
      case 'Double Down': 
        return (hand.cards.length === 2 && player.bankroll >= hand.bet) ? 'double' : 'hit';
      default: return 'hit';
    }
  }, [rules.lateSurrender]);

  const createAIPlayers = useCallback((count: number): Player[] => {
    const aiPlayers: Player[] = [];
    for (let i = 0; i < count; i++) {
      aiPlayers.push({
        id: `ai-${i + 1}`,
        name: `AI Player ${i + 1}`,
        hands: [],
        bankroll: 1000,
        currentBet: 0,
        isActive: true,
        seat: i + 1,
        isAI: true
      });
    }
    return aiPlayers;
  }, []);

  // Initialize shoe and AI players
  useEffect(() => {
    const deck = createDeck();
    const shoe = shuffleDeck([...deck, ...deck, ...deck, ...deck, ...deck, ...deck]);
    const aiPlayers = createAIPlayers(aiPlayerCount);
    setGameState(prev => ({ 
      ...prev, 
      shoe,
      players: [
        prev.players[0], // Human player
        ...aiPlayers
      ]
    }));
  }, [aiPlayerCount, createAIPlayers]);

  // Game Actions
  const placeBet = useCallback((amount: number) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[0];
      
      if (player.bankroll >= amount && player.currentBet + amount <= rules.maxBet) {
        player.currentBet += amount;
        player.bankroll -= amount;
      }
      
      return { ...prev, players: newPlayers };
    });
  }, [rules.maxBet]);

  const clearBet = useCallback(() => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[0];
      player.bankroll += player.currentBet;
      player.currentBet = 0;
      return { ...prev, players: newPlayers };
    });
  }, []);

  const dealCards = useCallback(() => {
    if (gameState.players[0].currentBet === 0) return;

    setGameState(prev => {
      const newShoe = [...prev.shoe];
      const newPlayers = [...prev.players];
      
      // AI players place bets
      newPlayers.slice(1).forEach(aiPlayer => {
        const bet = getAIBet(aiPlayer, aiDifficulty);
        aiPlayer.currentBet = bet;
        aiPlayer.bankroll -= bet;
      });
      
      const player = newPlayers[0];
      
      // Deal initial cards to all players
      newPlayers.forEach(player => {
        const playerCards = [newShoe.pop()!, newShoe.pop()!];
        player.hands = [{
          cards: playerCards,
          bet: player.currentBet,
          isDoubled: false,
          isSurrendered: false,
          isSplit: false
        }];
      });
      
      // Deal dealer cards
      const dealerCards = [newShoe.pop()!, newShoe.pop()!];
      dealerCards[1].isHidden = true;
      
      const newDealer = {
        cards: dealerCards,
        upCard: dealerCards[0]
      };
      
      return {
        ...prev,
        shoe: newShoe,
        players: newPlayers,
        dealer: newDealer,
        gamePhase: 'playerTurn'
      };
    });
  }, [gameState.players, gameState.shoe, getAIBet, aiDifficulty]);

  const hit = useCallback(() => {
    setGameState(prev => {
      const newShoe = [...prev.shoe];
      const newPlayers = [...prev.players];
      const player = newPlayers[0];
      const hand = player.hands[prev.currentHand];
      
      if (hand && !hand.isSurrendered) {
        hand.cards.push(newShoe.pop()!);
        
        const { total } = calculateHandValue(hand.cards);
        if (total > 21) {
          // Bust - move to next hand or dealer
          if (prev.currentHand < player.hands.length - 1) {
            return { ...prev, currentHand: prev.currentHand + 1, shoe: newShoe, players: newPlayers };
          } else {
            return { ...prev, gamePhase: 'dealerTurn', shoe: newShoe, players: newPlayers };
          }
        }
      }
      
      return { ...prev, shoe: newShoe, players: newPlayers };
    });
  }, [gameState.shoe, gameState.currentHand]);

  const stand = useCallback(() => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[0];
      
      if (prev.currentHand < player.hands.length - 1) {
        return { ...prev, currentHand: prev.currentHand + 1, players: newPlayers };
      } else {
        return { ...prev, gamePhase: 'dealerTurn', players: newPlayers };
      }
    });
  }, [gameState.currentHand]);

  const doubleDown = useCallback(() => {
    setGameState(prev => {
      const newShoe = [...prev.shoe];
      const newPlayers = [...prev.players];
      const player = newPlayers[0];
      const hand = player.hands[prev.currentHand];
      
      if (hand && player.bankroll >= hand.bet) {
        player.bankroll -= hand.bet;
        hand.bet *= 2;
        hand.isDoubled = true;
        hand.cards.push(newShoe.pop()!);
        
        const { total } = calculateHandValue(hand.cards);
        if (total > 21) {
          // Bust - move to dealer
          return { ...prev, gamePhase: 'dealerTurn', shoe: newShoe, players: newPlayers };
        } else {
          // Stand after double
          if (prev.currentHand < player.hands.length - 1) {
            return { ...prev, currentHand: prev.currentHand + 1, shoe: newShoe, players: newPlayers };
          } else {
            return { ...prev, gamePhase: 'dealerTurn', shoe: newShoe, players: newPlayers };
          }
        }
      }
      
      return { ...prev, shoe: newShoe, players: newPlayers };
    });
  }, [gameState.shoe, gameState.currentHand]);

  const split = useCallback(() => {
    setGameState(prev => {
      const newShoe = [...prev.shoe];
      const newPlayers = [...prev.players];
      const player = newPlayers[0];
      const currentHand = player.hands[prev.currentHand];
      
      if (currentHand && 
          currentHand.cards.length === 2 && 
          currentHand.cards[0].rank === currentHand.cards[1].rank && 
          player.bankroll >= currentHand.bet) {
        
        // Deduct the additional bet for the split
        player.bankroll -= currentHand.bet;
        
        // Create two new hands from the split
        const card1 = currentHand.cards[0];
        const card2 = currentHand.cards[1];
        
        // First hand gets the first card + a new card
        const newHand1: Hand = {
          cards: [card1, newShoe.pop()!],
          bet: currentHand.bet,
          isDoubled: false,
          isSurrendered: false,
          isSplit: true,
          splitFrom: prev.currentHand
        };
        
        // Second hand gets the second card + a new card
        const newHand2: Hand = {
          cards: [card2, newShoe.pop()!],
          bet: currentHand.bet,
          isDoubled: false,
          isSurrendered: false,
          isSplit: true,
          splitFrom: prev.currentHand
        };
        
        // Replace the current hand with the two split hands
        const newHands = [...player.hands];
        newHands.splice(prev.currentHand, 1, newHand1, newHand2);
        player.hands = newHands;
        
        // Check if either hand is a natural blackjack (Ace + 10)
        const hand1Value = calculateHandValue(newHand1.cards);
        const hand2Value = calculateHandValue(newHand2.cards);
        
        // If both hands are blackjack, move to dealer turn
        if (hand1Value.total === 21 && hand2Value.total === 21) {
          return { ...prev, gamePhase: 'dealerTurn', shoe: newShoe, players: newPlayers };
        }
        
        // If first hand is blackjack, move to second hand
        if (hand1Value.total === 21) {
          return { ...prev, currentHand: prev.currentHand + 1, shoe: newShoe, players: newPlayers };
        }
        
        // Otherwise, stay on first hand
        return { ...prev, shoe: newShoe, players: newPlayers };
      }
      
      return { ...prev, shoe: newShoe, players: newPlayers };
    });
  }, [gameState.shoe, gameState.currentHand]);

  const dealerPlay = useCallback(() => {
    setGameState(prev => {
      const newShoe = [...prev.shoe];
      const newDealer = { ...prev.dealer };
      
      // Reveal hole card
      newDealer.cards[1].isHidden = false;
      
      let dealerTotal = calculateHandValue(newDealer.cards).total;
      
      while (dealerTotal < 17 || (dealerTotal === 17 && calculateHandValue(newDealer.cards).isSoft && !rules.standsOnSoft17)) {
        newDealer.cards.push(newShoe.pop()!);
        dealerTotal = calculateHandValue(newDealer.cards).total;
      }
      
      return { ...prev, dealer: newDealer, gamePhase: 'settling', shoe: newShoe };
    });
  }, [rules.standsOnSoft17]);

  const settleRound = useCallback(() => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[0];
      const dealerTotal = calculateHandValue(prev.dealer.cards).total;
      let totalWinnings = 0;
      let resultMessage = '';
      
      player.hands.forEach((hand, index) => {
        const playerTotal = calculateHandValue(hand.cards).total;
        let winnings = 0;
        
        // Check for natural blackjack (Ace + 10, first two cards only)
        const isNaturalBlackjack = hand.cards.length === 2 && 
          playerTotal === 21 && 
          (hand.cards[0].rank === 'A' || hand.cards[1].rank === 'A') &&
          (['10', 'J', 'Q', 'K'].includes(hand.cards[0].rank) || ['10', 'J', 'Q', 'K'].includes(hand.cards[1].rank));
        
        if (hand.isSurrendered) {
          winnings = hand.bet / 2;
          resultMessage += `Hand ${index + 1}: Surrendered (${winnings})\n`;
        } else if (playerTotal > 21) {
          // Player bust
          winnings = 0;
          resultMessage += `Hand ${index + 1}: Bust (-${hand.bet})\n`;
        } else if (isNaturalBlackjack && dealerTotal !== 21) {
          // Natural blackjack pays 3:2
          winnings = hand.bet + (hand.bet * rules.blackjackPayout);
          resultMessage += `Hand ${index + 1}: Blackjack! (+${hand.bet * rules.blackjackPayout})\n`;
        } else if (isNaturalBlackjack && dealerTotal === 21) {
          // Both have blackjack - push
          winnings = hand.bet;
          resultMessage += `Hand ${index + 1}: Blackjack Push (0)\n`;
        } else if (dealerTotal > 21) {
          // Dealer bust
          winnings = hand.bet * 2;
          resultMessage += `Hand ${index + 1}: Dealer Bust (+${hand.bet})\n`;
        } else if (playerTotal > dealerTotal) {
          // Player wins
          winnings = hand.bet * 2;
          resultMessage += `Hand ${index + 1}: Win (+${hand.bet})\n`;
        } else if (playerTotal === dealerTotal) {
          // Push
          winnings = hand.bet;
          resultMessage += `Hand ${index + 1}: Push (0)\n`;
        } else {
          // Dealer wins
          winnings = 0;
          resultMessage += `Hand ${index + 1}: Lose (-${hand.bet})\n`;
        }
        
        totalWinnings += winnings;
        player.bankroll += winnings;
      });
      
      // Set result message
      setLastResult(resultMessage.trim());
      
      // Move cards to discard tray
      const newDiscardTray = [...prev.discardTray];
      player.hands.forEach(hand => {
        newDiscardTray.push(...hand.cards);
      });
      newDiscardTray.push(...prev.dealer.cards);
      
      // Reset for next round
      player.hands = [];
      player.currentBet = 0;
      
      return {
        ...prev,
        players: newPlayers,
        discardTray: newDiscardTray,
        dealer: { cards: [], upCard: null },
        currentHand: 0,
        gamePhase: 'betting',
        roundNumber: prev.roundNumber + 1
      };
    });
  }, []);

  // Auto-play dealer when phase changes
  useEffect(() => {
    if (gameState.gamePhase === 'dealerTurn') {
      setTimeout(dealerPlay, 1000);
    } else if (gameState.gamePhase === 'settling') {
      setTimeout(settleRound, 2000);
    }
  }, [gameState.gamePhase, dealerPlay, settleRound]);

  // Handle AI turns
  useEffect(() => {
    if (gameState.gamePhase === 'playerTurn' && gameState.dealer.upCard) {
      const currentPlayer = gameState.players[gameState.currentPlayer];
      
      if (currentPlayer && currentPlayer.isAI) {
        const hand = currentPlayer.hands[gameState.currentHand];
        if (hand && gameState.dealer.upCard) {
          setTimeout(() => {
            const action = getAIAction(currentPlayer, hand, gameState.dealer.upCard!, aiDifficulty);
            
            // Handle AI actions directly without calling human player functions
            setGameState(prev => {
              const newShoe = [...prev.shoe];
              const newPlayers = [...prev.players];
              const aiPlayer = newPlayers[prev.currentPlayer];
              const aiHand = aiPlayer.hands[prev.currentHand];
              
              switch (action) {
                case 'hit':
                  if (aiHand && !aiHand.isSurrendered) {
                    aiHand.cards.push(newShoe.pop()!);
                    
                    const { total } = calculateHandValue(aiHand.cards);
                    if (total > 21) {
                      // Bust - move to next hand or next player
                      if (prev.currentHand < aiPlayer.hands.length - 1) {
                        return { ...prev, currentHand: prev.currentHand + 1, shoe: newShoe, players: newPlayers };
                      } else if (prev.currentPlayer < newPlayers.length - 1) {
                        return { ...prev, currentPlayer: prev.currentPlayer + 1, currentHand: 0, shoe: newShoe, players: newPlayers };
                      } else {
                        return { ...prev, gamePhase: 'dealerTurn', shoe: newShoe, players: newPlayers };
                      }
                    }
                  }
                  return { ...prev, shoe: newShoe, players: newPlayers };
                  
                case 'stand':
                  if (prev.currentHand < aiPlayer.hands.length - 1) {
                    return { ...prev, currentHand: prev.currentHand + 1, players: newPlayers };
                  } else if (prev.currentPlayer < newPlayers.length - 1) {
                    return { ...prev, currentPlayer: prev.currentPlayer + 1, currentHand: 0, players: newPlayers };
                  } else {
                    return { ...prev, gamePhase: 'dealerTurn', players: newPlayers };
                  }
                  
                case 'double':
                  if (aiHand && aiPlayer.bankroll >= aiHand.bet) {
                    aiPlayer.bankroll -= aiHand.bet;
                    aiHand.bet *= 2;
                    aiHand.isDoubled = true;
                    aiHand.cards.push(newShoe.pop()!);
                    
                    const { total } = calculateHandValue(aiHand.cards);
                    if (total > 21) {
                      // Bust - move to next player
                      if (prev.currentPlayer < newPlayers.length - 1) {
                        return { ...prev, currentPlayer: prev.currentPlayer + 1, currentHand: 0, shoe: newShoe, players: newPlayers };
                      } else {
                        return { ...prev, gamePhase: 'dealerTurn', shoe: newShoe, players: newPlayers };
                      }
                    } else {
                      // Stand after double
                      if (prev.currentPlayer < newPlayers.length - 1) {
                        return { ...prev, currentPlayer: prev.currentPlayer + 1, currentHand: 0, shoe: newShoe, players: newPlayers };
                      } else {
                        return { ...prev, gamePhase: 'dealerTurn', shoe: newShoe, players: newPlayers };
                      }
                    }
                  }
                  return { ...prev, shoe: newShoe, players: newPlayers };
                  
                case 'surrender':
                  if (aiHand && aiHand.cards.length === 2) {
                    aiHand.isSurrendered = true;
                    if (prev.currentPlayer < newPlayers.length - 1) {
                      return { ...prev, currentPlayer: prev.currentPlayer + 1, currentHand: 0, players: newPlayers };
                    } else {
                      return { ...prev, gamePhase: 'dealerTurn', players: newPlayers };
                    }
                  }
                  return { ...prev, players: newPlayers };
                  
                default:
                  return { ...prev, players: newPlayers };
              }
            });
          }, aiDifficulty.decisionSpeed);
        }
      }
    }
  }, [gameState.gamePhase, gameState.currentPlayer, gameState.currentHand, gameState.players, gameState.dealer.upCard, getAIAction, aiDifficulty]);

  const currentHand = gameState.players[0]?.hands[gameState.currentHand];
  const dealerUpCard = gameState.dealer.upCard;
  const basicStrategyAdvice = currentHand && dealerUpCard ? 
    getBasicStrategyAdvice(currentHand.cards, dealerUpCard) : '';

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
            <h1 className="text-3xl font-bold text-champagne">BlackjackLux</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowBasicStrategy(!showBasicStrategy)}
              className={`p-2 rounded-lg transition-colors ${
                showBasicStrategy ? 'bg-emerald text-white' : 'bg-onyxLight text-champagne'
              }`}
            >
              <FaLightbulb className="w-5 h-5" />
            </button>
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
        {/* Game Table */}
        <div className="relative bg-gradient-to-b from-emerald to-emeraldLight rounded-2xl p-8 mb-6 shadow-2xl">
          {/* Dealer Area */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-champagne mb-4">Dealer</h2>
            <div className="flex items-center space-x-4">
              {gameState.dealer.cards.map((card, index) => (
                <CardComponent key={index} card={card} />
              ))}
            </div>
            {gameState.dealer.cards.length > 0 && (
              <div className="mt-2 text-sm text-ivory/80">
                Total: {calculateHandValue(gameState.dealer.cards).total}
              </div>
            )}
          </div>

          {/* AI Players Area */}
          {gameState.players.slice(1).map((player, playerIndex) => (
            <div key={player.id} className="mb-6">
              <h3 className="text-lg font-semibold text-champagne mb-3">
                {player.name} (AI - {aiDifficulty.name})
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {player.hands[0]?.cards.map((card, index) => (
                    <CardComponent key={index} card={card} />
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-sm text-ivory/80">
                    Bankroll: ${player.bankroll}
                  </div>
                  <div className="text-sm text-ivory/80">
                    Bet: ${player.currentBet}
                  </div>
                  {player.hands[0] && (
                    <div className="text-sm text-ivory/80">
                      Total: {calculateHandValue(player.hands[0].cards).total}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Player Area */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-champagne mb-4">Player</h2>
            {gameState.players[0].hands.length > 0 && (
              <div className="space-y-4">
                {gameState.players[0].hands.map((hand, handIndex) => (
                  <div 
                    key={handIndex} 
                    className={`p-4 rounded-lg border-2 ${
                      handIndex === gameState.currentHand 
                        ? 'border-champagne bg-champagne/10' 
                        : 'border-transparent bg-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-champagne">
                        Hand {handIndex + 1}
                        {hand.isSplit && ' (Split)'}
                        {hand.isDoubled && ' (Double)'}
                      </div>
                      <div className="text-sm text-ivory/80">
                        Bet: ${hand.bet}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      {hand.cards.map((card, index) => (
                        <CardComponent key={index} card={card} />
                      ))}
                    </div>
                    <div className="text-sm text-ivory/80">
                      Total: {calculateHandValue(hand.cards).total}
                      {calculateHandValue(hand.cards).isSoft && ' (Soft)'}
                    </div>
                    {handIndex === gameState.currentHand && showBasicStrategy && basicStrategyAdvice && (
                      <div className="mt-2 p-2 bg-champagne/20 rounded-lg text-champagne text-sm">
                        💡 Basic Strategy: {basicStrategyAdvice}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Game Controls */}
                     {gameState.gamePhase === 'betting' && (
             <div className="text-center">
               <p className="text-ivory/80 mb-4">Place your bet to start</p>
               <div className="flex justify-center space-x-4 mb-4">
                 {CHIP_VALUES.map(value => (
                   <ChipComponent
                     key={value}
                     value={value}
                     onClick={() => placeBet(value)}
                   />
                 ))}
               </div>
               <div className="flex justify-center space-x-4">
                 {gameState.players[0].currentBet > 0 && (
                   <>
                     <button
                       onClick={clearBet}
                       className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                     >
                       Clear Bet
                     </button>
                     <button
                       onClick={dealCards}
                       className="px-6 py-3 bg-champagne text-onyx font-bold rounded-lg hover:bg-champagneLight transition-colors"
                     >
                       Deal Cards
                     </button>
                   </>
                 )}
               </div>
             </div>
           )}

                     {gameState.gamePhase === 'playerTurn' && currentHand && (
             <div className="flex justify-center space-x-4">
               <button
                 onClick={hit}
                 className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
               >
                 Hit
               </button>
               <button
                 onClick={stand}
                 className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
               >
                 Stand
               </button>
               {currentHand.cards.length === 2 && gameState.players[0].bankroll >= currentHand.bet && (
                 <button
                   onClick={doubleDown}
                   className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                 >
                   Double
                 </button>
               )}
               {currentHand.cards.length === 2 && 
                currentHand.cards[0].rank === currentHand.cards[1].rank && 
                gameState.players[0].bankroll >= currentHand.bet && (
                 <button
                   onClick={split}
                   className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
                 >
                   Split
                 </button>
               )}
             </div>
           )}

          {gameState.gamePhase === 'dealerTurn' && (
            <div className="text-center">
              <p className="text-champagne text-lg">Dealer is playing...</p>
            </div>
          )}

          {gameState.gamePhase === 'settling' && (
            <div className="text-center">
              <p className="text-champagne text-lg">Settling round...</p>
            </div>
          )}
        </div>

                 {/* Player Info */}
         <div className="bg-onyxLight rounded-lg p-4 mb-6">
           <div className="flex justify-between items-center">
             <div>
               <h3 className="text-lg font-semibold text-champagne">Bankroll</h3>
               <p className="text-2xl font-bold text-ivory">${gameState.players[0].bankroll}</p>
             </div>
             <div>
               <h3 className="text-lg font-semibold text-champagne">Current Bet</h3>
               <p className="text-2xl font-bold text-ivory">${gameState.players[0].currentBet}</p>
             </div>
             <div>
               <h3 className="text-lg font-semibold text-champagne">Round</h3>
               <p className="text-2xl font-bold text-ivory">#{gameState.roundNumber}</p>
             </div>
           </div>
         </div>

         {/* Last Result */}
         {lastResult && (
           <div className="bg-onyxLight rounded-lg p-4 mb-6">
             <h3 className="text-lg font-semibold text-champagne mb-2">Last Round Results</h3>
             <div className="bg-onyx rounded-lg p-3">
               <pre className="text-sm text-ivory whitespace-pre-wrap">{lastResult}</pre>
             </div>
           </div>
         )}

        {/* Shoe Info */}
        <div className="bg-onyxLight rounded-lg p-4">
          <h3 className="text-lg font-semibold text-champagne mb-2">Shoe</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-champagne h-2 rounded-full transition-all duration-300"
                style={{ width: `${(gameState.shoe.length / (52 * rules.numDecks)) * 100}%` }}
              />
            </div>
            <span className="text-sm text-ivory/80">
              {gameState.shoe.length} cards remaining
            </span>
          </div>
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
                  Number of Decks
                </label>
                <select className="w-full bg-onyx text-ivory rounded-lg p-2 border border-champagne/20">
                  <option value="6">6 Decks</option>
                  <option value="8">8 Decks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory mb-2">
                  Dealer Stands on Soft 17
                </label>
                <input type="checkbox" checked={rules.standsOnSoft17} className="mr-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory mb-2">
                  Double After Split
                </label>
                <input type="checkbox" checked={rules.doubleAfterSplit} className="mr-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory mb-2">
                  AI Difficulty
                </label>
                <select 
                  className="w-full bg-onyx text-ivory rounded-lg p-2 border border-champagne/20"
                  value={aiDifficulty.name}
                  onChange={(e) => {
                    const difficulty = AI_DIFFICULTIES.find(d => d.name === e.target.value);
                    if (difficulty) setAiDifficulty(difficulty);
                  }}
                >
                  {AI_DIFFICULTIES.map(difficulty => (
                    <option key={difficulty.name} value={difficulty.name}>
                      {difficulty.name} - {difficulty.description}
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
                  <option value={0}>No AI Players</option>
                  <option value={1}>1 AI Player</option>
                  <option value={2}>2 AI Players</option>
                  <option value={3}>3 AI Players</option>
                  <option value={4}>4 AI Players</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlackjackLux;
