import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

const ROUTE_LABELS: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.EMPLOYEES.ROOT]: 'Employees',
  [ROUTES.EMPLOYEES.CREATE]: 'Add Employee',
  [ROUTES.EMPLOYEE_LIST.ROOT]: 'Employee List',
  [ROUTES.LEAVE.ROOT]: 'Leave',
  [ROUTES.LEAVE.APPLY]: 'Apply for Leave',
  [ROUTES.LEAVE.HISTORY]: 'Leave History',
  [ROUTES.ATTENDANCE.ROOT]: 'Attendance',
  [ROUTES.ATTENDANCE.LOGS]: 'Attendance Logs',
  [ROUTES.HOLIDAY.ROOT]: 'Holidays',
  [ROUTES.HOLIDAY.CALENDAR]: 'Holiday Calendar',
  [ROUTES.ADMIN.ROOT]: 'Administration',
  [ROUTES.ADMIN.SETTINGS]: 'Settings',
  [ROUTES.ADMIN.ROLES]: 'Roles & Privileges',
  [ROUTES.ADMIN.AUDIT]: 'Audit Logs',
  [ROUTES.CONFIGURATIONS.HORIZONTAL_STRUCTURE]: 'Horizontal Organization',
  [ROUTES.CONFIGURATIONS.VERTICAL_STRUCTURE]: 'Vertical Organization',
  [ROUTES.CONFIGURATIONS.ROLES_PRIVILEGES]: 'Roles & Privileges',
  [ROUTES.HR.SEPARATION]: 'Employee Separation',
  [ROUTES.HR.PROMOTION]: 'Employee Promotion',
  [ROUTES.PRP.MY_PERFORMANCE]: 'My Performance',
  [ROUTES.PRP.TEAM_PERFORMANCE]: 'Team Performance',
  [ROUTES.APPROVALS.LEAVE_APPROVALS]: 'Leave Approvals',
  [ROUTES.APPROVALS.EXPENSE_APPROVALS]: 'Expense Approvals',
  [ROUTES.APPROVALS.HR_LEVEL_1]: 'HR Level 1 Approval',
  [ROUTES.APPROVALS.HR_LEVEL_2]: 'HR Level 2 Approval',
  [ROUTES.REPORTS.BU]: 'BU Report',
  [ROUTES.REPORTS.CLUSTER]: 'Cluster Report',
  [ROUTES.REPORTS.TEAM]: 'Team Report',
  [ROUTES.REPORTS.HR]: 'HR Report',
  [ROUTES.MODULES.REIMBURSEMENTS]: 'Reimbursements',
  [ROUTES.MODULES.TRAVEL]: 'Travel Management',
  [ROUTES.MODULES.TALENT_HUB]: 'Talent Hub',
  [ROUTES.MODULES.EXTERNAL_LINKS]: 'External Links',
  [ROUTES.MODULES.USER_GUIDE]: 'User Guide',
  [ROUTES.MODULES.FEEDBACKS]: 'Employee Feedback',
  [ROUTES.MODULES.PAYROLL]: 'Payroll & Compensation',
  [ROUTES.MODULES.BENEFITS]: 'Employee Benefits',
  [ROUTES.MODULES.HR_LETTERS]: 'HR Letters & Verification',
  [ROUTES.MODULES.NEWS]: 'Organizational News',
};

const humanizePath = (segment: string) =>
  segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

const getRouteLabel = (pathname: string) => {
  if (pathname === ROUTES.ROOT || pathname === ROUTES.DASHBOARD) return 'Dashboard';
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];
  if (/^\/employees\/[^/]+$/.test(pathname)) return 'Employee Profile';
  if (/^\/leave\/[^/]+$/.test(pathname)) return 'Leave Application Details';
  if (/^\/attendance\/[^/]+$/.test(pathname)) return 'Attendance Details';
  if (/^\/holidays\/[^/]+$/.test(pathname)) return 'Holiday Details';
  if (/^\/admin\/[^/]+$/.test(pathname)) return 'Administration Details';
  return humanizePath(pathname.split('/').filter(Boolean).pop() ?? 'Page');
};

export const AppBreadcrumbs: React.FC = () => {
  const { pathname } = useLocation();

  const items = useMemo<BreadcrumbItem[]>(() => {
    if (pathname === ROUTES.ROOT || pathname === ROUTES.DASHBOARD) {
      return [{ label: 'Dashboard' }];
    }

    const parentPath = pathname.startsWith('/leave/')
      ? ROUTES.LEAVE.ROOT
      : pathname.startsWith('/attendance/')
        ? ROUTES.ATTENDANCE.ROOT
        : pathname.startsWith('/holidays/')
          ? ROUTES.HOLIDAY.ROOT
          : pathname.startsWith('/admin/')
            ? ROUTES.ADMIN.ROOT
            : pathname.startsWith('/employees/')
              ? ROUTES.EMPLOYEES.ROOT
              : undefined;

    const parentLabel = parentPath ? ROUTE_LABELS[parentPath] : undefined;
    const currentLabel = getRouteLabel(pathname);

    return parentPath && parentLabel
      ? [{ label: parentLabel, path: parentPath }, { label: currentLabel }]
      : [{ label: currentLabel }];
  }, [pathname]);

  return <Breadcrumbs items={items} className="mb-4" />;
};
