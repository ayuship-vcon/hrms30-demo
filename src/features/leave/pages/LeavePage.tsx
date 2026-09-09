import React, { useState, useMemo, useCallback } from 'react';
import { Card, Button, Modal, Toast, DeleteConfirmDialog, PageLoader } from '@/shared/components';
import { LeaveForm } from '../components/LeaveForm';
import { LeaveTable } from '../components/LeaveTable';
import { LeaveBalanceCard } from '../components/LeaveBalanceCard';
import { useLeave } from '../core/hooks/useLeave';
import type { LeaveRequest } from '../core/types';
import type { ApplyLeaveRequest } from '@/core/api/leave';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const LeavePage: React.FC = () => {
  const { requests, balances, isLoading, applyLeave, approveLeave, rejectLeave, deleteLeave } = useLeave();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingLeave, setDeletingLeave] = useState<LeaveRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleApply = useCallback(
    async (data: ApplyLeaveRequest) => {
      await applyLeave(data);
      setIsModalOpen(false);
      setToastMessage('Leave application submitted for approval!');
    },
    [applyLeave]
  );

  const handleApprove = useCallback(
    async (id: string) => {
      await approveLeave(id);
      setToastMessage('Leave request approved.');
    },
    [approveLeave]
  );

  const handleReject = useCallback(
    async (id: string) => {
      await rejectLeave(id);
      setToastMessage('Leave request rejected.');
    },
    [rejectLeave]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingLeave) return;
    await deleteLeave(deletingLeave.id);
    setToastMessage('Leave application deleted from Redux store.');
    setDeletingLeave(null);
  }, [deletingLeave, deleteLeave]);

  const filteredRequests = useMemo(
    () =>
      requests.filter((r) =>
        statusFilter === 'all' ? true : r.status === statusFilter
      ),
    [requests, statusFilter]
  );

  if (isLoading && requests.length === 0) {
    return (
      <PageLoader
        message="Loading leave records..."
        description="Calculating accrued balances and active leave requests"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Time Off &amp; Leave Portal</h1>
          <p className="text-xs text-muted mt-1">
            Track remaining balances, company leave policy, and review pending approval workflows
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<AddCircleOutlineIcon />}
          onClick={() => setIsModalOpen(true)}
          size="md"
        >
          Apply for Leave
        </Button>
      </div>

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {balances.map((balance) => (
          <LeaveBalanceCard key={balance.leaveType} balance={balance} />
        ))}
      </div>

      {/* Main Table Card */}
      <Card
        title="Leave Applications & History"
        subtitle={`Showing ${filteredRequests.length} applications`}
        action={
          <div className="flex items-center gap-1.5">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => (
              <Button
                key={filter}
                type="button"
                variant={statusFilter === filter ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(filter)}
                className="!text-xs capitalize !h-7 !px-3"
              >
                {filter}
              </Button>
            ))}
          </div>
        }
      >
        <LeaveTable
          requests={filteredRequests}
          isLoading={isLoading}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={(req) => setDeletingLeave(req)}
        />
      </Card>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Apply for Time Off"
        maxWidth="sm"
      >
        <LeaveForm onSubmit={handleApply} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={Boolean(deletingLeave)}
        onClose={() => setDeletingLeave(null)}
        onConfirm={handleConfirmDelete}
        title="Cancel Leave Application"
        itemName={deletingLeave ? `${deletingLeave.leaveType} (${deletingLeave.startDate})` : ''}
        message="Are you sure you want to withdraw this application? This action cannot be undone."
      />

      {/* Toast Notifications */}
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
