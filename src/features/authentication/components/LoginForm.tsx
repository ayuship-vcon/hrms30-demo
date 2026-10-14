import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/core/redux/hooks/useAppDispatch';
import { loginFailure, loginSuccess } from '@/core/redux/auth';
import {
  Button,
  FormProvider,
  RHFInput,
} from '@/shared/components';
import { loginSchema, type LoginFormData } from '../validations/login.validation';
import { ROUTES } from '@/shared/constants/routes.constants';
import { IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import WindowIcon from '@mui/icons-material/Window';

export interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  // Initialize React Hook Form with Yup Validation Schema
  const methods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: undefined,
    },
    mode: 'onSubmit',
  });

  // 1. Single Sign-On (SSO) Handler
  const onSsoSignIn = useCallback(async () => {
    setFormError(null);
    setIsDemoLoading(true);
    dispatch(loginSuccess({
      user: {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@vconstruct.in',
        role: 'SUPER_ADMIN',
        department: 'Product Design',
        designation: 'UI/UX Demo User',
      },
      token: 'ui-demo-token',
    }));
    navigate(ROUTES.DASHBOARD, { replace: true });
    onSuccess?.();
    setIsDemoLoading(false);
  }, [dispatch, navigate, onSuccess]);

  // 2. POC Email Submit Handler (the backend currently requires email only)
  const handleEmailPasswordSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        setIsSubmittingManual(true);
        setFormError(null);

        dispatch(loginSuccess({
          user: {
            id: 'demo-user',
            name: data.email.split('@')[0] || 'Demo User',
            email: data.email,
            role: 'SUPER_ADMIN',
            department: 'Product Design',
            designation: 'UI/UX Demo User',
          },
          token: 'ui-demo-token',
        }));
        onSuccess?.();
        navigate(ROUTES.DASHBOARD, { replace: true });
      } catch (err: unknown) {
        const message = 'Demo sign-in could not be completed.';
        dispatch(loginFailure(message));
        setFormError(message);
      } finally {
        setIsSubmittingManual(false);
      }
    },
    [dispatch, navigate, onSuccess]
  );

  const errorMessage = formError;

  return (
    <div className="w-full flex flex-col">
      {/* Notice / Error Banner if SSO or Form failed */}
      {errorMessage && (
        <div className="p-3 rounded-sm bg-rose-50 border border-rose-200 text-destructive text-sm font-medium flex items-start justify-between gap-2 mb-4 text-left">
          <div className="flex items-start gap-2">
            <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-destructive mt-0.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <IconButton
            size="small"
            onClick={() => {
              setFormError(null);
            }}
            className="text-destructive hover:bg-rose-100"
            title="Dismiss notice"
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </div>
      )}

      {/* 1. Primary Action: Single Sign On (SSO) Button */}
      <div className="flex flex-col gap-1.5 w-full">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onSsoSignIn}
          isLoading={isDemoLoading}
          leftIcon={<WindowIcon sx={{ fontSize: 18 }} />}
          className="w-full h-10 shadow-xs font-semibold"
        >
          <span>{isDemoLoading ? 'Opening demo workspace...' : 'Enter UI Demo'}</span>
        </Button>

      </div>

      {/* 2. Divider with "Or sign in with email" */}
      <div className="relative my-5 sm:my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-muted text-xs font-medium uppercase tracking-wider">
            Or continue with a demo profile
          </span>
        </div>
      </div>

      {/* 3. React Hook Form Integrated Credentials Form */}
      <FormProvider methods={methods} onSubmit={handleEmailPasswordSubmit} className="flex flex-col gap-4 w-full text-left">
        {/* Email Field with RHF Integration */}
        <RHFInput<LoginFormData>
          name="email"
          label="Corporate Email Address"
          type="email"
          placeholder="e.g. user@vconstruct.in"
          leftIcon={<EmailOutlinedIcon fontSize="small" className="text-muted" />}
          required
        />

        {/* Password F  ield with RHF Integration */}
        <RHFInput<LoginFormData>
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<LockOutlinedIcon fontSize="small" className="text-muted" />}
          required
        />

        {/* Submit Action Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmittingManual}
          className="w-full h-10 mt-1 font-semibold"
        >
          Sign In with Email
        </Button>
      </FormProvider>

      <div className="mt-4 text-center">
        <span className="text-xs text-muted">
          Forgot your password?{' '}
          <Link
            className="font-semibold text-primary hover:underline cursor-pointer"
            to={ROUTES.AUTH.FORGOT_PASSWORD}
          >
            Reset it here
          </Link>
        </span>
      </div>

      {/* 4. Terms & Privacy Notice */}
      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        <p className="text-xs text-muted leading-relaxed max-w-xs">
          By clicking continue, you agree to our{' '}
          <span className="font-semibold text-neutralDark hover:underline cursor-pointer">Terms of Service</span> and{' '}
          <span className="font-semibold text-neutralDark hover:underline cursor-pointer">Privacy Policy</span>.
        </p>

        {/* Support Link */}
        <span className="text-xs font-semibold text-primary hover:underline cursor-pointer mt-1">
          Need help? Contact IT Support
        </span>

        {/* Copyright */}
        <p className="text-xs text-muted mt-2">
          &copy; 2026 vConstruct. All rights reserved.
        </p>
      </div>
    </div >
  );
};
