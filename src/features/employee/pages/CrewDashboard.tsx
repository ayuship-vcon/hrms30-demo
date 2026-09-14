import React from 'react';
import { useLocation } from 'react-router-dom';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Button } from '@/shared/components';
import {
  GreetingBanner,
  OrganizationalNewsCard,
  BirthdaysAnniversariesCard,
  ExploreServicesCard,
  UpcomingHolidaysCard,
  LeaveBalanceCard,
  NotificationsCard,
  FloatingChatButton,
} from '../components/dashboard';
import { useAuth } from '@/features/authentication/core/hooks/useAuth';

export const CrewDashboard: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();;

  return (
    <div className="flex flex-col gap-4 w-full pb-6 relative">
      {/* 1. Welcome Greeting Banner (Dynamically resolved per User ID) */}
      <GreetingBanner
        displayName={user?.name || 'Crew Member'}
      />

      {/* 2. Top Row: Organizational News & Birthdays/Anniversaries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <OrganizationalNewsCard />
        </div>
        <div className="lg:col-span-5">
          <BirthdaysAnniversariesCard />
        </div>
      </div>

      {/* Edit Layout – right-aligned directly above Middle Row */}
      <div className="flex justify-end items-center px-1">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<GridViewOutlinedIcon sx={{ fontSize: 16 }} />}
          className="!text-xs !font-semibold !text-slate-800 hover:!text-slate-950 !h-7 !px-2.5"
        >
          Edit layout
        </Button>
      </div>

      {/* 3. Middle Row: Explore Services & Upcoming Holidays */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <ExploreServicesCard />
        </div>
        <div className="lg:col-span-5">
          <UpcomingHolidaysCard />
        </div>
      </div>

      {/* 4. Bottom Row: Leave Balance & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <LeaveBalanceCard />
        </div>
        <div className="lg:col-span-5">
          <NotificationsCard />
        </div>
      </div>

      {/* 5. Floating HR Assistant Chat Button */}
      <FloatingChatButton />
    </div>
  );
};
