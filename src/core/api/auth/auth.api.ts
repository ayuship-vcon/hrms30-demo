import type {
  AuthSessionResponse,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from './authApi.types';
import type { User } from '@/features/authentication/core/types/auth.types';
import { API_ENDPOINTS } from '@/shared/constants';
import { baseApi, extractApiData } from '../client/baseApi';

export const authQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthSessionResponse, LoginRequest>({
      query: (credentials) => ({ url: API_ENDPOINTS.AUTH.SIGNIN, params: credentials }),
      transformResponse: (response: unknown) => extractApiData<AuthSessionResponse>(response),
      invalidatesTags: ['Auth', 'Menu'],
    }),

    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<{ message: string }>(response),
    }),

    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<{ message: string }>(response),
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => '/Users/current',
      transformResponse: (response: unknown) => extractApiData<User>(response),
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
} = authQueries;
