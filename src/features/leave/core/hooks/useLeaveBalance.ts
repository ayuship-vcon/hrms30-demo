import { useLeave } from './useLeave';
import type { LeaveType } from '../types';

export function useLeaveBalance(leaveType?: LeaveType) {
  const { balances, isLoading } = useLeave();

  const currentBalance = leaveType ? balances.find((b) => b.leaveType === leaveType) : null;

  return {
    balances,
    currentBalance,
    isLoading,
  };
}
