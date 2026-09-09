import * as yup from 'yup';

export const holidayFormSchema = yup.object({
  name: yup.string().required('Holiday name is required'),
  date: yup.string().required('Date is required'),
  dayOfWeek: yup.string().required('Day of week is required'),
  type: yup.string().required('Holiday type is required'),
  description: yup.string().optional(),
});

export type HolidayFormData = yup.InferType<typeof holidayFormSchema>;
