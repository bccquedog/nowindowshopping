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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { fallbackListedItems } from './fallbackInventory';

// Initialize Firebase if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);

const ITEMS_COLLECTION = 'items';
const SALES_COLLECTION = 'sales';

export type ItemStatus = 'KEEP' | 'SELL' | 'LISTED' | 'SOLD';
export type ItemType = 'sneaker' | 'funko';

export interface WebstoreItem {
  id: string;
  type: ItemType;
  title: string;
  slug: string;
  brand?: string;
  styleId?: string;
  size?: string;
  condition: string; // 1-10 or enum
  box: boolean;
  tags: string[];
  purchasePrice: number;
  listPrice: number;
  salePrice?: number;
  fees?: number;
  netProfit?: number;
  status: ItemStatus;
  images: string[];
  storageLocation: string;
  notes: string;
  stripePaymentLinkUrl?: string;
  createdAt: any;
  updatedAt: any;
}

export interface SaleRecord {
  id: string;
  itemId: string;
  soldAt: any;
  platform: 'NWS' | 'EBAY' | 'STOCKX' | 'WHATNOT' | 'OTHER';
  buyerEmail?: string;
  salePrice: number;
  fees: number;
  netProfit: number;
  trackingNumber?: string;
}

// Item Converters
const toWebstoreItem = (docSnap: DocumentSnapshot): WebstoreItem | null => {
  const data = docSnap.data();
  if (!data) return null;
  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
    updatedAt: data.updatedAt?.toDate?.() ?? data.updatedAt,
  } as WebstoreItem;
};

const toDeadstockIfSneaker = (item: WebstoreItem): WebstoreItem =>
  item.type === 'sneaker' ? { ...item, condition: '10' } : item;

const withTimeout = <T>(promise: Promise<T>, ms: number, fallbackValue: T): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallbackValue), ms)),
  ]);

// Public API
export async function getListedItems(type?: ItemType): Promise<WebstoreItem[]> {
  const fallback = (type ? fallbackListedItems.filter((item) => item.type === type) : fallbackListedItems).map(
    toDeadstockIfSneaker
  );

  const fetchFromFirestore = async (): Promise<WebstoreItem[]> => {
    let q = query(
      collection(db, ITEMS_COLLECTION),
      where('status', '==', 'LISTED'),
      orderBy('createdAt', 'desc')
    );
    if (type) {
      q = query(q, where('type', '==', type));
    }
    const snapshot = await getDocs(q);
    const liveItems = snapshot.docs
      .map(toWebstoreItem)
      .filter((item): item is WebstoreItem => item !== null)
      .map(toDeadstockIfSneaker);
    if (liveItems.length === 0) return fallback;
    const fallbackWithoutDupes = fallback.filter(
      (fallbackItem) => !liveItems.some((liveItem) => liveItem.slug === fallbackItem.slug)
    );
    return [...liveItems, ...fallbackWithoutDupes];
  };

  try {
    return await withTimeout(fetchFromFirestore(), 4000, fallback);
  } catch (error) {
    console.warn('Falling back to bundled webstore inventory:', error);
    return fallback;
  }
}

export async function getItemBySlug(slug: string): Promise<WebstoreItem | null> {
  try {
    const q = query(collection(db, ITEMS_COLLECTION), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const item = toWebstoreItem(snapshot.docs[0]);
      return item ? toDeadstockIfSneaker(item) : null;
    }
  } catch (error) {
    console.warn('Using fallback product detail due to Firestore lookup issue:', error);
  }

  const fallbackItem = fallbackListedItems.find((item) => item.slug === slug);
  return fallbackItem ? toDeadstockIfSneaker(fallbackItem) : null;
}

// Admin API
export async function getAllItems(): Promise<WebstoreItem[]> {
  const q = query(collection(db, ITEMS_COLLECTION), orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(toWebstoreItem)
    .filter((item): item is WebstoreItem => item !== null)
    .map(toDeadstockIfSneaker);
}

export async function createItem(data: Omit<WebstoreItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, ITEMS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateItem(id: string, updates: Partial<WebstoreItem>): Promise<void> {
  const docRef = doc(db, ITEMS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteItem(id: string): Promise<void> {
  await deleteDoc(doc(db, ITEMS_COLLECTION, id));
}

// Image Upload
export async function uploadItemImage(itemId: string, file: File): Promise<string> {
  const storageRef = ref(storage, `items/${itemId}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

// Sales API
export async function recordSale(saleData: Omit<SaleRecord, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, SALES_COLLECTION), {
    ...saleData,
    soldAt: serverTimestamp(),
  });
  
  // Update item status to SOLD
  await updateItem(saleData.itemId, { 
    status: 'SOLD',
    salePrice: saleData.salePrice,
    fees: saleData.fees,
    netProfit: saleData.netProfit
  });
  
  return docRef.id;
}

export async function getSales(daysLimit?: number): Promise<SaleRecord[]> {
  let q = query(collection(db, SALES_COLLECTION), orderBy('soldAt', 'desc'));
  
  if (daysLimit) {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - daysLimit);
    q = query(q, where('soldAt', '>=', Timestamp.fromDate(dateLimit)));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    soldAt: doc.data().soldAt?.toDate?.() ?? doc.data().soldAt,
  } as SaleRecord));
}
