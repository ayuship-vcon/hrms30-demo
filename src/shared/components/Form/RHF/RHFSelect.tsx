import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Select, type SelectProps } from '../Select';
import type { RHFFieldProps } from '../form.types';

export interface RHFSelectProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<SelectProps, 'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form Select Component with Live Error / Success State Integration
 */
export function RHFSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFSelectProps<TFieldValues>) {
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
          <Select
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
