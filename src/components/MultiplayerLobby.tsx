import React, { useState, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMultiplayer } from './MultiplayerProvider';
import {
  getInitialCheckersState,
  getInitialTycoonState,
  getInitialBlackjackState,
  getInitialFiveThousandState,
  getInitialSpadesState,
  getInitialHoldemState
} from '../multiplayer/gameInitializers';
import MultiplayerGameWrapper from './MultiplayerGameWrapper';
import VideoChat from './VideoChat';
import { generateRoomUrl } from '../config/videoConfig';
import {
  FaUsers,
  FaPlay,
  FaPlus,
  FaArrowLeft,
  FaCrown,
  FaClock,
  FaCheck
} from 'react-icons/fa6';

interface MultiplayerLobbyProps {
  gameType?: string;
  onStartGame?: () => void;
  onBack: () => void;
}

const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({
  gameType: gameTypeProp,
  onStartGame,
  onBack
}) => {
  const { gameType: gameTypeParam } = useParams<{ gameType: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const gameType = gameTypeParam || gameTypeProp || '';

  const {
    currentRoom,
    availableRooms,
    viewingRooms,
    currentPlayer,
    createRoom,
    joinRoom,
    joinAsSpectator,
    startGame,
    leaveRoom,
    leaveSpectator,
    isSpectator,
    gameState,
    messages,
    sendMessage,
    updatePlayerStatus,
    isConnected
  } = useMultiplayer();

  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [roomSettings, setRoomSettings] = useState({
    maxPlayers: 4,
    isPrivate: false,
    password: '',
    aiDifficulty: 'Standard',
    timeLimit: 0,
    allowSpectators: true,
    maxSpectators: 20,
    humanOnly: true
  });
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [showJoinSpectator, setShowJoinSpectator] = useState(false);
  const [spectatorRoomId, setSpectatorRoomId] = useState('');
  const [spectatorPassword, setSpectatorPassword] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [error, setError] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [roomFilter, setRoomFilter] = useState<'all' | 'human' | 'ai'>('all');

  const gameTypeNames = {
    blackjack: 'BlackjackLux',
    checkers: 'CheckersLux',
    tycoon: 'Tycoon',
    spades: 'NWS Spades',
    '5000': '5000 NWS',
    holdem: 'HoldemLux'
  };
  const multiplayerSupported = ['blackjack', 'checkers', 'tycoon', '5000', 'holdem', 'spades'].includes(gameType);

  const handleCreateRoom = async () => {
    try {
      setError('');
      await createRoom(gameType, roomSettings);
      setShowCreateRoom(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create room');
    }
  };

  const handleJoinRoom = async () => {
    try {
      setError('');
      await joinRoom(joinRoomId, joinPassword || undefined);
      setShowJoinRoom(false);
      setJoinRoomId('');
      setJoinPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join room');
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await leaveRoom();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to leave room');
    }
  };

  const handleJoinSpectator = async () => {
    try {
      setError('');
      await joinAsSpectator(spectatorRoomId, spectatorPassword || undefined);
      setShowJoinSpectator(false);
      setSpectatorRoomId('');
      setSpectatorPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join viewing room');
    }
  };

  const handleSendChat = () => {
    if (chatInput.trim()) {
      sendMessage(chatInput.trim());
      setChatInput('');
    }
  };

  const handleReadyToggle = async () => {
    if (!currentPlayer) return;
    const inRoomPlayer = currentRoom?.players.find((p) => p.id === currentPlayer.id);
    await updatePlayerStatus({ isReady: !(inRoomPlayer?.isReady ?? currentPlayer.isReady) });
  };

  const isHumanOnly = currentRoom?.settings?.humanOnly !== false;
  const currentPlayerInRoom = currentRoom?.players.find((p) => p.id === currentPlayer?.id);
  const isCurrentPlayerHost = !!currentPlayerInRoom?.isHost;
  const isCurrentPlayerReady = !!currentPlayerInRoom?.isReady;
  const canStartGame = currentRoom?.players.every(p => p.isReady) &&
                      isCurrentPlayerHost &&
                      (isHumanOnly ? currentRoom.players.length >= 2 : currentRoom.players.length >= 1);

  const shareLink = currentRoom
    ? `${window.location.origin}/multiplayer/${gameType}?room=${currentRoom.id}`
    : '';

  const handleCopyShareLink = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setError('Could not copy link');
    }
  };

  useEffect(() => {
    const roomId = searchParams.get('room');
    const spectate = searchParams.get('spectate');
    if (roomId && !currentRoom) {
      if (spectate === '1' || spectate === 'true') {
        setSpectatorRoomId(roomId);
        setShowJoinSpectator(true);
      } else {
        setJoinRoomId(roomId);
        setShowJoinRoom(true);
      }
    }
  }, [searchParams, currentRoom]);

  const handleStartGame = async () => {
    if (!currentRoom || !canStartGame) return;
    const humanCount = currentRoom.players.length;
    const humanOnly = currentRoom.settings?.humanOnly !== false;
    const numPlayers = humanOnly ? humanCount : currentRoom.maxPlayers;
    const aiIndices = humanOnly ? [] : Array.from({ length: currentRoom.maxPlayers - humanCount }, (_, i) => humanCount + i);
    let initialState: any;
    switch (gameType) {
      case 'checkers':
        initialState = getInitialCheckersState();
        break;
      case 'tycoon':
        initialState = getInitialTycoonState(numPlayers, aiIndices);
        break;
      case 'blackjack':
        initialState = getInitialBlackjackState(numPlayers, aiIndices);
        break;
      case '5000':
        initialState = getInitialFiveThousandState(numPlayers, aiIndices);
        break;
      case 'spades':
        initialState = getInitialSpadesState(numPlayers, aiIndices);
        break;
      case 'holdem':
        initialState = getInitialHoldemState(numPlayers, aiIndices);
        break;
      default:
        initialState = {};
    }
    if (initialState?.players && Array.isArray(initialState.players)) {
      currentRoom.players.forEach((roomPlayer, i) => {
        if (initialState.players[i]) {
          initialState.players[i] = { ...initialState.players[i], id: roomPlayer.id, name: roomPlayer.name, isAI: false };
        }
      });
    }
    await startGame(initialState);
    onStartGame?.();
  };

  const filteredRooms = availableRooms.filter(room => {
    if (room.gameType !== gameType || room.id === currentRoom?.id) return false;
    if (roomFilter === 'human' && room.settings?.humanOnly === false) return false;
    if (roomFilter === 'ai' && room.settings?.humanOnly !== false) return false;
    return true;
  });

  const filteredViewingRooms = viewingRooms.filter(room => 
    room.gameType === gameType
  );

  if (!multiplayerSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-onyx to-onyxLight text-ivory p-8">
        <div className="max-w-2xl mx-auto bg-onyxLight rounded-2xl p-8 border border-champagne/20">
          <h1 className="text-3xl font-bold text-champagne mb-3">
            {gameTypeNames[gameType as keyof typeof gameTypeNames] || 'This game'} multiplayer is not live yet
          </h1>
          <p className="text-ivory/80 mb-6">
            This game route exists, but full multiplayer gameplay is not implemented yet. Please use Blackjack, Checkers, Tycoon, 5000, or Holdem for real-time multiplayer sessions.
          </p>
          <button
            onClick={onBack}
            className="px-5 py-3 rounded-lg bg-emerald text-white font-semibold hover:bg-emeraldLight transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Game in progress - render the game with real-time sync
  if (currentRoom?.isStarted && !isSpectator) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-onyx flex items-center justify-center">
          <div className="text-champagne">Loading game...</div>
        </div>
      }>
        <MultiplayerGameWrapper gameType={gameType} onBack={onBack} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-onyx to-onyxLight text-ivory">
      {/* Header */}
      <div className="bg-onyxLight border-b border-champagne/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-3 rounded-lg bg-onyxLight text-champagne hover:bg-emerald transition-colors"
            >
              <FaArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-champagne">
                {gameTypeNames[gameType as keyof typeof gameTypeNames]} - Multiplayer
              </h1>
              <p className="text-ivory/80">Join or create a game room</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
                            <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-sm text-ivory/60">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 text-red-400"
            >
              {error}
            </motion.div>
          )}

          {!currentRoom ? (
            // Room Selection
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Available Rooms */}
              <div className="bg-onyxLight rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-champagne">Available Rooms</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-lg overflow-hidden border border-champagne/20">
                      {(['all', 'human', 'ai'] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setRoomFilter(f)}
                          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                            roomFilter === f
                              ? 'bg-champagne text-onyx'
                              : 'bg-onyx/80 text-ivory/80 hover:bg-champagne/20'
                          }`}
                        >
                          {f === 'all' ? 'All' : f === 'human' ? 'Human Only' : 'AI'}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowJoinRoom(true)}
                      className="px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emeraldLight transition-colors"
                    >
                      Join Room
                    </button>
                  </div>
                </div>

                {filteredRooms.length === 0 ? (
                  <div className="text-center py-8 text-ivory/60">
                    <FaUsers className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No available rooms</p>
                    <p className="text-sm">Create a new room to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRooms.map((room) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-onyx rounded-lg p-4 border border-champagne/20 hover:border-champagne/40 transition-colors cursor-pointer"
                        onClick={() => {
                          setJoinRoomId(room.id);
                          setShowJoinRoom(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center flex-wrap gap-2 mb-2">
                              <span className="font-semibold text-champagne">
                                Room {room.id.slice(-6)}
                              </span>
                              {room.settings?.humanOnly !== false ? (
                                <span className="px-2 py-0.5 rounded text-xs bg-emerald/20 text-emerald-300 border border-emerald/30">Human Only</span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-xs bg-amber-600/20 text-amber-300 border border-amber-500/30">AI Allowed</span>
                              )}
                              {room.isPrivate && <span className="text-ivory/60">🔒</span>}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-ivory/70">
                              <span>{room.players.length}/{room.maxPlayers} players</span>
                              <span>• {room.settings.aiDifficulty}</span>
                              <span>• {new Date(room.createdAt).toLocaleTimeString()}</span>
                            </div>
                          </div>
                          <FaPlay className="w-5 h-5 text-emerald" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Create Room */}
              <div className="bg-onyxLight rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-champagne">Create New Room</h2>
                  <button
                    onClick={() => setShowCreateRoom(true)}
                    className="px-4 py-2 bg-champagne text-onyx font-bold rounded-lg hover:bg-champagneLight transition-colors"
                  >
                    <FaPlus className="w-4 h-4 inline mr-2" />
                    Create Room
                  </button>
                </div>

                <div className="space-y-4 text-ivory/80">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="w-5 h-5 text-champagne" />
                    <span>2–9 players per room (real-time)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers className="w-5 h-5 text-champagne" />
                    <span>Viewing rooms for spectators</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-champagne">🔒</span>
                    <span>Private rooms with password protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock className="w-5 h-5 text-champagne" />
                    <span>Custom time limits and rules</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCrown className="w-5 h-5 text-champagne" />
                    <span>Host controls and game management</span>
                  </div>
                </div>
              </div>

              {/* Viewing Rooms - games in progress */}
              <div className="lg:col-span-2 bg-onyxLight rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-champagne flex items-center gap-2">
                    <FaUsers className="w-6 h-6" />
                    Viewing Rooms
                  </h2>
                </div>
                <p className="text-ivory/70 text-sm mb-4">
                  Watch games in progress (read-only + chat)
                </p>
                {filteredViewingRooms.length === 0 ? (
                  <div className="text-center py-8 text-ivory/60">
                    <FaUsers className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No games to watch</p>
                    <p className="text-sm">Games appear here once they start</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredViewingRooms.map((room) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-onyx rounded-lg p-4 border border-champagne/20 hover:border-champagne/40 transition-colors cursor-pointer"
                        onClick={() => {
                          setSpectatorRoomId(room.id);
                          setSpectatorPassword('');
                          setShowJoinSpectator(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-champagne">
                                Room {room.id.slice(-6)}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-xs bg-emerald/20 text-emerald">
                                Live
                              </span>
                              {room.isPrivate && <span className="text-ivory/60">🔒</span>}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-ivory/70">
                              <span>{room.players.length} players</span>
                              <span>• {room.settings.aiDifficulty}</span>
                            </div>
                          </div>
                          <FaUsers className="w-5 h-5 text-champagne" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : isSpectator ? (
            /* Spectator Viewing Room */
            <div className="bg-onyxLight rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-champagne flex items-center gap-2">
                    <FaUsers className="w-6 h-6" />
                    Viewing Room {currentRoom?.id.slice(-6)}
                  </h2>
                  <p className="text-ivory/60">Watching {gameTypeNames[gameType as keyof typeof gameTypeNames]}</p>
                </div>
                <button
                  onClick={leaveSpectator}
                  className="px-4 py-2 bg-onyx text-champagne rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                  Leave
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-onyx rounded-lg p-4">
                    <h3 className="font-semibold text-champagne mb-3">Players</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentRoom?.players.map((p) => (
                        <span key={p.id} className="px-3 py-1 bg-champagne/10 rounded-full text-ivory text-sm">
                          {p.name}
                          {p.isHost && <FaCrown className="w-3 h-3 inline ml-1 text-yellow-400" />}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-onyx rounded-lg p-4">
                    <h3 className="font-semibold text-champagne mb-3">Game State</h3>
                    <pre className="text-sm text-ivory/80 overflow-auto max-h-48 font-mono">
                      {gameState ? JSON.stringify(gameState, null, 2) : 'Waiting for game data...'}
                    </pre>
                  </div>
                </div>
                <div className="bg-onyx rounded-lg p-4 flex flex-col">
                  <h3 className="font-semibold text-champagne mb-3 flex items-center gap-2">
                    Chat
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-2 min-h-[120px] max-h-[280px]">
                    {messages.length === 0 ? (
                      <p className="text-ivory/50 text-sm">No messages yet</p>
                    ) : (
                      messages.map((m) => (
                        <div key={m.id} className="text-sm">
                          <span className="text-champagne font-medium">{m.playerName}:</span>{' '}
                          <span className="text-ivory/90">{m.message}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                      placeholder="Type a message..."
                      className="flex-1 bg-onyxLight border border-champagne/20 rounded-lg px-3 py-2 text-ivory text-sm"
                    />
                    <button
                      onClick={handleSendChat}
                      className="px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emeraldLight transition-colors text-sm"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Current Room
            <div className="bg-onyxLight rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-champagne">
                    Room {currentRoom.id.slice(-6)}
                  </h2>
                  <p className="text-ivory/60">
                    {currentRoom.players.length}/{currentRoom.maxPlayers} players
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowVideo(true)}
                    className="px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 bg-blue-600/80 text-white hover:bg-blue-600"
                    title="Start video chat"
                  >
                    <span className="text-base">📹</span>
                    Video
                  </button>
                  <button
                    onClick={handleCopyShareLink}
                    className="px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 bg-champagne/20 text-champagne hover:bg-champagne/30"
                    title="Copy link to share"
                  >
                    {linkCopied ? (
                      <>
                        <FaCheck className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <span className="text-base">📤</span>
                        Share Link
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReadyToggle}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                      isCurrentPlayerReady 
                        ? 'bg-green-600 text-white' 
                        : 'bg-onyx text-champagne hover:bg-emerald'
                    }`}
                  >
                    {isCurrentPlayerReady ? 'Ready' : 'Not Ready'}
                  </button>
                  <button
                    onClick={handleLeaveRoom}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Leave Room
                  </button>
                </div>
              </div>

              {/* Players List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                {currentRoom.players.map((player) => (
                  <div
                    key={player.id}
                    className={`bg-onyx rounded-lg p-4 border-2 transition-colors ${
                      player.id === currentPlayer?.id 
                        ? 'border-champagne' 
                        : 'border-champagne/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-champagne">
                        {player.name}
                        {player.isHost && <FaCrown className="w-4 h-4 inline ml-2 text-yellow-400" />}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${player.isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        player.isReady 
                          ? 'bg-green-600/20 text-green-400' 
                          : 'bg-red-600/20 text-red-400'
                      }`}>
                        {player.isReady ? 'Ready' : 'Not Ready'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Start Game Button */}
              {isCurrentPlayerHost && (
                <div className="text-center">
                  <button
                    onClick={handleStartGame}
                    disabled={!canStartGame}
                    className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                      canStartGame
                        ? 'bg-emerald text-white hover:bg-emeraldLight'
                        : 'bg-onyx text-ivory/40 cursor-not-allowed'
                    }`}
                  >
                    Start Game
                  </button>
                  {!canStartGame && (
                    <p className="text-sm text-ivory/60 mt-2">
                      {isHumanOnly ? 'All players must be ready (2+ required)' : 'All players must be ready (1+ human, AI fills empty seats)'}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateRoom && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bg-onyxLight rounded-2xl w-full max-w-lg mx-4 overflow-hidden border border-champagne/20 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-champagne/10 to-transparent border-b border-champagne/20 px-6 py-5">
              <h3 className="text-2xl font-bold text-champagne">Create Room</h3>
              <p className="text-ivory/60 text-sm mt-1">Configure your {gameTypeNames[gameType as keyof typeof gameTypeNames]} game</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Max Players */}
              <div>
                <label className="block text-champagne font-medium mb-3">Max Players</label>
                <div className="flex flex-wrap gap-2">
                  {[2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRoomSettings(prev => ({ ...prev, maxPlayers: n }))}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        roomSettings.maxPlayers === n
                          ? 'bg-champagne text-onyx'
                          : 'bg-onyx/80 text-ivory/80 hover:bg-champagne/20 border border-champagne/20'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Difficulty */}
              <div>
                <label className="block text-champagne font-medium mb-3">AI Difficulty</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Easy', 'Standard', 'Hard'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setRoomSettings(prev => ({ ...prev, aiDifficulty: level }))}
                      className={`py-2.5 rounded-xl font-medium text-sm transition-all ${
                        roomSettings.aiDifficulty === level
                          ? 'bg-champagne text-onyx'
                          : 'bg-onyx/80 text-ivory/80 hover:bg-champagne/20 border border-champagne/20'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Mode */}
              <div>
                <label className="block text-champagne font-medium mb-3">Game Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRoomSettings(prev => ({ ...prev, humanOnly: true }))}
                    className={`p-4 rounded-xl text-left transition-all border ${
                      roomSettings.humanOnly
                        ? 'bg-champagne/20 border-champagne text-champagne'
                        : 'bg-onyx/80 border-champagne/20 text-ivory/80 hover:border-champagne/40'
                    }`}
                  >
                    <div className="font-semibold">Human Only</div>
                    <div className="text-xs opacity-80 mt-1">2+ humans required to start</div>
                  </button>
                  <button
                    onClick={() => setRoomSettings(prev => ({ ...prev, humanOnly: false }))}
                    className={`p-4 rounded-xl text-left transition-all border ${
                      !roomSettings.humanOnly
                        ? 'bg-champagne/20 border-champagne text-champagne'
                        : 'bg-onyx/80 border-champagne/20 text-ivory/80 hover:border-champagne/40'
                    }`}
                  >
                    <div className="font-semibold">AI Allowed</div>
                    <div className="text-xs opacity-80 mt-1">AI fills empty seats</div>
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4 pt-2">
                <label className="block text-champagne font-medium mb-3">Room Options</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-onyx/50 border border-champagne/10 cursor-pointer hover:bg-champagne/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={roomSettings.isPrivate}
                      onChange={(e) => setRoomSettings(prev => ({ ...prev, isPrivate: e.target.checked }))}
                      className="rounded border-champagne/30 w-4 h-4"
                    />
                    <span className="text-ivory/90">Private Room</span>
                    <span className="text-ivory/50 text-xs ml-auto">Password required</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-onyx/50 border border-champagne/10 cursor-pointer hover:bg-champagne/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={roomSettings.allowSpectators}
                      onChange={(e) => setRoomSettings(prev => ({ ...prev, allowSpectators: e.target.checked }))}
                      className="rounded border-champagne/30 w-4 h-4"
                    />
                    <span className="text-ivory/90">Allow spectators</span>
                    <span className="text-ivory/50 text-xs ml-auto">Share link to watch</span>
                  </label>
                </div>

                {roomSettings.isPrivate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2"
                  >
                    <label className="block text-ivory/80 text-sm mb-2">Room Password</label>
                    <input
                      type="password"
                      value={roomSettings.password}
                      onChange={(e) => setRoomSettings(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full bg-onyx border border-champagne/20 rounded-xl px-4 py-2.5 text-ivory placeholder-ivory/40"
                      placeholder="Enter password"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={() => setShowCreateRoom(false)}
                className="flex-1 px-4 py-3 bg-onyx text-champagne rounded-xl font-medium hover:bg-champagne/20 border border-champagne/20 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleCreateRoom}
                className="flex-1 px-4 py-3 bg-emerald text-white rounded-xl font-bold hover:bg-emerald/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Room
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Join Room Modal */}
      {showJoinRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-onyxLight rounded-2xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-champagne mb-4">Join Room</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-2">
                  Room ID
                </label>
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  className="w-full bg-onyx border border-champagne/20 rounded-lg px-3 py-2 text-ivory"
                  placeholder="Enter room ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-2">
                  Password (if private)
                </label>
                <input
                  type="password"
                  value={joinPassword}
                  onChange={(e) => setJoinPassword(e.target.value)}
                  className="w-full bg-onyx border border-champagne/20 rounded-lg px-3 py-2 text-ivory"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowJoinRoom(false)}
                className="flex-1 px-4 py-2 bg-onyx text-champagne rounded-lg hover:bg-emerald transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinRoom}
                className="flex-1 px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emeraldLight transition-colors"
              >
                Join
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Join Viewing Room Modal */}
      {showJoinSpectator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-onyxLight rounded-2xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-champagne mb-4 flex items-center gap-2">
              <FaUsers className="w-5 h-5" />
              Join Viewing Room
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-2">
                  Room ID
                </label>
                <input
                  type="text"
                  value={spectatorRoomId}
                  onChange={(e) => setSpectatorRoomId(e.target.value)}
                  className="w-full bg-onyx border border-champagne/20 rounded-lg px-3 py-2 text-ivory"
                  placeholder="Enter room ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-2">
                  Password (if private)
                </label>
                <input
                  type="password"
                  value={spectatorPassword}
                  onChange={(e) => setSpectatorPassword(e.target.value)}
                  className="w-full bg-onyx border border-champagne/20 rounded-lg px-3 py-2 text-ivory"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowJoinSpectator(false)}
                className="flex-1 px-4 py-2 bg-onyx text-champagne rounded-lg hover:bg-emerald transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinSpectator}
                className="flex-1 px-4 py-2 bg-champagne text-onyx font-bold rounded-lg hover:bg-champagneLight transition-colors"
              >
                Watch
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Video Chat Modal - when in a room */}
      {showVideo && currentRoom && (
        <VideoChat
          roomUrl={generateRoomUrl('game', currentRoom.id)}
          roomName={`${gameTypeNames[gameType as keyof typeof gameTypeNames]} - Room ${currentRoom.id.slice(-6)}`}
          sessionType="group"
          participants={currentRoom.players.map((p, i) => ({
            id: p.id,
            name: p.name,
            role: p.isHost ? 'coach' : 'participant'
          }))}
          onClose={() => setShowVideo(false)}
          onSessionEnd={() => setShowVideo(false)}
        />
      )}
    </div>
  );
};

export default MultiplayerLobby;
