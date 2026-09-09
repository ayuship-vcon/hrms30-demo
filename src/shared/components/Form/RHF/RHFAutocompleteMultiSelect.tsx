import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import {
  AutocompleteMultiSelect,
  type AutocompleteMultiSelectProps,
} from '../AutocompleteMultiSelect';
import type { RHFFieldProps } from '../form.types';

export interface RHFAutocompleteMultiSelectProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<
      AutocompleteMultiSelectProps,
      'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'
    >,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form Autocomplete Multi-Select Component
 * Connected to RHF Controller with Live Type-to-Search, Checkboxes, and 'Select All' Support.
 */
export function RHFAutocompleteMultiSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFAutocompleteMultiSelectProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error, isDirty, invalid } }) => {
        const hasValues = Array.isArray(field.value) && field.value.length > 0;
        const isSuccess = Boolean(isDirty && !invalid && hasValues);

        return (
          <AutocompleteMultiSelect
            {...props}
            value={field.value ?? []}
            onChange={(values) => field.onChange(values)}
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
