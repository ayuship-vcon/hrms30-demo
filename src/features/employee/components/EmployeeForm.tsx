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
import { DEPARTMENTS } from '../core/constants/employee.constants';
import { employeeFormSchema, type EmployeeFormData } from '../validations/employee.validation';
import type { Employee } from '../core/types';

export interface EmployeeFormProps {
  initialValues?: Partial<Employee>;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

/**
 * Universal Employee Form with Unsaved Changes Confirmation on 'X' close and Cancel
 */
export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const modal = useModal();

  const methods = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeFormSchema),
    defaultValues: {
      userId: 2,
      employeeCode: initialValues?.employeeCode || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: initialValues?.firstName || '',
      lastName: initialValues?.lastName || '',
      email: initialValues?.email || '',
      phone: initialValues?.phone || '',
      department: initialValues?.department || 'Engineering',
      designation: initialValues?.designation || '',
      role: initialValues?.role || 'Team member',
      salary: initialValues?.salary || 75000,
      joiningDate: initialValues?.joiningDate || new Date().toISOString().split('T')[0],
      status: initialValues?.status || 'active',
    },
  });

  const { formState: { isDirty } } = methods;
  useFormDirtyGuard(isDirty);

  const roleOptions = [
    { label: 'Team Member', value: 'Team member' },
    { label: 'Cluster Colead', value: 'Cluster colead' },
    { label: 'HR Administrator', value: 'HR_ADMIN' },
    { label: 'Manager', value: 'MANAGER' },
    { label: 'Super Administrator', value: 'SUPER_ADMIN' },
  ];

  const handleCancelClick = () => {
    if (modal?.requestClose) {
      modal.requestClose();
    } else {
      onCancel?.();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} className="flex flex-col gap-4 pt-1">
      {/* Row 1: First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFInput<EmployeeFormData>
          name="firstName"
          label="First Name"
          placeholder="e.g. John"
          required
        />
        <RHFInput<EmployeeFormData>
          name="lastName"
          label="Last Name"
          placeholder="e.g. Doe"
          required
        />
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFInput<EmployeeFormData>
          name="email"
          label="Corporate Email Address"
          type="email"
          placeholder="john.doe@company.com"
          required
        />
        <RHFInput<EmployeeFormData>
          name="phone"
          label="Phone Number"
          placeholder="+1 555-0100"
          required
        />
      </div>

      {/* Row 3: Department & Designation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFSelect<EmployeeFormData>
          name="department"
          label="Department"
          options={DEPARTMENTS.filter((d) => d.value !== '')}
          required
        />
        <RHFInput<EmployeeFormData>
          name="designation"
          label="Job Designation"
          placeholder="e.g. Senior Software Architect"
          required
        />
      </div>

      {/* Row 4: System Role & Annual Salary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFSelect<EmployeeFormData>
          name="role"
          label="System Access Role"
          options={roleOptions}
          required
        />
        <RHFInput<EmployeeFormData>
          name="salary"
          label="Annual Compensation ($)"
          type="number"
          required
        />
      </div>

      {/* Row 5: Joining Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFDatePicker<EmployeeFormData>
          name="joiningDate"
          label="Joining Date"
          required
        />
      </div>

      {/* Action Footer */}
      <div className="flex justify-end items-center gap-3 mt-4 pt-4 border-t border-border">
        {onCancel && (
          <Button variant="outline" onClick={handleCancelClick} type="button" size="md">
            Cancel
          </Button>
        )}
        <Button
          variant="primary"
          type="submit"
          isLoading={isLoading}
          size="md"
        >
          Save Employee Record
        </Button>
      </div>
    </FormProvider>
  );
};
