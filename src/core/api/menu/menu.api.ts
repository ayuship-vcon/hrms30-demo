import type { AccessRight, EmployeeUserId, RawApiMenuItem } from "./menuApi.types";
import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";

export const menuQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMenus: builder.query<(RawApiMenuItem | AccessRight)[], EmployeeUserId>({
      query: (employeeUserId) => ({
        url: API_ENDPOINTS.MENU.GET_ACCESS_RIGHTS(employeeUserId),
      }),
      transformResponse: (response: unknown) => {
        const payload = extractApiData<unknown>(response);
        if (Array.isArray(payload)) return payload as (RawApiMenuItem | AccessRight)[];

        if (payload && typeof payload === 'object') {
          const body = payload as Record<string, unknown>;
          const items = body.accessRights ?? body.AccessRights ?? body.items ?? body.Items;
          if (Array.isArray(items)) return items as (RawApiMenuItem | AccessRight)[];
          // /AccessRights/{id} can return one access-right record in data.
          if (typeof body.rightKey === 'string') return [body as unknown as AccessRight];
        }

        if (response && typeof response === 'object' && 'rightKey' in response) {
          return [response as AccessRight];
        }
        return response as (RawApiMenuItem | AccessRight)[];
      },
      providesTags: ["Menu"],
    }),
  }),
});

export const { useGetUserMenusQuery } = menuQueries;
// Keep the access-rights name used by authentication consumers.
export const useGetAccessRightsQuery = useGetUserMenusQuery;
