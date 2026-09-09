import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components';
import { ROUTES } from '@/shared/constants/routes.constants';
import dashboardData from '@/shared/data/dashboard.data.json';

export interface HolidayItem {
  id?: string;
  name: string;
  date: string;
}

export const UpcomingHolidaysCard: React.FC = () => {
  const navigate = useNavigate();
  const { title, viewAllText, holidays } = dashboardData.upcomingHolidays;

  return (
    <div className="bg-surface rounded-sm p-4 sm:p-5 shadow-card border border-border flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-borderLight">
          <h2 className="text-sm font-bold text-[#0b4668] tracking-tight">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(ROUTES.HOLIDAY.ROOT)}
            className="!text-xs !text-slate-500 hover:!text-slate-800 !underline !p-0 !h-auto"
          >
            {viewAllText}
          </Button>
        </div>

        {/* Holidays List */}
        <div className="flex flex-col divide-y divide-borderLight">
          {holidays.map((hol: HolidayItem) => (
            <div key={hol.id || hol.name} className="py-3 flex items-center justify-between first:pt-1 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-neutralDark leading-snug">{hol.name}</p>
                <p className="text-[11px] text-neutralDark-muted font-medium mt-0.5">{hol.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
