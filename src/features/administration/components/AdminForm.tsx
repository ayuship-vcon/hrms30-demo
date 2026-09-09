import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  RHFInput,
  RHFSelect,
  RHFCheckbox,
  FormProvider,
} from '@/shared/components';
import { TIMEZONES } from '../core/constants/admin.constants';
import type { AdminSettings } from '../core/types';
import { adminSettingsSchema, type AdminSettingsFormData } from '../validations/admin.validation';

export interface AdminFormProps {
  initialSettings?: AdminSettings;
  onSave: (settings: AdminSettings) => void;
  isLoading?: boolean;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  initialSettings,
  onSave,
  isLoading = false,
}) => {
  const methods = useForm<AdminSettingsFormData>({
    resolver: yupResolver(adminSettingsSchema),
    defaultValues: {
      companyName: initialSettings?.companyName ?? '',
      defaultTimezone: initialSettings?.defaultTimezone ?? '',
      fiscalYearStart: initialSettings?.fiscalYearStart ?? '',
      mfaEnforced: initialSettings?.mfaEnforced ?? false,
      autoApproveLeavesUnderDays: initialSettings?.autoApproveLeavesUnderDays ?? 0,
    },
  });

  const handleFormSubmit = (data: AdminSettingsFormData) => {
    onSave(data as AdminSettings);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleFormSubmit} className="flex flex-col gap-4 pt-1">
      <RHFInput<AdminSettingsFormData>
        name="companyName"
        label="Corporate Legal Entity Name"
        placeholder="e.g. vConstruct Systems Pvt Ltd"
        required
      />

      <RHFSelect<AdminSettingsFormData>
        name="defaultTimezone"
        label="Default System Timezone"
        options={TIMEZONES}
      />

      <RHFInput<AdminSettingsFormData>
        name="fiscalYearStart"
        label="Fiscal Year Start Month/Day"
        placeholder="e.g. April 1"
        required
      />

      <div className="p-4 bg-slate-50 rounded-sm border border-border flex flex-col gap-2.5">
        <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
          Security &amp; Automation
        </span>
        <RHFCheckbox<AdminSettingsFormData>
          name="mfaEnforced"
          label="Enforce Multi-Factor Authentication (MFA)"
        />
        <RHFInput<AdminSettingsFormData>
          name="autoApproveLeavesUnderDays"
          label="Auto-Approve Sick Leave Under (Days)"
          type="number"
        />
      </div>

      <div className="flex justify-end pt-3 border-t border-border">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          size="md"
        >
          Save Configuration
        </Button>
      </div>
    </FormProvider>
  );
};
