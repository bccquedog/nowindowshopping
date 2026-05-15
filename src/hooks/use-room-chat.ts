/**
 * React hook for room-scoped chat.
 * Single subscription per active room - avoids duplicate listeners (planning/messaging recommendation).
 */

import { useState, useEffect, useCallback } from 'react';
import { getFirestore } from 'firebase/firestore';
import {
  subscribeToRoomMessages,
  sendRoomMessage,
  type MessageRecord,
  type MessageKind,
} from '../lib/messaging';

export interface RoomChatSender {
  id: string;
  name: string;
}

export interface UseRoomChatOptions {
  roomId: string | null;
  sender: RoomChatSender | null;
  /** Firestore path segments: e.g. (id) => ['gameRooms', id, 'messages'] */
  collectionPath?: (roomId: string) => readonly [string, ...string[]];
  messageLimit?: number;
}

export interface UseRoomChatResult {
  messages: MessageRecord[];
  sendMessage: (content: string, kind?: MessageKind) => Promise<{ success: boolean; error?: string }>;
  /** Send a system message (e.g. "Game started", "Player joined") - uses system sender id */
  sendSystemMessage: (content: string) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
  error: string | null;
}

const DEFAULT_COLLECTION_PATH = (roomId: string): readonly [string, ...string[]] =>
  ['gameRooms', roomId, 'messages'];

export function useRoomChat({
  roomId,
  sender,
  collectionPath = DEFAULT_COLLECTION_PATH,
  messageLimit = 100,
}: UseRoomChatOptions): UseRoomChatResult {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const db = getFirestore();
    const config = {
      db,
      collectionPath,
      messageLimit,
    };

    const unsubscribe = subscribeToRoomMessages(config, roomId, (newMessages) => {
      setMessages(newMessages);
      setLoading(false);
      setError(null);
    });

    return () => {
      unsubscribe();
      setMessages([]);
    };
  }, [roomId, collectionPath, messageLimit]);

  const sendMessage = useCallback(
    async (
      content: string,
      kind: MessageKind = 'text'
    ): Promise<{ success: boolean; error?: string }> => {
      if (!roomId || !sender?.id || !sender?.name) {
        return { success: false, error: 'Not in a room or sender not set' };
      }

      const trimmed = content.trim();
      if (!trimmed) {
        return { success: false, error: 'Message cannot be empty' };
      }

      const db = getFirestore();
      const config = {
        db,
        collectionPath: collectionPath ?? DEFAULT_COLLECTION_PATH,
        messageLimit,
      };

      const result = await sendRoomMessage(config, {
        threadId: roomId,
        senderId: sender.id,
        senderName: sender.name,
        kind,
        content: trimmed,
      });

      if (!result.success) {
        setError(result.error ?? 'Failed to send message');
      }

      return {
        success: result.success,
        error: result.error,
      };
    },
    [roomId, sender?.id, sender?.name, collectionPath, messageLimit]
  );

  const sendSystemMessage = useCallback(
    async (content: string): Promise<{ success: boolean; error?: string }> => {
      if (!roomId) {
        return { success: false, error: 'Not in a room' };
      }

      const trimmed = content.trim();
      if (!trimmed) {
        return { success: false, error: 'System message cannot be empty' };
      }

      const db = getFirestore();
      const config = {
        db,
        collectionPath: collectionPath ?? DEFAULT_COLLECTION_PATH,
        messageLimit,
      };

      const result = await sendRoomMessage(config, {
        threadId: roomId,
        senderId: '__system__',
        senderName: 'System',
        kind: 'system',
        content: trimmed,
      });

      return {
        success: result.success,
        error: result.error,
      };
    },
    [roomId, collectionPath, messageLimit]
  );

  return {
    messages,
    sendMessage,
    sendSystemMessage,
    loading,
    error,
  };
}
