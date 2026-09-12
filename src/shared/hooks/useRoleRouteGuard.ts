import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/core/redux/hooks/useAppDispatch';
import { logout } from '@/core/redux/auth';
import { tokenUtils, authUtils } from '@/features/authentication/core/utils';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { MenuGroup } from '@/core/api/menu';
import { extractAllowedRoutesFromMenu } from '@/shared/utils';

export interface RoleRouteGuardState {
  handleLogout: () => void;
  handleGoBack: () => void;
}

export function useRoleRouteGuard(menu: MenuGroup[] = []): RoleRouteGuardState {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = useCallback(() => {
    tokenUtils.clearToken();
    authUtils.clearStoredUser();
    dispatch(logout());
    navigate(ROUTES.AUTH.LOGIN, { replace: true });
  }, [dispatch, navigate]);

  const handleGoBack = useCallback(() => {
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
      return;
    }

    const exemptPaths: string[] = [
      ROUTES.AUTH.LOGIN,
      ROUTES.AUTH.SUCCESS,
      ROUTES.AUTH.UNAUTHORIZED,
    ];
    if (!isAllowed && !exemptPaths.includes(currentPath)) {
      navigate(ROUTES.AUTH.UNAUTHORIZED, { replace: true });
    }
  }, [location.pathname, menu, navigate]);

  return { handleLogout, handleGoBack };
}
