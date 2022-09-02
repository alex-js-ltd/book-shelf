import React, { FC } from 'react';

import { UnauthenticatedApp } from 'unauthenticated-app';
import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';

const App: FC = () => {
  const { user } = useAuth();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
