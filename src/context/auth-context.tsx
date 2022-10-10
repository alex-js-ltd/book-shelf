import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import * as auth from 'auth-provider';
import { client } from 'utils/api-client';
import { useAsync } from 'utils/hooks';

type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext<
  { user: any; login: Function; register: Function } | undefined
>(undefined);

AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  const login = React.useCallback(
    (form: any) => auth.login(form).then((user) => setData(user)),
    [setData]
  );

  const register = React.useCallback(
    (form: any) => auth.register(form).then((user) => setData(user)),
    [setData]
  );

  const value = { user, login, register };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContext provider`);
  }
  return context;
};

export { AuthProvider, useAuth };
