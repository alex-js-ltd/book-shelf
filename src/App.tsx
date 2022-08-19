import React, { FC, useState, useEffect } from 'react';
import * as auth from './auth-provider';
import { UnauthenticatedApp } from './unauthenticated-app';

const App: FC = () => {
  const [user, setUser] = useState(null);

  const login = (form: any) => auth.login(form).then((u) => setUser(u));

  const register = (form: any) => auth.register(form).then((u) => setUser(u));

  useEffect(() => {
    console.log(user);
  }, [user]);

  return <UnauthenticatedApp login={login} register={register} />;
};

export default App;
