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
  deleteDoc
} from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';

// Initialize Firebase if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const GLOBAL_TICKETS_COLLECTION = 'global_tickets';

export type TicketStatus = 'new' | 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'technical' | 'billing' | 'coaching' | 'webstore' | 'raffle' | 'other';

export interface GlobalTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  adminNotes?: string;
  createdAt: any;
  updatedAt: any;
}

// Public API
export async function createGlobalTicket(data: Omit<GlobalTicket, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'adminNotes'>): Promise<string> {
  const docRef = await addDoc(collection(db, GLOBAL_TICKETS_COLLECTION), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Admin API
export async function getAllGlobalTickets(): Promise<GlobalTicket[]> {
  const q = query(collection(db, GLOBAL_TICKETS_COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() ?? doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate?.() ?? doc.data().updatedAt,
  } as GlobalTicket));
}

export async function updateGlobalTicket(id: string, updates: Partial<GlobalTicket>): Promise<void> {
  const docRef = doc(db, GLOBAL_TICKETS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGlobalTicket(id: string): Promise<void> {
  await deleteDoc(doc(db, GLOBAL_TICKETS_COLLECTION, id));
}
