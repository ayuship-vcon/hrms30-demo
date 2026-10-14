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
import { transformApiMenuToHierarchy } from "@/shared/utils";
import { MOCK_MENU_DATA } from "@/shared/data/mockMenu.data";
import type { AuthState } from "../types";
import { tokenUtils, authUtils } from "@/features/authentication/core/utils";
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
  const menuGroups = transformApiMenuToHierarchy(MOCK_MENU_DATA);
  const isMenuLoading = false;

  const permissions = usePermission(role);

  const logout = () => {
    tokenUtils.clearToken();
    authUtils.clearStoredUser();
    dispatch(logoutAction());
    dispatch(baseApi.util.resetApiState());

  };

  const refreshMenus = () => undefined;

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
