import type { BaseEntity } from '@/shared/types/common.types';

export type AttendanceStatus = 'present' | 'absent' | 'half_day' | 'late';

export interface AttendanceRecord extends BaseEntity {
  employeeId: string;
  employeeName: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  workingHours: number;
  status: AttendanceStatus;
  location?: string;
}

export interface AttendanceState {
  records: AttendanceRecord[];
  isLoading: boolean;
  error: string | null;
}
