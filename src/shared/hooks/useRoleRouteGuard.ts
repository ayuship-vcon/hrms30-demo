import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/core/redux/hooks/useAppDispatch';
import { logout } from '@/core/redux/auth';
import { tokenUtils, authUtils } from '@/features/authentication/core/utils';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { MenuGroup } from '@/core/api/menu';

export interface RoleRouteGuardState {
  handleLogout: () => void;
  handleGoBack: () => void;
}

export function useRoleRouteGuard(menu: MenuGroup[] = []): RoleRouteGuardState {
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

  // Route permissions are intentionally disabled in the UI-only demo.
  void menu;

  return { handleLogout, handleGoBack };
}
