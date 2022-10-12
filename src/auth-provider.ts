const loginURL = process.env.REACT_APP_SIGN_IN_URL;
const registerURL = process.env.REACT_APP_SIGN_UP_URL;
const localStorageKey = '__auth_provider_token__';

type AuthData = {
  displayName?: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: string;
};

export type FormData = {
  email: string;
  password: string;
};

type ClientData = {
  email: string;
  password: string;
  returnSecureToken: boolean;
};

async function getToken() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(user: AuthData) {
  window.localStorage.setItem(localStorageKey, user.idToken);
  return user;
}

function login({ email, password }: FormData) {
  return client(loginURL, { email, password, returnSecureToken: true }).then(
    handleUserResponse
  );
}

function register({ email, password }: FormData) {
  return client(registerURL, { email, password, returnSecureToken: true }).then(
    handleUserResponse
  );
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

async function client(
  endpoint: string | undefined,
  data: ClientData
): Promise<AuthData> {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };

  return window.fetch(`${endpoint}`, config).then(async (response) => {
    const data = await response.json();

    console.log('data', data);
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { getToken, login, register, logout, localStorageKey };
