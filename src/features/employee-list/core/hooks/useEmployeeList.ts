import { useMemo } from "react";
import { useGetEmployeeDirectoryQuery } from "@/core/api/employee";
import type { EmployeeRecord } from "../types/employee.types";

export function useEmployeeList() {
  const query = useGetEmployeeDirectoryQuery();
  const records = useMemo<EmployeeRecord[]>(
    () =>
      (query.data ?? []).map((employee) => ({
        id: String(employee.id),
        employeeId: employee.employeeId,
        name: `${employee.firstName} ${employee.lastName}`.trim(),
        businessUnit: "",
        clusterName: "",
        teamName: "",
        dateOfJoining: employee.dateOfJoining,
        designation: "",
        emailId: employee.officeEmailId,
        officeLocation: "",
        dateOfBirth: "",
        gender: "",
        status: employee.statusDescription?.toLowerCase() === "active" ? "Active" : "InActive",
        unitName: "",
      })),
    [query.data],
  );

  return {
    records,
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
  };
}
