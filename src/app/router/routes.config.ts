import { ROUTES } from '@/shared/constants/routes.constants';
import { PERMISSIONS } from '@/shared/permissions/permissions.config';

export const routePermissionsConfig = {
  [ROUTES.EMPLOYEES.ROOT]: PERMISSIONS.EMPLOYEE_VIEW,
  [ROUTES.LEAVE.ROOT]: PERMISSIONS.LEAVE_APPLY,
  [ROUTES.ATTENDANCE.ROOT]: PERMISSIONS.ATTENDANCE_VIEW,
  [ROUTES.HOLIDAY.ROOT]: PERMISSIONS.HOLIDAY_VIEW,
  [ROUTES.ADMIN.ROOT]: PERMISSIONS.ADMIN_ACCESS,
};
