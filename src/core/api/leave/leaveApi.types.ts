import type { LeaveType } from '@/features/leave/core/types/leave.types';

export interface ApplyLeaveRequest {
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ReviewLeaveRequest {
  status: 'approved' | 'rejected';
  comment?: string;
}
