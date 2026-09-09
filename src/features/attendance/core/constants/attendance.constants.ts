import type { SelectOption } from '@/shared/types/common.types';

export const ATTENDANCE_STATUS_OPTIONS: SelectOption<string>[] = [
  { label: 'All Statuses', value: '' },
  { label: 'Present', value: 'present' },
  { label: 'Late', value: 'late' },
  { label: 'Half Day', value: 'half_day' },
  { label: 'Absent', value: 'absent' },
];

export const ATTENDANCE_STATUS_COLORS: Record<string, string> = {
  present: 'badge-success',
  late: 'badge-warning',
  half_day: 'badge-info',
  absent: 'badge-danger',
};

export const WORK_LOCATIONS: SelectOption<string>[] = [
  { label: 'Headquarters Office', value: 'Headquarters Office' },
  { label: 'Remote / Work from Home', value: 'Remote / Work from Home' },
  { label: 'Client Site', value: 'Client Site' },
];
