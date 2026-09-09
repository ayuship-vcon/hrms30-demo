import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormProvider, RHFInput } from '@/shared/components';
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '../validations/resetPassword.validation';
import { useResetPasswordMutation } from '@/core/api/auth';
import { ROUTES } from '@/shared/constants/routes.constants';
import { IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const navigate = useNavigate();
  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setFormError('Invalid or expired reset token. Please request a new password reset link.');
      return;
    }

    try {
      setFormError(null);
      await resetPasswordMutation({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      setIsSuccess(true);
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'data' in err && (err as { data: { message?: string } }).data?.message
          ? (err as { data: { message: string } }).data.message
          : err instanceof Error
          ? err.message
          : 'Unable to reset password. The reset link may have expired or is invalid.';
      setFormError(message);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircleOutlineIcon sx={{ fontSize: 32 }} />
        </div>

        <h3 className="text-lg font-bold text-black tracking-tight">
          Password Reset Complete
        </h3>

        <p className="text-sm text-[#6B7280] mt-2 mb-6 leading-relaxed max-w-sm">
          Your password has been successfully updated. You can now use your new credentials to sign in.
        </p>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => navigate(ROUTES.AUTH.LOGIN, { replace: true })}
          className="w-full h-10 font-semibold"
        >
          Proceed to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Notice / Error Banner */}
      {formError && (
        <div className="p-3 rounded-sm bg-rose-50 border border-rose-200 text-destructive text-sm font-medium flex items-start justify-between gap-2 mb-4 text-left">
          <div className="flex items-start gap-2">
            <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-destructive mt-0.5 shrink-0" />
            <span>{formError}</span>
          </div>
          <IconButton
            size="small"
            onClick={() => setFormError(null)}
            className="text-destructive hover:bg-rose-100"
            title="Dismiss notice"
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </div>
      )}

      {/* React Hook Form */}
      <FormProvider methods={methods} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full text-left">
        <RHFInput<ResetPasswordFormData>
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<LockOutlinedIcon fontSize="small" className="text-muted" />}
          required
        />

        <RHFInput<ResetPasswordFormData>
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<LockOutlinedIcon fontSize="small" className="text-muted" />}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full h-10 mt-1 font-semibold"
        >
          Update Password
        </Button>
      </FormProvider>

      {/* Return to Login Link */}
      <div className="mt-6 text-center">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          <ArrowBackIcon sx={{ fontSize: 14 }} />
          Back to Sign In
        </Link>
      </div>

      {/* Copyright */}
      <p className="text-xs text-muted text-center mt-6">
        &copy; 2026 vConstruct. All rights reserved.
      </p>
    </div>
  );
};
