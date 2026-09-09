import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Checkbox, type CheckboxProps } from '../Checkbox';
import type { RHFFieldProps } from '../form.types';

export interface RHFCheckboxProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<CheckboxProps, 'name' | 'defaultValue' | 'checked' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form Checkbox Component
 */
export function RHFCheckbox<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFCheckboxProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Checkbox
          {...field}
          {...props}
          checked={Boolean(field.value)}
          onChange={(e) => field.onChange(e.target.checked)}
          error={error?.message}
          helperText={helperText}
        />
      )}
    />
  );
}
