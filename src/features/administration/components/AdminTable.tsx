import React, { useMemo } from 'react';
import { DataGrid, Button, type Column } from '@/shared/components';
import type { AuditLog } from '../core/types';
import { formatDateTime } from '@/shared/utils/date.utils';

export interface AdminTableProps {
  logs: AuditLog[];
  isLoading?: boolean;
  onDelete?: (log: AuditLog) => void;
}

export const AdminTable: React.FC<AdminTableProps> = ({ logs, isLoading = false, onDelete }) => {
  const columns: Column<AuditLog>[] = useMemo(
    () => [
      {
        key: 'timestamp',
        header: 'Timestamp',
        sortable: true,
        render: (l) => (
          <span className="font-mono text-xs text-neutralDark">{formatDateTime(l.timestamp)}</span>
        ),
      },
      {
        key: 'action',
        header: 'Action / Event',
        sortable: true,
        render: (l) => (
          <span className="font-semibold text-xs text-primary bg-primary-light px-2 py-0.5 rounded">
            {l.action}
          </span>
        ),
      },
      {
        key: 'performedBy',
        header: 'User Account',
        sortable: true,
        render: (l) => <span className="text-xs font-medium text-black">{l.performedBy}</span>,
      },
      {
        key: 'details',
        header: 'Activity Details',
        render: (l) => <span className="text-xs text-muted">{l.details}</span>,
      },
      {
        key: 'actions',
        header: 'Action',
        align: 'right',
        sortable: false,
        render: (l) =>
          onDelete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(l)}
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
      data={logs}
      isLoading={isLoading}
      headerVariant="navy"
      keyExtractor={(item) => item.id}
    />
  );
};
