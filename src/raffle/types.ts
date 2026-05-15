// Raffle status lifecycle: draft -> active -> ended -> cooldown -> completed
export type RaffleStatus = 'draft' | 'active' | 'ended' | 'cooldown' | 'completed';

export type RaffleEntryStatus = 'pending' | 'paid' | 'refunded' | 'disputed' | 'invalid';

export interface RaffleWinner {
  entryId: string;
  email: string;
  displayName?: string;
}

export interface Raffle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pricePerTicket: number; // cents
  durationDays: number;
  startsAt: Date | { seconds: number; nanoseconds: number };
  endsAt: Date | { seconds: number; nanoseconds: number };
  winnerCount: number;
  status: RaffleStatus;
  winners?: RaffleWinner[];
  cooldownUntil?: Date | { seconds: number; nanoseconds: number };
  createdAt: Date | { seconds: number; nanoseconds: number };
  updatedAt: Date | { seconds: number; nanoseconds: number };
}

export interface RaffleEntry {
  id: string;
  raffleId: string;
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  email: string;
  displayName?: string;
  ticketCount: number;
  amountPaid: number; // cents
  status: RaffleEntryStatus;
  purchasedAt: Date | { seconds: number; nanoseconds: number };
  fraudFlags?: string[];
}

// Helper to convert Firestore timestamp to Date
export function toDate(
  val: Date | { seconds: number; nanoseconds: number } | undefined
): Date | undefined {
  if (!val) return undefined;
  if (val instanceof Date) return val;
  return new Date(val.seconds * 1000 + val.nanoseconds / 1e6);
}
