import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

export {
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
};
