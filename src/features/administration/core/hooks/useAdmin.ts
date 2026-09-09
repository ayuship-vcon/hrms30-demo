import { useCallback } from 'react';
import type { UpdateAdminSettingsRequest } from '@/core/api/admin';
import {
  useGetAdminSettingsQuery,
  useGetAuditLogsQuery,
  useUpdateAdminSettingsMutation,
  useDeleteAuditLogMutation,
  useClearAuditLogsMutation,
} from '@/core/api/admin';

export function useAdmin() {
  const settingsQuery = useGetAdminSettingsQuery();
  const auditLogsQuery = useGetAuditLogsQuery();
  const [updateSettingsMutation] = useUpdateAdminSettingsMutation();
  const [deleteAuditLogMutation] = useDeleteAuditLogMutation();
  const [clearAuditLogsMutation] = useClearAuditLogsMutation();
  const settings = settingsQuery.data;
  const auditLogs = auditLogsQuery.data ?? [];
  const isLoading = settingsQuery.isLoading || auditLogsQuery.isLoading;

  const updateSettings = useCallback(
    (data: UpdateAdminSettingsRequest) => {
      return updateSettingsMutation(data).unwrap();
    },
    [updateSettingsMutation]
  );

  const deleteAuditLog = useCallback(
    (id: string) => {
      return deleteAuditLogMutation(id).unwrap();
    },
    [deleteAuditLogMutation]
  );

  const clearAllAuditLogs = useCallback(() => {
    return clearAuditLogsMutation().unwrap();
  }, [clearAuditLogsMutation]);

  return {
    settings,
    auditLogs,
    isLoading,
    updateSettings,
    deleteAuditLog,
    clearAllAuditLogs,
  };
}
