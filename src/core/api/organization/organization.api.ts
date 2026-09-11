import { API_ENDPOINTS } from '@/shared/constants';
import { baseApi, extractApiData } from '../client/baseApi';
import type {
  OrganizationCollection,
  OrganizationGroup,
  OrganizationLevel,
} from './organizationApi.types';

const extractItems = <T>(response: unknown): T[] => {
  const payload = extractApiData<unknown>(response);
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object') {
    const body = payload as Record<string, unknown>;
    const items = body.items ?? body.Items;
    if (Array.isArray(items)) return items as T[];
  }
  return [];
};

export const organizationQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationGroups: builder.query<OrganizationGroup[], void>({
      query: () => API_ENDPOINTS.ORGANIZATION.GROUPS,
      transformResponse: (response: unknown) => extractItems<OrganizationGroup>(response),
      providesTags: ['Organization'],
    }),
    getOrganizationLevels: builder.query<OrganizationLevel[], void>({
      query: () => API_ENDPOINTS.ORGANIZATION.LEVELS,
      transformResponse: (response: unknown) => extractItems<OrganizationLevel>(response),
      providesTags: ['Organization'],
    }),
  }),
});

export const {
  useGetOrganizationGroupsQuery,
  useGetOrganizationLevelsQuery,
} = organizationQueries;

export type OrganizationGroupsResponse = OrganizationCollection<OrganizationGroup>;
export type OrganizationLevelsResponse = OrganizationCollection<OrganizationLevel>;
