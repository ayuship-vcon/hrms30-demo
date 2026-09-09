import { ENV } from '@/config/env.config';

export interface SetCookieOptions {
  expiresDays?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
  domain?: string;
}

export const cookieStorage = {
  /**
   * Get a string cookie value by name
   */
  get(name: string = ENV.cookie.name): string | null {
    if (typeof document === 'undefined') return null;

    const cookiePrefix = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookiePrefix) === 0) {
        return decodeURIComponent(cookie.substring(cookiePrefix.length));
      }
    }
    return null;
  },

  /**
   * Get a parsed JSON cookie value by name
   */
  getJSON<T>(name: string, defaultValue?: T): T | null {
    const raw = this.get(name);
    if (!raw) return defaultValue ?? null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return (raw as unknown as T) ?? defaultValue ?? null;
    }
  },

  /**
   * Set a string cookie value with options
   */
  set(
    name: string = ENV.cookie.name,
    value: string,
    options: SetCookieOptions = {}
  ): void {
    if (typeof document === 'undefined') return;

    const days = options.expiresDays ?? ENV.cookie.expiresDays ?? 7;
    const path = options.path ?? ENV.cookie.path ?? '/';
    const secure = options.secure ?? ENV.cookie.secure ?? false;
    const sameSite = options.sameSite ?? ENV.cookie.sameSite ?? 'Lax';

    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=${path}; SameSite=${sameSite}`;

    if (secure) {
      cookieString += '; Secure';
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    document.cookie = cookieString;
  },

  /**
   * Set a JSON object / primitive into a cookie
   */
  setJSON<T>(
    name: string,
    value: T,
    options: SetCookieOptions = {}
  ): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    this.set(name, stringValue, options);
  },

  /**
   * Remove / Delete a cookie by name
   */
  remove(name: string = ENV.cookie.name, path: string = ENV.cookie.path || '/'): void {
    if (typeof document === 'undefined') return;
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  },

  /**
   * Check if cookie exists
   */
  has(name: string = ENV.cookie.name): boolean {
    return Boolean(this.get(name));
  },

  /**
   * Delete all accessible cookies
   */
  clear(): void {
    if (typeof document === 'undefined') return;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      if (name) {
        this.remove(name);
      }
    }
  },
};
