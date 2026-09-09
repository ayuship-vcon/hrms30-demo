import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {

  return (
    <div className="w-full min-h-screen overflow-hidden bg-white">
      <Outlet />
    </div>
  );
};
