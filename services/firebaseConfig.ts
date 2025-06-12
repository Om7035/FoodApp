import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAn9B4BuLpVTnbjdm525V4Y_bYzlpr2p80',
  authDomain: 'nproj-8288c.firebaseapp.com',
  projectId: 'nproj-8288c',
  storageBucket: 'nproj-8288c.firebasestorage.app',
  messagingSenderId: '58919672198',
  appId: '1:58919672198:android:c5e40b449b0fea351eb407',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 