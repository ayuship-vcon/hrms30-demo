import {
  type Configuration,
  PublicClientApplication,
  LogLevel,
  type AuthenticationResult,
  type AccountInfo,
  type PopupRequest,
  type RedirectRequest,
  type EndSessionRequest,
} from '@azure/msal-browser';
import { ENV } from '@/config/env.config';

export type {
  AuthenticationResult,
  AuthenticationResult as MsalAuthenticationResult,
  AccountInfo,
  AccountInfo as MsalAccountInfo,
  Configuration,
  PopupRequest,
  RedirectRequest,
};

export const msalConfig: Configuration = {
  auth: {
    clientId: ENV.msal.clientId,
    authority: ENV.msal.authority,
    redirectUri: ENV.msal.redirectUri,
    postLogoutRedirectUri: ENV.msal.postLogoutRedirectUri,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error('%c[MSAL ERROR]', 'background: #fee2e2; color: #dc2626; font-weight: bold; padding: 2px 6px; border-radius: 4px;', message);
            return;
          case LogLevel.Warning:
            console.warn('%c[MSAL WARN]', 'background: #fef3c7; color: #d97706; font-weight: bold; padding: 2px 6px; border-radius: 4px;', message);
            return;
          case LogLevel.Info:
          case LogLevel.Verbose:
          case LogLevel.Trace:
            if (ENV.isDevelopment) {
              console.info('%c[MSAL DEBUG]', 'background: #e0f2fe; color: #0284c7; padding: 2px 6px; border-radius: 4px;', message);
            }
            return;
          default:
            return;
        }
      },
      logLevel: ENV.isDevelopment ? LogLevel.Verbose : LogLevel.Error,
    },
  },
};

/**
 * Popup redirectUri must be whitelisted in Azure AD App Registration.
 * After Azure AD processes auth (success or error), it redirects the popup
 * to this URI. main.tsx detects window.opener and calls handleRedirectPromise()
 * + window.close() before React mounts, preventing the app from rendering inside the popup.
 */
export const loginRequest: PopupRequest = {
  scopes: ENV.msal.scopes.length > 0
    ? ENV.msal.scopes
    : ['api://0346a4df-4fe4-48eb-b79c-2316d712d25e/access_as_user', 'openid', 'profile', 'email'],
  redirectUri: typeof window !== 'undefined'
    ? `${window.location.origin}/success`
    : 'http://localhost:3000/success',
};

export const msalInstance = new PublicClientApplication(msalConfig);

let isMsalInitialized = false;
let msalInitPromise: Promise<PublicClientApplication> | null = null;

/**
 * Initializes the MSAL PublicClientApplication singleton (idempotent).
 * Must be called before any loginPopup / acquireToken operation.
 * Handles any pending redirect promise from a prior OAuth redirect flow.
 */
export const initializeMsal = async (): Promise<PublicClientApplication> => {
  if (isMsalInitialized) return msalInstance;
  if (!msalInitPromise) {
    msalInitPromise = (async () => {
      try {
        await msalInstance.initialize();
        await msalInstance.handleRedirectPromise();
        isMsalInitialized = true;
      } catch (err) {
        console.warn('[MSAL Initialization Warning]:', err);
      }
      return msalInstance;
    })();
  }
  return msalInitPromise;
};

export const msalService = {
  async loginPopup(customRequest?: PopupRequest): Promise<AuthenticationResult> {
    await initializeMsal();
    const response = await msalInstance.loginPopup(customRequest || loginRequest);
    if (response?.account) msalInstance.setActiveAccount(response.account);
    return response;
  },

  async loginRedirect(customRequest?: RedirectRequest): Promise<void> {
    await initializeMsal();
    return msalInstance.loginRedirect(customRequest || loginRequest);
  },

  async logout(logoutRequest?: EndSessionRequest): Promise<void> {
    await initializeMsal();
    const currentAccount = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
    const postLogoutRedirectUri = ENV.msal.postLogoutRedirectUri || `${window.location.origin}/auth/login`;

    if (currentAccount) msalInstance.setActiveAccount(null);

    try {
      if (currentAccount || msalInstance.getAllAccounts().length > 0) {
        await msalInstance.logoutPopup({
          account: currentAccount || undefined,
          postLogoutRedirectUri,
          mainWindowRedirectUri: postLogoutRedirectUri,
          ...logoutRequest,
        });
      }
    } catch {
      // logoutPopup can fail in certain browser/tenant configurations — fall back to redirect
      await msalInstance.logoutRedirect({
        account: currentAccount || undefined,
        postLogoutRedirectUri,
        ...logoutRequest,
      });
    }
  },

  async acquireTokenSilent(scopes: string[] = loginRequest.scopes): Promise<AuthenticationResult | null> {
    await initializeMsal();
    const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
    if (!account) return null;
    try {
      return await msalInstance.acquireTokenSilent({ scopes, account });
    } catch {
      return msalInstance.acquireTokenPopup({ scopes });
    }
  },

  getActiveAccount(): AccountInfo | null {
    return msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0] || null;
  },
};
