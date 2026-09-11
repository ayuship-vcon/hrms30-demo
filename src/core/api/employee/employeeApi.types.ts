import type { Employee } from '@/features/employee/core/types/employee.types';
import type { PaginationParams } from '@/shared/types/pagination.types';

export interface GetEmployeesParams extends PaginationParams {
  department?: string;
  status?: string;
}

export type CreateEmployeeRequest = Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>;

export interface CreateEmployeeOnboardingRequest {
  userId: number;
  organizationGroupId: number;
  roleId: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  dateOfJoining: string;
  officeEmailId: string;
  statusDescription: string;
}

export type UpdateEmployeeRequest = Partial<CreateEmployeeRequest>;

export interface EmployeeStatsResponse {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  newHiresThisMonth: number;
}
