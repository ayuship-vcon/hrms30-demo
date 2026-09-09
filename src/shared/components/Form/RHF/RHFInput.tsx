import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Input, type InputProps } from '../Input';
import type { RHFFieldProps } from '../form.types';

export interface RHFInputProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<InputProps, 'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form Input Component with Live Error / Success State Integration
 */
export function RHFInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFInputProps<TFieldValues>) {
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
          <Input
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
