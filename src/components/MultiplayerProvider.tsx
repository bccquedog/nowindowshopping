import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getFirestore, doc, setDoc, updateDoc, onSnapshot, collection, addDoc, query, orderBy, limit, getDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { useRoomChat } from '../hooks/use-room-chat';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Types
interface Player {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  isOnline: boolean;
  lastSeen: Date;
  color?: string;
  avatar?: string;
}

interface GameRoom {
  id: string;
  gameType: 'blackjack' | 'checkers' | 'tycoon' | 'spades' | '5000' | 'holdem';
  players: Player[];
  maxPlayers: number;
  gameState: any;
  isStarted: boolean;
  isPrivate: boolean;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  settings: {
    aiDifficulty: string;
    timeLimit?: number;
    customRules?: any;
    allowSpectators?: boolean;
    maxSpectators?: number;
    humanOnly?: boolean;
  };
}

interface MultiplayerContextType {
  // Room Management
  currentRoom: GameRoom | null;
  availableRooms: GameRoom[];
  viewingRooms: GameRoom[];
  createRoom: (gameType: string, settings: any) => Promise<string>;
  joinRoom: (roomId: string, password?: string) => Promise<boolean>;
  joinAsSpectator: (roomId: string, password?: string) => Promise<boolean>;
  startGame: (initialGameState: any) => Promise<void>;
  leaveRoom: () => void;
  leaveSpectator: () => void;
  isSpectator: boolean;
  
  // Player Management
  currentPlayer: Player | null;
  updatePlayerStatus: (status: Partial<Player>) => void;
  
  // Game State
  gameState: any;
  updateGameState: (newState: any) => void;
  sendGameAction: (action: string, data: any) => void;
  
  // Chat
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
  sendSystemMessage: (message: string) => void;
  
  // Connection
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
}

/** Chat message shape for UI - maps from canonical MessageRecord */
export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: Date;
  type: 'chat' | 'system' | 'game';
}

const MultiplayerContext = createContext<MultiplayerContextType | undefined>(undefined);

export const useMultiplayer = () => {
  const context = useContext(MultiplayerContext);
  if (!context) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }
  return context;
};

interface MultiplayerProviderProps {
  children: React.ReactNode;
}

/** Map canonical MessageRecord to ChatMessage for UI compatibility */
function toChatMessage(record: { id: string; senderId: string; senderName?: string; kind: string; content: string; createdAt: Date }): ChatMessage {
  const type = record.kind === 'text' ? 'chat' : (record.kind as 'system' | 'game');
  return {
    id: record.id,
    playerId: record.senderId,
    playerName: record.senderName ?? 'Unknown',
    message: record.content,
    timestamp: record.createdAt,
    type: type === 'chat' || type === 'system' || type === 'game' ? type : 'chat',
  };
}

export const MultiplayerProvider: React.FC<MultiplayerProviderProps> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<GameRoom | null>(null);
  const [availableRooms, setAvailableRooms] = useState<GameRoom[]>([]);
  const [viewingRooms, setViewingRooms] = useState<GameRoom[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [gameState, setGameState] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [isSpectator, setIsSpectator] = useState(false);

  const roomChat = useRoomChat({
    roomId: currentRoom?.id ?? null,
    sender: currentPlayer ? { id: currentPlayer.id, name: currentPlayer.name } : null,
    messageLimit: 100,
  });

  const messages = useMemo(
    () => roomChat.messages.map(toChatMessage),
    [roomChat.messages]
  );

  // Generate unique player ID
  const generatePlayerId = useCallback(() => {
    return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Initialize player
  useEffect(() => {
    const playerId = localStorage.getItem('playerId') || generatePlayerId();
    const playerName = localStorage.getItem('playerName') || `Player_${Math.floor(Math.random() * 1000)}`;
    
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('playerName', playerName);
    
    setCurrentPlayer({
      id: playerId,
      name: playerName,
      isHost: false,
      isReady: false,
      isOnline: true,
      lastSeen: new Date()
    });
  }, [generatePlayerId]);

  // Listen for available rooms
  useEffect(() => {
    const roomsQuery = query(
      collection(db, 'gameRooms'),
      orderBy('updatedAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(roomsQuery, (snapshot) => {
      const rooms: GameRoom[] = [];
      const viewing: GameRoom[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const room: GameRoom = {
          id: docSnap.id,
          gameType: data.gameType || 'blackjack',
          players: data.players || [],
          maxPlayers: data.maxPlayers || 4,
          gameState: data.gameState || {},
          isStarted: data.isStarted || false,
          isPrivate: data.isPrivate || false,
          password: data.password,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          settings: data.settings || {
            aiDifficulty: 'Standard',
            timeLimit: null,
            customRules: null,
            allowSpectators: true,
            maxSpectators: 20,
            humanOnly: true
          }
        };
        if (!data.deleted) {
          if (!data.isStarted && data.players.length < data.maxPlayers) {
            rooms.push(room);
          } else if (data.isStarted && (data.settings?.allowSpectators !== false)) {
            viewing.push(room);
          }
        }
      });
      setAvailableRooms(rooms);
      setViewingRooms(viewing);
    });

    return () => unsubscribe();
  }, []);

  // Listen for room updates
  useEffect(() => {
    if (!currentRoom) return;

    const roomRef = doc(db, 'gameRooms', currentRoom.id);
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setCurrentRoom({
          id: doc.id,
          gameType: data.gameType || 'blackjack',
          players: data.players || [],
          maxPlayers: data.maxPlayers || 4,
          gameState: data.gameState || {},
          isStarted: data.isStarted || false,
          isPrivate: data.isPrivate || false,
          password: data.password,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          settings: data.settings || {
            aiDifficulty: 'Standard',
            timeLimit: null,
            customRules: null,
            allowSpectators: true,
            maxSpectators: 20,
            humanOnly: true
          }
        });
        setGameState(data.gameState);
        if (currentPlayer) {
          const syncedPlayer = (data.players || []).find((p: Player) => p.id === currentPlayer.id);
          if (syncedPlayer) {
            setCurrentPlayer(prev => prev ? { ...prev, ...syncedPlayer } : prev);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [currentRoom?.id, currentPlayer]);

  // Create a new room
  const createRoom = useCallback(async (gameType: string, settings: any): Promise<string> => {
    if (!currentPlayer) throw new Error('Player not initialized');

    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const room: GameRoom = {
      id: roomId,
      gameType: gameType as any,
      players: [{
        ...currentPlayer,
        isHost: true,
        isReady: true
      }],
      maxPlayers: settings.maxPlayers || 4,
      gameState: null,
      isStarted: false,
      isPrivate: settings.isPrivate || false,
      password: settings.password ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: {
        aiDifficulty: settings.aiDifficulty || 'Standard',
        timeLimit: settings.timeLimit ?? null,
        customRules: settings.customRules ?? null,
        allowSpectators: settings.allowSpectators !== false,
        maxSpectators: settings.maxSpectators ?? 20,
        humanOnly: settings.humanOnly !== false
      }
    };

    await setDoc(doc(db, 'gameRooms', roomId), room);
    setCurrentRoom(room);
    setCurrentPlayer(prev => prev ? { ...prev, isHost: true, isReady: true } : prev);
    setIsConnected(true);
    setConnectionStatus('connected');

    return roomId;
  }, [currentPlayer]);

  // Join an existing room
  const joinRoom = useCallback(async (roomId: string, password?: string): Promise<boolean> => {
    if (!currentPlayer) throw new Error('Player not initialized');

    const roomRef = doc(db, 'gameRooms', roomId);
    const roomDoc = await getDoc(roomRef);

    if (!roomDoc.exists()) {
      throw new Error('Room not found');
    }

    const roomData = roomDoc.data() as GameRoom;
    
    if (roomData.isPrivate && roomData.password !== password) {
      throw new Error('Incorrect password');
    }

    if (roomData.isStarted) {
      throw new Error('Game already started');
    }

    const existingPlayer = roomData.players.find((p: Player) => p.id === currentPlayer.id);
    if (!existingPlayer && roomData.players.length >= roomData.maxPlayers) {
      throw new Error('Room is full');
    }
    const updatedPlayers = existingPlayer
      ? roomData.players.map((p: Player) =>
          p.id === currentPlayer.id ? { ...p, ...currentPlayer, isOnline: true } : p
        )
      : [...roomData.players, { ...currentPlayer, isReady: false }];

    await setDoc(roomRef, {
      ...roomData,
      players: updatedPlayers,
      updatedAt: new Date()
    });

    setCurrentRoom({
      ...roomData,
      players: updatedPlayers,
      updatedAt: new Date()
    });
    setCurrentPlayer(prev => prev ? { ...prev, isHost: !!existingPlayer?.isHost, isReady: !!existingPlayer?.isReady } : prev);
    setIsConnected(true);
    setConnectionStatus('connected');

    return true;
  }, [currentPlayer]);

  // Join as spectator (watch in-progress game)
  const joinAsSpectator = useCallback(async (roomId: string, password?: string): Promise<boolean> => {
    if (!currentPlayer) throw new Error('Player not initialized');

    const roomRef = doc(db, 'gameRooms', roomId);
    const roomDoc = await getDoc(roomRef);

    if (!roomDoc.exists()) {
      throw new Error('Room not found');
    }

    const roomData = roomDoc.data();
    if (roomData.deleted) throw new Error('Room not found');

    if (roomData.isPrivate && roomData.password !== password) {
      throw new Error('Incorrect password');
    }

    if (!roomData.isStarted) {
      throw new Error('Game has not started yet. Join as a player instead.');
    }

    if (roomData.settings?.allowSpectators === false) {
      throw new Error('This room does not allow spectators');
    }

    const room: GameRoom = {
      id: roomDoc.id,
      gameType: roomData.gameType || 'blackjack',
      players: roomData.players || [],
      maxPlayers: roomData.maxPlayers || 4,
      gameState: roomData.gameState || {},
      isStarted: true,
      isPrivate: roomData.isPrivate || false,
      password: roomData.password,
      createdAt: roomData.createdAt?.toDate() || new Date(),
      updatedAt: roomData.updatedAt?.toDate() || new Date(),
      settings: roomData.settings || {
        aiDifficulty: 'Standard',
        timeLimit: null,
        customRules: null,
        allowSpectators: true,
        maxSpectators: 20,
        humanOnly: true
      }
    };

    setCurrentRoom(room);
    setGameState(roomData.gameState);
    setIsSpectator(true);
    setIsConnected(true);
    setConnectionStatus('connected');

    return true;
  }, [currentPlayer]);

  // Start game (host only) - marks room as started and sets initial game state
  const startGame = useCallback(async (initialGameState: any) => {
    if (!currentRoom || !currentPlayer || isSpectator) return;
    const roomPlayer = currentRoom.players.find((p) => p.id === currentPlayer.id);
    if (!roomPlayer?.isHost) return;

    const roomRef = doc(db, 'gameRooms', currentRoom.id);
    await updateDoc(roomRef, {
      isStarted: true,
      gameState: initialGameState,
      updatedAt: new Date()
    });

    roomChat.sendSystemMessage('Game started!');
    setCurrentRoom((prev) => prev ? { ...prev, isStarted: true, gameState: initialGameState } : null);
    setGameState(initialGameState);
  }, [currentRoom, currentPlayer, isSpectator, roomChat]);

  // Leave spectator mode
  const leaveSpectator = useCallback(() => {
    setCurrentRoom(null);
    setGameState(null);
    setIsSpectator(false);
    setIsConnected(false);
    setConnectionStatus('disconnected');
  }, []);

  // Leave current room
  const leaveRoom = useCallback(async () => {
    if (!currentRoom || !currentPlayer) return;
    if (isSpectator) {
      leaveSpectator();
      return;
    }

    const roomRef = doc(db, 'gameRooms', currentRoom.id);
    const updatedPlayers = currentRoom.players.filter(p => p.id !== currentPlayer.id);

    if (updatedPlayers.length === 0) {
      // Delete room if empty
      await setDoc(roomRef, { deleted: true });
    } else {
      const hasHost = updatedPlayers.some(p => p.isHost);
      const playersWithHost = hasHost
        ? updatedPlayers
        : updatedPlayers.map((p, index) => ({ ...p, isHost: index === 0 }));
      // Update room
      await updateDoc(roomRef, {
        players: playersWithHost,
        updatedAt: new Date()
      });
    }

    setCurrentRoom(null);
    setGameState(null);
    setIsConnected(false);
    setConnectionStatus('disconnected');
  }, [currentRoom, currentPlayer, isSpectator, leaveSpectator]);

  // Update player status
  const updatePlayerStatus = useCallback(async (status: Partial<Player>) => {
    if (!currentRoom || !currentPlayer) return;

    const roomRef = doc(db, 'gameRooms', currentRoom.id);
    const updatedPlayers = currentRoom.players.map(p => 
      p.id === currentPlayer.id ? { ...p, ...status } : p
    );

    await updateDoc(roomRef, {
      players: updatedPlayers,
      updatedAt: new Date()
    });

    setCurrentPlayer(prev => prev ? { ...prev, ...status } : null);
  }, [currentRoom, currentPlayer]);

  // Update game state
  const updateGameState = useCallback(async (newState: any) => {
    if (!currentRoom || isSpectator) return;

    const roomRef = doc(db, 'gameRooms', currentRoom.id);
    await updateDoc(roomRef, {
      gameState: newState,
      updatedAt: new Date()
    });
  }, [currentRoom, isSpectator]);

  // Send game action
  const sendGameAction = useCallback(async (action: string, data: any) => {
    if (!currentRoom || !currentPlayer || isSpectator) return;

    await addDoc(collection(db, 'gameRooms', currentRoom.id, 'actions'), {
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      action,
      data,
      timestamp: serverTimestamp()
    });
  }, [currentRoom, currentPlayer, isSpectator]);

  // Send chat message (delegates to messaging layer)
  const sendMessage = useCallback(async (message: string) => {
    const result = await roomChat.sendMessage(message, 'text');
    if (!result.success && result.error) {
      console.warn('[MultiplayerProvider] sendMessage failed:', result.error);
    }
  }, [roomChat]);

  const sendSystemMessage = useCallback(async (message: string) => {
    if (!currentRoom) return;
    const result = await roomChat.sendSystemMessage(message);
    if (!result.success && result.error) {
      console.warn('[MultiplayerProvider] sendSystemMessage failed:', result.error);
    }
  }, [roomChat, currentRoom]);

  const value: MultiplayerContextType = {
    currentRoom,
    availableRooms,
    viewingRooms,
    createRoom,
    joinRoom,
    joinAsSpectator,
    startGame,
    leaveRoom,
    leaveSpectator,
    isSpectator,
    currentPlayer,
    updatePlayerStatus,
    gameState,
    updateGameState,
    sendGameAction,
    messages,
    sendMessage,
    sendSystemMessage,
    isConnected,
    connectionStatus
  };

  return (
    <MultiplayerContext.Provider value={value}>
      {children}
    </MultiplayerContext.Provider>
  );
};
