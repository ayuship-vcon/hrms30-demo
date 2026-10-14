import React from 'react';
import { ReduxProvider } from './ReduxProvider';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider>{children}</RouterProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </ReduxProvider>
  );
};
