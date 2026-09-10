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
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.SIGNIN,
        method: 'POST',
        body: { email: credentials.email },
      }),
      transformResponse: (response: unknown, _meta, request) => {
        const payload = extractApiData<Record<string, unknown> | string>(response);

        if (typeof payload === 'string') {
          return {
            token: payload,
            user: { id: request.email, email: request.email, name: request.email.split('@')[0], role: 'USER' },
          };
        }

        const body = payload ?? {};
        const rawUser = (body.user ?? body.User ?? body) as Record<string, unknown>;
        const token = String(body.token ?? body.accessToken ?? body.jwt ?? '');
        const fallbackName = `${rawUser.firstName ?? ''} ${rawUser.lastName ?? ''}`.trim() || request.email.split('@')[0];

        return {
          token,
          user: {
            id: String(rawUser.id ?? rawUser.userId ?? rawUser.employeeUserId ?? request.email),
            email: String(rawUser.email ?? rawUser.userName ?? request.email),
            name: String(rawUser.name ?? rawUser.fullName ?? rawUser.userName ?? fallbackName),
            role: String(rawUser.role ?? rawUser.roleName ?? 'USER'),
            department: rawUser.department as string | undefined,
            designation: rawUser.designation as string | undefined,
          },
          roleId: body.roleId as number | string | undefined,
          refreshToken: body.refreshToken as string | undefined,
        };
      },
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
