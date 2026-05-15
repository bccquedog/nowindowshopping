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

const TECH_CLIENTS_COLLECTION = 'tech_clients';
const PROJECTS_COLLECTION = 'tech_projects';
const TICKETS_COLLECTION = 'tech_tickets';

export type ClientStatus = 'active' | 'onboarding' | 'maintenance' | 'inactive';
export type ProjectStatus = 'planning' | 'in-progress' | 'testing' | 'completed' | 'on-hold';
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TechClient {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: ClientStatus;
  onboardingDate: any;
  lastContactDate: any;
  notes: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual' | 'project-based';
  createdAt: any;
  updatedAt: any;
}

export interface TechProject {
  id: string;
  clientId: string;
  title: string;
  description: string;
  status: ProjectStatus;
  startDate: any;
  endDate?: any;
  budget: number;
  spent: number;
  githubRepo?: string;
  liveUrl?: string;
  createdAt: any;
  updatedAt: any;
}

export interface TechTicket {
  id: string;
  clientId: string;
  projectId?: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  createdAt: any;
  updatedAt: any;
}

// Client API
export async function getAllTechClients(): Promise<TechClient[]> {
  const q = query(collection(db, TECH_CLIENTS_COLLECTION), orderBy('name', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    onboardingDate: doc.data().onboardingDate?.toDate?.() ?? doc.data().onboardingDate,
    lastContactDate: doc.data().lastContactDate?.toDate?.() ?? doc.data().lastContactDate,
    createdAt: doc.data().createdAt?.toDate?.() ?? doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate?.() ?? doc.data().updatedAt,
  } as TechClient));
}

export async function createTechClient(data: Omit<TechClient, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, TECH_CLIENTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateTechClient(id: string, updates: Partial<TechClient>): Promise<void> {
  const docRef = doc(db, TECH_CLIENTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

// Project API
export async function getClientProjects(clientId: string): Promise<TechProject[]> {
  const q = query(collection(db, PROJECTS_COLLECTION), where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    startDate: doc.data().startDate?.toDate?.() ?? doc.data().startDate,
    endDate: doc.data().endDate?.toDate?.() ?? doc.data().endDate,
    createdAt: doc.data().createdAt?.toDate?.() ?? doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate?.() ?? doc.data().updatedAt,
  } as TechProject));
}

export async function createTechProject(data: Omit<TechProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Ticket API
export async function getClientTickets(clientId: string): Promise<TechTicket[]> {
  const q = query(collection(db, TICKETS_COLLECTION), where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() ?? doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate?.() ?? doc.data().updatedAt,
  } as TechTicket));
}

export async function createTechTicket(data: Omit<TechTicket, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, TICKETS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}
