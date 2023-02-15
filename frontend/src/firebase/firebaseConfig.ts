import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDZxUHYQprxEsfnRCD9-sWlr0OVI5GM6Qo',
  authDomain: 'oceanreport.firebaseapp.com',
  projectId: 'oceanreport',
  storageBucket: 'oceanreport.appspot.com',
  messagingSenderId: '372264307541',
  appId: '1:372264307541:web:a5f51657244e7374fc7ddc',
  measurementId: 'G-NH08KMQMCJ'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();
const db = getFirestore();

export default app;
