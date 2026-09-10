export const ROUTES = {
  // Public & Auth Routes
  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password/:token",
    SUCCESS: "/success",
    FAILED: "/failed",
  },

  // Main Dashboard Routes
  ROOT: "/",
  DASHBOARD: "/dashboard",

  // Employee Directory Routes
  EMPLOYEES: {
    ROOT: "/employees",
    LIST: "/employees",
    DETAILS: (id: string | number = ":id") => `/employees/${id}`,
    CREATE: "/employees/new",
    EDIT: (id: string | number = ":id") => `/employees/${id}/edit`,
  },

  // Employee List
  EMPLOYEE_LIST: {
    ROOT: "/employee-list",
    ADD: "/add-employee",
  },


  // Leave Management Routes
  LEAVE: {
    ROOT: "/leave",
    APPLY: "/leave/apply",
    HISTORY: "/leave/history",
    DETAILS: (id: string | number = ":id") => `/leave/${id}`,
  },

  // Attendance Routes
  ATTENDANCE: {
    ROOT: "/attendance",
    LOGS: "/attendance/logs",
    DETAILS: (id: string | number = ":id") => `/attendance/${id}`,
  },

  // Holiday & Calendar Routes
  HOLIDAY: {
    ROOT: "/holidays",
    CALENDAR: "/holidays/calendar",
    DETAILS: (id: string | number = ":id") => `/holidays/${id}`,
  },

  // Administration Routes
  ADMIN: {
    ROOT: "/admin",
    SETTINGS: "/admin/settings",
    ROLES: "/admin/roles",
    AUDIT: "/admin/audit",
    DETAILS: (id: string | number = ":id") => `/admin/${id}`,
  },

  // HR Specific Modules (Hyphenated paths)
  HR: {
    PROFILE: "/employees",
    SEPARATION: "/emp-separation",
    PROMOTION: "/emp-promo",
    LETTERS: "/hr-letters",
  },

  // PRP / Performance Management (Hyphenated paths)
  PRP: {
    MY_PERFORMANCE: "/my-performance",
    TEAM_PERFORMANCE: "/team-performance",
  },

  // Approvals Matrix (Hyphenated paths)
  APPROVALS: {
    MY_LEAVES: "/leave",
    LEAVE_APPROVALS: "/leave-approvals",
    EXPENSE_APPROVALS: "/expense-approvals",
    HR_LEVEL_1: "/hr-level-1-approval",
    HR_LEVEL_2: "/hr-level-2-approval",
  },

  // Reports (Hyphenated paths)
  REPORTS: {
    BU: "/bu-report",
    CLUSTER: "/cluster-report",
    TEAM: "/team-report",
    HR: "/hr-report",
  },

  // Secondary Modules (Hyphenated paths)
  MODULES: {
    REIMBURSEMENTS: "/reimbursements",
    TRAVEL: "/travel",
    TALENT_HUB: "/talent-hub",
    TALENT_HUB_RADAR: "/talent-hub/radar-chart",
    EXTERNAL_LINKS: "/external-links",
    USER_GUIDE: "/user-guide",
    FEEDBACKS: "/feedbacks",
    PAYROLL: "/payroll",
    BENEFITS: "/benefits",
    HR_LETTERS: "/hr-letters",
    NEWS: "/news",
  },

  // Configurations (POC Sidebar Group — Hyphenated paths)
  CONFIGURATIONS: {
    ROOT: "/configurations",
    HORIZONTAL_STRUCTURE: "/configurations/horizontal-structure",
    VERTICAL_STRUCTURE: "/configurations/vertical-structure",
    ROLES_PRIVILEGES: "/configurations/roles-privileges",
  },
} as const;
