import { cookieStorage } from './cookie.utils';

/**
 * Universal Storage Abstraction (100% Cookie-Backed)
 * All application persistence is performed securely via Browser Cookies.
 */
export const storage = {
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      return cookieStorage.getJSON<T>(key, defaultValue);
    } catch {
      return defaultValue ?? null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      cookieStorage.setJSON<T>(key, value);
    } catch (e) {
      console.error('Cookie storage set error:', e);
    }
  },

  remove(key: string): void {
    try {
      cookieStorage.remove(key);
    } catch (e) {
      console.error('Cookie storage remove error:', e);
    }
  },

  clear(): void {
    try {
      cookieStorage.clear();
    } catch (e) {
      console.error('Cookie storage clear error:', e);
    }
  },
};
