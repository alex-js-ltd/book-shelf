import React, { FC, useState, useEffect } from 'react';
import * as auth from './auth';
import { UnauthenticatedApp } from './unauthenticated-app';

const App: FC = () => {
  const [user, setUser] = useState(null);

  const register = (form: any) =>
    auth.register(form).then((u: any) => setUser(u));

  useEffect(() => {
    console.log('get token', auth.getToken());
  }, [user]);

  return <UnauthenticatedApp login={register} register={register} />;
};

export default App;
