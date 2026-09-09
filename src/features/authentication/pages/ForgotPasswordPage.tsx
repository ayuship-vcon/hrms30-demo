import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../core/hooks/useAuth';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { ROUTES } from '@/shared/constants/routes.constants';
import { authIllustration, vconstructLogo } from '@/assets/images';

export const ForgotPasswordPage: React.FC = () => {
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
            Account Recovery & Security
          </h3>
          <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed mt-1">
            Enterprise password reset and authentication recovery
          </p>
        </div>
      </div>

      {/* Right Panel: Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-white overflow-y-auto">
        <div className="w-full max-w-[360px] sm:max-w-[380px] flex flex-col items-center text-center">
          {/* Brand Name: vConstruct */}
          <img
            src={vconstructLogo}
            alt="vConstruct Logo"
            className="w-[100px] sm:w-[120px] h-auto mb-6 sm:mb-8 select-none pointer-events-none"
          />

          {/* Heading: Forgot Password */}
          <h2 className="text-[22px] sm:text-[24px] font-bold text-black tracking-tight">
            Forgot Password?
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-sm text-[#6B7280] mt-1 mb-6">
            Enter your corporate email to reset your credentials
          </p>

          {/* Form */}
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};
