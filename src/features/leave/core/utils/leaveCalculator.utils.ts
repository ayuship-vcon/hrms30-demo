import type { LeaveBalance, LeaveType } from '../types/leave.types';

export const calculateAvailableLeave = (
  balances: LeaveBalance[],
  leaveType: LeaveType
): number => {
  const balance = balances.find((b) => b.leaveType === leaveType);
  return balance ? balance.available : 0;
};

export const hasSufficientLeave = (
  balances: LeaveBalance[],
  leaveType: LeaveType,
  requestedDays: number
): boolean => {
  const available = calculateAvailableLeave(balances, leaveType);
  return available >= requestedDays;
};
