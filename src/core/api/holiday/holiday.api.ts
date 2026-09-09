import type { Holiday } from "@/features/holiday/core/types/holiday.types";
import type { CreateHolidayRequest } from "./holidayApi.types";
import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";

export const holidayQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHolidays: builder.query<Holiday[], void>({
      query: () => API_ENDPOINTS.HOLIDAY.ROOT,
      transformResponse: (response: unknown) =>
        extractApiData<Holiday[]>(response),
      providesTags: ["Holidays"],
    }),

    createHoliday: builder.mutation<Holiday, CreateHolidayRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.HOLIDAY.ROOT,
        method: "POST",
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<Holiday>(response),
      invalidatesTags: ["Holidays"],
    }),

    deleteHoliday: builder.mutation<string, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.HOLIDAY.ROOT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Holidays"],
    }),
  }),
});

export const {
  useGetHolidaysQuery,
  useCreateHolidayMutation,
  useDeleteHolidayMutation,
} = holidayQueries;
