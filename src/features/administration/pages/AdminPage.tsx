import React, { useState, useCallback } from 'react';
import { Card, Toast, Button, DeleteConfirmDialog, PageLoader } from '@/shared/components';
import { AdminForm } from '../components/AdminForm';
import { AdminTable } from '../components/AdminTable';
import { useAdmin } from '../core/hooks/useAdmin';
import type { AuditLog } from '../core/types';
import type { UpdateAdminSettingsRequest } from '@/core/api/admin';
import ShieldIcon from '@mui/icons-material/Shield';
import TuneIcon from '@mui/icons-material/Tune';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export const AdminPage: React.FC = () => {
  const { settings, auditLogs, isLoading, updateSettings, deleteAuditLog, clearAllAuditLogs } = useAdmin();
  const [deletingLog, setDeletingLog] = useState<AuditLog | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = useCallback(
    async (data: UpdateAdminSettingsRequest) => {
      await updateSettings(data);
      setToastMessage('System settings saved and synchronized!');
    },
    [updateSettings]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (isClearingAll) {
      await clearAllAuditLogs();
      setToastMessage('All audit log events cleared.');
      setIsClearingAll(false);
    } else if (deletingLog) {
      await deleteAuditLog(deletingLog.id);
      setToastMessage('Audit log entry removed.');
      setDeletingLog(null);
    }
  }, [isClearingAll, deletingLog, clearAllAuditLogs, deleteAuditLog]);

  if (isLoading && auditLogs.length === 0 && !settings) {
    return (
      <PageLoader
        message="Loading administrative settings..."
        description="Fetching tenant security policies and system audit records"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">System Administration</h1>
            <span className="bg-destructive-bg text-destructive text-sm font-semibold px-2.5 py-0.5 rounded-sm border border-destructive/20 flex items-center gap-1">
              <ShieldIcon fontSize="inherit" /> Root Security
            </span>
          </div>
          <p className="text-sm text-muted mt-1">
            Global HR policies, authentication enforcement, compliance threshold rules, and audit trail
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Global Config Form */}
        <div className="lg:col-span-1">
          <Card title="Global Configuration" subtitle="Active enterprise tenant rules" icon={<TuneIcon />}>
            <AdminForm initialSettings={settings} onSave={handleSave} isLoading={isLoading} />
          </Card>
        </div>

        {/* Right: Audit Trail Table */}
        <div className="lg:col-span-2">
          <Card
            title="System Audit Log"
            subtitle={`Showing ${auditLogs.length} logged enterprise events`}
            action={
              auditLogs.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<DeleteSweepIcon fontSize="small" />}
                  onClick={() => setIsClearingAll(true)}
                >
                  Clear All
                </Button>
              )
            }
          >
            <AdminTable
              logs={auditLogs}
              isLoading={isLoading}
              onDelete={(l) => setDeletingLog(l)}
            />
          </Card>
        </div>
      </div>

      {/* Delete/Clear Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={Boolean(deletingLog) || isClearingAll}
        onClose={() => {
          setDeletingLog(null);
          setIsClearingAll(false);
        }}
        onConfirm={handleConfirmDelete}
        title={isClearingAll ? 'Clear All Audit Logs' : 'Delete Audit Log'}
        itemName={isClearingAll ? 'ALL audit history' : deletingLog ? deletingLog.action : ''}
        message="This action will permanently delete these audit trails from the enterprise log store."
      />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          isOpen={Boolean(toastMessage)}
          message={toastMessage}
          severity="success"
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};
