import React, { FC, useEffect } from 'react';

import { UnauthenticatedApp } from './unauthenticated-app';
import { AuthenticatedApp } from './authenticated-app';

import {
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  getUser,
} from './firebase/auth';

import { auth } from './firebase';

import { useAsync } from './utils/hooks';

const App: FC = () => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  useEffect(() => {
    run(getUser());
  }, [run, auth]);

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
