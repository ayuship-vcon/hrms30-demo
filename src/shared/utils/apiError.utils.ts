import type { ApiErrorResponse } from '../types/api.types';

export const getErrorMessage = (error: unknown, fallback: string = 'An error occurred'): string => {
  if (!error) return fallback;

  if (typeof error === 'string') return error;

  if (typeof error === 'object' && error !== null) {
    const apiError = error as Partial<ApiErrorResponse> & { message?: string; data?: { message?: string } };
    if (apiError.data?.message) return apiError.data.message;
    if (apiError.message) return apiError.message;
  }

  return fallback;
};
