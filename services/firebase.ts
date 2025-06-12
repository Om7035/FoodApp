import { collection, getDocs, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  timestamp: Date;
  status: 'pending' | 'preparing' | 'completed';
}

export async function getMenuItems(): Promise<MenuItem[]> {
  return new Promise((resolve, reject) => {
    try {
      const menuCollection = collection(db, 'menuItems');
      const unsubscribe = onSnapshot(menuCollection, (menuSnapshot) => {
        const items = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as MenuItem));
        resolve(items);
        unsubscribe(); // Only fetch once for this call
      }, (error) => {
        reject(error);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function createOrder(orderData: Omit<Order, 'id'>): Promise<string> {
  try {
    const ordersCollection = collection(db, 'orders');
    const docRef = await addDoc(ordersCollection, orderData);
    return docRef.id;
  } catch (err) {
    throw err;
  }
}

export async function getOrders(): Promise<Order[]> {
  return new Promise((resolve, reject) => {
    try {
      const ordersCollection = collection(db, 'orders');
      const ordersQuery = query(ordersCollection, orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(ordersQuery, (ordersSnapshot) => {
        const orders = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : doc.data().timestamp
        } as Order));
        resolve(orders);
        unsubscribe(); // Only fetch once for this call
      }, (error) => {
        reject(error);
      });
    } catch (err) {
      reject(err);
    }
  });
}

/*
FIREBASE SETUP INSTRUCTIONS:

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database
3. Create a firebaseConfig.ts file with your configuration:

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

4. Replace the mock functions above with real Firebase calls:

import { collection, getDocs, addDoc, orderBy, query } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function getMenuItems(): Promise<MenuItem[]> {
  const menuCollection = collection(db, 'menuItems');
  const menuSnapshot = await getDocs(menuCollection);
  return menuSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MenuItem));
}

export async function createOrder(orderData: Omit<Order, 'id'>): Promise<string> {
  const ordersCollection = collection(db, 'orders');
  const docRef = await addDoc(ordersCollection, orderData);
  return docRef.id;
}

export async function getOrders(): Promise<Order[]> {
  const ordersCollection = collection(db, 'orders');
  const ordersQuery = query(ordersCollection, orderBy('timestamp', 'desc'));
  const ordersSnapshot = await getDocs(ordersQuery);
  return ordersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate()
  } as Order));
}

5. Create your Firestore collections:
   - 'menuItems' collection with documents containing: name, description, price, image, category
   - 'orders' collection will be created automatically when orders are placed

6. Set up Firestore security rules for production use
*/