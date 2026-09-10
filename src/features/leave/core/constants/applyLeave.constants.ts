import type { LeaveCategory, LeavePerson } from '../types/applyLeave.types';

export const LEAVE_CATEGORIES: LeaveCategory[] = [
  {
    label: 'PTO',
    options: [
      'Earned Leave',
      'Maternity Leave',
      'Paternity Leave',
      'Bereavement Leave',
      'Flexi Leave',
      'Casual Leave',
      'Reaching a Milestone Leave',
    ],
  },
  {
    label: 'WR',
    options: [
      'Working Remotely (WR)',
      'Working Remotely (Maternity)',
      'Working Remotely (Paternity)',
      'Working Remotely Exception',
      'Working Remotely (Self Wedding)',
    ],
  },
  { label: 'LWP', options: ['Leave Without Pay'] },
  { label: 'OOO', options: ['Out Of Office'] },
];

export const APPROVERS: LeavePerson[] = [
  { id: 1, name: 'Rohit Verma', role: 'Team Lead · Design' },
  { id: 2, name: 'Aarav Mehta', role: 'Design Manager' },
];

export const HRS: LeavePerson[] = [
  { id: 1, name: 'Neha Kapoor', role: 'HR Manager' },
  { id: 2, name: 'Priya Shah', role: 'People Operations' },
];

export const LEAVE_BALANCES = [
  { name: 'Earned Leave', days: 12, color: '#f59e0b' },
  { name: 'Casual Leave', days: 6, color: '#22c55e' },
  { name: 'Flexi Leave', days: 4, color: '#6366f1' },
  { name: 'Working Remotely (WR)', days: 8, color: '#0ea5e9' },
];

export const DEFAULT_START_DATE = '2024-05-12';
export const DEFAULT_END_DATE = '2024-05-16';
