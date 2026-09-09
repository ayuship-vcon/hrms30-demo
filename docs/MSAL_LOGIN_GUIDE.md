# 🪟 Microsoft Azure AD / MSAL Single Sign-On (SSO) Integration Guide

> **Enterprise Authentication Reference**  
> *HRMS Enterprise Portal Architecture*

---

## 🔐 1. Architecture Overview

Authentication in the HRMS Enterprise Portal leverages **Microsoft Authentication Library (MSAL Browser v3 & MSAL React v2)** for seamless Single Sign-On with Microsoft Entra ID (Azure Active Directory), combined with **100% Cookie-Based Single Token Storage (`auth_token`)**.

```
[User Clicks "Sign in with Microsoft"]
                 │
                 ▼
[MSAL Popup Authentication (`msalService.loginPopup`)]
                 │
                 ▼
[Azure AD OAuth2.0 / OpenID Connect Token Issuance]
                 │
                 ▼
[Redux Action: `loginWithMsalAction(authResult)`]
                 │
                 ├── Store Single JWT Token in Browser Cookies (`auth_token`)
                 ├── Store User Profile in Redux Auth Slice
                 └── Synchronize Active User Role in Cookies (`active_dashboard_user_id`)
                 │
                 ▼
[Redirect to `/success` ➡️ Auto-Navigate to `/dashboard/:userId`]
```

---

## ⚙️ 2. Environment Variables Configuration

The following variables configure the Single Token Cookie in `.env`:

```env
# Microsoft Azure AD / MSAL SSO Authentication
VITE_MSAL_CLIENT_ID="b1d77157-0f33-4df0-aefd-8b994ae6af48"
VITE_MSAL_TENANT_ID="3ea4ee53-5e07-4a30-bd0d-e464769a4f4f"
VITE_MSAL_AUTHORITY="https://login.microsoftonline.com/3ea4ee53-5e07-4a30-bd0d-e464769a4f4f"
VITE_MSAL_REDIRECT_URI="http://localhost:3000/success"
VITE_MSAL_POST_LOGOUT_REDIRECT_URI="http://localhost:3000/auth/login"
VITE_MSAL_SCOPES="api://0346a4df-4fe4-48eb-b79c-2316d712d25e/access_as_user,openid,profile,email"

# Single Auth Cookie Security Configuration
VITE_AUTH_COOKIE_NAME="auth_token"
VITE_AUTH_COOKIE_EXPIRES_DAYS=7
VITE_AUTH_COOKIE_PATH="/"
VITE_AUTH_COOKIE_SECURE=false
VITE_AUTH_COOKIE_SAME_SITE="Lax"
```

---

## 🛡️ 3. Key Auth Files & Single Token Architecture

| File | Purpose |
| :--- | :--- |
| **[`src/features/authentication/core/utils/token.utils.ts`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/features/authentication/core/utils/token.utils.ts)** | **Single Token Manager**: Sets, reads, and clears strictly under `auth_token` while removing any legacy keys. |
| **[`src/shared/utils/cookie.utils.ts`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/utils/cookie.utils.ts)** | Core cookie engine with JSON parsing and 7-day expiration options. |
| **[`src/core/auth/msal.config.ts`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/core/auth/msal.config.ts)** | MSAL PublicClientApplication singleton configuration and login services. |
| **[`src/core/redux/auth/auth.actions.ts`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/core/redux/auth/auth.actions.ts)** | Dispatches `loginWithMsalAction` and `logoutUser` (clears token cookie). |
| **[`src/shared/components/ProtectedRoute.tsx`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/components/ProtectedRoute.tsx)** | Verifies single `auth_token` cookie before granting route access. |
