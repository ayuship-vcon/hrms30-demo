import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../core/hooks/useAuth';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
import { ROUTES } from '@/shared/constants/routes.constants';
import { authIllustration, vconstructLogo } from '@/assets/images';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button } from '@/shared/components';

export const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to Dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Panel: Clean Neutral Illustration Surface */}
      <div className="hidden md:flex md:w-1/2 bg-[#f1f1f1] items-center justify-center relative p-8 lg:p-12 border-r border-slate-200">
        <div className="flex flex-col items-center justify-center max-w-md w-full text-center">
          <div className="w-full flex items-center justify-center">
            <img
              src={authIllustration}
              alt="vConstruct HRMS Workforce Platform"
              className="w-full max-w-[360px] lg:max-w-[420px] h-auto drop-shadow-xs select-none pointer-events-none transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          <h3 className="text-base font-semibold text-brand tracking-tight mt-6">
            Secure Credentials Reset
          </h3>
          <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed mt-1">
            Choose a new strong password to secure your workspace access
          </p>
        </div>
      </div>

      {/* Right Panel: Reset Password Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-white overflow-y-auto">
        <div className="w-full max-w-[360px] sm:max-w-[380px] flex flex-col items-center text-center">
          {/* Brand Name: vConstruct */}
          <img
            src={vconstructLogo}
            alt="vConstruct Logo"
            className="w-[100px] sm:w-[120px] h-auto mb-6 sm:mb-8 select-none pointer-events-none"
          />

          {/* If token is missing from URL */}
          {!token ? (
            <div className="w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-destructive flex items-center justify-center mb-4">
                <ErrorOutlineIcon sx={{ fontSize: 32 }} />
              </div>

              <h2 className="text-[20px] font-bold text-black tracking-tight">
                Invalid Reset Link
              </h2>

              <p className="text-sm text-[#6B7280] mt-2 mb-6 leading-relaxed">
                This password reset link is missing a security token or has expired. Please request a new link.
              </p>

              <div className="flex flex-col gap-3 w-full">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
                  className="w-full h-10 font-semibold"
                >
                  Request New Reset Link
                </Button>

                <Link
                  to={ROUTES.AUTH.LOGIN}
                  className="text-xs font-semibold text-primary hover:underline mt-2"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Heading: Reset Password */}
              <h2 className="text-[22px] sm:text-[24px] font-bold text-black tracking-tight">
                Reset Password
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-sm text-[#6B7280] mt-1 mb-6">
                Create a new strong password for your account
              </p>

              {/* Form */}
              <ResetPasswordForm token={token} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
