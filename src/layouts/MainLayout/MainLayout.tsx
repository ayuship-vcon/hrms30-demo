import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useRoleRouteGuard } from '@/shared/hooks/useRoleRouteGuard';
import { UnauthorizedDialog } from '@/shared/components/Dialog/UnauthorizedDialog';
import { PageLoader } from '@/shared/components/Loading/PageLoader';
import { useAuth } from '@/features/authentication';
import LinearProgress from '@mui/material/LinearProgress';

export const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { menu, isMenuLoading, isLoading } = useAuth();

  const { isUnauthorizedOpen, handleLogout, handleGoBack } =
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
      {/* Unauthorized Access Dialog — shown when user navigates to a restricted route */}
      <UnauthorizedDialog
        isOpen={isUnauthorizedOpen}
        onLogout={handleLogout}
        onGoBack={handleGoBack}
      />

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
        <main className="flex-1 p-3 sm:p-4 lg:p-6 max-w-[1440px] w-full mx-auto bg-app">
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
