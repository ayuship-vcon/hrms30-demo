export const AUTH_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'auth_user',
  THEME: 'app_theme',
} as const;

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Signed in successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  SESSION_EXPIRED: 'Session expired, please sign in again.',
  UNAUTHORIZED: 'You are not authorized to view this section.',
} as const;
