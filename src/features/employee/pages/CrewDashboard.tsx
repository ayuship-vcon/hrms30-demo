import React, { useEffect, useState } from 'react';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
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

const widgetComponents = {
  'organizational-news': <OrganizationalNewsCard />,
  'birthdays-anniversaries': <BirthdaysAnniversariesCard />,
  'explore-services': <ExploreServicesCard />,
  'upcoming-holidays': <UpcomingHolidaysCard />,
  'leave-balance': <LeaveBalanceCard />,
  notifications: <NotificationsCard />,
};

const defaultWidgetOrder = [
  'organizational-news',
  'birthdays-anniversaries',
  'explore-services',
  'upcoming-holidays',
  'leave-balance',
  'notifications',
];

export const CrewDashboard: React.FC = () => {
  const { user } = useAuth();
  const storageKey = `crew-dashboard-layout:${user?.id ?? 'guest'}`;
  const [widgetOrder, setWidgetOrder] = useState(defaultWidgetOrder);
  const [draftWidgetOrder, setDraftWidgetOrder] = useState(defaultWidgetOrder);
  const [isEditingLayout, setIsEditingLayout] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem(storageKey);
      if (!savedLayout) return;
      const parsedLayout: unknown = JSON.parse(savedLayout);
      if (
        Array.isArray(parsedLayout) &&
        parsedLayout.length === defaultWidgetOrder.length &&
        parsedLayout.every((id) => defaultWidgetOrder.includes(id))
      ) {
        setWidgetOrder(parsedLayout);
        setDraftWidgetOrder(parsedLayout);
      }
    } catch {
      // Ignore invalid demo layout data and use the default order.
    }
  }, [storageKey]);

  const startEditingLayout = () => {
    setDraftWidgetOrder(widgetOrder);
    setIsEditingLayout(true);
  };

  const cancelEditingLayout = () => {
    setDraftWidgetOrder(widgetOrder);
    setIsEditingLayout(false);
    setDraggedWidget(null);
  };

  const saveLayout = () => {
    setWidgetOrder(draftWidgetOrder);
    localStorage.setItem(storageKey, JSON.stringify(draftWidgetOrder));
    setIsEditingLayout(false);
    setDraggedWidget(null);
  };

  const resetLayout = () => setDraftWidgetOrder(defaultWidgetOrder);

  const moveWidget = (targetWidget: string) => {
    if (!draggedWidget || draggedWidget === targetWidget) return;
    setDraftWidgetOrder((currentOrder) => {
      const nextOrder = currentOrder.filter((id) => id !== draggedWidget);
      nextOrder.splice(nextOrder.indexOf(targetWidget), 0, draggedWidget);
      return nextOrder;
    });
  };

  const renderWidget = (widgetId: string) => {
    const wideWidgetIds = ['organizational-news', 'explore-services', 'leave-balance'];
    const widgetClassName = wideWidgetIds.includes(widgetId) ? 'lg:col-span-7' : 'lg:col-span-5';
    const widget = widgetComponents[widgetId as keyof typeof widgetComponents];

    return (
      <div
        key={widgetId}
        draggable={isEditingLayout}
        onDragStart={() => setDraggedWidget(widgetId)}
        onDragEnd={() => setDraggedWidget(null)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => moveWidget(widgetId)}
        className={`${widgetClassName} ${isEditingLayout ? 'cursor-grab rounded-lg outline outline-2 outline-dashed outline-[#9bb8c8] hover:bg-[#f5f9fb] active:cursor-grabbing' : ''} ${draggedWidget === widgetId ? 'opacity-40' : ''}`}
      >
        {isEditingLayout && (
          <div className="flex items-center gap-1 px-1 pb-1 text-[11px] font-medium text-[#0b4668]">
            <DragIndicatorOutlinedIcon sx={{ fontSize: 16 }} />
            Drag to reposition
          </div>
        )}
        {widget}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full pb-6 relative">
      {/* 1. Welcome Greeting Banner (Dynamically resolved per User ID) */}
      <GreetingBanner
        displayName={user?.name || 'Crew Member'}
      />

      {/* 2. Top Row: Organizational News & Birthdays/Anniversaries */}
      <div className="flex flex-wrap justify-end items-center gap-2 px-1">
        {isEditingLayout && (
          <span className="mr-auto text-xs text-slate-500">
            Drag and drop widgets to organise your dashboard.
          </span>
        )}
        {isEditingLayout && (
          <Button variant="ghost" size="sm" leftIcon={<RestartAltOutlinedIcon sx={{ fontSize: 16 }} />} className="!text-xs !font-semibold !text-slate-700 !h-7 !px-2.5" onClick={resetLayout}>
            Reset
          </Button>
        )}
        {isEditingLayout && (
          <Button variant="outline" size="sm" className="!text-xs !h-7 !px-2.5" onClick={cancelEditingLayout}>
            Cancel
          </Button>
        )}
        {isEditingLayout ? (
          <Button variant="primary" size="sm" className="!text-xs !h-7 !px-2.5" onClick={saveLayout}>
            Save layout
          </Button>
        ) : (
          <Button variant="ghost" size="sm" leftIcon={<GridViewOutlinedIcon sx={{ fontSize: 16 }} />} className="!text-xs !font-semibold !text-slate-800 hover:!text-slate-950 !h-7 !px-2.5" onClick={startEditingLayout}>
            Edit layout
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {(isEditingLayout ? draftWidgetOrder : widgetOrder).map(renderWidget)}
      </div>

      {/* 5. Floating HR Assistant Chat Button */}
      <FloatingChatButton />
    </div>
  );
};
