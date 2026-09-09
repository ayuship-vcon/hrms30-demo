export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Signed in successfully. Welcome back!',
    LOGOUT_SUCCESS: 'You have been logged out successfully.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
    INVALID_CREDENTIALS: 'The email or password you entered is incorrect.',
  },
  COMMON: {
    SAVE_SUCCESS: 'Changes saved successfully.',
    DELETE_SUCCESS: 'Item deleted successfully.',
    NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
    GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  },
  LEAVE: {
    REQUEST_SUBMITTED: 'Leave application submitted successfully for review.',
    REQUEST_APPROVED: 'Leave application approved.',
    REQUEST_REJECTED: 'Leave application rejected.',
  },
} as const;
