import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { DatePicker, type DatePickerProps } from '../DatePicker';
import type { RHFFieldProps } from '../form.types';

export interface RHFDatePickerProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<DatePickerProps, 'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form DatePicker Component with Live Error / Success State Integration
 */
export function RHFDatePicker<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFDatePickerProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error, isDirty, invalid } }) => {
        const hasValue = field.value !== undefined && field.value !== null && field.value !== '';
        const isSuccess = Boolean(isDirty && !invalid && hasValue);

        return (
          <DatePicker
            {...field}
            {...props}
            error={error?.message}
            isSuccess={isSuccess}
            helperText={helperText}
            value={field.value ?? ''}
          />
        );
      }}
    />
  );
}
