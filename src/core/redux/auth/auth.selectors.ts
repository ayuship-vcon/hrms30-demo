import type { AuthState } from '@/features/authentication/core/types';

export const selectAuthState = (state: { auth: AuthState }): AuthState => state.auth;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;

export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;

export const selectIsAuthenticated = (state: { auth: AuthState }): boolean =>
  state.auth.isAuthenticated;

export const selectAuthLoading = (state: { auth: AuthState }): boolean => state.auth.isLoading;

export const selectAuthError = (state: { auth: AuthState }): string | null => state.auth.error;
