import React, { useState, useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { videoConfig } from '../config/videoConfig';

interface VideoChatProps {
  roomUrl?: string;
  roomName?: string;
  sessionType?: 'coaching' | 'group';
  participants?: Array<{
    id: string;
    name: string;
    role: 'coach' | 'client' | 'participant';
  }>;
  onClose?: () => void;
  onSessionEnd?: (duration: number) => void;
}

interface Participant {
  id: string;
  name: string;
  role: 'coach' | 'client' | 'participant';
  isLocal: boolean;
  audio: boolean;
  video: boolean;
  speaking: boolean;
}

const VideoChat: React.FC<VideoChatProps> = ({
  roomUrl,
  roomName = 'Session Room',
  sessionType = 'coaching',
  participants = [],
  onClose,
  onSessionEnd
}) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participantsList, setParticipantsList] = useState<Participant[]>([]);
  const [localAudio, setLocalAudio] = useState(true);
  const [localVideo, setLocalVideo] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: string;
    message: string;
    timestamp: Date;
  }>>([]);
  const [newMessage, setNewMessage] = useState('');

  const videoRef = useRef<HTMLDivElement>(null);
  const callObjectRef = useRef<any>(null);

  // Generate room URL if not provided
  const generateRoomUrl = () => {
    if (roomUrl) return roomUrl;
    const baseUrl = `https://${videoConfig.daily.domain}`;
    const roomId = roomName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    return `${baseUrl}/${roomId}`;
  };

  const currentRoomUrl = generateRoomUrl();

  const joinCall = async () => {
    if (!videoRef.current) return;

    setIsJoining(true);
    setError(null);

    try {
      // Create a Daily call object
      const callObject = DailyIframe.createFrame(videoRef.current, {
        iframeStyle: {
          width: '100%',
          height: '100%',
          border: '0',
          borderRadius: '8px',
        },
        showLeaveButton: false, // We'll handle this ourselves
        showFullscreenButton: true,
        showLocalVideo: localVideo,
        showParticipantsBar: false, // We'll create our own
      });

      callObjectRef.current = callObject;

      // Set up event listeners
      callObject.on('joined-meeting', () => {
        setIsInCall(true);
        setIsJoining(false);
        setSessionStartTime(new Date());
        updateParticipantsList();
      });

      callObject.on('left-meeting', () => {
        handleSessionEnd();
      });

      callObject.on('participant-joined', () => {
        updateParticipantsList();
      });

      callObject.on('participant-updated', () => {
        updateParticipantsList();
      });

      callObject.on('participant-left', () => {
        updateParticipantsList();
      });

      callObject.on('active-speaker-change', () => {
        updateParticipantsList();
      });

      // Join the room
      await callObject.join({ url: currentRoomUrl });

    } catch (err) {
      console.error('Error joining call:', err);
      setError('Failed to join the video call. Please check your internet connection and try again.');
      setIsJoining(false);
    }
  };

  const updateParticipantsList = () => {
    if (!callObjectRef.current) return;

    const participants = callObjectRef.current.participants();
    const localSessionId = participants.local?.session_id;
    const participantsArray: Participant[] = [];

    Object.values(participants).forEach((participant: any) => {
      // Use tracks API (recommended by Daily) with fallback to legacy audio/video
      const audioState = participant.tracks?.audio?.state;
      const videoState = participant.tracks?.video?.state;
      const isAudioOn = audioState === 'playable' || audioState === 'sendable' || participant.audio === true;
      const isVideoOn = videoState === 'playable' || videoState === 'sendable' || participant.video === true;

      participantsArray.push({
        id: participant.session_id,
        name: participant.user_name || 'Unknown',
        role: participant.session_id === localSessionId ? 'coach' : 'client',
        isLocal: participant.session_id === localSessionId,
        audio: isAudioOn,
        video: isVideoOn,
        speaking: participant.speaking || false,
      });
    });

    setParticipantsList(participantsArray);
  };

  const toggleAudio = () => {
    if (callObjectRef.current) {
      callObjectRef.current.setLocalAudio(!localAudio);
      setLocalAudio(!localAudio);
    }
  };

  const toggleVideo = () => {
    if (callObjectRef.current) {
      callObjectRef.current.setLocalVideo(!localVideo);
      setLocalVideo(!localVideo);
    }
  };

  const toggleScreenShare = async () => {
    if (!callObjectRef.current) return;

    try {
      if (isScreenSharing) {
        await callObjectRef.current.stopScreenShare();
        setIsScreenSharing(false);
      } else {
        await callObjectRef.current.startScreenShare();
        setIsScreenSharing(true);
      }
    } catch (err) {
      console.error('Screen share error:', err);
    }
  };

  const handleSessionEnd = () => {
    const duration = sessionStartTime ? Date.now() - sessionStartTime.getTime() : 0;
    if (onSessionEnd) {
      onSessionEnd(duration);
    }
    setIsInCall(false);
    if (onClose) onClose();
  };

  const leaveCall = () => {
    if (callObjectRef.current) {
      callObjectRef.current.leave();
      // left-meeting event will trigger handleSessionEnd; avoid double-calling
    } else {
      handleSessionEnd();
    }
  };

  const sendChatMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: 'You',
      message: newMessage.trim(),
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (callObjectRef.current) {
        callObjectRef.current.destroy();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Connection Error</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => setError(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-6xl w-full mx-4 h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {sessionType === 'coaching' ? 'Coaching Session' : 'Group Session'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{roomName}</p>
          </div>
          <div className="flex items-center gap-2">
            {sessionStartTime && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Duration: {Math.floor((Date.now() - sessionStartTime.getTime()) / 1000 / 60)}m {Math.floor((Date.now() - sessionStartTime.getTime()) / 1000) % 60}s
              </span>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>

        {!isInCall ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                Ready to start your {sessionType} session?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Click the button below to join the video call room.
              </p>
            </div>
            
            <button
              onClick={joinCall}
              disabled={isJoining}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isJoining ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Joining...
                </>
              ) : (
                <>
                  📹 Join {sessionType === 'coaching' ? 'Coaching' : 'Group'} Session
                </>
              )}
            </button>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Room: {currentRoomUrl}</p>
              <p className="mt-2">
                💡 <strong>Note:</strong> You'll need to set up a Daily.co account and replace the room URL with your actual room URL.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex">
            {/* Main Video Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <div ref={videoRef} className="w-full h-full bg-gray-900 rounded-lg" />
              </div>
              
              {/* Controls */}
              <div className="flex justify-center items-center gap-4 py-4 bg-gray-100 dark:bg-gray-700 rounded-lg mt-4">
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full ${localAudio ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                  title={localAudio ? 'Mute' : 'Unmute'}
                >
                  {localAudio ? '🎤' : '🔇'}
                </button>
                
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full ${localVideo ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                  title={localVideo ? 'Turn off video' : 'Turn on video'}
                >
                  {localVideo ? '📹' : '🚫'}
                </button>
                
                <button
                  onClick={toggleScreenShare}
                  className={`p-3 rounded-full ${isScreenSharing ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
                  title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
                >
                  🖥️
                </button>
                
                <button
                  onClick={() => setShowParticipants(!showParticipants)}
                  className={`p-3 rounded-full ${showParticipants ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
                  title="Participants"
                >
                  👥
                </button>
                
                <button
                  onClick={() => setShowChat(!showChat)}
                  className={`p-3 rounded-full ${showChat ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
                  title="Chat"
                >
                  💬
                </button>
                
                <button
                  onClick={leaveCall}
                  className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700"
                  title="Leave call"
                >
                  📞
                </button>
              </div>
            </div>

            {/* Sidebar */}
            {(showParticipants || showChat) && (
              <div className="w-80 ml-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {showParticipants && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Participants ({participantsList.length})</h4>
                    <div className="space-y-2">
                      {participantsList.map(participant => (
                        <div key={participant.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${participant.speaking ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {participant.name} {participant.isLocal && '(You)'}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {participant.audio ? '🎤' : '🔇'}
                            {participant.video ? '📹' : '🚫'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showChat && (
                  <div className="h-full flex flex-col">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Chat</h4>
                    <div className="flex-1 overflow-y-auto mb-3 space-y-2">
                      {chatMessages.map(message => (
                        <div key={message.id} className="p-2 bg-white dark:bg-gray-600 rounded">
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{message.sender}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 dark:text-white mt-1">{message.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                      />
                      <button
                        onClick={sendChatMessage}
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat; 