import React from 'react';
import { Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  redirectPath = ROUTES.AUTH.LOGIN,
  children,
}) => {
  void isAuthenticated;
  void redirectPath;

  return children ? <>{children}</> : <Outlet />;
};
