import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useRoleRouteGuard } from '@/shared/hooks/useRoleRouteGuard';
import { PageLoader } from '@/shared/components/Loading/PageLoader';
import { useAuth } from '@/features/authentication';
import LinearProgress from '@mui/material/LinearProgress';
import { AppBreadcrumbs } from '@/shared/components/Breadcrumbs';

export const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { menu, isMenuLoading, isLoading } = useAuth();

  useRoleRouteGuard(menu);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const showGlobalBar = Boolean(isMenuLoading || isLoading);

  return (
    <div className="flex min-h-screen bg-app w-full">
      {/* Responsive application shell */}
      {/* Responsive Collapsible & Mobile Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggleCollapse={toggleSidebarCollapse}
        onCloseMobile={closeMobileSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-app">
        {/* Top Header */}
        <Header
          onToggleMobileSidebar={toggleMobileSidebar}
          onToggleCollapse={toggleSidebarCollapse}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Global Loading Bar for API Calling */}
        {showGlobalBar && (
          <LinearProgress
            sx={{
              height: 3,
              backgroundColor: '#e2e8f0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#0b4668',
              },
            }}
          />
        )}

        {/* Page Container */}
        <main className="flex-1 p-2 sm:p-3 lg:p-4 w-full mx-auto bg-app">
          <AppBreadcrumbs />
          {isMenuLoading && !menu.length ? (
            <PageLoader message="Loading workspace & permissions..." />
          ) : (
            <Outlet />
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
