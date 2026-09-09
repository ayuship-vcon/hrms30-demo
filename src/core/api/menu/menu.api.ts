import type { GetMenuParams, RawApiMenuItem } from "./menuApi.types";
import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";

export const menuQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMenus: builder.query<RawApiMenuItem[], GetMenuParams>({
      query: (params) => ({ url: API_ENDPOINTS.MENU.GETMENUBYEMAIL, params }),
      transformResponse: (response: unknown) =>
        extractApiData<RawApiMenuItem[]>(response),
      providesTags: ["Menu"],
    }),
  }),
});

export const { useGetUserMenusQuery } = menuQueries;
