import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
