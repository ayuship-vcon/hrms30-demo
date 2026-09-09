import { Controller, type FieldValues } from 'react-hook-form';
import { MultiSelect, type MultiSelectProps } from '../MultiSelect';
import type { RHFFieldProps } from '../form.types';

export interface RHFMultiSelectProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<MultiSelectProps, 'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form Multi-Select Autocomplete Component with Chips & Checkboxes
 */
export function RHFMultiSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFMultiSelectProps<TFieldValues>) {
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
          <MultiSelect
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
