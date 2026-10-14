import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { authIllustration, vconstructLogo } from '@/assets/images';

export const LoginPage: React.FC = () => {
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
            Secure Enterprise Workforce Portal
          </h3>
          <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed mt-1">
            Single Sign-On authentication powered by Microsoft Entra ID
          </p>
        </div>
      </div>

      {/* Right Panel: Form matching exact Figma PNG */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-white overflow-y-auto">
        <div className="w-full max-w-[360px] sm:max-w-[380px] flex flex-col items-center text-center">
          {/* Brand Name: vConstruct */}
          <img
            src={vconstructLogo}
            alt="vConstruct Logo"
            className="w-[100px] sm:w-[120px] h-auto mb-6 sm:mb-8 select-none pointer-events-none"
          />

          {/* Heading: Sign In */}
          <h2 className="text-[22px] sm:text-[24px] font-bold text-black tracking-tight">
            Sign In
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-sm text-[#6B7280] mt-1 mb-6">
            Access your HRMS Dashboard
          </p>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
