# 🏢 HRMS Enterprise Portal

A modern, scalable Human Resource Management System (HRMS) built with **React 19**, **TypeScript**, **Vite**, **Redux Toolkit**, **Material UI (MUI)**, and **Tailwind CSS**.

Features a centralized **`src/core/`** architecture with modular **API services**, **Redux slices & actions**, **Microsoft Azure AD / MSAL Single Sign-On (SSO)**, and **Cookie-based token security**.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.
- Check Node version: `node -v`
- Check npm version: `npm -v`

---

### 2. Environment Configuration
Environment variables are defined in [`.env`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/.env), `.env.development`, and `.env.production` (and templated in `.env.example`):

```env
# Application General
VITE_APP_TITLE="HRMS Enterprise Portal"
VITE_APP_ENV="development"
VITE_APP_PORT=3000

# Backend REST API
VITE_API_BASE_URL="https://api.hrms-enterprise.com/v1/api"
VITE_API_TIMEOUT=15000

# Microsoft Azure AD / MSAL SSO Authentication
VITE_MSAL_CLIENT_ID="9a7b1c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d"
VITE_MSAL_TENANT_ID="common"
VITE_MSAL_AUTHORITY="https://login.microsoftonline.com/common"
VITE_MSAL_REDIRECT_URI="http://localhost:3000/auth/login"
VITE_MSAL_SCOPES="User.Read,openid,profile,email"

# Single Auth Cookie Security Configuration
VITE_AUTH_COOKIE_NAME="auth_token"
VITE_AUTH_COOKIE_EXPIRES_DAYS=7
VITE_AUTH_COOKIE_PATH="/"
VITE_AUTH_COOKIE_SECURE=false
VITE_AUTH_COOKIE_SAME_SITE="Lax"
```

---

### 3. Installation
Open your terminal in the project root directory and install dependencies:

```bash
npm install
```

---

## 🛠️ Multi-Environment NPM Commands

We provide dedicated commands for **Development**, **Staging**, and **Production** environments:

### 🏃 1. Run Local Dev Server

| Command | Environment | Description |
| :--- | :--- | :--- |
| `npm run dev` | Default | Starts the Vite dev server using `.env` |
| `npm run dev:dev` | **Development** | Starts Vite with `.env.development` mode |
| `npm run dev:staging` | **Staging / UAT** | Starts Vite with `.env.staging` mode |
| `npm run dev:prod` | **Production** | Starts Vite with `.env.production` mode |

---

### 🏗️ 2. Build for Environments

| Command | Environment | Description |
| :--- | :--- | :--- |
| `npm run build` | Default Production | Compiles TypeScript (`tsc -b`) and builds production bundle in `dist/` |
| `npm run build:dev` | **Development** | Builds bundle configured with development environment variables |
| `npm run build:staging` | **Staging / UAT** | Builds bundle configured with staging environment variables |
| `npm run build:prod` | **Production** | Builds optimized bundle configured with production variables |

---

### 🔎 3. Preview Built Artifacts

| Command | Environment | Description |
| :--- | :--- | :--- |
| `npm run preview` | Default | Locally serves and previews the built `dist/` bundle |
| `npm run preview:dev` | **Development** | Previews the development build |
| `npm run preview:staging` | **Staging / UAT** | Previews the staging build |
| `npm run preview:prod` | **Production** | Previews the production build |

---

### 🧪 4. Quality & Type Checking

| Command | Description |
| :--- | :--- |
| `npm run type-check` | Runs the TypeScript compiler (`tsc --noEmit`) to verify 0 type errors |
| `npm run lint` | Runs ESLint to check for code quality and style compliance |

---

## 🌟 Modules & Core Features

- 🔑 **Authentication & Microsoft SSO (`/auth/login`)**:
  - Microsoft Azure AD MSAL Single Sign-On popup/redirect flow.
  - Auth token persistence in secure browser Cookies.
  - Role-Based Access Control (RBAC) route guarding.
- 👔 **Workforce Directory (`/employees`)**:
  - Full CRUD operations with **API-First ➡️ Redux Store** synchronization.
  - Live KPI metric cards (Headcount, Active Staff, Payroll, Units).
  - Search, filter by department, and status filtering.
- 🌴 **Leaves & Time Off (`/leave`)**:
  - Live quota balances (Annual, Sick, Casual, Maternity).
  - Time-off application pipeline with Approve/Reject/Delete workflows.
- 📋 **Attendance & Shift Logs (`/attendance`)**:
  - Real-time digital workday clock.
  - 1-click biometric punch-in / punch-out toggle.
  - Manual attendance log submission with shift tracking.
- 🎉 **Holidays Calendar (`/holidays`)**:
  - Scheduled national, regional, and optional company holidays.
  - Add & Delete holidays with instant Redux state updates.
- 👑 **System Administration (`/admin`)**:
  - Global tenant configuration (MFA enforcement, fiscal dates, leave thresholds).
  - Security audit logs with single or batch log clearing.
- 🗑️ **Custom Delete Confirmation Dialogs**:
  - Built-in custom delete modals with highlighted item chips and loading states across all modules.

---

## 📂 Centralized Project Architecture (`src/core/`)

```
src/
├── config/                           # Strongly-typed environment & app configs
├── core/                             # 🌐 Central Data & State Layer
│   ├── api/                          # Modular API Services (Per Module)
│   │   ├── client/                   # Base HTTP Client (baseApi.ts, baseQuery.ts)
│   │   ├── auth/                     # auth.api.ts, authApi.types.ts
│   │   ├── employee/                 # employee.api.ts, employeeApi.types.ts
│   │   ├── leave/                    # leave.api.ts, leaveApi.types.ts
│   │   ├── attendance/               # attendance.api.ts, attendanceApi.types.ts
│   │   ├── holiday/                  # holiday.api.ts, holidayApi.types.ts
│   │   ├── admin/                    # admin.api.ts, adminApi.types.ts
│   │   └── index.ts
│   │
│   ├── auth/                         # Microsoft MSAL SSO Configuration
│   │   └── msal.config.ts            # MSAL PublicClientApplication & login services
│   │
│   ├── redux/                        # Modular Redux State Management (Per Module)
│   │   ├── store.ts                  # configureStore, RootState, AppDispatch
│   │   ├── rootReducer.ts            # Combined root reducer
│   │   ├── hooks/                    # useAppDispatch, useAppSelector
│   │   ├── auth/                     # auth.slice.ts, auth.actions.ts, auth.selectors.ts
│   │   ├── employee/                 # employee.slice.ts, employee.actions.ts, employee.selectors.ts
│   │   ├── leave/                    # leave.slice.ts, leave.actions.ts, leave.selectors.ts
│   │   ├── attendance/               # attendance.slice.ts, attendance.actions.ts, attendance.selectors.ts
│   │   ├── holiday/                  # holiday.slice.ts, holiday.actions.ts, holiday.selectors.ts
│   │   ├── admin/                    # admin.slice.ts, admin.actions.ts, admin.selectors.ts
│   │   └── index.ts
│   └── index.ts
│
├── features/                         # 🎨 Presentation & UI Modules
│   ├── authentication/               # Components, Hooks, Pages
│   ├── employee/                     # Components, Hooks, Pages, Validations
│   ├── leave/                        # Components, Hooks, Pages, Validations
│   ├── attendance/                   # Components, Hooks, Pages, Validations
│   ├── holiday/                      # Components, Hooks, Pages, Validations
│   └── administration/               # Components, Hooks, Pages, Validations
│
├── app/                              # Providers (MsalProvider, ReduxProvider) & AppRouter
├── layouts/                          # MainLayout & AuthLayout
├── shared/                           # Reusable Universal Form Controls, DataGrid, Modal, Cookie Utils
└── styles/                           # Tailwind Directives & CSS Design Tokens
```

---

## 📖 In-Depth Guides
- 🪟 **Microsoft MSAL SSO Guide**: 👉 **[`MSAL_LOGIN_GUIDE.md`](./MSAL_LOGIN_GUIDE.md)**
- 🏛️ **Full Architecture Guide**: 👉 **[`ARCHITECTURE_GUIDE.md`](./ARCHITECTURE_GUIDE.md)**
- 📘 **System Explanation Guide**: 👉 **[`ARCHITECTURE_EXPLANATION.md`](./ARCHITECTURE_EXPLANATION.md)**
