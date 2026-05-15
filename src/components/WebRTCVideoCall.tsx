/**
 * WebRTC-based 1:1 video/voice call component.
 * Adapted from LoveQuest VideoCallInterface for improved performance:
 * - Peer-to-peer (lower latency than Daily.co)
 * - Reconnect grace period, ICE restart
 * - Dedicated remote audio element for autoplay
 */

import React, { useState, useEffect, useRef } from 'react';
import { getFirestore } from 'firebase/firestore';
import { WebRTCCommunicationManager } from '../lib/webrtc-communication';
import { videoConfig } from '../config/videoConfig';

let webrtcManagerInstance: WebRTCCommunicationManager | null = null;
function getWebRTCManager() {
  if (!webrtcManagerInstance) {
    webrtcManagerInstance = new WebRTCCommunicationManager({
      db: getFirestore(),
      collectionName: 'gameRoomCalls',
    });
  }
  return webrtcManagerInstance;
}

interface WebRTCVideoCallProps {
  connectionId: string;
  localPlayerId: string;
  partnerPlayerId: string;
  partnerPlayerName: string;
  callType: 'voice' | 'video';
  isIncoming?: boolean;
  onCallEnd: (durationSeconds?: number) => void;
  onCallReject?: () => void;
}

export const WebRTCVideoCall: React.FC<WebRTCVideoCallProps> = ({
  connectionId,
  localPlayerId,
  partnerPlayerId,
  partnerPlayerName,
  callType,
  isIncoming = false,
  onCallEnd,
  onCallReject,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'voice');
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallAccepted, setIsCallAccepted] = useState(!isIncoming);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const callStartTimeRef = useRef<Date | null>(null);
  const connectionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speakerOffRef = useRef(isSpeakerOff);
  speakerOffRef.current = isSpeakerOff;

  const clearConnectionTimeout = () => {
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }
  };

  const startConnectionTimeout = () => {
    clearConnectionTimeout();
    connectionTimeoutRef.current = setTimeout(() => {
      if (!isConnected) {
        onCallEnd(0);
      }
    }, videoConfig.webrtc.connectionTimeoutMs);
  };

  const attachRemoteStream = (stream: MediaStream) => {
    remoteStreamRef.current = stream;
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = stream;
      remoteAudioRef.current.muted = speakerOffRef.current;
      remoteAudioRef.current.play().catch(() => {});
    }
    if (callType === 'video' && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.muted = true;
      remoteVideoRef.current.play().catch(() => {});
    }
  };

  const registerHandlers = () => {
    getWebRTCManager().setOnConnectionStateChange((state) => {
      if (state === 'connected') {
        clearConnectionTimeout();
        setIsConnected(true);
        setIsConnecting(false);
        callStartTimeRef.current = new Date();
      } else if (state === 'disconnected' || state === 'failed') {
        onCallEnd(callDuration);
      }
    });
    getWebRTCManager().setOnRemoteStream(attachRemoteStream);
  };

  const answerCall = async () => {
    try {
      setIsConnecting(true);
      const offer = await getWebRTCManager().fetchOffer(connectionId);
      if (!offer) throw new Error('Offer not found');

      registerHandlers();
      const success = await getWebRTCManager().answerCall(
        localPlayerId,
        partnerPlayerId,
        callType,
        connectionId,
        offer
      );
      if (!success) throw new Error('Failed to answer');

      const localStream = getWebRTCManager().getLocalStream();
      if (localStream) {
        localStreamRef.current = localStream;
        if (localVideoRef.current && callType === 'video') {
          localVideoRef.current.srcObject = localStream;
        }
      }
      const existingRemote = getWebRTCManager().getRemoteStream();
      if (existingRemote?.getTracks().length) attachRemoteStream(existingRemote);
      startConnectionTimeout();
    } catch (err) {
      console.error('[WebRTC] Answer failed:', err);
      setIsConnecting(false);
      onCallEnd(0);
    }
  };

  const startCall = async () => {
    try {
      setIsConnecting(true);
      registerHandlers();
      const success = await getWebRTCManager().startCall(
        localPlayerId,
        partnerPlayerId,
        callType,
        connectionId
      );
      if (!success) throw new Error('Failed to start');

      const localStream = getWebRTCManager().getLocalStream();
      if (localStream) {
        localStreamRef.current = localStream;
        if (localVideoRef.current && callType === 'video') {
          localVideoRef.current.srcObject = localStream;
        }
      }
      const existingRemote = getWebRTCManager().getRemoteStream();
      if (existingRemote?.getTracks().length) attachRemoteStream(existingRemote);
      startConnectionTimeout();
    } catch (err) {
      console.error('[WebRTC] Start failed:', err);
      setIsConnecting(false);
      onCallEnd(0);
    }
  };

  useEffect(() => {
    if (!isIncoming && isCallAccepted) startCall();
    else if (isIncoming && isCallAccepted) answerCall();
  }, [isCallAccepted]);

  useEffect(() => {
    if (isConnected && callStartTimeRef.current) {
      const timer = setInterval(() => {
        if (callStartTimeRef.current) {
          setCallDuration(Math.floor((Date.now() - callStartTimeRef.current.getTime()) / 1000));
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConnected]);

  const handleCallEnd = async () => {
    clearConnectionTimeout();
    await getWebRTCManager().endCall();
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    remoteStreamRef.current = null;
    setIsConnected(false);
    setIsConnecting(false);
    onCallEnd(callDuration);
  };

  const handleAccept = () => setIsCallAccepted(true);
  const handleReject = () => {
    onCallReject?.();
    onCallEnd(0);
  };

  const toggleMute = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  const toggleSpeaker = () => {
    setIsSpeakerOff((v) => !v);
    if (remoteAudioRef.current) remoteAudioRef.current.muted = !isSpeakerOff;
  };

  useEffect(() => () => clearConnectionTimeout(), []);

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  if (!isCallAccepted && isIncoming) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[60]">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full text-center">
          <h3 className="text-lg font-semibold mb-2">{partnerPlayerName}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {callType === 'video' ? 'Video' : 'Voice'} call incoming...
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReject}
              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
            >
              ✕
            </button>
            <button
              onClick={handleAccept}
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
            >
              📞
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-[60]">
      <audio ref={remoteAudioRef} autoPlay playsInline style={{ display: 'none' }} />
      <div className="flex-1 relative">
        {callType === 'video' ? (
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-semibold">{partnerPlayerName}</h2>
              <p className="text-white/70">Voice Call</p>
            </div>
          </div>
        )}

        {callType === 'video' && (
          <div className="absolute top-4 right-4 w-36 aspect-video rounded-lg overflow-hidden border-2 border-white bg-black">
            <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            {isVideoOff && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <span className="text-white text-sm">Camera off</span>
              </div>
            )}
          </div>
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          {isConnecting && (
            <span className="px-3 py-1 bg-white/90 rounded text-sm">Connecting...</span>
          )}
          {isConnected && (
            <span className="px-3 py-1 bg-white/90 rounded text-sm">{formatDuration(callDuration)}</span>
          )}
        </div>
      </div>

      <div className="bg-black/80 p-4 flex justify-center gap-4">
        <button
          onClick={toggleMute}
          className={`w-12 h-12 rounded-full ${isMuted ? 'bg-red-500' : 'bg-white/20'} text-white`}
        >
          {isMuted ? '🔇' : '🎤'}
        </button>
        {callType === 'video' && (
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-white/20'} text-white`}
          >
            {isVideoOff ? '📷' : '📹'}
          </button>
        )}
        <button
          onClick={toggleSpeaker}
          className="w-12 h-12 rounded-full bg-white/20 text-white"
        >
          {isSpeakerOff ? '🔈' : '🔊'}
        </button>
        <button onClick={handleCallEnd} className="w-12 h-12 rounded-full bg-red-500 text-white">
          ✕
        </button>
      </div>
    </div>
  );
};
