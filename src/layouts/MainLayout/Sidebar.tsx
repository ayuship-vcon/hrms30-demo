import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IconButton, ButtonBase } from '@mui/material';
import { useAuth } from '@/features/authentication';
import { ROUTES } from '@/shared/constants/routes.constants';
import styles from './styles.module.css';

// Material 3 Design Kit Icons (@mui/icons-material)
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { DynamicIcon } from '@/shared/components';
import type { MenuGroup } from '@/core/api/menu';

export interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

// Helper: renders a nav item using Deep Navy #0b4668 active pill & Neutral Dark inactive styling
const navItemClass = (isActive: boolean, collapsed: boolean) =>
  [
    'flex items-center rounded-[6px] text-[13px] font-medium transition-all select-none',
    collapsed ? 'justify-center px-2 py-2' : 'gap-3 px-3 py-2',
    isActive
      ? 'bg-[#0b4668] text-white shadow-xs font-semibold'
      : 'text-[#45464D] hover:bg-slate-100 hover:text-black',
  ].join(' ');

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse,
  onCloseMobile,
}) => {
  const { logout, menuGroups } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const collapsed = isCollapsed && !isMobileOpen;
  const dashboardTarget = ROUTES.DASHBOARD;

  const isDashboardActive =
    location.pathname === '/' ||
    location.pathname === ROUTES.DASHBOARD;

  // menuGroups is permission-filtered by rightKey before it reaches the sidebar.
  // Avoid rendering malformed rights as blank navigation links.
  const currentMenuGroups: MenuGroup[] = useMemo(
    () =>
      (menuGroups || [])
        .map((group) => ({
          ...group,
          menuitems: group.menuitems.filter((item) => Boolean(item.rightKey && item.route)),
        }))
        .filter((group) => group.menuitems.length > 0),
    [menuGroups],
  );

  // =========================================================================
  // Accordion State: Multi-open allowed, 1st Accordion Open by Default
  // =========================================================================
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    if (currentMenuGroups.length > 0) {
      return { [currentMenuGroups[0].id]: true };
    }
    return {};
  });

  // Whenever the menu changes, reset so the first accordion is open by default
  useEffect(() => {
    const firstGroupId = currentMenuGroups[0]?.id;
    if (!firstGroupId) return;

    setOpenGroups((prev) => {
      if (prev[firstGroupId]) return prev;
      return { ...prev, [firstGroupId]: true };
    });
  }, [currentMenuGroups]);

  // Toggle individual accordion independently (supports multiple open simultaneously)
  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // On mobile, close the drawer after navigation
  const handleNavClick = () => {
    onCloseMobile();
  };

  // Direct Logout action: clears session & navigates directly to /auth/login
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate(ROUTES.AUTH.LOGIN, { replace: true });
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'bg-white text-[#45464D] h-screen flex flex-col justify-between border-r border-slate-200 shadow-2xs overflow-y-auto shrink-0 z-50 p-3.5 sm:p-4',
          collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded,
          // Mobile: fixed drawer that slides in/out
          'fixed lg:sticky top-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          // Smooth animation
          'transition-all duration-300 ease-in-out',
        ].join(' ')}
      >
        <div className="flex flex-col gap-4">
          {/* Brand Header: vConstruct and Hamburger Toggle */}
          <div className="flex items-center justify-between py-1">
            {!collapsed && (
              <div className="flex items-center justify-start pl-1">
                <span className="font-black text-[22px] text-black tracking-tight select-none">
                  vConstruct
                </span>
              </div>
            )}
            {/* Close button – mobile only */}
            {isMobileOpen && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseMobile();
                }}
                className="text-[#45464D] hover:bg-slate-100 lg:hidden"
                aria-label="Close menu"
              >
                <CloseOutlinedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
            {/* Collapse/Expand toggle – desktop only */}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse();
              }}
              className={[
                'text-slate-700 hover:bg-slate-100 hidden lg:flex',
                collapsed ? 'mx-auto' : '',
              ].join(' ')}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              <MenuOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </div>

          {/* Top Primary Menu: Dashboard */}
          <NavLink
            to={dashboardTarget}
            onClick={handleNavClick}
            title={collapsed ? 'Dashboard' : undefined}
            className={[
              'flex items-center rounded-[6px] text-[13px] font-semibold transition-all select-none',
              collapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3.5 py-2.5',
              isDashboardActive
                ? 'bg-[#0b4668] text-white shadow-xs'
                : 'text-[#45464D] hover:bg-slate-100 hover:text-black',
            ].join(' ')}
          >
            <GridViewOutlinedIcon sx={{ fontSize: 20 }} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          {/* ========================================================================= */}
          {/* Dynamic Accordion Menus (Sorted by Sequence from Menu Rights API)          */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-2.5">
            {currentMenuGroups.map((group, index) => {
              const isGroupOpen = Boolean(openGroups[group.id]);

              return (
                <div key={group.id || index} className="flex flex-col">
                  {/* Accordion Header */}
                  {!collapsed ? (
                    <ButtonBase
                      onClick={() => toggleGroup(group.id)}
                      className="flex items-center justify-between w-full px-3 py-1.5 rounded-[6px] text-sm font-bold text-[#0b4668] hover:bg-slate-50 transition-all select-none group text-left"
                    >
                      <span className="tracking-tight uppercase text-[11px] font-bold text-[#0b4668]">
                        {group.menu}
                      </span>
                      <KeyboardArrowDownOutlinedIcon
                        sx={{ fontSize: 16 }}
                        className={[
                          'text-slate-400 group-hover:text-[#0b4668] transition-transform duration-200 ml-auto',
                          isGroupOpen ? 'rotate-0' : '-rotate-90',
                        ].join(' ')}
                      />
                    </ButtonBase>
                  ) : (
                    // In collapsed sidebar mode, show thin divider
                    <div className="w-full h-px bg-slate-200 my-1" />
                  )}

                  {/* Accordion Body / Menu Items */}
                  {(isGroupOpen || collapsed) && (
                    <nav className="flex flex-col gap-0.5 mt-0.5 animate-fadeIn">
                      {group.menuitems.map((item) => (
                        <NavLink
                          key={item.rightKey || item.route || item.title}
                          to={item.route}
                          onClick={handleNavClick}
                          title={collapsed ? item.title : undefined}
                          className={({ isActive }) => navItemClass(isActive, collapsed)}
                        >
                          <DynamicIcon name={item.icon} size={18} />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      ))}
                    </nav>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Settings & Direct Log Out Link */}
        <div className="pt-3 border-t border-slate-200 flex flex-col gap-1 mt-4">
          <NavLink
            to={ROUTES.ADMIN.ROOT}
            onClick={handleNavClick}
            title={collapsed ? 'Settings' : undefined}
            className={navItemClass(false, collapsed)}
          >
            <SettingsOutlinedIcon sx={{ fontSize: 18 }} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
          <NavLink
            to={ROUTES.AUTH.LOGIN}
            onClick={handleLogout}
            title={collapsed ? 'Log Out' : undefined}
            className={[
              'flex items-center rounded-[6px] text-sm font-medium text-[#45464D] hover:bg-red-50 hover:text-red-600 transition-all text-left w-full cursor-pointer select-none',
              collapsed ? 'justify-center px-2 py-2' : 'gap-3 px-3.5 py-2',
            ].join(' ')}
          >
            <LogoutOutlinedIcon sx={{ fontSize: 18 }} />
            {!collapsed && <span>Log Out</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
};
