import React, { useMemo } from 'react';
import { DataGrid, Button, type Column } from '@/shared/components';
import type { AttendanceRecord } from '../core/types';

export interface AttendanceTableProps {
  records: AttendanceRecord[];
  isLoading?: boolean;
  onDelete?: (record: AttendanceRecord) => void;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  records,
  isLoading = false,
  onDelete,
}) => {
  const columns: Column<AttendanceRecord>[] = useMemo(
    () => [
      {
        key: 'employeeName',
        header: 'Employee Name',
        sortable: true,
        render: (r) => (
          <div className="flex flex-col">
            <span className="font-semibold text-black text-sm">{r.employeeName}</span>
            <span className="text-xs text-muted">{r.date}</span>
          </div>
        ),
      },
      {
        key: 'checkInTime',
        header: 'Check In',
        sortable: true,
        render: (r) => (
          <span className="font-mono text-xs font-semibold text-primary bg-primary-light px-2 py-0.5 rounded">
            {r.checkInTime}
          </span>
        ),
      },
      {
        key: 'workingHours',
        header: 'Hours',
        sortable: true,
        render: (r) => <span className="text-xs font-medium text-neutralDark">{r.workingHours} hrs</span>,
      },
      {
        key: 'location',
        header: 'Location / Workmode',
        sortable: true,
        render: (r) => <span className="text-xs text-muted">{r.location || 'Headquarters'}</span>,
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (r) => {
          const s = (r.status || '').toLowerCase();
          if (s === 'present' || s === 'active') {
            return (
              <span className="badge-chip badge-active">
                <span className="status-dot"></span>
                <span>PRESENT</span>
              </span>
            );
          }
          if (s === 'leave' || s === 'on leave' || s === 'half-day') {
            return (
              <span className="badge-chip badge-onleave">
                <span className="status-dot"></span>
                <span>ON LEAVE</span>
              </span>
            );
          }
          return (
            <span className="badge-chip badge-terminated">
              <span className="status-dot"></span>
              <span>ABSENT</span>
            </span>
          );
        },
      },
      {
        key: 'actions',
        header: 'Action',
        align: 'right',
        sortable: false,
        render: (r) =>
          onDelete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(r)}
              className="!text-xs !font-semibold !text-destructive hover:!bg-rose-50 !h-7 !px-2"
            >
              Delete
            </Button>
          ) : null,
      },
    ],
    [onDelete]
  );

  return (
    <DataGrid
      columns={columns}
      data={records}
      isLoading={isLoading}
      headerVariant="navy"
      keyExtractor={(item) => item.id}
    />
  );
};
