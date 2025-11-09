import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMultiplayer } from './MultiplayerProvider';
import { 
  FaUsers, 
  FaPlay, 
  FaPlus, 
  FaArrowLeft,
  FaCrown,
  FaClock
} from 'react-icons/fa6';

interface MultiplayerLobbyProps {
  gameType: string;
  onStartGame: () => void;
  onBack: () => void;
}

const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({ 
  gameType, 
  onStartGame, 
  onBack 
}) => {
  const { 
    currentRoom, 
    availableRooms, 
    currentPlayer, 
    createRoom, 
    joinRoom, 
    leaveRoom,
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
    timeLimit: 0
  });
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [error, setError] = useState('');

  const gameTypeNames = {
    blackjack: 'BlackjackLux',
    checkers: 'CheckersLux',
    tycoon: 'Tycoon',
    spades: 'NWS Spades',
    '5000': '5000 NWS'
  };

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

  const handleReadyToggle = async () => {
    if (!currentPlayer) return;
    await updatePlayerStatus({ isReady: !currentPlayer.isReady });
  };

  const canStartGame = currentRoom?.players.every(p => p.isReady) && 
                      currentRoom?.players.length >= 2 &&
                      currentPlayer?.isHost;

  const filteredRooms = availableRooms.filter(room => 
    room.gameType === gameType && 
    room.id !== currentRoom?.id
  );

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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-champagne">Available Rooms</h2>
                  <button
                    onClick={() => setShowJoinRoom(true)}
                    className="px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emeraldLight transition-colors"
                  >
                    Join Room
                  </button>
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
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-champagne">
                                Room {room.id.slice(-6)}
                              </span>
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
                    <span>Up to 4 players per room</span>
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
                    onClick={handleReadyToggle}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                      currentPlayer?.isReady 
                        ? 'bg-green-600 text-white' 
                        : 'bg-onyx text-champagne hover:bg-emerald'
                    }`}
                  >
                    {currentPlayer?.isReady ? 'Ready' : 'Not Ready'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
              {currentPlayer?.isHost && (
                <div className="text-center">
                  <button
                    onClick={onStartGame}
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
                      All players must be ready to start
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-onyxLight rounded-2xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-champagne mb-4">Create Room</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-2">
                  Max Players
                </label>
                <select
                  value={roomSettings.maxPlayers}
                  onChange={(e) => setRoomSettings(prev => ({ ...prev, maxPlayers: parseInt(e.target.value) }))}
                  className="w-full bg-onyx border border-champagne/20 rounded-lg px-3 py-2 text-ivory"
                >
                  <option value={2}>2 Players</option>
                  <option value={3}>3 Players</option>
                  <option value={4}>4 Players</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-2">
                  AI Difficulty
                </label>
                <select
                  value={roomSettings.aiDifficulty}
                  onChange={(e) => setRoomSettings(prev => ({ ...prev, aiDifficulty: e.target.value }))}
                  className="w-full bg-onyx border border-champagne/20 rounded-lg px-3 py-2 text-ivory"
                >
                  <option value="Easy">Easy</option>
                  <option value="Standard">Standard</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={roomSettings.isPrivate}
                  onChange={(e) => setRoomSettings(prev => ({ ...prev, isPrivate: e.target.checked }))}
                  className="rounded border-champagne/20"
                />
                <label htmlFor="private" className="text-sm text-ivory/80">
                  Private Room
                </label>
              </div>

              {roomSettings.isPrivate && (
                <div>
                  <label className="block text-sm font-medium text-ivory/80 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={roomSettings.password}
                    onChange={(e) => setRoomSettings(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-onyx border border-champagne/20 rounded-lg px-3 py-2 text-ivory"
                    placeholder="Enter password"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowCreateRoom(false)}
                className="flex-1 px-4 py-2 bg-onyx text-champagne rounded-lg hover:bg-emerald transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                className="flex-1 px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emeraldLight transition-colors"
              >
                Create
              </button>
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
    </div>
  );
};

export default MultiplayerLobby;
