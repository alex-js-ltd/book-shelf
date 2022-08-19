import GoTrue from 'gotrue-js';

const localStorageKey = '__auth_provider_token__';

const authURL = process.env.REACT_APP_AUTH_URL;

let auth = new GoTrue({
  APIUrl: authURL,
  audience: '',
  setCookie: false,
});

const handleUserResponse = (user: any) => {
  console.log('user', user);
  window.localStorage.setItem(localStorageKey, user.id);
  return user;
};

const register = ({ email, password }: any) => {
  return auth
    .signup(email, password)
    .then(handleUserResponse)
    .catch((error) => console.log("It's an error", error));
};

async function getToken() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return window.localStorage.getItem(localStorageKey);
}

export { register, getToken };
