const DEV_CONFIG = {
  API_URL: 'http://localhost:3000/api',
  PUBLIC_CONTENT_URL: 'http://localhost:3000',
};

// Use the origin because there's a reverse proxy in front of the frontend
const SITE_URL = window.location.origin;
const PROD_CONFIG = {
  API_URL: `${SITE_URL}/api`,
  PUBLIC_CONTENT_URL: `${SITE_URL}/resources`,
};

export const CONFIG =
  process.env.NODE_ENV === 'production' ? PROD_CONFIG : DEV_CONFIG;
