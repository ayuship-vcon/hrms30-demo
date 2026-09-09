import type { LeaveStatus } from '../types/leave.types';

export const getLeaveStatusLabel = (status: LeaveStatus): string => {
  switch (status) {
    case 'approved':
      return 'Approved';
    case 'pending':
      return 'Under Review';
    case 'rejected':
      return 'Rejected';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};
