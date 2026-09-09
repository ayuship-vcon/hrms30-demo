import { ROLE_PERMISSIONS, type Permission } from './permissions.config';

export const hasPermission = (
  userRole?:  string | null,
  requiredPermission?: Permission | Permission[]
): boolean => {
  if (!userRole || !requiredPermission) return false;

  const permissions = (ROLE_PERMISSIONS as Record<string, readonly Permission[]>)[userRole] || [];

  if (Array.isArray(requiredPermission)) {
    return requiredPermission.every((perm) => permissions.includes(perm));
  }

  return permissions.includes(requiredPermission);
};

export const hasAnyPermission = (
  userRole?: string | null,
  permissionsToCheck?: Permission[]
): boolean => {
  if (!userRole || !permissionsToCheck || permissionsToCheck.length === 0) return false;
  const userPerms = (ROLE_PERMISSIONS as Record<string, readonly Permission[]>)[userRole] || [];
  return permissionsToCheck.some((perm) => userPerms.includes(perm));
};
