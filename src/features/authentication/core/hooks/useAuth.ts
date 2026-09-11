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
import { useGetAccessRightsQuery } from "@/core/api/menu";
import { transformApiMenuToHierarchy } from "@/shared/utils";
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
  const menuQuery = useGetAccessRightsQuery(
    user?.id as string | number,
    { skip: !isAuthenticated || user?.id === undefined || user?.id === null },
  );
  const menuGroups = transformApiMenuToHierarchy(menuQuery.data ?? []);
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
