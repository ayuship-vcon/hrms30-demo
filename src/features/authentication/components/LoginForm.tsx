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
import { useMsalLogin } from '../core/hooks/useMsalLogin';
import { loginSchema, type LoginFormData } from '../validations/login.validation';
import { useLoginMutation } from '@/core/api/auth';
import { ROUTES } from '@/shared/constants/routes.constants';
import { getErrorMessage } from '@/shared/utils';
import { IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  const {
    handleMicrosoftLogin,
    isMsalLoading,
    msalError,
    clearMsalError,
    resetLoginState,
  } = useMsalLogin();

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
    const success = await handleMicrosoftLogin();
    if (success && onSuccess) {
      onSuccess();
    }
  }, [handleMicrosoftLogin, onSuccess]);

  // 2. POC Email Submit Handler (the backend currently requires email only)
  const handleEmailPasswordSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        setIsSubmittingManual(true);
        setFormError(null);

        const response = await loginMutation({
          email: data.email,
        }).unwrap();

        if (response.user && response.token) {
          dispatch(loginSuccess({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
          }));
          if (onSuccess) {
            onSuccess();
          } else {
            navigate(ROUTES.DASHBOARD, { replace: true });
          }
        } else {
          throw new Error('Authentication response was incomplete');
        }
      } catch (err: unknown) {
        const message = getErrorMessage(err, 'Authentication failed. Please check your email and try again.');
        dispatch(loginFailure(message));
        setFormError(message);
      } finally {
        setIsSubmittingManual(false);
      }
    },
    [dispatch, loginMutation, navigate, onSuccess]
  );

  const errorMessage = msalError || formError;

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
              clearMsalError();
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
          isLoading={isMsalLoading}
          leftIcon={<WindowIcon sx={{ fontSize: 18 }} />}
          className="w-full h-10 shadow-xs font-semibold"
        >
          <span>{isMsalLoading ? 'Connecting to SSO...' : 'Single Sign On (SSO)'}</span>
        </Button>

        {isMsalLoading && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetLoginState}
            leftIcon={<RestartAltIcon sx={{ fontSize: 14 }} />}
            className="text-center text-xs text-muted hover:text-primary mt-1"
          >
            Cancel and unlock button
          </Button>
        )}
      </div>

      {/* 2. Divider with "Or sign in with email" */}
      <div className="relative my-5 sm:my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-muted text-xs font-medium uppercase tracking-wider">
            Or sign in with credentials
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
