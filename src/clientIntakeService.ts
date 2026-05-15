import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const CLIENT_INTAKE_COLLECTION = 'client_intake_forms';

export interface ClientIntakeForm {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
}

export async function submitClientIntakeForm(data: ClientIntakeForm): Promise<string> {
  const docRef = await addDoc(collection(db, CLIENT_INTAKE_COLLECTION), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
