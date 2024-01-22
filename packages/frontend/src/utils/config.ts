const DEV_CONFIG = {
  API_URL: 'http://localhost:3000/api',
  PUBLIC_CONTENT_URL: 'http://localhost:3000',
};

const PROD_CONFIG = {
  API_URL: 'http://192.168.56.10:3000/api',
  PUBLIC_CONTENT_URL: 'http://192.168.56.10:3000',
};

export const CONFIG =https://github.com/JAWS-tm/L-agence/edit/master/packages/frontend/src/utils/config.ts
  process.env.NODE_ENV === 'production' ? PROD_CONFIG : DEV_CONFIG;
