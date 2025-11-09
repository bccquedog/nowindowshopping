import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFirestore, doc, setDoc, onSnapshot, collection, addDoc, serverTimestamp, query, orderBy, limit, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';

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
  gameType: 'blackjack' | 'checkers' | 'tycoon' | 'spades' | '5000';
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
  };
}

interface MultiplayerContextType {
  // Room Management
  currentRoom: GameRoom | null;
  availableRooms: GameRoom[];
  createRoom: (gameType: string, settings: any) => Promise<string>;
  joinRoom: (roomId: string, password?: string) => Promise<boolean>;
  leaveRoom: () => void;
  
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
  
  // Connection
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
}

interface ChatMessage {
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

export const MultiplayerProvider: React.FC<MultiplayerProviderProps> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<GameRoom | null>(null);
  const [availableRooms, setAvailableRooms] = useState<GameRoom[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [gameState, setGameState] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');

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
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.isStarted && data.players.length < data.maxPlayers) {
          rooms.push({
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
              timeLimit: undefined,
              customRules: undefined
            }
          });
        }
      });
      setAvailableRooms(rooms);
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
            timeLimit: undefined,
            customRules: undefined
          }
        });
        setGameState(data.gameState);
      }
    });

    return () => unsubscribe();
  }, [currentRoom?.id]);

  // Listen for chat messages
  useEffect(() => {
    if (!currentRoom) return;

    const messagesQuery = query(
      collection(db, 'gameRooms', currentRoom.id, 'messages'),
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        newMessages.push({
          id: doc.id,
          playerId: data.playerId || '',
          playerName: data.playerName || 'Unknown',
          message: data.message || '',
          timestamp: data.timestamp?.toDate() || new Date(),
          type: data.type || 'chat'
        });
      });
      setMessages(newMessages.reverse());
    });

    return () => unsubscribe();
  }, [currentRoom?.id]);

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
      password: settings.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: {
        aiDifficulty: settings.aiDifficulty || 'Standard',
        timeLimit: settings.timeLimit,
        customRules: settings.customRules
      }
    };

    await setDoc(doc(db, 'gameRooms', roomId), room);
    setCurrentRoom(room);
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

    if (roomData.players.length >= roomData.maxPlayers) {
      throw new Error('Room is full');
    }

    if (roomData.isStarted) {
      throw new Error('Game already started');
    }

    // Add player to room
    const updatedPlayers = [...roomData.players, {
      ...currentPlayer,
      isReady: false
    }];

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
    setIsConnected(true);
    setConnectionStatus('connected');

    return true;
  }, [currentPlayer]);

  // Leave current room
  const leaveRoom = useCallback(async () => {
    if (!currentRoom || !currentPlayer) return;

    const roomRef = doc(db, 'gameRooms', currentRoom.id);
    const updatedPlayers = currentRoom.players.filter(p => p.id !== currentPlayer.id);

    if (updatedPlayers.length === 0) {
      // Delete room if empty
      await setDoc(roomRef, { deleted: true });
    } else {
      // Update room
      await setDoc(roomRef, {
        ...currentRoom,
        players: updatedPlayers,
        updatedAt: new Date()
      });
    }

    setCurrentRoom(null);
    setGameState(null);
    setMessages([]);
    setIsConnected(false);
    setConnectionStatus('disconnected');
  }, [currentRoom, currentPlayer]);

  // Update player status
  const updatePlayerStatus = useCallback(async (status: Partial<Player>) => {
    if (!currentRoom || !currentPlayer) return;

    const roomRef = doc(db, 'gameRooms', currentRoom.id);
    const updatedPlayers = currentRoom.players.map(p => 
      p.id === currentPlayer.id ? { ...p, ...status } : p
    );

    await setDoc(roomRef, {
      ...currentRoom,
      players: updatedPlayers,
      updatedAt: new Date()
    });

    setCurrentPlayer(prev => prev ? { ...prev, ...status } : null);
  }, [currentRoom, currentPlayer]);

  // Update game state
  const updateGameState = useCallback(async (newState: any) => {
    if (!currentRoom) return;

    const roomRef = doc(db, 'gameRooms', currentRoom.id);
    await setDoc(roomRef, {
      ...currentRoom,
      gameState: newState,
      updatedAt: new Date()
    });
  }, [currentRoom]);

  // Send game action
  const sendGameAction = useCallback(async (action: string, data: any) => {
    if (!currentRoom || !currentPlayer) return;

    await addDoc(collection(db, 'gameRooms', currentRoom.id, 'actions'), {
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      action,
      data,
      timestamp: serverTimestamp()
    });
  }, [currentRoom, currentPlayer]);

  // Send chat message
  const sendMessage = useCallback(async (message: string) => {
    if (!currentRoom || !currentPlayer) return;

    await addDoc(collection(db, 'gameRooms', currentRoom.id, 'messages'), {
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      message,
      timestamp: serverTimestamp(),
      type: 'chat'
    });
  }, [currentRoom, currentPlayer]);

  const value: MultiplayerContextType = {
    currentRoom,
    availableRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    currentPlayer,
    updatePlayerStatus,
    gameState,
    updateGameState,
    sendGameAction,
    messages,
    sendMessage,
    isConnected,
    connectionStatus
  };

  return (
    <MultiplayerContext.Provider value={value}>
      {children}
    </MultiplayerContext.Provider>
  );
};
