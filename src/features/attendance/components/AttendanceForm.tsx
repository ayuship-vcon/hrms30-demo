import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  RHFInput,
  RHFSelect,
  RHFDatePicker,
  FormProvider,
  useFormDirtyGuard,
  useModal,
} from '@/shared/components';
import { WORK_LOCATIONS } from '../core/constants/attendance.constants';
import { attendanceFormSchema, type AttendanceFormData } from '../validations/attendance.validation';
import type { AttendanceStatus } from '../core/types';
import type { CreateAttendanceRequest } from '@/core/api/attendance';

export interface AttendanceFormProps {
  onSubmit: (data: CreateAttendanceRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const modal = useModal();

  const methods = useForm<AttendanceFormData>({
    resolver: yupResolver(attendanceFormSchema),
    defaultValues: {
      employeeId: 'emp-1',
      employeeName: 'Harsh Vardhan',
      date: new Date().toISOString().split('T')[0],
      checkInTime: '09:00 AM',
      location: 'Headquarters Office',
      status: 'present',
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

  const handleFormSubmit = (data: AttendanceFormData) => {
    onSubmit({
      ...data,
      workingHours: 8.0,
      status: data.status as AttendanceStatus,
    });
    methods.reset();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleFormSubmit} className="flex flex-col gap-4 pt-1">
      <RHFInput<AttendanceFormData>
        name="employeeName"
        label="Employee Name"
        placeholder="e.g. Harsh Vardhan"
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFDatePicker<AttendanceFormData>
          name="date"
          label="Shift Date"
          required
        />
        <RHFInput<AttendanceFormData>
          name="checkInTime"
          label="Check In Time"
          placeholder="09:00 AM"
          required
        />
      </div>

      <RHFSelect<AttendanceFormData>
        name="location"
        label="Duty Location"
        options={WORK_LOCATIONS}
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
          Save Entry
        </Button>
      </div>
    </FormProvider>
  );
};
