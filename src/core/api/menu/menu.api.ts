import type { EmployeeUserId, RawApiMenuItem } from "./menuApi.types";
import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";

export const menuQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMenus: builder.query<RawApiMenuItem[], EmployeeUserId>({
      query: (employeeUserId) => ({
        url: API_ENDPOINTS.MENU.GET_ACCESS_RIGHTS(employeeUserId),
      }),
      transformResponse: (response: unknown) => {
        const payload = extractApiData<unknown>(response);
        if (Array.isArray(payload)) return payload as RawApiMenuItem[];

        if (payload && typeof payload === 'object') {
          const body = payload as Record<string, unknown>;
          const items = body.accessRights ?? body.AccessRights ?? body.items ?? body.Items;
          if (Array.isArray(items)) return items as RawApiMenuItem[];
        }

        return response as RawApiMenuItem[];
      },
      providesTags: ["Menu"],
    }),
  }),
});

export const { useGetUserMenusQuery } = menuQueries;
