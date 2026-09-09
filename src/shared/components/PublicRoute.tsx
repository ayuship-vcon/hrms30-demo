import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';

export interface PublicRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

/**
 * Route guard that prevents authenticated users from accessing guest/auth pages (e.g. /auth/login)
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({
  isAuthenticated,
  redirectPath = ROUTES.DASHBOARD,
  children,
}) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
