import React, { useEffect } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance, initializeMsal } from '@/core/auth';
import { ReduxProvider } from './ReduxProvider';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Ensure MSAL initializes on app mount
    initializeMsal();
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <ReduxProvider>
        <ThemeProvider>
          <RouterProvider>{children}</RouterProvider>
        </ThemeProvider>
      </ReduxProvider>
    </MsalProvider>
  );
};
