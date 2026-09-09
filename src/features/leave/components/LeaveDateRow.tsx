import React from 'react';
import { formatDate } from '@/shared/utils/date.utils';

export interface LeaveDateRowProps {
  startDate: string;
  endDate: string;
  totalDays: number;
}

export const LeaveDateRow: React.FC<LeaveDateRowProps> = ({ startDate, endDate, totalDays }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
      <div>
        <span className="text-gray-500 text-sm block">Duration</span>
        <span className="font-semibold text-gray-800">
          {formatDate(startDate)} &rarr; {formatDate(endDate)}
        </span>
      </div>
      <span className="badge badge-info">{totalDays} Days</span>
    </div>
  );
};
