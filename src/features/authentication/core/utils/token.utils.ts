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

  /**
   * Clear auth token from Cookies
   */
  clearToken: (): void => {
    cookieStorage.remove(AUTH_STORAGE_KEYS.TOKEN);
    cookieStorage.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  },

  isTokenValid: (token?: string | null): boolean => {
    return Boolean(token && token.length > 10);
  },
};
