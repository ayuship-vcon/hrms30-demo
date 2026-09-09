import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Autocomplete, type AutocompleteProps } from '../Autocomplete';
import type { RHFFieldProps } from '../form.types';

export interface RHFAutocompleteProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<AutocompleteProps, 'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form Single-Select Autocomplete Component with Live Error / Success State Integration
 */
export function RHFAutocomplete<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFAutocompleteProps<TFieldValues>) {
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
          <Autocomplete
            {...props}
            value={field.value ?? null}
            onChange={(val) => field.onChange(val)}
            onBlur={field.onBlur}
            error={error?.message}
            isSuccess={isSuccess}
            helperText={helperText}
          />
        );
      }}
    />
  );
}
