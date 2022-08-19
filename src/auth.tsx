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
  window.localStorage.setItem(localStorageKey, user);
  return user;
};

const register = ({ email, password }: any) => {
  return auth
    .signup(email, password)
    .then((response) => console.log('Confirmation email sent', response))
    .then(handleUserResponse)
    .catch((error) => console.log("It's an error", error));
};

export { register };
