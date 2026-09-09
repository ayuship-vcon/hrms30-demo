import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/shared/components';
import { ROUTES } from '@/shared/constants/routes.constants';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

interface FailedLocationState {
  reason?: 'cancelled' | 'consent' | 'error';
  message?: string;
}

/**
 * AuthFailedPage
 *
 * Shown when MSAL loginPopup() rejects for any reason:
 *  - 'cancelled' → User clicked Cancel or closed the popup with (X)
 *  - 'consent'   → Admin approval required (AADSTS65004 / access_denied)
 *  - 'error'     → Any other authentication failure
 *
 * Reason and message are passed via React Router's location.state from useMsalLogin.
 */
export const AuthFailedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as FailedLocationState;

  const reason = state.reason ?? 'error';
  const message = state.message ?? 'Unable to complete sign-in. Please try again.';

  // Icon, title and accent colour differ by reason
  const config = {
    cancelled: {
      Icon: CancelOutlinedIcon,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      title: 'Sign-in Cancelled',
      buttonLabel: 'Try Again',
    },
    consent: {
      Icon: AdminPanelSettingsOutlinedIcon,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      title: 'Admin Approval Required',
      buttonLabel: 'Back to Sign In',
    },
    error: {
      Icon: ErrorOutlineRoundedIcon,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      title: 'Authentication Failed',
      buttonLabel: 'Back to Sign In',
    },
  }[reason];

  const { Icon, iconBg, iconColor, title, buttonLabel } = config;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="max-w-sm w-full p-8 rounded-sm bg-surface border border-border shadow-card text-center flex flex-col items-center gap-4">

        {/* Icon */}
        <div className={`w-14 h-14 rounded-full ${iconBg} ${iconColor} flex items-center justify-center`}>
          <Icon sx={{ fontSize: 32 }} />
        </div>

        {/* Title & Message */}
        <div>
          <h2 className="text-lg font-bold text-black tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-muted mt-1 leading-relaxed max-w-[260px] mx-auto">
            {message}
          </p>
        </div>

        {/* Back to Sign In */}
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => navigate(ROUTES.AUTH.LOGIN, { replace: true })}
          className="mt-3 w-full"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
