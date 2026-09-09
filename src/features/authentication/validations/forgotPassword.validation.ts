import * as yup from 'yup';

/**
 * Enterprise Forgot Password Form Yup Validation Schema
 */
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Corporate email is required')
    .email('Please enter a valid corporate email address'),
});

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
