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
  { id: 1, name: 'Surendra Raghuvanshi', role: 'Team Lead · Admin' },
  { id: 2, name: 'Nachiket Chavan', role: 'HR Level 2' },
];

export const HRS: LeavePerson[] = [
  { id: 1, name: 'Intequab Khan', role: 'HR Level 1' },
  { id: 2, name: 'Mamta Bhandar', role: 'HR Level 1' },
];

export const LEAVE_BALANCES = [
  { name: 'Earned Leave', days: 9, color: '#f59e0b' },
  { name: 'Casual Leave', days: 9, color: '#22c55e' },
  { name: 'Flexi Leave', days: 1, color: '#6366f1' },
  { name: 'Working Remotely (WR)', days: 12, color: '#0ea5e9' },
];
