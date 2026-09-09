import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const winName = typeof window !== 'undefined' ? window.name : '';

  const hasOAuthResponseParams =
    hash.includes('error=') ||
    hash.includes('code=') ||
    hash.includes('id_token=') ||
    hash.includes('access_token=') ||
    search.includes('error=') ||
    search.includes('code=');

  const isInsidePopup =
    typeof window !== 'undefined' &&
    (Boolean(window.opener && window.opener !== window) ||
      winName.includes('msal.') ||
      winName.includes('popup') ||
      hasOAuthResponseParams);

  useEffect(() => {
    if (isInsidePopup) {
      window.close();
      return;
    }

    // Show success confirmation screen briefly, then enter dashboard
    const timer = setTimeout(() => {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [isInsidePopup, navigate]);

  // If this window is an OAuth popup callback, render nothing (window.close is executing)
  if (isInsidePopup) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="max-w-sm w-full p-8 rounded-sm bg-surface border border-border shadow-card text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-success-bg text-success flex items-center justify-center">
          <CheckCircleOutlineRoundedIcon sx={{ fontSize: 32 }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-black tracking-tight">Authentication Successful!</h2>
          <p className="text-sm text-muted mt-1">Logging in and redirecting to your Dashboard...</p>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary">
          <CircularProgress size={16} sx={{ color: 'var(--primary, #0b4668)' }} />
          <span>Please wait a moment...</span>
        </div>
      </div>
    </div>
  );
};
