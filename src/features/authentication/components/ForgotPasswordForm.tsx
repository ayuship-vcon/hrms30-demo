import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Button, FormProvider, RHFInput } from '@/shared/components';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../validations/forgotPassword.validation';
import { useForgotPasswordMutation } from '@/core/api/auth';
import { ROUTES } from '@/shared/constants/routes.constants';
import { IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

export const ForgotPasswordForm: React.FC = () => {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const methods = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setFormError(null);
      await forgotPasswordMutation({ email: data.email }).unwrap();
      setSubmittedEmail(data.email);
      setIsSuccess(true);
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'data' in err && (err as { data: { message?: string } }).data?.message
          ? (err as { data: { message: string } }).data.message
          : err instanceof Error
          ? err.message
          : 'Unable to process your request. Please try again or contact IT support.';
      setFormError(message);
    }
  };

  const handleResend = async () => {
    if (!submittedEmail) return;
    try {
      setFormError(null);
      await forgotPasswordMutation({ email: submittedEmail }).unwrap();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to resend reset email. Please try again later.';
      setFormError(message);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <MarkEmailReadOutlinedIcon sx={{ fontSize: 32 }} />
        </div>

        <h3 className="text-lg font-bold text-black tracking-tight">
          Check your email
        </h3>

        <p className="text-sm text-[#6B7280] mt-2 mb-6 leading-relaxed max-w-sm">
          We have sent password reset instructions to{' '}
          <span className="font-semibold text-neutralDark">{submittedEmail}</span>.
          Please check your inbox and follow the link to reset your password.
        </p>

        {formError && (
          <div className="w-full p-3 rounded-sm bg-rose-50 border border-rose-200 text-destructive text-sm font-medium flex items-start justify-between gap-2 mb-4 text-left">
            <div className="flex items-start gap-2">
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-destructive mt-0.5 shrink-0" />
              <span>{formError}</span>
            </div>
            <IconButton
              size="small"
              onClick={() => setFormError(null)}
              className="text-destructive hover:bg-rose-100"
              title="Dismiss"
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleResend}
            isLoading={isLoading}
            className="w-full h-10 font-semibold"
          >
            Resend Email
          </Button>

          <Link
            to={ROUTES.AUTH.LOGIN}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline mt-2"
          >
            <ArrowBackIcon sx={{ fontSize: 14 }} />
            Back to Sign In
          </Link>
        </div>
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
        <RHFInput<ForgotPasswordFormData>
          name="email"
          label="Corporate Email Address"
          type="email"
          placeholder="e.g. user@vconstruct.in"
          leftIcon={<EmailOutlinedIcon fontSize="small" className="text-muted" />}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full h-10 mt-1 font-semibold"
        >
          Send Reset Instructions
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
