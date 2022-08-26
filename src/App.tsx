import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { AuthenticatedApp } from 'authenticated-app';

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

  return user ? (
    <Router>
      <AuthenticatedApp user={user} />
    </Router>
  ) : (
    <UnauthenticatedApp />
  );
};

export default App;
