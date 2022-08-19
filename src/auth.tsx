// @ts-nocheck
import GoTrue from 'gotrue-js';

const localStorageKey = '__auth_provider_token__';

const authURL = process.env.REACT_APP_AUTH_URL;

let auth = new GoTrue({
  APIUrl: authURL,
  audience: '',
  setCookie: false,
});

const register = ({ email, password }: any) => {
  return auth
    .signup(email, password)
    .then((response) => console.log('Confirmation email sent', response))
    .catch((error) => console.log("It's an error", error));
};

// const login = ({ email, password }: any) => {
//   return auth
//     .login(email, password, true)
//     .then((response) => console.log('login success', response))
//     .catch((error) => console.log("It's an error", error));
// };

const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    auth
      .login(email, password)
      .then((response) => {
        resolve(response);
        console.log('res', response);
      })
      .catch((error) => {
        reject(error.json);
      });
  });
};

export { register, login };
