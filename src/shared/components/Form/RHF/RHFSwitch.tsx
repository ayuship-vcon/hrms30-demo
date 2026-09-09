import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Switch, type SwitchProps } from '../Switch';
import type { RHFFieldProps } from '../form.types';

export interface RHFSwitchProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<SwitchProps, 'name' | 'defaultValue' | 'checked' | 'onChange'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form Switch Component
 */
export function RHFSwitch<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFSwitchProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        return (
          <Switch
            {...props}
            checked={Boolean(field.value)}
            onChange={(checked) => field.onChange(checked)}
            error={error?.message}
            helperText={helperText}
          />
        );
      }}
    />
  );
}
