import type { Employee } from '../types/employee.types';

export const getEmployeeFullName = (emp?: Partial<Employee> | null): string => {
  if (!emp) return '';
  return `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
};

export const formatEmployeeCode = (code: string): string => {
  return code.toUpperCase();
};
