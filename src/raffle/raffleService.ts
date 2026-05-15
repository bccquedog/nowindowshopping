import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  DocumentSnapshot,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import type { Raffle, RaffleEntry } from './types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const RAFFLES_COLLECTION = 'raffles';
const ENTRIES_COLLECTION = 'raffle_entries';

export function toRaffle(docSnap: DocumentSnapshot): Raffle | null {
  const data = docSnap.data();
  if (!data) return null;
  return {
    id: docSnap.id,
    title: data.title ?? '',
    description: data.description ?? '',
    imageUrl: data.imageUrl ?? '',
    pricePerTicket: data.pricePerTicket ?? 0,
    durationDays: data.durationDays ?? 0,
    startsAt: data.startsAt?.toDate?.() ?? data.startsAt,
    endsAt: data.endsAt?.toDate?.() ?? data.endsAt,
    winnerCount: data.winnerCount ?? 1,
    status: data.status ?? 'draft',
    winners: data.winners,
    cooldownUntil: data.cooldownUntil?.toDate?.() ?? data.cooldownUntil,
    createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
    updatedAt: data.updatedAt?.toDate?.() ?? data.updatedAt,
  } as Raffle;
}

export async function getActiveRaffles(): Promise<Raffle[]> {
  const q = query(
    collection(db, RAFFLES_COLLECTION),
    where('status', 'in', ['active', 'cooldown', 'ended']),
    orderBy('endsAt', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => toRaffle(d)).filter((r): r is Raffle => r !== null);
}

export async function getUpcomingRaffles(): Promise<Raffle[]> {
  const q = query(
    collection(db, RAFFLES_COLLECTION),
    where('status', '==', 'draft'),
    orderBy('startsAt', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => toRaffle(d)).filter((r): r is Raffle => r !== null);
}

export async function getCompletedRaffles(): Promise<Raffle[]> {
  const q = query(
    collection(db, RAFFLES_COLLECTION),
    where('status', '==', 'completed'),
    orderBy('updatedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => toRaffle(d)).filter((r): r is Raffle => r !== null);
}

export async function getRaffleById(id: string): Promise<Raffle | null> {
  const docRef = doc(db, RAFFLES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  return toRaffle(docSnap);
}

export async function getAllRaffles(): Promise<Raffle[]> {
  const q = query(
    collection(db, RAFFLES_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => toRaffle(d)).filter((r): r is Raffle => r !== null);
}

export async function getEntriesForRaffle(raffleId: string): Promise<RaffleEntry[]> {
  const q = query(
    collection(db, ENTRIES_COLLECTION),
    where('raffleId', '==', raffleId),
    orderBy('purchasedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      raffleId: data.raffleId,
      stripePaymentIntentId: data.stripePaymentIntentId,
      stripeSessionId: data.stripeSessionId,
      email: data.email,
      displayName: data.displayName,
      ticketCount: data.ticketCount ?? 0,
      amountPaid: data.amountPaid ?? 0,
      status: data.status ?? 'pending',
      purchasedAt: data.purchasedAt?.toDate?.() ?? data.purchasedAt,
      fraudFlags: data.fraudFlags,
    } as RaffleEntry;
  });
}

export async function createRaffle(data: Omit<Raffle, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, RAFFLES_COLLECTION), {
    ...data,
    startsAt: data.startsAt instanceof Date ? Timestamp.fromDate(data.startsAt) : data.startsAt,
    endsAt: data.endsAt instanceof Date ? Timestamp.fromDate(data.endsAt) : data.endsAt,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateRaffle(id: string, updates: Partial<Raffle>): Promise<void> {
  const docRef = doc(db, RAFFLES_COLLECTION, id);
  const clean: Record<string, unknown> = { ...updates };
  if (updates.startsAt instanceof Date) clean.startsAt = Timestamp.fromDate(updates.startsAt);
  if (updates.endsAt instanceof Date) clean.endsAt = Timestamp.fromDate(updates.endsAt);
  if (updates.cooldownUntil instanceof Date) clean.cooldownUntil = Timestamp.fromDate(updates.cooldownUntil);
  clean.updatedAt = serverTimestamp();
  await updateDoc(docRef, clean as Record<string, import('firebase/firestore').FieldValue>);
}

export async function createRaffleEntry(data: Omit<RaffleEntry, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, ENTRIES_COLLECTION), {
    ...data,
    purchasedAt: data.purchasedAt instanceof Date ? Timestamp.fromDate(data.purchasedAt) : serverTimestamp(),
  });
  return docRef.id;
}

export async function updateRaffleEntry(id: string, updates: Partial<RaffleEntry>): Promise<void> {
  const docRef = doc(db, ENTRIES_COLLECTION, id);
  await updateDoc(docRef, { ...updates });
}
