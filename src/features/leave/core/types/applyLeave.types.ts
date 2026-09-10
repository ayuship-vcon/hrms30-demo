export type LeaveDayMode = 'full' | 'firstHalf' | 'secondHalf';

export interface LeaveDay {
  date: string;
  label: string;
  day: string;
  mode: LeaveDayMode;
}

export interface LeavePerson {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

export interface LeaveCategory {
  label: string;
  options: string[];
}

export interface ApplyLeaveFormValues {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  cc: string;
}
