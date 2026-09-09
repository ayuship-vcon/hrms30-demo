import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { FileUpload, type FileUploadProps } from '../FileUpload';
import type { RHFFieldProps } from '../form.types';

export interface RHFFileUploadProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<FileUploadProps, 'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'>,
    RHFFieldProps<TFieldValues> {}

/**
 * Type-Safe React Hook Form File Upload Component
 * Supports Drag & Drop, Browser Button, File Size & Count Validations.
 */
export function RHFFileUpload<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  helperText,
  ...props
}: RHFFileUploadProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error, isDirty, invalid } }) => {
        const hasFiles = Array.isArray(field.value) && field.value.length > 0;
        const isSuccess = Boolean(isDirty && !invalid && hasFiles);

        return (
          <FileUpload
            {...props}
            value={field.value ?? []}
            onChange={(files) => field.onChange(files)}
            error={error?.message}
            isSuccess={isSuccess}
            helperText={helperText}
          />
        );
      }}
    />
  );
}
