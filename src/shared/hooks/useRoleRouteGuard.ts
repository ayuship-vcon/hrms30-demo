import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/core/redux/hooks/useAppDispatch';
import { logout } from '@/core/redux/auth';
import { tokenUtils, authUtils } from '@/features/authentication/core/utils';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { MenuGroup } from '@/core/api/menu';
import { extractAllowedRoutesFromMenu } from '@/shared/utils';

export interface RoleRouteGuardState {
  isUnauthorizedOpen: boolean;
  handleLogout: () => void;
  handleGoBack: () => void;
}

export function useRoleRouteGuard(menu: MenuGroup[] = []): RoleRouteGuardState {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isUnauthorizedOpen, setIsUnauthorizedOpen] = useState(false);

  const handleLogout = useCallback(() => {
    setIsUnauthorizedOpen(false);
    tokenUtils.clearToken();
    authUtils.clearStoredUser();
    dispatch(logout());
    navigate(ROUTES.AUTH.LOGIN, { replace: true });
  }, [dispatch, navigate]);

  const handleGoBack = useCallback(() => {
    setIsUnauthorizedOpen(false);
    navigate(ROUTES.DASHBOARD, { replace: true });
  }, [navigate]);

  useEffect(() => {
    const allowedRoutes = extractAllowedRoutesFromMenu(menu);
    const currentPath = location.pathname;

    const isAllowed = Array.from(allowedRoutes).some((route) => {
      if (currentPath === route) return true;
      if (route !== '/' && currentPath.startsWith(route)) return true;
      return false;
    });

    if (!menu.length) {
      setIsUnauthorizedOpen(false);
      return;
    }

    if (!isAllowed && currentPath !== ROUTES.AUTH.LOGIN && currentPath !== ROUTES.AUTH.SUCCESS) {
      setIsUnauthorizedOpen(true);
    } else {
      setIsUnauthorizedOpen(false);
    }
  }, [location.pathname, menu]);

  return { isUnauthorizedOpen, handleLogout, handleGoBack };
}
