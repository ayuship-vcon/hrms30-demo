export interface MsalConfigOptions {
  clientId: string;
  tenantId: string;
  authority: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  scopes: string[];
}

export interface AuthCookieOptions {
  name: string;
  expiresDays: number;
  path: string;
  secure: boolean;
  sameSite: 'Lax' | 'Strict' | 'None';
  domain?: string;
}

export interface EnvironmentConfig {
  apiUrl: string;
  appName: string;
  appVersion: string;
  isProduction: boolean;
  isDevelopment: boolean;
  apiTimeout: number;
  msal: MsalConfigOptions;
  cookie: AuthCookieOptions;
  sessionTimeoutMinutes: number;
}
