import React, { FC, useState, useEffect } from 'react';

import { UnauthenticatedApp } from './unauthenticated-app';

import * as auth from './firebase/auth';

const App: FC = () => {
  const [user, setUser] = useState(null);

  const login = (email: string, password: string) =>
    auth
      .signInAuthUserWithEmailAndPassword(email, password)
      .then((u: any) => setUser(u));

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  return (
    <UnauthenticatedApp
      login={login}
      register={auth.createAuthUserWithEmailAndPassword}
    />
  );
};

export default App;
