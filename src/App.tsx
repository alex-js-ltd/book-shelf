import React, { FC, useEffect, useState } from 'react';

import { UnauthenticatedApp } from './unauthenticated-app';
import { AuthenticatedApp } from './authenticated-app';

import {
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
} from './firebase/auth';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/index';

const App: FC = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  return user ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp
      login={signInAuthUserWithEmailAndPassword}
      register={createAuthUserWithEmailAndPassword}
    />
  );
};

export default App;
