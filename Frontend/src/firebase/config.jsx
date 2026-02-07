// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyCV7dCTXccFZkVplx9sV0RkRILssVK3Az4",

  authDomain: "krishivaani-7b326.firebaseapp.com",

  projectId: "krishivaani-7b326",

  storageBucket: "krishivaani-7b326.firebasestorage.app",

  messagingSenderId: "1018213021441",

  appId: "1:1018213021441:web:67d9ebeb6f9c1d56774d00",

  measurementId: "G-XYS3H6RX13"

};


// Check if Firebase config is properly set
const isConfigValid = Object.values(firebaseConfig).every(value => 
  value && !value.includes('your-')
);

if (!isConfigValid) {
  console.warn('Firebase configuration not properly set. Please update src/firebase/config.js with your actual Firebase config values.');
}

let app, auth, db;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app);
  
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app);
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { auth, db };
export default app;