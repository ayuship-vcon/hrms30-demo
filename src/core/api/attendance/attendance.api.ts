import type { AttendanceRecord } from "@/features/attendance/core/types/attendance.types";
import type { CreateAttendanceRequest } from "./attendanceApi.types";
import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";

export const attendanceQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceRecords: builder.query<AttendanceRecord[], void>({
      query: () => API_ENDPOINTS.ATTENDANCE.ROOT,
      transformResponse: (response: unknown) =>
        extractApiData<AttendanceRecord[]>(response),
      providesTags: ["Attendance"],
    }),
    
    createAttendance: builder.mutation<
      AttendanceRecord,
      CreateAttendanceRequest
    >({
      query: (body) => ({
        url: API_ENDPOINTS.ATTENDANCE.ROOT,
        method: "POST",
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<AttendanceRecord>(response),
      invalidatesTags: ["Attendance"],
    }),

    deleteAttendance: builder.mutation<string, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ATTENDANCE.ROOT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAttendanceRecordsQuery,
  useCreateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceQueries;
