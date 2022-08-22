import React, { FC, useEffect, useState } from 'react';

import { UnauthenticatedApp } from './unauthenticated-app';
import { AuthenticatedApp } from './authenticated-app';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

  return user ? <AuthenticatedApp user={user} /> : <UnauthenticatedApp />;
};

export default App;
