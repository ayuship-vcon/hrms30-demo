import type { BaseEntity } from '@/shared/types/common.types';

export type LeaveType = 'ANNUAL' | 'SICK' | 'CASUAL' | 'MATERNITY' | 'UNPAID';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface LeaveRequest extends BaseEntity {
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  approverId?: string;
  approverName?: string;
  approverComment?: string;
}

export interface LeaveBalance {
  leaveType: LeaveType;
  totalAllocated: number;
  used: number;
  available: number;
}

export interface LeaveState {
  requests: LeaveRequest[];
  balances: LeaveBalance[];
  selectedRequest: LeaveRequest | null;
  isLoading: boolean;
  error: string | null;
}
