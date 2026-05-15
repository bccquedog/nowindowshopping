/**
 * Hook for WebRTC video calls within a game room.
 * Listens for incoming offers and manages call state.
 * From LoveQuest videochat implementation.
 */

import { useState, useEffect, useCallback } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const COLLECTION = 'gameRoomCalls';

export interface IncomingRoomCall {
  connectionId: string;
  callerId: string;
  callerName: string;
  callType: 'voice' | 'video';
}

export function useWebRTCRoomCall(
  roomId: string | null,
  localPlayerId: string | null,
  partnerPlayerId: string | null,
  partnerPlayerName: string
) {
  const [incomingCall, setIncomingCall] = useState<IncomingRoomCall | null>(null);

  useEffect(() => {
    if (!roomId || !localPlayerId || !partnerPlayerId) return;

    const ref = doc(getFirestore(), COLLECTION, roomId);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.data();
      const calleeId = data.calleeId || data.partnerId;
      if (calleeId !== localPlayerId) return; // not for us
      if (data.offer && !data.answer) {
        setIncomingCall({
          connectionId: roomId,
          callerId: data.callerId || data.userId,
          callerName: partnerPlayerName,
          callType: (data.connectionType || 'video') as 'voice' | 'video',
        });
      } else {
        setIncomingCall(null);
      }
    });

    return () => unsubscribe();
  }, [roomId, localPlayerId, partnerPlayerId, partnerPlayerName]);

  const clearIncomingCall = useCallback(() => {
    setIncomingCall(null);
  }, []);

  return { incomingCall, clearIncomingCall };
}
