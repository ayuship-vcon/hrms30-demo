import type { BaseEntity, Status } from '@/shared/types/common.types';

export interface Employee extends BaseEntity {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: string
  joiningDate: string;
  salary: number;
  status: Status;
  avatar?: string;
}

export interface EmployeeFiltersState {
  search: string;
  department: string;
  status: string;
}

export interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  filters: EmployeeFiltersState;
  isLoading: boolean;
  error: string | null;
}
