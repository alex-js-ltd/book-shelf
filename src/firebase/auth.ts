import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from './index';

const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

const getUser = async () => {
  let user = null;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      user = user;
    }
  });

  return user;
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export {
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  getUser,
  signOutUser,
};
