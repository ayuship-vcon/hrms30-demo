import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  RHFSelect,
  RHFDatePicker,
  RHFTextArea,
  FormProvider,
  useFormDirtyGuard,
  useModal,
} from '@/shared/components';
import { LEAVE_TYPES } from '../core/constants/leave.constants';
import { leaveFormSchema, type LeaveFormData } from '../validations/leave.validation';
import type { ApplyLeaveRequest } from '@/core/api/leave';
import type { LeaveType } from '../core/types';

export interface LeaveFormProps {
  onSubmit: (data: ApplyLeaveRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const modal = useModal();

  const methods = useForm<LeaveFormData>({
    resolver: yupResolver(leaveFormSchema),
    defaultValues: {
      leaveType: 'ANNUAL',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      reason: '',
    },
  });

  const { formState: { isDirty } } = methods;
  useFormDirtyGuard(isDirty);

  const handleCancelClick = () => {
    if (modal?.requestClose) {
      modal.requestClose();
    } else {
      onCancel?.();
    }
  };

  const handleFormSubmit = (data: LeaveFormData) => {
    onSubmit({
      leaveType: data.leaveType as LeaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
    });
    methods.reset();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleFormSubmit} className="flex flex-col gap-4 pt-1">
      <RHFSelect<LeaveFormData>
        name="leaveType"
        label="Leave Category"
        options={LEAVE_TYPES}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFDatePicker<LeaveFormData>
          name="startDate"
          label="Start Date"
          required
        />
        <RHFDatePicker<LeaveFormData>
          name="endDate"
          label="End Date"
          required
        />
      </div>

      <RHFTextArea<LeaveFormData>
        name="reason"
        label="Reason for Absence"
        placeholder="Briefly describe your reason for taking leave..."
        rows={3}
      />

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3 mt-3 pt-3 border-t border-border">
        {onCancel && (
          <Button variant="outline" onClick={handleCancelClick} type="button" size="md">
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          size="md"
        >
          Submit Application
        </Button>
      </div>
    </FormProvider>
  );
};
