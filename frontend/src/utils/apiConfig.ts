const LOCAL_API_BASE_URL = 'http://localhost:3005';
const DEPLOYED_API_BASE_URL = 'https://vercel-app-1-rho.vercel.app';

export const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? LOCAL_API_BASE_URL
    : DEPLOYED_API_BASE_URL;
