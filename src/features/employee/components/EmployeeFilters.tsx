import React, { useCallback } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Input, Select, Button } from '@/shared/components';
import { DEPARTMENTS, EMPLOYEE_STATUS_OPTIONS } from '../core/constants/employee.constants';
import type { EmployeeFiltersState } from '../core/types';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export interface EmployeeFiltersProps {
  filters: EmployeeFiltersState;
  onChange: (filters: Partial<EmployeeFiltersState>) => void;
  onReset: () => void;
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = React.memo(({
  filters,
  onChange,
  onReset,
}) => {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ search: e.target.value });
    },
    [onChange]
  );

  const handleDepartmentChange = useCallback(
    (e: SelectChangeEvent<unknown>) => {
      onChange({ department: String(e.target.value || '') });
    },
    [onChange]
  );

  const handleStatusChange = useCallback(
    (e: SelectChangeEvent<unknown>) => {
      onChange({ status: String(e.target.value || '') });
    },
    [onChange]
  );

  return (
    <div className="bg-surface p-4 rounded-sm border border-border shadow-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
      <Input
        label="Search Employee"
        placeholder="Search by name, code, email..."
        value={filters.search}
        onChange={handleSearchChange}
        leftIcon={<SearchIcon fontSize="small" className="text-muted" />}
      />

      <Select
        label="Department"
        options={DEPARTMENTS}
        value={filters.department}
        onChange={handleDepartmentChange}
      />

      <Select
        label="Status"
        options={EMPLOYEE_STATUS_OPTIONS}
        value={filters.status}
        onChange={handleStatusChange}
      />

      <Button
        variant="outline"
        onClick={onReset}
        leftIcon={<RestartAltIcon fontSize="small" />}
        size="md"
        className="w-full h-10"
      >
        Reset Filters
      </Button>
    </div>
  );
});

EmployeeFilters.displayName = 'EmployeeFilters';
