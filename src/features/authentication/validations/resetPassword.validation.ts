import * as yup from 'yup';

/**
 * Enterprise Reset Password Form Yup Validation Schema
 */
export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must contain at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;
