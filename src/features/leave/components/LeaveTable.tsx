import React, { useMemo } from 'react';
import { DataGrid, Button, type Column } from '@/shared/components';
import type { LeaveRequest } from '../core/types';
import { formatDate } from '@/shared/utils/date.utils';

export interface LeaveTableProps {
  requests: LeaveRequest[];
  isLoading?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (request: LeaveRequest) => void;
}

export const LeaveTable: React.FC<LeaveTableProps> = ({
  requests,
  isLoading = false,
  onApprove,
  onReject,
  onDelete,
}) => {
  const columns: Column<LeaveRequest>[] = useMemo(
    () => [
      {
        key: 'employeeName',
        header: 'Applicant',
        sortable: true,
        render: (req) => (
          <div className="flex flex-col">
            <span className="font-semibold text-black text-sm">{req.employeeName || 'Staff Member'}</span>
            <span className="text-xs text-muted">{req.reason || 'No description provided'}</span>
          </div>
        ),
      },
      {
        key: 'leaveType',
        header: 'Category',
        sortable: true,
        render: (req) => (
          <span className="font-mono text-xs font-semibold text-primary bg-primary-light px-2 py-0.5 rounded">
            {req.leaveType}
          </span>
        ),
      },
      {
        key: 'dates',
        header: 'Date Span',
        render: (req) => (
          <span className="text-xs text-neutralDark">
            {formatDate(req.startDate)} - {formatDate(req.endDate)}
          </span>
        ),
      },
      {
        key: 'totalDays',
        header: 'Days',
        sortable: true,
        render: (req) => <span className="text-xs font-medium text-neutralDark">{req.totalDays} days</span>,
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (req) => {
          const s = (req.status || '').toLowerCase();
          if (s === 'approved') {
            return (
              <span className="badge-chip badge-active">
                <span className="status-dot"></span>
                <span>APPROVED</span>
              </span>
            );
          }
          if (s === 'pending') {
            return (
              <span className="badge-chip badge-onleave">
                <span className="status-dot"></span>
                <span>PENDING</span>
              </span>
            );
          }
          return (
            <span className="badge-chip badge-terminated">
              <span className="status-dot"></span>
              <span>REJECTED</span>
            </span>
          );
        },
      },
      {
        key: 'actions',
        header: 'Actions',
        align: 'right',
        sortable: false,
        render: (req) => (
          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
            {req.status === 'pending' && (
              <>
                {onApprove && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onApprove(req.id)}
                    className="!text-xs !font-semibold !text-success hover:!bg-emerald-50 !h-7 !px-2"
                  >
                    Approve
                  </Button>
                )}
                {onReject && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReject(req.id)}
                    className="!text-xs !font-semibold !text-destructive hover:!bg-rose-50 !h-7 !px-2"
                  >
                    Reject
                  </Button>
                )}
              </>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(req)}
                className="!text-xs !font-semibold !text-destructive hover:!bg-rose-50 !h-7 !px-2"
              >
                Delete
              </Button>
            )}
          </div>
        ),
      },
    ],
    [onApprove, onReject, onDelete]
  );

  return (
    <DataGrid
      columns={columns}
      data={requests}
      isLoading={isLoading}
      headerVariant="navy"
      keyExtractor={(item) => item.id}
      emptyTitle="No leave applications found"
      emptyMessage="No time-off requests match your active category filter."
    />
  );
};
