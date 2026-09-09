import React, { useMemo } from 'react';
import { DataGrid, Button, type Column } from '@/shared/components';
import type { Holiday } from '../core/types';
import { formatDate } from '@/shared/utils/date.utils';

export interface HolidayTableProps {
  holidays: Holiday[];
  isLoading?: boolean;
  onDelete?: (holiday: Holiday) => void;
}

export const HolidayTable: React.FC<HolidayTableProps> = ({
  holidays,
  isLoading = false,
  onDelete,
}) => {
  const columns: Column<Holiday>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Holiday Event',
        sortable: true,
        render: (h) => (
          <div className="flex flex-col">
            <span className="font-semibold text-black text-sm">{h.name}</span>
            {h.description && <span className="text-xs text-muted">{h.description}</span>}
          </div>
        ),
      },
      {
        key: 'date',
        header: 'Date',
        sortable: true,
        render: (h) => (
          <span className="font-mono text-xs font-semibold text-primary bg-primary-light px-2 py-0.5 rounded">
            {formatDate(h.date)}
          </span>
        ),
      },
      {
        key: 'dayOfWeek',
        header: 'Day',
        sortable: true,
        render: (h) => <span className="text-xs font-medium text-neutralDark">{h.dayOfWeek}</span>,
      },
      {
        key: 'type',
        header: 'Type',
        sortable: true,
        render: (h) => (
          <span className="badge-chip badge-active">
            <span className="status-dot"></span>
            <span>{h.type.toUpperCase()}</span>
          </span>
        ),
      },
      {
        key: 'actions',
        header: 'Action',
        align: 'right',
        sortable: false,
        render: (h) =>
          onDelete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(h)}
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
      data={holidays}
      isLoading={isLoading}
      headerVariant="navy"
      keyExtractor={(item) => item.id}
    />
  );
};
