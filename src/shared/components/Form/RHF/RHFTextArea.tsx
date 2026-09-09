import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { TextArea, type TextAreaProps } from '../TextArea';
import type { RHFFieldProps } from '../form.types';

export interface RHFTextAreaProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<TextAreaProps, 'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form TextArea Component with Live Error / Success State Integration
 */
export function RHFTextArea<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFTextAreaProps<TFieldValues>) {
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
          <TextArea
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
