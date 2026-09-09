import React from 'react';
import type { LeaveBalance } from '../core/types';

export interface LeaveBalanceCardProps {
  balance: LeaveBalance;
}

export const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({ balance }) => {
  const typeName = String(balance.leaveType || 'ANNUAL');
  const total = balance.totalAllocated || 20;
  const used = balance.used || 0;
  const available = balance.available ?? Math.max(0, total - used);

  const percentage = Math.min(100, Math.round((used / (total || 1)) * 100));

  // Determine accent color per category
  let badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200/60';
  let barColor = 'bg-indigo-600';

  const lowerType = typeName.toLowerCase();
  if (lowerType.includes('sick')) {
    badgeColor = 'bg-rose-50 text-rose-700 border-rose-200/60';
    barColor = 'bg-rose-500';
  } else if (lowerType.includes('casual')) {
    badgeColor = 'bg-amber-50 text-amber-700 border-amber-200/60';
    barColor = 'bg-amber-500';
  } else if (lowerType.includes('maternity')) {
    badgeColor = 'bg-purple-50 text-purple-700 border-purple-200/60';
    barColor = 'bg-purple-600';
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-bold px-2.5 py-1 rounded-lg border ${badgeColor}`}>
            {typeName} Leave
          </span>
          <span className="text-sm font-semibold text-slate-400">
            {used} / {total} Days
          </span>
        </div>

        <div className="flex items-baseline gap-1 my-2">
          <span className="text-3xl font-extrabold text-slate-900">{available}</span>
          <span className="text-sm font-medium text-slate-500">Days Available</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-300 rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
          <span>{percentage}% utilized</span>
          <span>{available} left</span>
        </div>
      </div>
    </div>
  );
};
