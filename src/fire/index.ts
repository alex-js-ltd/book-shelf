import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAUzRJ6RGgda7eJeiu-I1xkHZFDmNWTQK0',
  authDomain: 'epic-react-app.firebaseapp.com',
  projectId: 'epic-react-app',
  storageBucket: 'epic-react-app.appspot.com',
  messagingSenderId: '1027566536348',
  appId: '1:1027566536348:web:179a41bb9568d64972cf59',
  measurementId: 'G-NZQSLNB1BL',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
