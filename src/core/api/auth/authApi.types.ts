import type { User } from '@/features/authentication/core/types/auth.types';
import type { MenuGroup } from '@/core/api/menu';

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthSessionResponse {
  user: User;
  token: string;
  roleId?: number | string;
  refreshToken?: string;
  menu?: MenuGroup[];
  menus?: MenuGroup[];
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword?: string;
}
