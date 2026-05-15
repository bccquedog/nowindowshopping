import React, { useState } from 'react';
import { useMultiplayer } from './MultiplayerProvider';
import VideoChat from './VideoChat';
import { WebRTCVideoCall } from './WebRTCVideoCall';
import { generateRoomUrl } from '../config/videoConfig';
import { videoConfig } from '../config/videoConfig';
import { useWebRTCRoomCall } from '../hooks/use-webrtc-room-call';
import { FaCheck } from 'react-icons/fa6';
const BlackjackLux = React.lazy(() => import('../BlackjackLux'));
const HoldemLux = React.lazy(() => import('../HoldemLux'));
const CheckersLux = React.lazy(() => import('../CheckersLux'));
const Tycoon = React.lazy(() => import('../Tycoon'));
const NWSSpades = React.lazy(() => import('../NWSSpades'));
const FiveThousandNWS = React.lazy(() => import('../FiveThousandNWS'));

interface MultiplayerGameWrapperProps {
  gameType: string;
  onBack: () => void;
}

const MultiplayerGameWrapper: React.FC<MultiplayerGameWrapperProps> = ({ gameType, onBack }) => {
  const { currentRoom, gameState, updateGameState, currentPlayer, isSpectator, leaveRoom, leaveSpectator } = useMultiplayer();
  const [linkCopied, setLinkCopied] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [acceptedIncomingCall, setAcceptedIncomingCall] = useState(false);

  const playerCount = currentRoom?.players.length ?? 0;
  const partner = currentRoom?.players.find((p) => p.id !== currentPlayer?.id);
  const useWebRTC = videoConfig.webrtc.preferForTwoPlayer && playerCount === 2 && partner;

  const { incomingCall, clearIncomingCall } = useWebRTCRoomCall(
    currentRoom?.id ?? null,
    currentPlayer?.id ?? null,
    partner?.id ?? null,
    partner?.name ?? 'Player'
  );

  const roomPlayer = currentRoom?.players.find((p) => p.id === currentPlayer?.id);
  const isHost = roomPlayer?.isHost ?? false;
  const playerIndex = Math.max(0, currentRoom?.players.findIndex((p) => p.id === currentPlayer?.id) ?? 0);

  const spectatorLink = currentRoom
    ? `${window.location.origin}/multiplayer/${gameType}?room=${currentRoom.id}&spectate=1`
    : '';

  const handleCopyShareLink = async () => {
    if (!spectatorLink) return;
    try {
      await navigator.clipboard.writeText(spectatorLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleBack = async () => {
    if (isSpectator) {
      leaveSpectator();
    } else {
      await leaveRoom();
    }
    onBack();
  };

  const gameProps = {
    isMultiplayer: true,
    roomId: currentRoom?.id,
    playerId: currentPlayer?.id,
    playerIndex,
    isHost,
    isSpectator,
    syncedGameState: gameState,
    onUpdateGameState: updateGameState,
    onBack: handleBack
  };

  const GameComponent = (() => {
    switch (gameType) {
      case 'checkers':
        return <CheckersLux {...gameProps} />;
      case 'tycoon':
        return <Tycoon {...gameProps} />;
      case 'blackjack':
        return <BlackjackLux {...gameProps} />;
      case '5000':
        return <FiveThousandNWS {...gameProps} />;
      case 'spades':
        return <NWSSpades {...gameProps} />;
      case 'holdem':
        return <HoldemLux {...gameProps} />;
      default:
        return (
          <div className="min-h-screen bg-onyx text-ivory flex items-center justify-center">
            <p>Unknown game type: {gameType}</p>
          </div>
        );
    }
  })();

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {currentRoom && (
          <button
            onClick={() => setShowVideo(true)}
            className="px-3 py-2 rounded-lg bg-blue-600/80 text-white hover:bg-blue-600 flex items-center gap-2 text-sm font-medium"
            title="Video chat"
          >
            <span className="text-base">📹</span>
            Video
          </button>
        )}
        {spectatorLink && (
          <button
            onClick={handleCopyShareLink}
            className="px-3 py-2 rounded-lg bg-champagne/20 text-champagne hover:bg-champagne/30 flex items-center gap-2 text-sm font-medium"
            title="Copy spectator link"
          >
            {linkCopied ? (
              <>
                <FaCheck className="w-4 h-4" />
                Link copied!
              </>
            ) : (
              <>
                <span className="text-base">📤</span>
                Share
              </>
            )}
          </button>
        )}
      </div>
      {/* WebRTC: 1:1 P2P for 2-player rooms (lower latency from LoveQuest implementation) */}
      {useWebRTC && (showVideo || acceptedIncomingCall) && currentRoom && partner && (
        <WebRTCVideoCall
          connectionId={currentRoom.id}
          localPlayerId={currentPlayer!.id}
          partnerPlayerId={partner.id}
          partnerPlayerName={partner.name}
          callType="video"
          isIncoming={acceptedIncomingCall}
          onCallEnd={() => {
            setShowVideo(false);
            setAcceptedIncomingCall(false);
          }}
          onCallReject={() => {
            clearIncomingCall();
          }}
        />
      )}

      {/* Incoming WebRTC call overlay (when we didn't initiate) */}
      {useWebRTC && incomingCall && !showVideo && !acceptedIncomingCall && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[55]">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full text-center shadow-xl">
            <h3 className="text-lg font-semibold mb-2">{incomingCall.callerName}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Incoming {incomingCall.callType} call...
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  clearIncomingCall();
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Decline
              </button>
              <button
                onClick={() => {
                  setAcceptedIncomingCall(true);
                }}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily.co: 3+ players or when WebRTC not preferred */}
      {(!useWebRTC) && showVideo && currentRoom && (
        <VideoChat
          roomUrl={generateRoomUrl('game', currentRoom.id)}
          roomName={`Game - Room ${currentRoom.id.slice(-6)}`}
          sessionType="group"
          participants={currentRoom.players.map((p) => ({
            id: p.id,
            name: p.name,
            role: p.isHost ? 'coach' : 'participant'
          }))}
          onClose={() => setShowVideo(false)}
          onSessionEnd={() => setShowVideo(false)}
        />
      )}
      {GameComponent}
    </div>
  );
};

export default MultiplayerGameWrapper;
