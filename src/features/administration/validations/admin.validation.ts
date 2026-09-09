import * as yup from 'yup';

export const adminSettingsSchema = yup.object({
  companyName: yup.string().required('Company name is required'),
  defaultTimezone: yup.string().required('Timezone is required'),
  fiscalYearStart: yup.string().required('Fiscal year start is required'),
  mfaEnforced: yup.boolean().required(),
  autoApproveLeavesUnderDays: yup.number().min(0).required(),
});

export type AdminSettingsFormData = yup.InferType<typeof adminSettingsSchema>;
