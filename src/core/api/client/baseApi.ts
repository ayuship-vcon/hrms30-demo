import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';

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
  // UI-only demo mode: preserve feature query contracts without making network requests.
  baseQuery: (async () => ({ data: [] })) as BaseQueryFn,
  tagTypes: ['Auth', 'Menu', 'Employees', 'Roles', 'Leave', 'Attendance', 'Holidays', 'AdminSettings', 'AuditLogs', 'HorizontalOrganizations', 'Organization'],
  endpoints: () => ({}),
});
