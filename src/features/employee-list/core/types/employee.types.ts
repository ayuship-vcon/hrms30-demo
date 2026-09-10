export interface EmployeeRecord {
  id: string; // Required by MUI DataGrid
  employeeId: string;
  name: string;
  businessUnit: string;
  clusterName: string;
  teamName: string;
  dateOfJoining: string;
  designation: string;
  emailId: string;
  officeLocation: string;
  dateOfBirth: string;
  gender: string;
  status: 'Active' | 'InActive';
  dateOfLeaving?: string;
  unitName: string;
  filter?: any;
}