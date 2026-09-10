import { cookieStorage } from '@/shared/utils/cookie.utils';
import { AUTH_STORAGE_KEYS } from '../constants/auth.constants';

/**
 * Single Unified Token Store
 * All authentication tokens are stored exclusively under the single 'auth_token' browser cookie.
 */
export const tokenUtils = {
  /**
   * Retrieve auth token strictly from single 'auth_token' Cookie
   */
  getToken: (): string | null => {
    return cookieStorage.get(AUTH_STORAGE_KEYS.TOKEN) || cookieStorage.get();
  },

  /**
   * Set single auth token in Cookie ('auth_token')
   */
  setToken: (token: string): void => {
    // 1. Store strictly in single 'auth_token' cookie
    cookieStorage.set(AUTH_STORAGE_KEYS.TOKEN, token);
  },

  setRefreshToken: (token: string): void => {
    cookieStorage.set(AUTH_STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  /**
   * Clear auth token from Cookies
   */
  clearToken: (): void => {
    cookieStorage.remove(AUTH_STORAGE_KEYS.TOKEN);
    cookieStorage.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  },

  isTokenValid: (token?: string | null): boolean => {
    if (!token || token.length <= 10) return false;

    // JWT access tokens carry their expiry in the payload. Fall back to a
    // structural check for non-JWT tokens used by other auth providers.
    try {
      const [, encodedPayload] = token.split('.');
      if (!encodedPayload) return true;
      const normalizedPayload = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
      const paddedPayload = normalizedPayload.padEnd(
        normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
        '=',
      );
      const payload = JSON.parse(atob(paddedPayload));
      return typeof payload.exp !== 'number' || payload.exp * 1000 > Date.now();
    } catch {
      return true;
    }
  },
};
