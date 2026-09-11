import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '@/config/env.config';
import { tokenUtils } from '@/features/authentication/core/utils/token.utils';

export function extractApiData<T>(response: unknown): T {
  if (response && typeof response === 'object') {
    const body = response as Record<string, unknown>;
    if ('data' in body) return body.data as T;
    if ('Data' in body) return body.Data as T;
  }
  return response as T;
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    timeout: ENV.apiTimeout,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      const token = tokenUtils.getToken();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Menu', 'Employees', 'Roles', 'Leave', 'Attendance', 'Holidays', 'Organization', 'AdminSettings', 'AuditLogs'],
  endpoints: () => ({}),
});
