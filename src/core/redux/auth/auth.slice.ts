import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/features/authentication/core/types';
import { tokenUtils, authUtils } from '@/features/authentication/core/utils';

// Pure authentication state derived from real Cookie token and stored session
const initialToken = tokenUtils.getToken();
const initialUser = authUtils.getStoredUser();
const hasValidInitialSession = Boolean(tokenUtils.isTokenValid(initialToken) && initialUser);

if (initialToken && !hasValidInitialSession) {
  tokenUtils.clearToken();
  authUtils.clearStoredUser();
}

const initialState: AuthState = {
  user: initialUser,
  token: initialToken,
  isAuthenticated: hasValidInitialSession,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken?: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      tokenUtils.setToken(action.payload.token);
      if (action.payload.refreshToken) {
        tokenUtils.setRefreshToken(action.payload.refreshToken);
      }
      authUtils.setStoredUser(action.payload.user);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      tokenUtils.clearToken();
      authUtils.clearStoredUser();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
