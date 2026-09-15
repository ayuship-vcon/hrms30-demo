export interface EmployeeOnboardingFormValues {
  officeName: string;
  dateOfJoining: string;
  unitName: string;
  status: string;
  designation: string;
  employeeNumber: string;
  isPastEmployee: boolean;
  roleId: number | '';
  initials: string;
  leaveApprover: string;
  gender: string;
  source: string;
  firstName: string;
  highestQualification: string;
  lastName: string;
  accommodation: boolean;
  officeEmail: string;
}

export const INITIAL_EMPLOYEE_FORM: EmployeeOnboardingFormValues = {
  officeName: '',
  dateOfJoining: '',
  unitName: '',
  status: '',
  designation: '',
  employeeNumber: '',
  isPastEmployee: false,
  roleId: '',
  initials: '',
  leaveApprover: '',
  gender: 'Autofill',
  source: '',
  firstName: '',
  highestQualification: '',
  lastName: '',
  accommodation: false,
  officeEmail: '',
};
