function getEnv() {
  return {
    SIGN_IN_URL: process.env.REACT_APP_SIGN_IN_URL,
    SIGN_UP_URL: process.env.REACT_APP_SIGN_UP_URL,
    REFRESH_URL: process.env.REACT_APP_REFRESH_URL,
    API_URL: process.env.REACT_APP_API_URL,
  }
}

type ENV = ReturnType<typeof getEnv>

// App puts these on
declare global {
  // eslint-disable-next-line
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}

export { getEnv }
