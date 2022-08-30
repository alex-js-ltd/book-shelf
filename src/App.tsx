import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';

const App: FC = () => {
  const { user } = useAuth();

  return user ? (
    <Router>
      <AuthenticatedApp />
    </Router>
  ) : (
    <UnauthenticatedApp />
  );
};

export default App;
