import * as React from 'react';
import { useAuth } from './context/auth-context';
import { FullPageSpinner } from 'comps/lib';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App = () => {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <h1>hello</h1> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
