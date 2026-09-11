import { API_ENDPOINTS } from '@/shared/constants';
import { baseApi, extractApiData } from '../client/baseApi';
import type { CoreRole } from './rolesApi.types';

const extractItems = (response: unknown): CoreRole[] => {
  const payload = extractApiData<unknown>(response);
  if (Array.isArray(payload)) return payload as CoreRole[];
  if (payload && typeof payload === 'object') {
    const items = (payload as Record<string, unknown>).items;
    if (Array.isArray(items)) return items as CoreRole[];
  }
  return [];
};

export const rolesQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoreRoles: builder.query<CoreRole[], void>({
      query: () => API_ENDPOINTS.ROLES.ROOT,
      transformResponse: extractItems,
      providesTags: ['Roles'],
    }),
  }),
});

export const { useGetCoreRolesQuery } = rolesQueries;
