export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/Auth/login',
    FORGOT_PASSWORD: '/Users/forgotpassword',
    RESET_PASSWORD: '/Users/resetpassword',
  },

  MENU: {
    GET_ACCESS_RIGHTS: (employeeUserId: string | number) => `/RoleAccessRights/role/${employeeUserId}`,
  },

  EMPLOYEE: {
    ROOT: '/Employees',
  },

  ROLES: {
    ROOT: '/CoreRoles',
  },

  ORGANIZATION: {
    GROUP: '/OrganizationGroups',
    GROUPS: '/OrganizationGroups',
    LEVELS: '/OrganizationLevels',
  },

  LEAVE: {
    REQUESTS: '/LeaveRequests',
    BALANCES: '/LeaveBalances',
  },

  ATTENDANCE: {
    ROOT: '/Attendance',
  },

  HOLIDAY: {
    ROOT: '/Holidays',
  },

  ADMIN: {
    SETTINGS: '/Admin/Settings',
    AUDIT_LOGS: '/Admin/AuditLogs',
  },

  HORIZONTAL_ORGANIZATION: {
    ROOT: '/HorizontalOrganizations',
    BY_ID: (id: string | number) => `/HorizontalOrganizations/${id}`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
