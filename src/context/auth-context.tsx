import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext<{ user: User | null }>({ user: null });
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props: any) => {
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

  const value = { user };

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContext provider`);
  }
  return context;
};

export { AuthProvider, AuthContext, useAuth };
