/**
 * Canonical messaging types based on the Reusable Messaging System Architecture.
 * See planning/messaging for full documentation.
 */

/** Standardized message kinds - use these for cross-platform consistency */
export type MessageKind = 'text' | 'voice' | 'system' | 'game' | 'image';

/** Normalize legacy type names to canonical kinds */
export function normalizeMessageKind(raw: string): MessageKind {
  const lower = (raw || 'text').toLowerCase();
  if (['text', 'chat'].includes(lower)) return 'text';
  if (['voice', 'audio'].includes(lower)) return 'voice';
  if (['system'].includes(lower)) return 'system';
  if (['game'].includes(lower)) return 'game';
  if (['image'].includes(lower)) return 'image';
  return 'text';
}

/** Message record - canonical shape for persistence and real-time sync */
export interface MessageRecord {
  id: string;
  threadId: string;
  senderId: string;
  senderName?: string;
  kind: MessageKind;
  content: string;
  createdAt: Date;
  metadata?: {
    replyToMessageId?: string;
    edited?: boolean;
    deleted?: boolean;
    gameAction?: string;
    [key: string]: unknown;
  };
}

/** Input for sending a new message */
export interface SendMessageInput {
  threadId: string;
  senderId: string;
  senderName: string;
  kind: MessageKind;
  content: string;
  metadata?: Record<string, unknown>;
  clientMessageId?: string;
}

/** Result of a send operation */
export interface SendMessageResult {
  messageId: string;
  success: boolean;
  error?: string;
}
