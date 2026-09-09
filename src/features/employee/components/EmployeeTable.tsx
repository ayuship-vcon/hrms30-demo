import React, { useState, useMemo, useCallback } from 'react';
import { DataGrid, Button, type Column } from '@/shared/components';
import type { Employee } from '../core/types';
import { formatDate } from '@/shared/utils/date.utils';

export interface EmployeeTableProps {
  employees: Employee[];
  isLoading?: boolean;
  onView?: (employee: Employee) => void;
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: string) => void;
  selectable?: boolean;
}

/**
 * Enterprise EmployeeTable Component
 * Optimized with useMemo and useCallback for high-performance rendering.
 */
export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  selectable = true,
}) => {
  // Pagination & Page Size State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Row Selection State
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

  // Helper to get initials
  const getInitials = useCallback((firstName: string, lastName: string) => {
    const f = firstName ? firstName.charAt(0).toUpperCase() : '';
    const l = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${f}${l}` || 'EP';
  }, []);

  const columns: Column<Employee>[] = useMemo(
    () => [
      {
        key: 'firstName',
        header: 'Employee Profile',
        sortable: true,
        hideable: false,
        render: (emp) => (
          <div className="flex items-center gap-3 py-0.5">
            <div className="table-avatar">
              {getInitials(emp.firstName, emp.lastName)}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-black text-sm leading-tight">
                {emp.firstName} {emp.lastName}
              </span>
              <span className="text-xs text-muted leading-tight mt-0.5">{emp.email}</span>
            </div>
          </div>
        ),
      },
      {
        key: 'employeeCode',
        header: 'Code',
        sortable: true,
        render: (emp) => (
          <span className="font-mono text-xs font-semibold text-primary bg-primary-light px-2 py-0.5 rounded">
            {emp.employeeCode}
          </span>
        ),
      },
      {
        key: 'department',
        header: 'Department',
        sortable: true,
        render: (emp) => <span className="text-xs font-medium text-neutralDark">{emp.department}</span>,
      },
      {
        key: 'designation',
        header: 'Designation',
        sortable: true,
        render: (emp) => <span className="text-xs text-muted">{emp.designation}</span>,
      },
      {
        key: 'joiningDate',
        header: 'Joining Date',
        sortable: true,
        render: (emp) => (
          <span className="text-xs text-neutralDark">
            {emp.joiningDate ? formatDate(emp.joiningDate) : '-'}
          </span>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (emp) => {
          const status = (emp.status || '').toLowerCase();
          if (status === 'active') {
            return (
              <span className="badge-chip badge-active">
                <span className="status-dot"></span>
                <span>ACTIVE</span>
              </span>
            );
          }
          if (status === 'on leave' || status === 'leave' || status === 'pending') {
            return (
              <span className="badge-chip badge-onleave">
                <span className="status-dot"></span>
                <span>ON LEAVE</span>
              </span>
            );
          }
          if (status === 'terminated' || status === 'inactive') {
            return (
              <span className="badge-chip badge-terminated">
                <span className="status-dot"></span>
                <span>TERMINATED</span>
              </span>
            );
          }
          return (
            <span className="badge-chip badge-draft">
              <span className="status-dot"></span>
              <span>{emp.status ? emp.status.toUpperCase() : 'DRAFT'}</span>
            </span>
          );
        },
      },
      {
        key: 'actions',
        header: 'Actions',
        align: 'right',
        sortable: false,
        hideable: false,
        render: (emp) => (
          <div className="flex justify-end items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {onView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(emp)}
                className="!text-xs !font-semibold !text-slate-600 hover:!text-black !h-7 !px-2"
              >
                View
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(emp)}
                className="!text-xs !font-semibold !text-primary hover:!text-primary-dark !h-7 !px-2"
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(emp.id)}
                className="!text-xs !font-semibold !text-destructive hover:!bg-rose-50 !h-7 !px-2"
              >
                Delete
              </Button>
            )}
          </div>
        ),
      },
    ],
    [getInitials, onView, onEdit, onDelete]
  );

  // Memoized Client-side pagination calculation
  const totalRecords = employees.length;
  const totalPages = useMemo(() => Math.ceil(totalRecords / pageSize) || 1, [totalRecords, pageSize]);
  const paginatedEmployees = useMemo(
    () => employees.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [employees, currentPage, pageSize]
  );

  const handleSelectKey = useCallback((key: string | number) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    const pageKeys = paginatedEmployees.map((e) => e.id);
    const allPageSelected = pageKeys.every((k) => selectedKeys.includes(k));
    if (allPageSelected) {
      setSelectedKeys((prev) => prev.filter((k) => !pageKeys.includes(k as string)));
    } else {
      setSelectedKeys((prev) => Array.from(new Set([...prev, ...pageKeys])));
    }
  }, [paginatedEmployees, selectedKeys]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  const paginationConfig = useMemo(
    () => ({
      currentPage,
      totalPages,
      totalRecords,
      pageSize,
      pageSizeOptions: [5, 10, 25, 50],
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    }),
    [currentPage, totalPages, totalRecords, pageSize, handlePageChange, handlePageSizeChange]
  );

  return (
    <DataGrid
      columns={columns}
      data={paginatedEmployees}
      isLoading={isLoading}
      headerVariant="navy"
      keyExtractor={(item) => item.id}
      onRowClick={onView}
      enableColumnVisibility={true}
      selectable={selectable}
      selectedKeys={selectedKeys}
      onSelectKey={handleSelectKey}
      onSelectAll={handleSelectAll}
      pagination={paginationConfig}
      emptyTitle="No employees found"
      emptyMessage="No employees match your search query or selected department/status filters."
    />
  );
};
