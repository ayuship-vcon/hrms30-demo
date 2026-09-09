import { EmployeeRecord } from "../types/employee.types";

const MOCK_EMPLOYEES: EmployeeRecord[] = [
  {
    id: "1",
    employeeId: "EMP001",
    name: "John Doe",
    businessUnit: "Engineering",
    clusterName: "Core Platform",
    teamName: "Frontend Alpha",
    dateOfJoining: "2023-01-15",
    designation: "Senior Developer",
    emailId: "john.doe@example.com",
    officeLocation: "New York",
    dateOfBirth: "1990-05-20",
    gender: "Male",
    status: "Active",
    unitName: "Unit A",
  },
  {
    id: "2",
    employeeId: "EMP002",
    name: "Jane Smith",
    businessUnit: "Product",
    clusterName: "User Experience",
    teamName: "Design Ops",
    dateOfJoining: "2022-11-01",
    designation: "Product Manager",
    emailId: "jane.smith@example.com",
    officeLocation: "London",
    dateOfBirth: "1988-12-10",
    gender: "Female",
    status: "Active",
    unitName: "Unit B",
  },
];

export function useEmployeeList() {
  // TODO: Replace with useGetEmployeesQuery() when API is ready
  return {
    records: MOCK_EMPLOYEES,
    isLoading: false,
    isError: false,
  };
}