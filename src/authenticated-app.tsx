import React, { FC } from 'react';
import * as auth from './firebase/auth';

const AuthenticatedApp: FC = () => {
  return <div onClick={() => auth.signOutUser()}>SIGN OUT</div>;
};

export { AuthenticatedApp };
