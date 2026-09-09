import React from 'react';
import { aiWorkshopBanner } from '@/assets/images';
import { Button } from '@/shared/components';
import dashboardData from '@/shared/data/dashboard.data.json';

export const OrganizationalNewsCard: React.FC = () => {
  const { title, viewAllText } = dashboardData.organizationalNews;

  return (
    <div className="bg-surface rounded-sm p-4 sm:p-5 shadow-card border border-border flex flex-col justify-between h-full">
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

      {/* AI Workshop Banner Image from Assets */}
      <div className="w-full overflow-hidden rounded-sm group cursor-pointer border border-slate-200 shadow-2xs hover:shadow-xs transition-all">
        <img
          src={aiWorkshopBanner}
          alt="AI Workshop - Register Now / Apply Now"
          className="w-full h-auto object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>
    </div>
  );
};
