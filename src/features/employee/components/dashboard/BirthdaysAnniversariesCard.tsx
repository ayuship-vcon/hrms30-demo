import React from 'react';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import { Button } from '@/shared/components';
import dashboardData from '@/shared/data/dashboard.data.json';

export interface BirthdayEventItem {
  id: string;
  type: string;
  title: string;
  date: string;
  action?: string;
}

export const BirthdaysAnniversariesCard: React.FC = () => {
  const { title, viewAllText, events } = dashboardData.birthdaysAndAnniversaries;

  const getEventIcon = (type: string) => {
    if (type === 'anniversary') {
      return <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20 }} className="text-[#0b4668]" />;
    }
    return <CakeOutlinedIcon sx={{ fontSize: 20 }} className="text-[#0b4668]" />;
  };

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
            className="!text-xs !text-slate-500 hover:!text-slate-800 !underline !p-0 !h-auto"
          >
            {viewAllText}
          </Button>
        </div>

        {/* List */}
        <div className="flex flex-col divide-y divide-borderLight">
          {events.map((item: BirthdayEventItem) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-3 first:pt-1 last:pb-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-sm bg-neutralLight flex items-center justify-center shrink-0">
                  {getEventIcon(item.type)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutralDark leading-snug truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-neutralDark-muted font-medium mt-0.5">
                    {item.date}
                  </p>
                </div>
              </div>
              {/* Action Button */}
              <Button
                variant="primary"
                size="sm"
                className="!text-xs !h-7 !px-3 shrink-0"
              >
                {item.action || 'Wish'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
