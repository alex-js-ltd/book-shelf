import React, { FC, useEffect, useState } from 'react';

import { UnauthenticatedApp } from './unauthenticated-app';
import { AuthenticatedApp } from './authenticated-app';

import {
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
} from './firebase/auth';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const App: FC = () => {
  const [user, setUser] = useState<any>(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // ...
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, [auth]);

  const test = async () => {
    try {
      const docRef = await addDoc(collection(db, 'books'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {}, []);

  return user ? (
    <AuthenticatedApp user={user} />
  ) : (
    <UnauthenticatedApp
      login={signInAuthUserWithEmailAndPassword}
      register={createAuthUserWithEmailAndPassword}
    />
  );
};

export default App;
