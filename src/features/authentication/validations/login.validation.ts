import * as yup from 'yup';

/**
 * Enterprise Login Form Yup Validation Schema
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Corporate email is required')
    .email('Please enter a valid corporate email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must contain at least 6 characters'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
