/**
 * Firestore transport for room-scoped chat.
 * Uses subcollection pattern: gameRooms/{roomId}/messages
 * Aligns with planning/messaging recommended storage shape.
 */

import {
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Unsubscribe,
  DocumentData,
  Timestamp,
} from 'firebase/firestore';
import type { MessageRecord, MessageKind, SendMessageInput, SendMessageResult } from './types';
import { normalizeMessageKind } from './types';

const DEFAULT_MESSAGE_LIMIT = 100;

export interface RoomChatTransportConfig {
  db: Firestore;
  /** Returns path segments for collection(), e.g. ['gameRooms', roomId, 'messages'] */
  collectionPath: (roomId: string) => readonly [string, ...string[]];
  messageLimit?: number;
}

/**
 * Subscribe to room messages with real-time updates.
 * Returns an unsubscribe function - call it to stop listening.
 */
export function subscribeToRoomMessages(
  config: RoomChatTransportConfig,
  roomId: string,
  handler: (messages: MessageRecord[]) => void
): Unsubscribe {
  const pathSegments = config.collectionPath(roomId);
  const messagesRef = collection(config.db, ...pathSegments);
  const messageLimit = config.messageLimit ?? DEFAULT_MESSAGE_LIMIT;

  const q = query(
    messagesRef,
    orderBy('timestamp', 'desc'),
    limit(messageLimit)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages: MessageRecord[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const record = docToMessageRecord(doc.id, roomId, data);
        if (record) messages.push(record);
      });
      handler(messages.reverse());
    },
    (error) => {
      console.error('[RoomChatTransport] subscription error:', error);
      handler([]);
    }
  );
}

/**
 * Send a message to a room.
 */
export async function sendRoomMessage(
  config: RoomChatTransportConfig,
  input: SendMessageInput
): Promise<SendMessageResult> {
  try {
    const pathSegments = config.collectionPath(input.threadId);
    const messagesRef = collection(config.db, ...pathSegments);

    const docRef = await addDoc(messagesRef, {
      playerId: input.senderId,
      playerName: input.senderName,
      message: input.content,
      timestamp: serverTimestamp(),
      type: input.kind === 'text' ? 'chat' : input.kind,
      ...(input.metadata && { metadata: input.metadata }),
    });

    return { messageId: docRef.id, success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[RoomChatTransport] send failed:', error);
    return { messageId: '', success: false, error: message };
  }
}

/** Convert Firestore doc to canonical MessageRecord */
function docToMessageRecord(
  docId: string,
  threadId: string,
  data: DocumentData
): MessageRecord | null {
  const rawType = data.type ?? data.messageType ?? 'chat';
  const kind = normalizeMessageKind(rawType);

  return {
    id: docId,
    threadId,
    senderId: data.playerId ?? data.senderId ?? '',
    senderName: data.playerName ?? data.senderName ?? 'Unknown',
    kind,
    content: data.message ?? data.content ?? '',
    createdAt: (data.timestamp as Timestamp)?.toDate?.() ?? new Date(),
    metadata: data.metadata ? { ...data.metadata } : undefined,
  };
}
