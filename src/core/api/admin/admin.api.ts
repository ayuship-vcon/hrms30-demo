import type {
  AdminSettings,
  AuditLog,
} from "@/features/administration/core/types/admin.types";
import type { UpdateAdminSettingsRequest } from "./adminApi.types";
import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";

export const adminQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getAdminSettings: builder.query<AdminSettings, void>({
      query: () => API_ENDPOINTS.ADMIN.SETTINGS,
      transformResponse: (response: unknown) =>
        extractApiData<AdminSettings>(response),
      providesTags: ["AdminSettings"],
    }),

    updateAdminSettings: builder.mutation<
      AdminSettings,
      UpdateAdminSettingsRequest
    >({
      query: (body) => ({
        url: API_ENDPOINTS.ADMIN.SETTINGS,
        method: "PUT",
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<AdminSettings>(response),
      invalidatesTags: ["AdminSettings"],
    }),

    getAuditLogs: builder.query<AuditLog[], void>({
      query: () => API_ENDPOINTS.ADMIN.AUDIT_LOGS,
      transformResponse: (response: unknown) =>
        extractApiData<AuditLog[]>(response),
      providesTags: ["AuditLogs"],
    }),

    deleteAuditLog: builder.mutation<string, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.AUDIT_LOGS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AuditLogs"],
    }),
    clearAuditLogs: builder.mutation<null, void>({
      query: () => ({ url: API_ENDPOINTS.ADMIN.AUDIT_LOGS, method: "DELETE" }),
      invalidatesTags: ["AuditLogs"],
    }),
  }),
});

export const {
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
  useGetAuditLogsQuery,
  useDeleteAuditLogMutation,
  useClearAuditLogsMutation,
} = adminQueries;
