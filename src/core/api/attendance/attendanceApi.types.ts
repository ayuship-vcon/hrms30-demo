import type { AttendanceRecord } from '@/features/attendance/core/types/attendance.types';

export interface CheckInRequest {
  employeeId: string;
  employeeName: string;
  location?: string;
}

export interface CheckOutRequest {
  recordId: string;
}

export type CreateAttendanceRequest = Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>;
