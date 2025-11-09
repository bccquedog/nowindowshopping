import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaGear,
  FaLightbulb,
  FaDice,
  FaHouse,
  FaHotel,
  FaGavel,
  FaArrowRightArrowLeft,
  FaMoneyBillWave,
  FaXmark,
  FaCheck,
  FaCircleInfo,
  FaPlay,
  FaPause
} from 'react-icons/fa6';

// Types
interface Property {
  id: string;
  name: string;
  color: string;
  price: number;
  rent: number[];
  houseCost: number;
  position: number;
  owner: string | null;
  houses: number;
  isMortgaged: boolean;
}

interface Player {
  id: string;
  name: string;
  position: number;
  money: number;
  properties: string[];
  getOutOfJailCards: number;
  isInJail: boolean;
  jailTurns: number;
  passGoCount: number;
  jailedBeforeFirstPass: boolean;
  isAI: boolean;
  color: string;
}

interface GameState {
  players: Player[];
  currentPlayer: number;
  properties: Property[];
  gamePhase: 'rolling' | 'buying' | 'auctioning' | 'trading' | 'building' | 'complete';
  dice: number[];
  doublesCount: number;
  auctionProperty: Property | null;
  auctionBids: Record<string, number>;
  auctionTimer: number;
  tradeProposal: any;
  gameBoard: any[];
  chanceDeck: any[];
  chestDeck: any[];
  winner: string | null;
}

interface BoardTile {
  id: string;
  name: string;
  type: 'property' | 'chance' | 'chest' | 'tax' | 'corner' | 'utility' | 'railroad';
  position: number;
  color?: string;
  price?: number;
  rent?: number[];
  houseCost?: number;
}

// Constants
const BOARD_SIZE = 40;
const JAIL_POSITION = 10;
const GO_TO_JAIL_POSITION = 30;
const GO_MONEY = 200;
const JAIL_BAIL = 50;

const PROPERTY_COLORS = {
  'Brown': '#8B4513',
  'Light Blue': '#87CEEB',
  'Pink': '#FFC0CB',
  'Orange': '#FFA500',
  'Red': '#DC2626',
  'Yellow': '#FBBF24',
  'Green': '#059669',
  'Dark Blue': '#1E40AF'
};

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
const createBoard = (): BoardTile[] => {
  return [
    { id: 'go', name: 'GO', type: 'corner', position: 0 },
    { id: 'mediterranean', name: 'Mediterranean Avenue', type: 'property', position: 1, color: 'Brown', price: 60, rent: [2, 10, 30, 90, 160, 250], houseCost: 50 },
    { id: 'chest1', name: 'Community Chest', type: 'chest', position: 2 },
    { id: 'baltic', name: 'Baltic Avenue', type: 'property', position: 3, color: 'Brown', price: 60, rent: [4, 20, 60, 180, 320, 450], houseCost: 50 },
    { id: 'tax1', name: 'Income Tax', type: 'tax', position: 4 },
    { id: 'reading', name: 'Reading Railroad', type: 'railroad', position: 5, price: 200, rent: [25, 50, 100, 200] },
    { id: 'oriental', name: 'Oriental Avenue', type: 'property', position: 6, color: 'Light Blue', price: 100, rent: [6, 30, 90, 270, 400, 550], houseCost: 50 },
    { id: 'chance1', name: 'Chance', type: 'chance', position: 7 },
    { id: 'vermont', name: 'Vermont Avenue', type: 'property', position: 8, color: 'Light Blue', price: 100, rent: [6, 30, 90, 270, 400, 550], houseCost: 50 },
    { id: 'connecticut', name: 'Connecticut Avenue', type: 'property', position: 9, color: 'Light Blue', price: 120, rent: [8, 40, 100, 300, 450, 600], houseCost: 50 },
    { id: 'jail', name: 'Jail', type: 'corner', position: 10 },
    { id: 'st-charles', name: 'St. Charles Place', type: 'property', position: 11, color: 'Pink', price: 140, rent: [10, 50, 150, 450, 625, 750], houseCost: 100 },
    { id: 'electric', name: 'Electric Company', type: 'utility', position: 12, price: 150, rent: [4, 10] },
    { id: 'states', name: 'States Avenue', type: 'property', position: 13, color: 'Pink', price: 140, rent: [10, 50, 150, 450, 625, 750], houseCost: 100 },
    { id: 'virginia', name: 'Virginia Avenue', type: 'property', position: 14, color: 'Pink', price: 160, rent: [12, 60, 180, 500, 700, 900], houseCost: 100 },
    { id: 'pennsylvania', name: 'Pennsylvania Railroad', type: 'railroad', position: 15, price: 200, rent: [25, 50, 100, 200] },
    { id: 'st-james', name: 'St. James Place', type: 'property', position: 16, color: 'Orange', price: 180, rent: [14, 70, 200, 550, 750, 950], houseCost: 100 },
    { id: 'chest2', name: 'Community Chest', type: 'chest', position: 17 },
    { id: 'tennessee', name: 'Tennessee Avenue', type: 'property', position: 18, color: 'Orange', price: 180, rent: [14, 70, 200, 550, 750, 950], houseCost: 100 },
    { id: 'new-york', name: 'New York Avenue', type: 'property', position: 19, color: 'Orange', price: 200, rent: [16, 80, 220, 600, 800, 1000], houseCost: 100 },
    { id: 'free-parking', name: 'Free Parking', type: 'corner', position: 20 },
    { id: 'kentucky', name: 'Kentucky Avenue', type: 'property', position: 21, color: 'Red', price: 220, rent: [18, 90, 250, 700, 875, 1050], houseCost: 150 },
    { id: 'chance2', name: 'Chance', type: 'chance', position: 22 },
    { id: 'indiana', name: 'Indiana Avenue', type: 'property', position: 23, color: 'Red', price: 220, rent: [18, 90, 250, 700, 875, 1050], houseCost: 150 },
    { id: 'illinois', name: 'Illinois Avenue', type: 'property', position: 24, color: 'Red', price: 240, rent: [20, 100, 300, 750, 925, 1100], houseCost: 150 },
    { id: 'b-o', name: 'B. & O. Railroad', type: 'railroad', position: 25, price: 200, rent: [25, 50, 100, 200] },
    { id: 'atlantic', name: 'Atlantic Avenue', type: 'property', position: 26, color: 'Yellow', price: 260, rent: [22, 110, 330, 800, 975, 1150], houseCost: 150 },
    { id: 'ventnor', name: 'Ventnor Avenue', type: 'property', position: 27, color: 'Yellow', price: 260, rent: [22, 110, 330, 800, 975, 1150], houseCost: 150 },
    { id: 'water', name: 'Water Works', type: 'utility', position: 28, price: 150, rent: [4, 10] },
    { id: 'marvin', name: 'Marvin Gardens', type: 'property', position: 29, color: 'Yellow', price: 280, rent: [24, 120, 360, 850, 1025, 1200], houseCost: 150 },
    { id: 'go-to-jail', name: 'Go To Jail', type: 'corner', position: 30 },
    { id: 'pacific', name: 'Pacific Avenue', type: 'property', position: 31, color: 'Green', price: 300, rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200 },
    { id: 'north-carolina', name: 'North Carolina Avenue', type: 'property', position: 32, color: 'Green', price: 300, rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200 },
    { id: 'chest3', name: 'Community Chest', type: 'chest', position: 33 },
    { id: 'pennsylvania-ave', name: 'Pennsylvania Avenue', type: 'property', position: 34, color: 'Green', price: 320, rent: [28, 150, 450, 1000, 1200, 1400], houseCost: 200 },
    { id: 'short-line', name: 'Short Line', type: 'railroad', position: 35, price: 200, rent: [25, 50, 100, 200] },
    { id: 'chance3', name: 'Chance', type: 'chance', position: 36 },
    { id: 'park-place', name: 'Park Place', type: 'property', position: 37, color: 'Dark Blue', price: 350, rent: [35, 175, 500, 1100, 1300, 1500], houseCost: 200 },
    { id: 'tax2', name: 'Luxury Tax', type: 'tax', position: 38 },
    { id: 'boardwalk', name: 'Boardwalk', type: 'property', position: 39, color: 'Dark Blue', price: 400, rent: [50, 200, 600, 1400, 1700, 2000], houseCost: 200 }
  ];
};

const rollDice = (): number[] => {
  return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
};

const isDoubles = (dice: number[]): boolean => {
  return dice[0] === dice[1];
};

const getPropertyByPosition = (properties: Property[], position: number): Property | null => {
  return properties.find(p => p.position === position) || null;
};

const canBuyProperty = (player: Player): boolean => {
  return player.passGoCount >= 1 && !player.jailedBeforeFirstPass;
};

const getMonopolyProperties = (properties: Property[], color: string): Property[] => {
  return properties.filter(p => p.color === color);
};

const canBuildHouses = (properties: Property[], color: string): boolean => {
  const monopolyProps = getMonopolyProperties(properties, color);
  const allOwned = monopolyProps.every(p => p.owner === monopolyProps[0].owner);
  const evenBuilding = monopolyProps.every(p => p.houses === monopolyProps[0].houses || p.houses === monopolyProps[0].houses + 1);
  return allOwned && evenBuilding;
};

// AI Logic
const getAIAction = (player: Player, gameState: GameState, difficulty: any): string => {
  const currentTile = getPropertyByPosition(gameState.properties, player.position);
  
  if (!currentTile || currentTile.owner) return 'end-turn';
  
  if (!canBuyProperty(player)) return 'end-turn';
  
  const random = Math.random();
  if (random < difficulty.aggression) {
    return 'buy';
  }
  
  return 'end-turn';
};

// Board Tile Component
const BoardTile: React.FC<{
  tile: BoardTile;
  property?: Property;
  players: Player[];
  isCurrentPlayer: boolean;
  onClick?: () => void;
}> = ({ tile, property, players, isCurrentPlayer, onClick }) => {
  const playersOnTile = players.filter(p => p.position === tile.position);
  const getTileColor = () => {
    if (tile.color) return PROPERTY_COLORS[tile.color as keyof typeof PROPERTY_COLORS];
    switch (tile.type) {
      case 'chance': return THEME.blue;
      case 'chest': return THEME.green;
      case 'tax': return THEME.red;
      case 'corner': return THEME.onyxLight;
      case 'utility': return THEME.emerald;
      case 'railroad': return THEME.gold;
      default: return THEME.onyxLight;
    }
  };

  return (
    <motion.div
      className={`relative p-2 rounded-lg border-2 transition-all duration-200 ${
        isCurrentPlayer ? 'border-champagne bg-onyxLight' : 'border-transparent bg-onyxLight/50'
      } ${onClick ? 'cursor-pointer hover:bg-onyxLight' : ''}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : {}}
      style={{ backgroundColor: getTileColor() }}
    >
      <div className="text-xs font-bold text-ivory mb-1">
        {tile.name}
      </div>
      
      {property && (
        <div className="text-xs text-ivory/80">
          {property.owner && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-champagne" />
              <span>${property.rent[property.houses]}</span>
            </div>
          )}
          {property.houses > 0 && (
            <div className="flex space-x-1 mt-1">
              {Array.from({ length: property.houses }, (_, i) => (
                <FaHouse key={i} className="w-2 h-2 text-champagne" />
              ))}
            </div>
          )}
        </div>
      )}
      
      {playersOnTile.length > 0 && (
        <div className="absolute -top-1 -right-1 flex space-x-1">
          {playersOnTile.map(player => (
            <div
              key={player.id}
              className="w-3 h-3 rounded-full border border-white"
              style={{ backgroundColor: player.color }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Main Tycoon Component
const Tycoon: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [
      {
        id: 'hero',
        name: 'You',
        position: 0,
        money: 1500,
        properties: [],
        getOutOfJailCards: 0,
        isInJail: false,
        jailTurns: 0,
        passGoCount: 0,
        jailedBeforeFirstPass: false,
        isAI: false,
        color: THEME.champagne
      },
      {
        id: 'ai1',
        name: 'AI Player 1',
        position: 0,
        money: 1500,
        properties: [],
        getOutOfJailCards: 0,
        isInJail: false,
        jailTurns: 0,
        passGoCount: 0,
        jailedBeforeFirstPass: false,
        isAI: true,
        color: THEME.emerald
      },
      {
        id: 'ai2',
        name: 'AI Player 2',
        position: 0,
        money: 1500,
        properties: [],
        getOutOfJailCards: 0,
        isInJail: false,
        jailTurns: 0,
        passGoCount: 0,
        jailedBeforeFirstPass: false,
        isAI: true,
        color: THEME.blue
      }
    ],
    currentPlayer: 0,
    properties: createBoard().filter(tile => tile.type === 'property').map(tile => ({
      id: tile.id,
      name: tile.name,
      color: tile.color!,
      price: tile.price!,
      rent: tile.rent!,
      houseCost: tile.houseCost!,
      position: tile.position,
      owner: null,
      houses: 0,
      isMortgaged: false
    })),
    gamePhase: 'rolling',
    dice: [0, 0],
    doublesCount: 0,
    auctionProperty: null,
    auctionBids: {},
    auctionTimer: 0,
    tradeProposal: null,
    gameBoard: createBoard(),
    chanceDeck: [],
    chestDeck: [],
    winner: null
  });

  const [aiDifficulty, setAiDifficulty] = useState(AI_DIFFICULTIES[1]);
  const [aiPlayerCount, setAiPlayerCount] = useState<number>(2); // 2 AI players by default
  const [showHints, setShowHints] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isAITurn, setIsAITurn] = useState(false);

  // Create AI players based on count
  const createAIPlayers = useCallback((count: number) => {
    const aiPlayers = [];
    const colors = [THEME.emerald, THEME.blue, THEME.gold, THEME.red];
    
    for (let i = 0; i < count; i++) {
      aiPlayers.push({
        id: `ai${i + 1}`,
        name: `AI Player ${i + 1}`,
        position: 0,
        money: 1500,
        properties: [],
        getOutOfJailCards: 0,
        isInJail: false,
        jailTurns: 0,
        passGoCount: 0,
        jailedBeforeFirstPass: false,
        isAI: true,
        color: colors[i % colors.length]
      });
    }
    return aiPlayers;
  }, []);

  // Update game state when AI player count changes
  useEffect(() => {
    const aiPlayers = createAIPlayers(aiPlayerCount);
    setGameState(prev => ({
      ...prev,
      players: [
        prev.players[0], // Keep human player
        ...aiPlayers
      ]
    }));
  }, [aiPlayerCount, createAIPlayers]);

  const currentPlayer = gameState.players[gameState.currentPlayer];
  const isHeroTurn = currentPlayer?.id === 'hero';

  const rollDiceAction = useCallback(() => {
    if (gameState.gamePhase !== 'rolling' || !isHeroTurn) return;

    const newDice = rollDice();
    const isDoublesRoll = isDoubles(newDice);
    const newDoublesCount = isDoublesRoll ? gameState.doublesCount + 1 : 0;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[prev.currentPlayer];
      
      // Move player
      const newPosition = (player.position + newDice[0] + newDice[1]) % BOARD_SIZE;
      player.position = newPosition;
      
      // Check if passed GO
      if (newPosition < player.position || (player.position > newPosition && newPosition < 10)) {
        player.passGoCount++;
        player.money += GO_MONEY;
      }
      
      // Check for Go To Jail
      if (newPosition === GO_TO_JAIL_POSITION) {
        player.position = JAIL_POSITION;
        player.isInJail = true;
        player.jailTurns = 3;
        if (player.passGoCount === 0) {
          player.jailedBeforeFirstPass = true;
        }
      }
      
      // Check for three doubles
      if (newDoublesCount >= 3) {
        player.position = JAIL_POSITION;
        player.isInJail = true;
        player.jailTurns = 3;
        if (player.passGoCount === 0) {
          player.jailedBeforeFirstPass = true;
        }
      }

      return {
        ...prev,
        players: newPlayers,
        dice: newDice,
        doublesCount: newDoublesCount,
        gamePhase: 'buying'
      };
    });
  }, [gameState.gamePhase, gameState.doublesCount, isHeroTurn]);

  const buyProperty = useCallback(() => {
    if (gameState.gamePhase !== 'buying' || !isHeroTurn) return;

    const currentTile = getPropertyByPosition(gameState.properties, currentPlayer.position);
    if (!currentTile || currentTile.owner || !canBuyProperty(currentPlayer)) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const newProperties = [...prev.properties];
      
      const player = newPlayers[prev.currentPlayer];
      const property = newProperties.find(p => p.id === currentTile.id);
      
      if (property && player.money >= property.price) {
        player.money -= property.price;
        player.properties.push(property.id);
        property.owner = player.id;
      }

      return {
        ...prev,
        players: newPlayers,
        properties: newProperties,
        gamePhase: 'rolling'
      };
    });
  }, [gameState.gamePhase, currentPlayer, isHeroTurn]);

  const endTurn = useCallback(() => {
    setGameState(prev => {
      let nextPlayer = (prev.currentPlayer + 1) % prev.players.length;
      
      // Skip eliminated players
      while (prev.players[nextPlayer].money < 0 && nextPlayer !== prev.currentPlayer) {
        nextPlayer = (nextPlayer + 1) % prev.players.length;
      }

      return {
        ...prev,
        currentPlayer: nextPlayer,
        gamePhase: 'rolling',
        dice: [0, 0],
        doublesCount: 0
      };
    });
  }, []);

  // AI turn handling
  useEffect(() => {
    if (gameState.gamePhase === 'rolling' && currentPlayer?.isAI && !isAITurn) {
      setIsAITurn(true);
      setTimeout(() => {
        rollDiceAction();
        setTimeout(() => {
          const aiAction = getAIAction(currentPlayer, gameState, aiDifficulty);
          if (aiAction === 'buy') {
            buyProperty();
          }
          setTimeout(() => {
            endTurn();
            setIsAITurn(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }
  }, [gameState.gamePhase, currentPlayer, isAITurn, aiDifficulty, rollDiceAction, buyProperty, endTurn]);

  const renderBoard = () => {
    const boardTiles = [];
    
    for (let i = 0; i < BOARD_SIZE; i++) {
      const tile = gameState.gameBoard.find(t => t.position === i);
      const property = gameState.properties.find(p => p.position === i);
      
      if (tile) {
        boardTiles.push(
          <BoardTile
            key={tile.id}
            tile={tile}
            property={property}
            players={gameState.players}
            isCurrentPlayer={gameState.players.some(p => p.position === i && p.id === currentPlayer?.id)}
          />
        );
      }
    }

    return boardTiles;
  };

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
            <h1 className="text-3xl font-bold text-champagne">Tycoon</h1>
          </div>
          <div className="flex items-center space-x-4">
            {showHints && (
              <button
                onClick={() => {/* TODO: Show hint */}}
                className="p-2 rounded-lg bg-emerald text-white hover:bg-emeraldLight transition-colors"
                disabled={isAITurn}
              >
                <FaLightbulb className="w-5 h-5" />
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
              <h3 className="text-lg font-semibold text-champagne">Current Player</h3>
              <p className="text-2xl font-bold text-ivory capitalize">
                {currentPlayer?.name} {isAITurn && '(AI Thinking...)'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Money</h3>
              <p className="text-2xl font-bold text-ivory">${currentPlayer?.money}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Position</h3>
              <p className="text-xl font-bold text-ivory">{currentPlayer?.position}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Properties</h3>
              <p className="text-ivory">{currentPlayer?.properties.length}</p>
            </div>
          </div>
        </div>

        {/* Dice */}
        {gameState.dice[0] > 0 && (
          <div className="flex justify-center mb-6">
            <div className="bg-onyxLight rounded-lg p-4">
              <h3 className="text-lg font-semibold text-champagne mb-2 text-center">Dice</h3>
              <div className="flex space-x-4">
                {gameState.dice.map((die, index) => (
                  <div key={index} className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-onyx font-bold text-xl">
                    {die}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Game Board */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-champagne mb-4">Game Board</h3>
          <div className="grid grid-cols-10 gap-2">
            {renderBoard()}
          </div>
        </div>

        {/* Action Controls */}
        {isHeroTurn && gameState.gamePhase === 'rolling' && (
          <div className="bg-onyxLight rounded-lg p-6">
            <h3 className="text-lg font-semibold text-champagne mb-4">Your Turn</h3>
            <div className="flex justify-center">
              <button
                onClick={rollDiceAction}
                className="px-6 py-3 bg-champagne text-onyx font-bold rounded-lg hover:bg-champagneLight transition-colors flex items-center space-x-2"
              >
                <FaDice className="w-5 h-5" />
                <span>Roll Dice</span>
              </button>
            </div>
          </div>
        )}

        {isHeroTurn && gameState.gamePhase === 'buying' && (
          <div className="bg-onyxLight rounded-lg p-6">
            <h3 className="text-lg font-semibold text-champagne mb-4">Property Action</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={buyProperty}
                className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                disabled={!canBuyProperty(currentPlayer)}
              >
                Buy Property
              </button>
              <button
                onClick={endTurn}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                End Turn
              </button>
            </div>
            {!canBuyProperty(currentPlayer) && (
              <p className="text-red-400 text-center mt-2">
                You must pass GO once without going to Jail to buy properties
              </p>
            )}
          </div>
        )}

        {/* AI Thinking Indicator */}
        {isAITurn && (
          <div className="text-center">
            <p className="text-champagne text-lg">AI is thinking...</p>
          </div>
        )}

        {/* Players */}
        <div className="grid grid-cols-3 gap-4 mb-6">
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
                <div>Money: ${player.money}</div>
                <div>Position: {player.position}</div>
                <div>Properties: {player.properties.length}</div>
                {player.isInJail && <div className="text-red-400">In Jail ({player.jailTurns} turns)</div>}
                {player.passGoCount > 0 && <div className="text-green-400">Passed GO: {player.passGoCount}x</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Game Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => {/* TODO: New game */}}
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

export default Tycoon;
