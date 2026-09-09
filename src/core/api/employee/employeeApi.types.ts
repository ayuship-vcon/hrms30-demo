import type { Employee } from '@/features/employee/core/types/employee.types';
import type { PaginationParams } from '@/shared/types/pagination.types';

export interface GetEmployeesParams extends PaginationParams {
  department?: string;
  status?: string;
}

export type CreateEmployeeRequest = Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateEmployeeRequest = Partial<CreateEmployeeRequest>;

export interface EmployeeStatsResponse {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  newHiresThisMonth: number;
}
