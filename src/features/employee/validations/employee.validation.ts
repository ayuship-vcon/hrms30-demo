import * as yup from 'yup';

export const employeeFormSchema = yup.object({
  employeeCode: yup.string().required('Employee code is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Valid email is required').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  department: yup.string().required('Department is required'),
  designation: yup.string().required('Designation is required'),
  role: yup.string().required('Role is required'),
  salary: yup.number().positive('Salary must be greater than 0').required('Salary is required'),
  joiningDate: yup.string().required('Joining date is required'),
  status: yup.string().required('Status is required'),
});

export type EmployeeFormData = yup.InferType<typeof employeeFormSchema>;
