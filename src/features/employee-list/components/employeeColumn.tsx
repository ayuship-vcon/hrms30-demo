import { GridColDef } from "@mui/x-data-grid";
import { EmployeeRecord } from "../core/types/employee.types";

export const employeeColumns: GridColDef<EmployeeRecord>[] = [
  {
    field: "employeeId",
    headerName: "Employee ID",
    width: 130,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
  {
    field: "businessUnit",
    headerName: "Business Unit",
    width: 160,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
  {
    field: "clusterName",
    headerName: "Cluster Name",
    width: 160,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
  {
    field: "teamName",
    headerName: "Team Name",
    width: 160,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
  {
    field: "dateOfJoining",
    headerName: "Date of Joining",
    width: 150,
    filter: {
      type: "date",
      operators: [
        "equals",
        "before",
        "after",
        "onOrBefore",
        "onOrAfter",
      ],
    },
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 180,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
  {
    field: "emailId",
    headerName: "Email ID",
    width: 220,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
  {
    field: "officeLocation",
    headerName: "Office Location",
    width: 160,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
  {
    field: "dateOfBirth",
    headerName: "Date Of Birth",
    width: 150,
    filter: {
      type: "date",
      operators: [
        "equals",
        "before",
        "after",
        "onOrBefore",
        "onOrAfter",
      ],
    },
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 120,
    filter: {
      type: "select",
      operators: [
        "equals",
        "notEquals",
      ],
      options: [
        {
          label: "Male",
          value: "Male",
        },
        {
          label: "Female",
          value: "Female",
        },
        {
          label: "Other",
          value: "Other",
        },
      ],
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    filter: {
      type: "select",
      operators: [
        "equals",
        "notEquals",
      ],
      options: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
        {
          label: "On Leave",
          value: "On Leave",
        },
      ],
    },
  },
  {
    field: "dateOfLeaving",
    headerName: "Date Of Leaving",
    width: 150,
    filter: {
      type: "date",
      operators: [
        "equals",
        "before",
        "after",
        "onOrBefore",
        "onOrAfter",
      ],
    },
  },
  {
    field: "unitName",
    headerName: "Unit Name",
    width: 150,
    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
];