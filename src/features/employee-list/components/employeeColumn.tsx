// src/features/employee/components/employeeColumns.tsx
import { GridColDef } from "@mui/x-data-grid";
import { EmployeeRecord } from "../core/types/employee.types";

export const employeeColumns: GridColDef<EmployeeRecord>[] = [
  { field: "employeeId", headerName: "Employee ID", width: 130 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "businessUnit", headerName: "Business Unit", width: 160 },
  { field: "clusterName", headerName: "Cluster Name", width: 160 },
  { field: "teamName", headerName: "Team Name", width: 160 },
  { field: "dateOfJoining", headerName: "Date of Joining", width: 150 },
  { field: "designation", headerName: "Designation", width: 180 },
  { field: "emailId", headerName: "Email ID", width: 220 },
  { field: "officeLocation", headerName: "Office Location", width: 160 },
  { field: "dateOfBirth", headerName: "Date Of Birth", width: 150 },
  { field: "gender", headerName: "Gender", width: 120 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "dateOfLeaving", headerName: "Date Of Leaving", width: 150 },
  { field: "unitName", headerName: "Unit Name", width: 150 },
];
