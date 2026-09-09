import React from 'react';
import { Button } from '@/shared/components';
import dashboardData from '@/shared/data/dashboard.data.json';

export interface NotificationItem {
  id?: string;
  title: string;
  date: string;
  action?: string;
}

export const NotificationsCard: React.FC = () => {
  const { title, viewAllText, notifications } = dashboardData.notifications;

  return (
    <div className="bg-surface rounded-sm p-4 sm:p-5 shadow-card border border-border flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-borderLight">
          <h2 className="text-base font-semibold text-primary tracking-tight">
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

        {/* Notifications List */}
        <div className="flex flex-col divide-y divide-borderLight">
          {notifications.map((notif: NotificationItem, idx: number) => (
            <div key={notif.id || idx} className="py-3 flex items-center justify-between gap-3 first:pt-1 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutralDark leading-snug truncate">{notif.title}</p>
                <p className="text-[11px] text-neutralDark-muted font-medium mt-0.5">{notif.date}</p>
              </div>
              {/* Secondary Action Button */}
              <Button
                variant="primary"
                size="sm"
                className="!text-xs !h-7 !px-3 shrink-0"
              >
                {notif.action || 'View'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
