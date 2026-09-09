import type {
  LeaveBalance,
  LeaveRequest,
} from "@/features/leave/core/types/leave.types";
import type { ApplyLeaveRequest, ReviewLeaveRequest } from "./leaveApi.types";
import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";

export const leaveQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaveRequests: builder.query<LeaveRequest[], void>({
      query: () => API_ENDPOINTS.LEAVE.REQUESTS,
      transformResponse: (response: unknown) =>
        extractApiData<LeaveRequest[]>(response),
      providesTags: ["Leave"],
    }),

    getLeaveBalances: builder.query<LeaveBalance[], void>({
      query: () => API_ENDPOINTS.LEAVE.BALANCES,
      transformResponse: (response: unknown) =>
        extractApiData<LeaveBalance[]>(response),
      providesTags: ["Leave"],
    }),

    applyLeave: builder.mutation<LeaveRequest, ApplyLeaveRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.LEAVE.REQUESTS,
        method: "POST",
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<LeaveRequest>(response),
      invalidatesTags: ["Leave"],
    }),

    reviewLeave: builder.mutation<
      LeaveRequest,
      { id: string; data: ReviewLeaveRequest }
    >({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.LEAVE.REQUESTS}/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<LeaveRequest>(response),
      invalidatesTags: ["Leave"],
    }),

    deleteLeave: builder.mutation<string, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.LEAVE.REQUESTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const {
  useGetLeaveRequestsQuery,
  useGetLeaveBalancesQuery,
  useApplyLeaveMutation,
  useReviewLeaveMutation,
  useDeleteLeaveMutation,
} = leaveQueries;
