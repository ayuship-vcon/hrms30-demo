import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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
import { HOLIDAY_TYPES } from '../core/constants/holiday.constants';
import { getDayOfWeek } from '../core/utils/holiday.utils';
import { holidayFormSchema, type HolidayFormData } from '../validations/holiday.validation';
import type { HolidayType } from '../core/types';
import type { CreateHolidayRequest } from '@/core/api/holiday';

export interface HolidayFormProps {
  onSubmit: (data: CreateHolidayRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const HolidayForm: React.FC<HolidayFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const modal = useModal();
  const methods = useForm<HolidayFormData>({
    resolver: yupResolver(holidayFormSchema),
    defaultValues: {
      name: '',
      date: new Date().toISOString().split('T')[0],
      dayOfWeek: getDayOfWeek(new Date().toISOString().split('T')[0]),
      type: 'PUBLIC',
      description: '',
    },
    mode: 'onSubmit',
  });

  const selectedDate = useWatch({ control: methods.control, name: 'date' });

  useEffect(() => {
    if (selectedDate) {
      methods.setValue('dayOfWeek', getDayOfWeek(selectedDate));
    }
  }, [selectedDate, methods]);

  useFormDirtyGuard(methods.formState.isDirty);

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else if (modal?.requestClose) {
      modal.requestClose();
    }
  };

  const handleFormSubmit = (data: HolidayFormData) => {
    onSubmit({
      name: data.name,
      date: data.date,
      dayOfWeek: data.dayOfWeek,
      type: data.type as HolidayType,
      description: data.description || '',
    });
    methods.reset();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleFormSubmit} className="flex flex-col gap-4 pt-1">
      <RHFInput<HolidayFormData>
        name="name"
        label="Holiday Title"
        placeholder="e.g. Independence Day"
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFDatePicker<HolidayFormData>
          name="date"
          label="Observance Date"
          required
        />
        <RHFInput<HolidayFormData>
          name="dayOfWeek"
          label="Day of the Week"
          disabled
        />
      </div>

      <RHFSelect<HolidayFormData>
        name="type"
        label="Holiday Classification"
        options={HOLIDAY_TYPES}
      />

      <RHFInput<HolidayFormData>
        name="description"
        label="Policy Description (Optional)"
        placeholder="e.g. Paid mandatory corporate holiday"
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
          Add to Calendar
        </Button>
      </div>
    </FormProvider>
  );
};
