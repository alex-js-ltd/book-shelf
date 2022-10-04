import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { app } from 'utils/firebase/index';

type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext<
  | { user: User | null; login: Function; register: Function; logout: Function }
  | undefined
>(undefined);

AuthContext.displayName = 'AuthContext';

const auth = getAuth(app);

const register = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

const login = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
  return await signOut(auth);
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Auth listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = { user, register, login, logout };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContext provider`);
  }
  return context;
};

export { AuthProvider, useAuth };
