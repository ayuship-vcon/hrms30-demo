import {
  useGetLeaveRequestsQuery,
  useGetLeaveBalancesQuery,
  useApplyLeaveMutation,
  useReviewLeaveMutation,
  useDeleteLeaveMutation,
} from '@/core/api/leave';
import type { ApplyLeaveRequest, ReviewLeaveRequest } from '@/core/api/leave';
import { useCallback } from 'react';

export function useLeave() {
  const requestsQuery = useGetLeaveRequestsQuery();
  const balancesQuery = useGetLeaveBalancesQuery();
  const [applyLeaveMutation] = useApplyLeaveMutation();
  const [reviewLeaveMutation] = useReviewLeaveMutation();
  const [deleteLeaveMutation] = useDeleteLeaveMutation();
  const requests = requestsQuery.data ?? [];
  const balances = balancesQuery.data ?? [];
  const isLoading = requestsQuery.isLoading || balancesQuery.isLoading;

  const applyLeave = useCallback(
    (data: ApplyLeaveRequest) => {
      return applyLeaveMutation(data).unwrap();
    },
    [applyLeaveMutation]
  );

  const reviewLeave = useCallback(
    (id: string, data: ReviewLeaveRequest) => {
      return reviewLeaveMutation({ id, data }).unwrap();
    },
    [reviewLeaveMutation]
  );

  const approveLeave = useCallback(
    (id: string, comment?: string) => {
      return reviewLeave(id, { status: 'approved', comment });
    },
    [reviewLeave]
  );

  const rejectLeave = useCallback(
    (id: string, comment?: string) => {
      return reviewLeave(id, { status: 'rejected', comment });
    },
    [reviewLeave]
  );

  const deleteLeave = useCallback(
    (id: string) => {
      return deleteLeaveMutation(id).unwrap();
    },
    [deleteLeaveMutation]
  );

  return {
    requests,
    balances,
    isLoading,
    applyLeave,
    reviewLeave,
    approveLeave,
    rejectLeave,
    deleteLeave,
  };
}
