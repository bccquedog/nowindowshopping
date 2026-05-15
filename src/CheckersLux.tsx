import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaGear,
  FaCircleQuestion,
  FaXmark,
  FaCheck
} from 'react-icons/fa6';

// Types
interface Position {
  row: number;
  col: number;
}

interface Piece {
  id: string;
  position: Position;
  isKing: boolean;
  color: 'dark' | 'light';
}

interface Move {
  from: Position;
  to: Position;
  captures: Position[];
  promotes: boolean;
  sequence: Position[];
}

interface GameState {
  pieces: Piece[];
  currentPlayer: 'dark' | 'light';
  selectedPiece: Piece | null;
  legalMoves: Move[];
  gamePhase: 'playing' | 'gameOver' | 'draw';
  winner: 'dark' | 'light' | null;
  moveHistory: Move[];
  moveCount: number;
  lastMove: Move | null;
  forcedCapture: boolean;
}

interface AIDifficulty {
  name: string;
  depth: number;
  timeLimit: number;
  randomness: number;
}

// Constants
const BOARD_SIZE = 8;
const SQUARE_SIZE = 60;
const AI_DELAY = 500; // ms delay for AI moves

const AI_DIFFICULTIES: AIDifficulty[] = [
  { name: 'Novice', depth: 4, timeLimit: 100, randomness: 0.3 },
  { name: 'Standard', depth: 8, timeLimit: 250, randomness: 0.1 },
  { name: 'Master', depth: 12, timeLimit: 1000, randomness: 0.05 }
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
  darkSquare: '#2D1810',
  lightSquare: '#8B4513',
  darkPiece: '#1A1A1A',
  lightPiece: '#F5F5DC',
  gold: '#B8860B'
};

// Utility Functions
const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < BOARD_SIZE && pos.col >= 0 && pos.col < BOARD_SIZE;
};

const isDarkSquare = (row: number, col: number): boolean => {
  return (row + col) % 2 === 1;
};

// Game Logic - exported for multiplayer initializers
export const createInitialBoard = (): Piece[] => {
  const pieces: Piece[] = [];
  let id = 0;

  // Place dark pieces (top 3 rows)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isDarkSquare(row, col)) {
        pieces.push({
          id: `dark-${id++}`,
          position: { row, col },
          isKing: false,
          color: 'dark'
        });
      }
    }
  }

  // Place light pieces (bottom 3 rows)
  for (let row = BOARD_SIZE - 3; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isDarkSquare(row, col)) {
        pieces.push({
          id: `light-${id++}`,
          position: { row, col },
          isKing: false,
          color: 'light'
        });
      }
    }
  }

  return pieces;
};

const getPieceAtPosition = (pieces: Piece[], position: Position): Piece | null => {
  return pieces.find(p => p.position.row === position.row && p.position.col === position.col) || null;
};

const getDiagonalMoves = (piece: Piece, pieces: Piece[]): Position[] => {
  const moves: Position[] = [];
  const { row, col } = piece.position;
  const directions = piece.isKing ? [-1, 1] : piece.color === 'dark' ? [1] : [-1];

  for (const rowDir of directions) {
    for (const colDir of [-1, 1]) {
      const newRow = row + rowDir;
      const newCol = col + colDir;
      
      if (isValidPosition({ row: newRow, col: newCol }) && isDarkSquare(newRow, newCol)) {
        const targetPiece = getPieceAtPosition(pieces, { row: newRow, col: newCol });
        if (!targetPiece) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    }
  }

  return moves;
};

const getCaptureMoves = (piece: Piece, pieces: Piece[]): Move[] => {
  const captures: Move[] = [];
  const { row, col } = piece.position;
  const directions = piece.isKing ? [-1, 1] : piece.color === 'dark' ? [1] : [-1];

  for (const rowDir of directions) {
    for (const colDir of [-1, 1]) {
      const jumpRow = row + rowDir;
      const jumpCol = col + colDir;
      const landRow = row + rowDir * 2;
      const landCol = col + colDir * 2;

      if (isValidPosition({ row: jumpRow, col: jumpCol }) && 
          isValidPosition({ row: landRow, col: landCol }) &&
          isDarkSquare(jumpRow, jumpCol) && isDarkSquare(landRow, landCol)) {
        
        const jumpPiece = getPieceAtPosition(pieces, { row: jumpRow, col: jumpCol });
        const landPiece = getPieceAtPosition(pieces, { row: landRow, col: landCol });

        if (jumpPiece && jumpPiece.color !== piece.color && !landPiece) {
          captures.push({
            from: piece.position,
            to: { row: landRow, col: landCol },
            captures: [{ row: jumpRow, col: jumpCol }],
            promotes: piece.color === 'dark' ? landRow === BOARD_SIZE - 1 : landRow === 0,
            sequence: [piece.position, { row: landRow, col: landCol }]
          });
        }
      }
    }
  }

  return captures;
};

const getMultiJumpMoves = (piece: Piece, pieces: Piece[], capturedPositions: Position[] = []): Move[] => {
  const multiJumps: Move[] = [];
  const { row, col } = piece.position;
  const directions = piece.isKing ? [-1, 1] : piece.color === 'dark' ? [1] : [-1];

  for (const rowDir of directions) {
    for (const colDir of [-1, 1]) {
      const jumpRow = row + rowDir;
      const jumpCol = col + colDir;
      const landRow = row + rowDir * 2;
      const landCol = col + colDir * 2;

      if (isValidPosition({ row: jumpRow, col: jumpCol }) && 
          isValidPosition({ row: landRow, col: landCol }) &&
          isDarkSquare(jumpRow, jumpCol) && isDarkSquare(landRow, landCol)) {
        
        const jumpPiece = getPieceAtPosition(pieces, { row: jumpRow, col: jumpCol });
        const landPiece = getPieceAtPosition(pieces, { row: landRow, col: landCol });

        if (jumpPiece && jumpPiece.color !== piece.color && !landPiece &&
            !capturedPositions.some(pos => pos.row === jumpRow && pos.col === jumpCol)) {
          
          const newCapturedPositions = [...capturedPositions, { row: jumpRow, col: jumpCol }];
          const promotes = piece.color === 'dark' ? landRow === BOARD_SIZE - 1 : landRow === 0;
          
          // Check for additional jumps
          const tempPiece = { ...piece, position: { row: landRow, col: landCol }, isKing: piece.isKing || promotes };
          const additionalJumps = getMultiJumpMoves(tempPiece, pieces, newCapturedPositions);
          
          if (additionalJumps.length > 0) {
            multiJumps.push(...additionalJumps.map(jump => ({
              ...jump,
              from: piece.position,
              captures: [...newCapturedPositions, ...jump.captures],
              sequence: [piece.position, ...jump.sequence.slice(1)]
            })));
          } else {
            multiJumps.push({
              from: piece.position,
              to: { row: landRow, col: landCol },
              captures: newCapturedPositions,
              promotes,
              sequence: [piece.position, { row: landRow, col: landCol }]
            });
          }
        }
      }
    }
  }

  return multiJumps;
};

export const getAllLegalMoves = (pieces: Piece[], currentPlayer: 'dark' | 'light'): Move[] => {
  const playerPieces = pieces.filter(p => p.color === currentPlayer);
  const allMoves: Move[] = [];

  // First, check for captures
  for (const piece of playerPieces) {
    const captures = getCaptureMoves(piece, pieces);
    const multiJumps = getMultiJumpMoves(piece, pieces);
    allMoves.push(...captures, ...multiJumps);
  }

  // If no captures, allow regular moves
  if (allMoves.length === 0) {
    for (const piece of playerPieces) {
      const moves = getDiagonalMoves(piece, pieces);
      allMoves.push(...moves.map(move => ({
        from: piece.position,
        to: move,
        captures: [],
        promotes: piece.color === 'dark' ? move.row === BOARD_SIZE - 1 : move.row === 0,
        sequence: [piece.position, move]
      })));
    }
  }

  return allMoves;
};

// AI Logic (Simplified Alpha-Beta)
const evaluatePosition = (pieces: Piece[], currentPlayer: 'dark' | 'light'): number => {
  let score = 0;
  
  for (const piece of pieces) {
    const value = piece.isKing ? 3 : 1;
    const multiplier = piece.color === currentPlayer ? 1 : -1;
    score += value * multiplier;
  }
  
  return score;
};

const alphaBeta = (
  pieces: Piece[], 
  depth: number, 
  alpha: number, 
  beta: number, 
  currentPlayer: 'dark' | 'light',
  maximizing: boolean
): number => {
  if (depth === 0) {
    return evaluatePosition(pieces, currentPlayer);
  }

  const legalMoves = getAllLegalMoves(pieces, currentPlayer);
  
  if (legalMoves.length === 0) {
    return maximizing ? -1000 : 1000; // Game over
  }

  if (maximizing) {
    let maxEval = -Infinity;
    for (const move of legalMoves) {
      const newPieces = executeMove(pieces, move);
      const evaluation = alphaBeta(newPieces, depth - 1, alpha, beta, currentPlayer === 'dark' ? 'light' : 'dark', false);
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of legalMoves) {
      const newPieces = executeMove(pieces, move);
      const evaluation = alphaBeta(newPieces, depth - 1, alpha, beta, currentPlayer === 'dark' ? 'light' : 'dark', true);
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

const getBestMove = (pieces: Piece[], currentPlayer: 'dark' | 'light', difficulty: AIDifficulty): Move => {
  const legalMoves = getAllLegalMoves(pieces, currentPlayer);
  
  if (legalMoves.length === 0) return legalMoves[0];
  
  // Add randomness for lower difficulties
  if (Math.random() < difficulty.randomness) {
    return legalMoves[Math.floor(Math.random() * legalMoves.length)];
  }

  let bestMove = legalMoves[0];
  let bestEval = -Infinity;
  const alpha = -Infinity;
  const beta = Infinity;

  for (const move of legalMoves) {
    const newPieces = executeMove(pieces, move);
    const evaluation = alphaBeta(newPieces, difficulty.depth - 1, alpha, beta, currentPlayer === 'dark' ? 'light' : 'dark', false);
    
    if (evaluation > bestEval) {
      bestEval = evaluation;
      bestMove = move;
    }
  }

  return bestMove;
};

const executeMove = (pieces: Piece[], move: Move): Piece[] => {
  const newPieces = pieces.filter(p => 
    !(p.position.row === move.from.row && p.position.col === move.from.col) &&
    !move.captures.some(cap => cap.row === p.position.row && cap.col === p.position.col)
  );

  const movingPiece = pieces.find(p => p.position.row === move.from.row && p.position.col === move.from.col);
  if (movingPiece) {
    newPieces.push({
      ...movingPiece,
      position: move.to,
      isKing: movingPiece.isKing || move.promotes
    });
  }

  return newPieces;
};

// Board Component
const BoardSquare: React.FC<{
  position: Position;
  isDark: boolean;
  isSelected: boolean;
  isLegalMove: boolean;
  isLastMove: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}> = ({ position, isDark, isSelected, isLegalMove, isLastMove, onClick, children }) => {
  const getSquareColor = () => {
    if (isSelected) return THEME.champagne;
    if (isLastMove) return THEME.emerald;
    if (isLegalMove) return THEME.emeraldLight;
    return isDark ? THEME.darkSquare : THEME.lightSquare;
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        backgroundColor: getSquareColor(),
        border: isSelected ? `2px solid ${THEME.gold}` : 'none'
      }}
      onClick={onClick}
      whileHover={isLegalMove ? { scale: 1.05 } : {}}
      transition={{ duration: 0.2 }}
    >
      {isLegalMove && (
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-champagne opacity-70"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {children}
    </motion.div>
  );
};

// Piece Component
const CheckerPiece: React.FC<{
  piece: Piece;
  isSelected: boolean;
  onClick: () => void;
}> = ({ piece, isSelected, onClick }) => {
  const getPieceColor = () => {
    return piece.color === 'dark' ? THEME.darkPiece : THEME.lightPiece;
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-12 h-12 rounded-full border-2 shadow-lg flex items-center justify-center"
        style={{
          backgroundColor: getPieceColor(),
          borderColor: isSelected ? THEME.gold : piece.color === 'dark' ? THEME.onyx : THEME.champagne,
          boxShadow: isSelected ? `0 0 10px ${THEME.gold}` : '0 4px 8px rgba(0,0,0,0.3)'
        }}
      >
        {piece.isKing && (
          <FaCheck className="w-6 h-6 text-gold" />
        )}
      </div>
    </motion.div>
  );
};

interface CheckersLuxProps {
  isMultiplayer?: boolean;
  syncedGameState?: GameState | null;
  onUpdateGameState?: (state: GameState) => void;
  onBack?: () => void;
  playerIndex?: number;
  isSpectator?: boolean;
}

const defaultGameState: GameState = {
  pieces: createInitialBoard(),
  currentPlayer: 'dark',
  selectedPiece: null,
  legalMoves: [],
  gamePhase: 'playing',
  winner: null,
  moveHistory: [],
  moveCount: 0,
  lastMove: null,
  forcedCapture: false
};

// Main Checkers Component
const CheckersLux: React.FC<CheckersLuxProps> = ({
  isMultiplayer = false,
  syncedGameState,
  onUpdateGameState,
  onBack,
  playerIndex = 0,
  isSpectator = false
}) => {
  const [localState, setLocalState] = useState<GameState>(defaultGameState);

  const gameState = isMultiplayer && syncedGameState ? syncedGameState : localState;
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

  const ourColor: 'dark' | 'light' = playerIndex === 0 ? 'dark' : 'light';
  const isOurTurn = gameState.currentPlayer === ourColor;
  const canInteract = isMultiplayer ? (isOurTurn && !isSpectator) : true;

  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>(AI_DIFFICULTIES[1]);
  const [isAIGame, setIsAIGame] = useState<boolean>(!isMultiplayer);
  const [showHints, setShowHints] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isAITurn, setIsAITurn] = useState<boolean>(false);

  // Calculate legal moves when game state changes
  useEffect(() => {
    const legalMoves = getAllLegalMoves(gameState.pieces, gameState.currentPlayer);
    const hasForcedCapture = legalMoves.some(move => move.captures.length > 0);
    
    setGameState(prev => ({
      ...prev,
      legalMoves,
      forcedCapture: hasForcedCapture
    }));

    // Check for game over
    if (legalMoves.length === 0) {
      setGameState(prev => ({
        ...prev,
        gamePhase: 'gameOver',
        winner: prev.currentPlayer === 'dark' ? 'light' : 'dark'
      }));
    }
  }, [gameState.pieces, gameState.currentPlayer, setGameState]);

  const makeMove = useCallback((move: Move) => {
    setGameState(prev => {
      const newPieces = executeMove(prev.pieces, move);
      const newMoveHistory = [...prev.moveHistory, move];
      
      return {
        ...prev,
        pieces: newPieces,
        currentPlayer: prev.currentPlayer === 'dark' ? 'light' : 'dark',
        selectedPiece: null,
        legalMoves: [],
        moveHistory: newMoveHistory,
        moveCount: prev.moveCount + 1,
        lastMove: move
      };
    });
  }, [setGameState]);

  // AI turn handling (skip in multiplayer)
  useEffect(() => {
    if (isMultiplayer || !isAIGame) return;
    if (gameState.currentPlayer === 'light' && gameState.gamePhase === 'playing' && !isAITurn) {
      setIsAITurn(true);
      const timer = window.setTimeout(() => {
        const aiMove = getBestMove(gameState.pieces, 'light', aiDifficulty);
        if (aiMove) {
          makeMove(aiMove);
        }
        setIsAITurn(false);
      }, AI_DELAY);
      return () => window.clearTimeout(timer);
    }
  }, [isMultiplayer, gameState.currentPlayer, gameState.gamePhase, gameState.pieces, isAIGame, aiDifficulty, isAITurn, makeMove]);

  const handlePieceClick = useCallback((piece: Piece) => {
    if (gameState.gamePhase !== 'playing' || isAITurn || !canInteract) return;
    if (piece.color !== gameState.currentPlayer) return;

    setGameState(prev => ({
      ...prev,
      selectedPiece: piece,
      legalMoves: getAllLegalMoves(prev.pieces, prev.currentPlayer)
        .filter(move => move.from.row === piece.position.row && move.from.col === piece.position.col)
    }));
  }, [gameState.gamePhase, gameState.currentPlayer, isAITurn, canInteract, setGameState]);

  const handleSquareClick = useCallback((position: Position) => {
    if (!gameState.selectedPiece || gameState.gamePhase !== 'playing' || isAITurn || !canInteract) return;

    const legalMove = gameState.legalMoves.find(move => 
      move.to.row === position.row && move.to.col === position.col
    );

    if (legalMove) {
      makeMove(legalMove);
    }
  }, [gameState.selectedPiece, gameState.legalMoves, gameState.gamePhase, isAITurn, canInteract, makeMove]);

  const resetGame = useCallback(() => {
    setGameState({
      pieces: createInitialBoard(),
      currentPlayer: 'dark',
      selectedPiece: null,
      legalMoves: [],
      gamePhase: 'playing',
      winner: null,
      moveHistory: [],
      moveCount: 0,
      lastMove: null,
      forcedCapture: false
    });
    setIsAITurn(false);
  }, [setGameState]);

  const getHint = useCallback(() => {
    if (gameState.gamePhase !== 'playing' || isAITurn) return;
    
    const legalMoves = getAllLegalMoves(gameState.pieces, gameState.currentPlayer);
    if (legalMoves.length === 0) return;

    // Find a good move (prioritize captures)
    const captureMoves = legalMoves.filter(move => move.captures.length > 0);
    const bestMove = captureMoves.length > 0 ? captureMoves[0] : legalMoves[0];

    setGameState(prev => ({
      ...prev,
      selectedPiece: prev.pieces.find(p => 
        p.position.row === bestMove.from.row && p.position.col === bestMove.from.col
      ) || null,
      legalMoves: [bestMove]
    }));
  }, [gameState.gamePhase, gameState.pieces, gameState.currentPlayer, isAITurn, setGameState]);

  const renderBoard = () => {
    const board = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const position = { row, col };
        const isDark = isDarkSquare(row, col);
        const piece = getPieceAtPosition(gameState.pieces, position);
        const isSelected = gameState.selectedPiece?.id === piece?.id;
        const isLegalMove = gameState.legalMoves.some(move => 
          move.to.row === row && move.to.col === col
        );
        const isLastMove = !!(gameState.lastMove && 
          (gameState.lastMove.to.row === row && gameState.lastMove.to.col === col));

        board.push(
          <BoardSquare
            key={`${row}-${col}`}
            position={position}
            isDark={isDark}
            isSelected={isSelected}
            isLegalMove={isLegalMove}
            isLastMove={isLastMove}
            onClick={() => handleSquareClick(position)}
          >
            {piece && (
              <CheckerPiece
                piece={piece}
                isSelected={isSelected}
                onClick={() => handlePieceClick(piece)}
              />
            )}
          </BoardSquare>
        );
      }
    }

    return board;
  };

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
              CheckersLux {isMultiplayer && '(Multiplayer)'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {showHints && (
              <button
                onClick={getHint}
                className="game-icon-button bg-emerald text-white"
                disabled={isAITurn}
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
              <h3 className="text-lg font-semibold text-champagne">Current Player</h3>
              <p className="text-2xl font-bold text-ivory capitalize">
                {gameState.currentPlayer} {isAITurn && '(AI Thinking...)'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Move Count</h3>
              <p className="text-2xl font-bold text-ivory">{gameState.moveCount}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Game Mode</h3>
              <p className="text-xl font-bold text-ivory">
                {isMultiplayer ? `Multiplayer (You: ${ourColor})` : isAIGame ? `vs AI (${aiDifficulty.name})` : '2 Players'}
              </p>
            </div>
            {gameState.forcedCapture && (
              <div className="bg-red-600 text-white px-3 py-1 rounded-lg">
                Forced Capture!
              </div>
            )}
          </div>
        </div>

        {/* Game Board */}
        <div className="flex justify-center mb-6">
          <div 
            className="grid grid-cols-8 border-4 border-champagne rounded-lg overflow-hidden shadow-2xl"
            style={{ width: BOARD_SIZE * SQUARE_SIZE, height: BOARD_SIZE * SQUARE_SIZE }}
          >
            {renderBoard()}
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={resetGame}
            className="game-primary-action"
          >
            New Game
          </button>
          <button
            onClick={() => setIsAIGame(!isAIGame)}
            className="game-success-action"
          >
            {isAIGame ? 'Switch to 2 Players' : 'Switch to AI'}
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

        {/* Game Status */}
        {gameState.gamePhase === 'gameOver' && (
          <div className="bg-onyxLight rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-champagne mb-2">Game Over!</h2>
            <p className="text-xl text-ivory mb-4">
              {gameState.winner} wins!
            </p>
            <button
              onClick={resetGame}
              className="game-primary-action"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Move History */}
        {gameState.moveHistory.length > 0 && (
          <div className="game-panel">
            <h3 className="text-lg font-semibold text-champagne mb-2">Move History</h3>
            <div className="bg-onyx rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="text-sm text-ivory">
                {gameState.moveHistory.map((move, index) => (
                  <div key={index} className="mb-1">
                    {index + 1}. {move.from.row},{move.from.col} → {move.to.row},{move.to.col}
                    {move.captures.length > 0 && ` (captures: ${move.captures.length})`}
                    {move.promotes && ' (promotes)'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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

export default CheckersLux;
