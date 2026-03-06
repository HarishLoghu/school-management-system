/**
 * API base URL with fallback for local development.
 * Ensures Network Error is avoided when .env variables aren't loaded.
 */
export const API_BASE_URL =
  process.env.REACT_APP_BASE_URL?.trim() || 'http://localhost:5000';
