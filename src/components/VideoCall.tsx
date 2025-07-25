import React, { useState, useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';

interface VideoCallProps {
  roomUrl?: string;
  onClose?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomUrl, onClose }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const callObjectRef = useRef<any>(null);

  // For demo purposes, we'll create a room URL
  const demoRoomUrl = roomUrl || 'https://your-domain.daily.co/demo-room';

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
        showLeaveButton: true,
      });

      callObjectRef.current = callObject;

      // Join the room
      await callObject.join({ url: demoRoomUrl });

      setIsInCall(true);
      setIsJoining(false);

      // Handle when user leaves the call
      callObject.on('left-meeting', () => {
        setIsInCall(false);
        if (onClose) onClose();
      });

    } catch (err) {
      console.error('Error joining call:', err);
      setError('Failed to join the video call. Please try again.');
      setIsJoining(false);
    }
  };

  const leaveCall = () => {
    if (callObjectRef.current) {
      callObjectRef.current.leave();
    }
    setIsInCall(false);
    if (onClose) onClose();
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
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-red-600 mb-4">Error</h3>
          <p className="text-gray-700 mb-4">{error}</p>
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
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Video Call</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {!isInCall ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium mb-2">Ready to start your session?</h4>
              <p className="text-gray-600">
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
                  📹 Join Video Call
                </>
              )}
            </button>

            <div className="mt-4 text-sm text-gray-500">
              <p>Room: {demoRoomUrl}</p>
              <p className="mt-2">
                💡 <strong>Note:</strong> You'll need to set up a Daily.co account and replace the room URL with your actual room URL.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 relative">
            <div ref={videoRef} className="w-full h-full bg-gray-900 rounded-lg" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={leaveCall}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Leave Call
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall; 