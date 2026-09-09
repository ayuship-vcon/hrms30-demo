import React from 'react';
import type { LeaveType } from '../core/types';

export interface LeaveTypeCardProps {
  type: LeaveType;
  allocated: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const LeaveTypeCard: React.FC<LeaveTypeCardProps> = ({
  type,
  allocated,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl border transition-all ${
        isSelected
          ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-indigo-200'
      }`}
    >
      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{type}</span>
      <div className="text-2xl font-bold text-gray-900 mt-1">{allocated} Days</div>
      <span className="text-sm text-gray-400">Total annual quota</span>
    </div>
  );
};
