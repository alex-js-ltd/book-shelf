import { queryClient } from 'context';
import * as auth from 'auth-provider';
const apiURL = process.env.REACT_APP_API_URL;

type Config = {
  data: any;
  token: string;
};

async function client(endpoint: string, { data, token }: Config) {
  const getConfig = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const patchConfig = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  let config = data ? patchConfig : getConfig;

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        queryClient.clear();
        await auth.logout();
        // refresh the page for them
        window.location.assign(window.location.href);
        return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
