import * as yup from 'yup';

export const attendanceFormSchema = yup.object({
  employeeId: yup.string().required('Employee is required'),
  employeeName: yup.string().required('Employee name is required'),
  date: yup.string().required('Date is required'),
  checkInTime: yup.string().required('Check-in time is required'),
  location: yup.string().required('Location is required'),
  status: yup.string().required('Status is required'),
});

export type AttendanceFormData = yup.InferType<typeof attendanceFormSchema>;
