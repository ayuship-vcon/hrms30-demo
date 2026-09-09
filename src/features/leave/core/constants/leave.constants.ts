import type { SelectOption } from '@/shared/types/common.types';
import type { LeaveType } from '../types/leave.types';

export const LEAVE_TYPES: SelectOption<LeaveType>[] = [
  { label: 'Annual / Paid Leave', value: 'ANNUAL' },
  { label: 'Sick Leave', value: 'SICK' },
  { label: 'Casual Leave', value: 'CASUAL' },
  { label: 'Maternity / Paternity Leave', value: 'MATERNITY' },
  { label: 'Unpaid Leave', value: 'UNPAID' },
];

export const LEAVE_STATUS_COLORS: Record<string, string> = {
  approved: 'badge-success',
  pending: 'badge-warning',
  rejected: 'badge-danger',
  cancelled: 'badge-info',
};
