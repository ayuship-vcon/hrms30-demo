import { useMemo } from 'react';
import { type Permission, hasPermission, hasAnyPermission } from '../permissions';

export function usePermission(userRole?: string | null) {
  const can = useMemo(() => {
    return (permission: Permission | Permission[]) => hasPermission(userRole, permission);
  }, [userRole]);

  const canAny = useMemo(() => {
    return (permissions: Permission[]) => hasAnyPermission(userRole, permissions);
  }, [userRole]);

  return { can, canAny, role: userRole };
}
