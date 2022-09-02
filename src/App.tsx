import * as React from 'react';
import { useAuth } from './context/auth-context';

import UnauthenticatedApp from './unauthenticated-app';
import AuthenticatedApp from './authenticated-app';

const App: React.FC = () => {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
