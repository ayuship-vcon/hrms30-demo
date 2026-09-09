import React from 'react';
import { DataGrid, type ColumnDef } from '@/shared/components';
import type { LeaveRequest } from '../core/types';
import { formatDate } from '@/shared/utils/date.utils';
import { LEAVE_STATUS_COLORS } from '../core/constants/leave.constants';
import { LeaveRequestActions } from '../components/LeaveRequestActions';

export interface LeaveHistoryProps {
  requests: LeaveRequest[];
  isLoading?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export const LeaveHistory: React.FC<LeaveHistoryProps> = ({
  requests,
  isLoading,
  onApprove,
  onReject,
}) => {
  const columns: ColumnDef<LeaveRequest>[] = [
    {
      key: 'employeeName',
      header: 'Employee',
      render: (req) => <span className="font-semibold text-gray-900">{req.employeeName}</span>,
    },
    {
      key: 'leaveType',
      header: 'Leave Type',
      render: (req) => <span className="font-medium text-sm text-indigo-700">{req.leaveType}</span>,
    },
    {
      key: 'dates',
      header: 'Dates',
      render: (req) => (
        <span className="text-sm text-gray-600">
          {formatDate(req.startDate)} - {formatDate(req.endDate)} ({req.totalDays}d)
        </span>
      ),
    },
    {
      key: 'reason',
      header: 'Reason',
      render: (req) => <span className="text-sm text-gray-500 line-clamp-1">{req.reason}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (req) => (
        <span className={`badge ${LEAVE_STATUS_COLORS[req.status] || 'badge-info'}`}>
          {req.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Decision',
      align: 'right',
      render: (req) =>
        req.status === 'pending' && onApprove && onReject ? (
          <LeaveRequestActions
            onApprove={() => onApprove(req.id)}
            onReject={() => onReject(req.id)}
          />
        ) : (
          <span className="text-sm text-gray-400">Processed</span>
        ),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      data={requests}
      isLoading={isLoading}
      keyExtractor={(item) => item.id}
    />
  );
};
