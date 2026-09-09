import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { RadioGroup, type RadioGroupProps } from '../RadioGroup';
import type { RHFFieldProps } from '../form.types';

export interface RHFRadioGroupProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<RadioGroupProps, 'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form RadioGroup Component
 */
export function RHFRadioGroup<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFRadioGroupProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <RadioGroup
          {...field}
          {...props}
          error={error?.message}
          helperText={helperText}
          value={field.value ?? ''}
        />
      )}
    />
  );
}
