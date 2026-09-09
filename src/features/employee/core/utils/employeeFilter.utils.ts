import type { Employee, EmployeeFiltersState } from '../types/employee.types';

export const filterEmployees = (
  employees: Employee[],
  filters: EmployeeFiltersState
): Employee[] => {
  const searchTerm = (filters.search || '').toLowerCase();

  return employees.filter((emp) => {
    const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
    const email = (emp.email || '').toLowerCase();
    const code = (emp.employeeCode || '').toLowerCase();

    const matchesSearch =
      !searchTerm ||
      fullName.includes(searchTerm) ||
      email.includes(searchTerm) ||
      code.includes(searchTerm);

    const matchesDept = !filters.department || emp.department === filters.department;
    const matchesStatus = !filters.status || emp.status === filters.status;

    return matchesSearch && matchesDept && matchesStatus;
  });
};
