import React, { FC, useState, useEffect } from 'react';
import * as auth from './auth';
import { UnauthenticatedApp } from './unauthenticated-app';

const App: FC = () => {
  const [user, setUser] = useState(null);

  const login = (form: any) => auth.login(form).then((u: any) => setUser(u));

  const register = (form: any) =>
    auth.register(form).then((u: any) => setUser(u));

  return <UnauthenticatedApp login={login} register={register} />;
};

export default App;
