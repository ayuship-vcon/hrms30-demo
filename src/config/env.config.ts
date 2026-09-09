import type { EnvironmentConfig } from "@/types/environment";

const getEnvString = (key: string, defaultValue: string): string => {
  return import.meta.env[key] ? String(import.meta.env[key]) : defaultValue;
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  const val = import.meta.env[key];
  return val ? Number(val) : defaultValue;
};

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const val = import.meta.env[key];
  if (val === undefined || val === null || val === "") return defaultValue;
  return val === "true" || val === true;
};

const msalTenantId = getEnvString("VITE_MSAL_TENANT_ID", "common");

export const ENV: EnvironmentConfig = {
  // App General
  appName: getEnvString("VITE_APP_TITLE", "HRMS Enterprise Portal"),
  appVersion: getEnvString("VITE_APP_VERSION", "1.0.0"),
  isProduction:
    import.meta.env.MODE === "production" ||
    import.meta.env.VITE_APP_ENV === "production",
  isDevelopment:
    import.meta.env.MODE !== "production" &&
    import.meta.env.VITE_APP_ENV !== "production",

  // REST API
  apiUrl: getEnvString(
    "VITE_API_BASE_URL",
    "https://api.hrms-enterprise.com/v1/api",
  ),
  apiTimeout: getEnvNumber("VITE_API_TIMEOUT", 15000),

  // Microsoft Azure AD / MSAL SSO
  msal: {
    clientId: getEnvString(
      "VITE_MSAL_CLIENT_ID",
      "9a7b1c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    ),
    tenantId: msalTenantId,
    authority: getEnvString(
      "VITE_MSAL_AUTHORITY",
      `https://login.microsoftonline.com/${msalTenantId}`,
    ),
    redirectUri: getEnvString(
      "VITE_MSAL_REDIRECT_URI",
      `${window.location.origin}/success`,
    ),
    postLogoutRedirectUri: getEnvString(
      "VITE_MSAL_POST_LOGOUT_REDIRECT_URI",
      `${window.location.origin}/auth/login`,
    ),
    scopes: getEnvString("VITE_MSAL_SCOPES", "User.Read,openid,profile,email")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  },

  // Auth Cookie Configuration
  cookie: {
    name: getEnvString("VITE_AUTH_COOKIE_NAME", "auth_token"),
    expiresDays: getEnvNumber("VITE_AUTH_COOKIE_EXPIRES_DAYS", 7),
    path: getEnvString("VITE_AUTH_COOKIE_PATH", "/"),
    secure: getEnvBoolean(
      "VITE_AUTH_COOKIE_SECURE",
      window.location.protocol === "https:",
    ),
    sameSite: getEnvString("VITE_AUTH_COOKIE_SAME_SITE", "Lax") as
      | "Lax"
      | "Strict"
      | "None",
    domain: getEnvString("VITE_AUTH_COOKIE_DOMAIN", window.location.hostname),
  },

  sessionTimeoutMinutes: 30,
};
