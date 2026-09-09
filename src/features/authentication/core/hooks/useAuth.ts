import { useSelector } from "react-redux";
import { useAppDispatch } from "@/core/redux/hooks/useAppDispatch";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectUserRole,
  logout as logoutAction,
} from "@/core/redux/auth";
import { usePermission } from "@/shared/hooks/usePermission";
import { useGetUserMenusQuery } from "@/core/api/menu";
import { transformApiMenuToHierarchy } from "@/shared/utils";
// TEMP: static menu data until the real menu-rights endpoint is available.
// Remove this import and the fallback below once the backend is connected.
import { MOCK_MENU_DATA } from "@/shared/data/mockMenu.data";
import type { AuthState } from "../types";
import { tokenUtils, authUtils } from "@/features/authentication/core/utils";
import { msalService } from "@/core/auth";
import { baseApi } from "@/core/api";

export function useAuth() {
  const dispatch = useAppDispatch();

  const user = useSelector((state: { auth: AuthState }) =>
    selectCurrentUser(state),
  );
  const isAuthenticated = useSelector((state: { auth: AuthState }) =>
    selectIsAuthenticated(state),
  );
  const isLoading = useSelector((state: { auth: AuthState }) =>
    selectAuthLoading(state),
  );
  const error = useSelector((state: { auth: AuthState }) =>
    selectAuthError(state),
  );
  const role = useSelector((state: { auth: AuthState }) =>
    selectUserRole(state),
  );
  const menuQuery = useGetUserMenusQuery(
    { email: user?.email as string },
    { skip: !isAuthenticated || !user?.email },
  );
  // TEMP fallback: use static mock data when there's no backend/the query
  // hasn't returned data yet. Swap `MOCK_MENU_DATA` out once the API is live.
  const menuGroups = transformApiMenuToHierarchy(
    menuQuery.data ?? MOCK_MENU_DATA,
  );
  const isMenuLoading = menuQuery.isLoading || menuQuery.isFetching;

  const permissions = usePermission(role);

  const logout = () => {
    tokenUtils.clearToken();
    authUtils.clearStoredUser();
    dispatch(logoutAction());
    dispatch(baseApi.util.resetApiState());

    const account = msalService.getActiveAccount();
    if (account) void msalService.logout().catch(() => undefined);
  };

  const refreshMenus = () => menuQuery.refetch();

  return {
    user,
    role,
    menu: menuGroups,
    menuGroups,
    isMenuLoading,
    isAuthenticated,
    isLoading,
    error,
    permissions,
    logout,
    refreshMenus,
  };
}
