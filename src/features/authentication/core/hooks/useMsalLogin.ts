import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/core/redux/hooks/useAppDispatch';
import { useMsal } from '@azure/msal-react';
import { loginRequest, initializeMsal, msalService } from '@/core/auth';
import { loginFailure, loginSuccess, setLoading } from '@/core/redux/auth';
import type { User } from '@/features/authentication/core/types';
import { tokenUtils, authUtils } from '@/features/authentication/core/utils';
import { baseApi } from '@/core/api';
import { getErrorMessage } from '@/shared/utils';
import { ROUTES } from '@/shared/constants/routes.constants';

/**
 * Removes stale MSAL interaction locks that persist when a popup is aborted mid-flow.
 * MSAL stores "interaction_in_progress" in storage to prevent concurrent auth requests.
 * If the popup is closed without completing, this lock is never cleared — causing
 * "interaction_in_progress" errors on the next login attempt.
 */
function clearHangingInteractionStatus() {
  try {
    sessionStorage.removeItem('msal.interaction.status');
    localStorage.removeItem('msal.interaction.status');
  } catch (e) {
    console.warn('[MSAL] Could not clear interaction status:', e);
  }
}

/**
 * Maps MSAL error codes to structured failure reasons for the /failed page.
 *
 * Error code reference:
 *   user_cancelled     — user clicked Cancel inside Microsoft's login page
 *   popup_window_error — popup was closed by the browser
 *   timed_out          — popup closed (X) before Azure AD could redirect back
 *   access_denied      — AADSTS65004: admin consent required
 *   consent_required   — explicit consent scope not granted
 */
function classifyMsalError(error: unknown): {
  reason: 'cancelled' | 'consent' | 'error';
  message: string;
} {
  const errObj = error as Record<string, string> | undefined;
  const errorCode = (errObj?.errorCode || errObj?.name || '').toLowerCase();
  const errorMessage = (errObj?.message || errObj?.errorMessage || '').toLowerCase();

  const isCancelOrClose =
    errorCode === 'user_cancelled' ||
    errorCode === 'popup_window_error' ||
    errorCode === 'timed_out' ||
    errorMessage.includes('user cancelled') ||
    errorMessage.includes('popup_window_error') ||
    errorMessage.includes('timed_out') ||
    errorMessage.includes('the popup window was closed');

  if (isCancelOrClose) {
    return {
      reason: 'cancelled',
      message: 'Microsoft sign-in was cancelled or the window was closed.',
    };
  }

  const isConsentRequired =
    errorCode.includes('access_denied') ||
    errorCode.includes('consent_required') ||
    errorMessage.includes('aadsts65004') ||
    errorMessage.includes('access_denied') ||
    errorMessage.includes('consent_required');

  if (isConsentRequired) {
    return {
      reason: 'consent',
      message: 'Admin approval is required. Please contact your IT administrator to grant access to vConProdTrackerApp.',
    };
  }

  return {
    reason: 'error',
    message: errorMessage || 'Microsoft sign-in failed. Please try again.',
  };
}

/**
 * Detects when the user manually closes the MSAL popup window (X button).
 *
 * MSAL has no native "popup closed" event — it only detects closure via a 60s timeout.
 * This function bypasses that wait by listening for the parent window's `focus` event.
 * When the popup is dismissed, the OS returns focus to the parent within milliseconds.
 *
 * To distinguish manual close from a successful auth redirect (which also closes the
 * popup and returns focus), we wait 600ms after focus returns. If MSAL has not resolved
 * within that window, the popup was closed without completing authentication.
 *
 * Startup delay of 800ms prevents a false-positive triggered by the brief focus loss
 * that occurs when the popup window first opens.
 *
 * @param onPopupClosed - Called when closure is confirmed (no MSAL resolution in 600ms)
 * @returns cleanup - Call to cancel all timers and remove event listeners
 */
function createPopupCloseDetector(onPopupClosed: () => void): () => void {
  let focusCheckTimer: ReturnType<typeof setTimeout> | null = null;
  let startupDelay: ReturnType<typeof setTimeout> | null = null;
  let isResolved = false;

  const cleanup = () => {
    isResolved = true;
    if (focusCheckTimer) clearTimeout(focusCheckTimer);
    if (startupDelay) clearTimeout(startupDelay);
    window.removeEventListener('focus', onWindowFocus);
  };

  const onWindowFocus = () => {
    if (isResolved) return;
    focusCheckTimer = setTimeout(() => {
      if (!isResolved) {
        cleanup();
        onPopupClosed();
      }
    }, 600);
  };

  startupDelay = setTimeout(() => {
    window.addEventListener('focus', onWindowFocus);
  }, 800);

  return cleanup;
}

export function useMsalLogin() {
  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMsalLoading, setIsMsalLoading] = useState(false);
  const [msalError, setMsalError] = useState<string | null>(null);

  const resetLoginState = useCallback(() => {
    clearHangingInteractionStatus();
    setIsMsalLoading(false);
    setMsalError(null);
  }, []);

  const handleMicrosoftLogin = useCallback(async () => {
    setIsMsalLoading(true);
    setMsalError(null);
    clearHangingInteractionStatus();

    let msalDone = false;
    // Object wrapper ensures closures share the same mutable reference (avoids TS narrowing issues with let)
    const detector: { cleanup: (() => void) | null } = { cleanup: null };

    try {
      await initializeMsal();

      // Register the close detector before opening the popup so the focus
      // listener is active when the popup first steals focus from the parent.
      const popupClosedPromise = new Promise<'popup_closed'>((resolve) => {
        detector.cleanup = createPopupCloseDetector(() => {
          if (!msalDone) resolve('popup_closed');
        });
      });

      const loginPopupPromise = instance.loginPopup(loginRequest).then(
        (result) => {
          msalDone = true;
          detector.cleanup?.();
          return { type: 'msal_success' as const, result };
        },
        (error) => {
          msalDone = true;
          detector.cleanup?.();
          return { type: 'msal_error' as const, error };
        }
      );

      // Race the MSAL auth promise against our popup-close detector.
      // Whichever settles first determines the outcome.
      const raceResult = await Promise.race([
        loginPopupPromise,
        popupClosedPromise.then(() => ({ type: 'popup_closed' as const })),
      ]);

      if (raceResult.type === 'popup_closed') {
        navigate(ROUTES.AUTH.FAILED, {
          replace: true,
          state: {
            reason: 'cancelled',
            message: 'Microsoft sign-in was cancelled or the window was closed.',
          },
        });
        return false;
      }

      // ── MSAL rejected (Cancel button / consent / error) ─────────────────────
      if (raceResult.type === 'msal_error') {
        console.error(
          '%c[MSAL Login Failure]',
          'background: #dc2626; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
          {
            errorCode: raceResult.error?.errorCode,
            errorMessage: raceResult.error?.message,
            subError: raceResult.error?.subError,
            error: raceResult.error,
          }
        );
        const { reason, message } = classifyMsalError(raceResult.error);
        navigate(ROUTES.AUTH.FAILED, { replace: true, state: { reason, message } });
        return false;
      }

      const authResult = raceResult.result;

      if (!authResult || !authResult.account) {
        throw new Error('No account returned from Microsoft authentication.');
      }

      instance.setActiveAccount(authResult.account);

      dispatch(setLoading(true));
      const claims = authResult.idTokenClaims as Record<string, unknown> | undefined;
      const account = authResult.account;
      const msalUser: User = {
        id: account.homeAccountId || account.localAccountId || `msal-${Date.now()}`,
        name: account.name || (claims?.name as string) || account.username.split('@')[0] || 'Microsoft User',
        email: account.username || (claims?.email as string) || (claims?.preferred_username as string) || '',
        role: (Array.isArray(claims?.roles) ? claims.roles[0] : undefined) as string || 'SUPER_ADMIN',
        department: (claims?.department as string) || 'Enterprise Directory',
        designation: (claims?.jobTitle as string) || 'Azure AD User',
      };
      const token = authResult.accessToken || authResult.idToken;
      tokenUtils.setToken(token);
      dispatch(loginSuccess({ user: msalUser, token }));

      if (msalUser.email) {
        dispatch(baseApi.util.invalidateTags(['Menu']));
      }

      navigate(ROUTES.AUTH.SUCCESS, { replace: true });
      return true;
    } catch (error: unknown) {
      msalDone = true;
      detector.cleanup?.();
      const { reason, message: classifiedMessage } = classifyMsalError(error);
      const message = getErrorMessage(error, classifiedMessage);
      dispatch(loginFailure(message));
      navigate(ROUTES.AUTH.FAILED, { replace: true, state: { reason, message } });
      return false;
    } finally {
      setIsMsalLoading(false);
    }
  }, [instance, dispatch, navigate]);

  const clearMsalError = useCallback(() => {
    setMsalError(null);
  }, []);

  return {
    handleMicrosoftLogin,
    isMsalLoading,
    msalError,
    clearMsalError,
    resetLoginState,
  };
}
