import { FC, useState } from 'react';
import * as auth from './auth-provider';
import { UnauthenticatedApp } from './unauthenticated-app';

const App: FC = () => {
  const [user, setUser] = useState(null);

  return <UnauthenticatedApp login={auth.login} register={auth.register} />;
};

export default App;
