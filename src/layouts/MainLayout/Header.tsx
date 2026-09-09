import React from 'react';
import { IconButton, InputBase, Box } from '@mui/material';
import { useAuth } from '@/features/authentication';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';

export interface HeaderProps {
  onToggleMobileSidebar: () => void;
  onToggleCollapse: () => void;
  isSidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  onToggleCollapse: _onToggleCollapse,
  isSidebarCollapsed: _isSidebarCollapsed,
}) => {
  const { user } = useAuth();

  const userFullName = user?.name || 'Sanjib Kotal';
  const userRoleDisplay = user?.role || user?.designation || user?.email || 'Team Member';

  return (
    <header className="h-16 bg-surface border-b border-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-3 w-full max-w-md">
        {/* Mobile-only hamburger */}
        <IconButton
          size="small"
          onClick={onToggleMobileSidebar}
          className="text-neutralDark hover:text-primary hover:bg-slate-100 shrink-0 lg:hidden"
          aria-label="Open mobile menu"
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        {/* Search Input powered by MUI */}
        <Box
          className="w-full relative flex items-center bg-slate-50 border border-border rounded-sm px-3 py-1 transition-all focus-within:border-primary focus-within:bg-white"
          sx={{ height: 38 }}
        >
          <SearchIcon sx={{ fontSize: 18, color: '#64748B', mr: 1, shrink: 0 }} />
          <InputBase
            placeholder="Search for employees, documents, reports..."
            sx={{
              fontSize: '13.5px',
              color: '#1E293B',
              width: '100%',
              '& input::placeholder': { color: '#94A3B8', opacity: 1 },
            }}
          />
        </Box>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-3">
        <IconButton
          size="small"
          className="relative text-neutralDark hover:text-primary hover:bg-slate-100"
          title="Notifications"
        >
          <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </IconButton>

        <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-primary leading-tight">
              {userFullName}
            </p>
            <p className="text-[11px] font-medium text-muted capitalize leading-tight">
              {userRoleDisplay}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 border border-border text-primary font-bold text-sm flex items-center justify-center shadow-xs">
            <PersonOutlineOutlinedIcon sx={{ fontSize: 19 }} />
          </div>
        </div>
      </div>
    </header>
  );
};
