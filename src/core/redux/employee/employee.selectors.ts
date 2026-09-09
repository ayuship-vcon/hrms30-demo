import { createSelector } from '@reduxjs/toolkit';
import type { EmployeeState, Employee } from '@/features/employee/core/types/employee.types';
import { filterEmployees } from '@/features/employee/core/utils/employeeFilter.utils';

export const selectEmployeeState = (state: { employee: EmployeeState }): EmployeeState =>
  state.employee;

export const selectAllEmployees = (state: { employee: EmployeeState }): Employee[] =>
  state.employee.employees;

export const selectSelectedEmployee = (state: { employee: EmployeeState }): Employee | null =>
  state.employee.selectedEmployee;

export const selectEmployeeFilters = (state: { employee: EmployeeState }) =>
  state.employee.filters;

export const selectEmployeeLoading = (state: { employee: EmployeeState }): boolean =>
  state.employee.isLoading;

export const selectFilteredEmployees = createSelector(
  [selectAllEmployees, selectEmployeeFilters],
  (employees, filters): Employee[] => {
    return filterEmployees(employees, filters);
  }
);
