import type { User } from '../types/auth.types';
import { storage } from '@/shared/utils/storage.utils';
import { AUTH_STORAGE_KEYS } from '../constants/auth.constants';

export const authUtils = {
  getStoredUser: (): User | null => {
    return storage.get<User>(AUTH_STORAGE_KEYS.USER);
  },

  setStoredUser: (user: User): void => {
    storage.set(AUTH_STORAGE_KEYS.USER, user);
  },

  clearStoredUser: (): void => {
    storage.remove(AUTH_STORAGE_KEYS.USER);
  },
};
