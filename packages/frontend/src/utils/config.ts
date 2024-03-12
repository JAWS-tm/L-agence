const DEV_CONFIG = {
  API_URL: 'http://localhost:3000/api',
  PUBLIC_CONTENT_URL: 'http://localhost:3000',
};

const PROD_CONFIG = {
  API_URL: 'https://lagence.jules-dempt.com/api',
  PUBLIC_CONTENT_URL: 'https://lagence.jules-dempt.com/resources',
};

export const CONFIG =
  process.env.NODE_ENV === 'production' ? PROD_CONFIG : DEV_CONFIG;
