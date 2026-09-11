import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";
import type { OrganizationNode } from "@/features/horizontal-org-structure/core/types/horizontal-org.types";
import type {
  CreateHorizontalOrganizationRequest,
  UpdateHorizontalOrganizationRequest,
} from "./horizontalOrgApi.types";

export const horizontalOrganizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHorizontalOrganizations: builder.query<OrganizationNode[], void>({
      query: () => API_ENDPOINTS.HORIZONTAL_ORGANIZATION.ROOT,
      transformResponse: (response: unknown) =>
        extractApiData<OrganizationNode[]>(response),
      providesTags: ["HorizontalOrganizations"],
    }),
    createHorizontalOrganization: builder.mutation<
      OrganizationNode,
      CreateHorizontalOrganizationRequest
    >({
      query: (body) => ({
        url: API_ENDPOINTS.HORIZONTAL_ORGANIZATION.ROOT,
        method: "POST",
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<OrganizationNode>(response),
      invalidatesTags: ["HorizontalOrganizations"],
    }),
    updateHorizontalOrganization: builder.mutation<
      OrganizationNode,
      UpdateHorizontalOrganizationRequest
    >({
      query: ({ id, ...body }) => ({
        url: API_ENDPOINTS.HORIZONTAL_ORGANIZATION.BY_ID(id as string | number),
        method: "PUT",
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<OrganizationNode>(response),
      invalidatesTags: ["HorizontalOrganizations"],
    }),
    deleteHorizontalOrganization: builder.mutation<
      string | number,
      string | number
    >({
      query: (id) => ({
        url: API_ENDPOINTS.HORIZONTAL_ORGANIZATION.BY_ID(id),
        method: "DELETE",
      }),
      transformResponse: (
        _response: unknown,
        _meta: unknown,
        id: string | number,
      ) => id,
      invalidatesTags: ["HorizontalOrganizations"],
    }),
  }),
});

export const {
  useGetHorizontalOrganizationsQuery,
  useCreateHorizontalOrganizationMutation,
  useUpdateHorizontalOrganizationMutation,
  useDeleteHorizontalOrganizationMutation,
} = horizontalOrganizationApi;
