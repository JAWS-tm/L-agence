const DEV_CONFIG = {
  API_URL: 'http://localhost:3000/api',
  PUBLIC_CONTENT_URL: 'http://localhost:3000',
};

const SITE_URL = process.env.SITE_URL || 'http://unknown';
const PROD_CONFIG = {
  API_URL: `${SITE_URL}/api`,
  PUBLIC_CONTENT_URL: `${SITE_URL}/resources`,
};

export const CONFIG =
  process.env.NODE_ENV === 'production' ? PROD_CONFIG : DEV_CONFIG;
