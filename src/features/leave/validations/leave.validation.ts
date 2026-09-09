import * as yup from 'yup';

export const leaveFormSchema = yup.object({
  leaveType: yup.string().required('Please select a leave type'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  reason: yup.string().min(5, 'Please provide at least 5 characters reason').required('Reason is required'),
});

export type LeaveFormData = yup.InferType<typeof leaveFormSchema>;
