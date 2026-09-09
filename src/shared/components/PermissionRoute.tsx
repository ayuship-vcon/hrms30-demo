import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { type Permission, hasPermission } from '../permissions';
import { ROUTES } from '../constants/routes.constants';

export interface PermissionRouteProps {
  userRole?: string | null;
  requiredPermission: Permission;
  redirectPath?: string;
  children?: React.ReactNode;
}

export const PermissionRoute: React.FC<PermissionRouteProps> = ({
  userRole,
  requiredPermission,
  redirectPath = ROUTES.DASHBOARD,
  children,
}) => {
  const isAllowed = hasPermission(userRole, requiredPermission);

  // if (!isAllowed) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  return children ? <>{children}</> : <Outlet />;
};
