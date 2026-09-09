
export interface User {
  id: string | number;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string | null;
  department?: string | null;
  designation?: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
