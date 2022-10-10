import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { queryClient } from 'context';
import * as auth from 'auth-provider';
import { client } from 'utils/api-client';
import { useAsync } from 'utils/hooks';

type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext<
  | { user: any; login: Function; register: Function; logout: Function }
  | undefined
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

  const login = useCallback(
    (form: any) => auth.login(form).then((user) => setData(user)),
    [setData]
  );

  const register = useCallback(
    (form: any) => auth.register(form).then((user) => setData(user)),
    [setData]
  );

  const logout = useCallback(() => {
    auth.logout();
    queryClient.clear();
    setData(null);
  }, [setData]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const value = useMemo(
    () => ({ user, login, logout, register }),
    [login, logout, register, user]
  );

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContext provider`);
  }
  return context;
};

const useClient = () => {
  const { user } = useAuth();
  const token = user?.idToken;
  return useCallback(
    (endpoint: string, config: any) => client(endpoint, { ...config, token }),
    [token]
  );
};

export { AuthProvider, useAuth, useClient };
