import type { SelectOption } from '@/shared/types/common.types';

export const DEPARTMENTS: SelectOption<string>[] = [
  { label: 'All Departments', value: '' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Human Resources', value: 'Human Resources' },
  { label: 'Finance & Accounts', value: 'Finance' },
  { label: 'Sales & Marketing', value: 'Sales' },
  { label: 'Operations', value: 'Operations' },
];

export const EMPLOYEE_STATUS_OPTIONS: SelectOption<string>[] = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'On Leave', value: 'pending' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Archived', value: 'archived' },
];
