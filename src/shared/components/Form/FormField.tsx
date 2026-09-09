import React from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Input, type InputProps } from './Input';
import { Select, type SelectProps } from './Select';
import { Autocomplete, type AutocompleteProps } from './Autocomplete';
import { MultiSelect, type MultiSelectProps } from './MultiSelect';
import { AutocompleteMultiSelect, type AutocompleteMultiSelectProps } from './AutocompleteMultiSelect';
import { FileUpload, type FileUploadProps, type UploadedFileItem } from './FileUpload';
import { Switch, type SwitchProps } from './Switch';
import { TextArea, type TextAreaProps } from './TextArea';
import { DatePicker, type DatePickerProps } from './DatePicker';
import { Checkbox, type CheckboxProps } from './Checkbox';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';
import type { SelectOption } from './form.types';

export type FieldVariant =
  | 'text'
  | 'select'
  | 'autocomplete'
  | 'multiselect'
  | 'autocomplete-multi'
  | 'file'
  | 'switch'
  | 'textarea'
  | 'date'
  | 'checkbox'
  | 'radio';

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  variant?: FieldVariant;
  label?: string;
  name?: Path<TFieldValues> | string;
  control?: Control<TFieldValues>;
  options?: SelectOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  description?: string;
  rows?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  maxChipsDisplay?: number;
  showSelectAll?: boolean;
  freeSolo?: boolean;
  groupBy?: (option: SelectOption) => string;
  // File upload specific props
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
  uploadVariant?: 'dropzone' | 'button';
  multiple?: boolean;
  // Direct standalone props
  value?: unknown;
  onChange?: (value: unknown, option?: unknown) => void;
  checked?: boolean;
  type?: string;
}

/**
 * Universal Dual-Mode FormField:
 * - Automatically connects with React Hook Form if `name` and `control` are provided.
 * - Works standalone with regular `value`/`onChange` if used without Hook Form.
 * - Supports text, select, autocomplete, multiselect, file upload, switch, textarea, date, checkbox, and radio.
 */
export function FormField<TFieldValues extends FieldValues = FieldValues>({
  variant = 'text',
  label,
  name,
  control,
  options = [],
  error,
  helperText,
  required,
  disabled,
  className,
  placeholder,
  description,
  rows,
  leftIcon,
  rightIcon,
  clearable = true,
  maxChipsDisplay = 3,
  showSelectAll = true,
  freeSolo = false,
  groupBy,
  maxFiles = 5,
  maxSizeInMB = 10,
  acceptedFileTypes = ['.pdf', '.png', '.jpg', '.jpeg', '.docx', '.csv', '.xlsx'],
  uploadVariant = 'dropzone',
  multiple = true,
  value,
  onChange,
  checked,
  type = 'text',
  ...rest
}: FormFieldProps<TFieldValues>) {
  // 1. React Hook Form Controller Mode (When control and name are provided)
  if (control && name) {
    return (
      <Controller
        name={name as Path<TFieldValues>}
        control={control}
        render={({ field, fieldState: { error: rhfError } }) => {
          const fieldError = rhfError?.message || error;

          switch (variant) {
            case 'select':
              return (
                <Select
                  {...field}
                  label={label}
                  options={options}
                  error={fieldError}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  placeholder={placeholder}
                  className={className}
                  value={field.value ?? ''}
                />
              );

            case 'autocomplete':
              return (
                <Autocomplete
                  {...field}
                  label={label}
                  options={options}
                  error={fieldError}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  placeholder={placeholder}
                  clearable={clearable}
                  freeSolo={freeSolo}
                  groupBy={groupBy}
                  className={className}
                  value={field.value ?? null}
                  onChange={(val) => field.onChange(val)}
                />
              );

            case 'multiselect':
            case 'autocomplete-multi':
              return (
                <AutocompleteMultiSelect
                  {...field}
                  label={label}
                  options={options}
                  error={fieldError}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  placeholder={placeholder}
                  maxChipsDisplay={maxChipsDisplay}
                  showSelectAll={showSelectAll}
                  clearable={clearable}
                  groupBy={groupBy}
                  className={className}
                  value={field.value ?? []}
                  onChange={(values) => field.onChange(values)}
                />
              );

            case 'file':
              return (
                <FileUpload
                  label={label}
                  variant={uploadVariant}
                  value={field.value ?? []}
                  onChange={(files) => field.onChange(files)}
                  error={fieldError}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  multiple={multiple}
                  maxFiles={maxFiles}
                  maxSizeInMB={maxSizeInMB}
                  acceptedFileTypes={acceptedFileTypes}
                  placeholder={placeholder}
                  description={description}
                  className={className}
                />
              );

            case 'switch':
              return (
                <Switch
                  label={label}
                  description={description}
                  checked={Boolean(field.value)}
                  onChange={(checkedVal) => field.onChange(checkedVal)}
                  disabled={disabled}
                  error={fieldError}
                  helperText={helperText}
                  className={className}
                />
              );

            case 'textarea':
              return (
                <TextArea
                  {...field}
                  label={label}
                  rows={rows}
                  error={fieldError}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  placeholder={placeholder}
                  className={className}
                  value={field.value ?? ''}
                />
              );

            case 'date':
              return (
                <DatePicker
                  {...field}
                  label={label}
                  error={fieldError}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  className={className}
                  value={field.value ?? ''}
                />
              );

            case 'checkbox':
              return (
                <Checkbox
                  {...field}
                  label={label || ''}
                  error={fieldError}
                  helperText={helperText}
                  disabled={disabled}
                  className={className}
                  checked={Boolean(field.value)}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              );

            case 'radio':
              return (
                <RadioGroup
                  {...field}
                  label={label}
                  options={options}
                  error={fieldError}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  className={className}
                  value={field.value ?? ''}
                />
              );

            case 'text':
            default:
              return (
                <Input
                  {...field}
                  type={type}
                  label={label}
                  error={fieldError}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  placeholder={placeholder}
                  className={className}
                  leftIcon={leftIcon}
                  rightIcon={rightIcon}
                  value={field.value ?? ''}
                />
              );
          }
        }}
      />
    );
  }

  // 2. Standalone Mode (No Hook Form) -> Standard Controlled / Uncontrolled Component
  switch (variant) {
    case 'select':
      return (
        <Select
          label={label}
          options={options}
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={className}
          {...rest}
        />
      );

    case 'autocomplete':
      return (
        <Autocomplete
          label={label}
          options={options}
          value={value as string | number | null | undefined}
          onChange={onChange as ((value: string | number | null, option?: SelectOption | null) => void) | undefined}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          clearable={clearable}
          freeSolo={freeSolo}
          groupBy={groupBy}
          className={className}
          {...rest}
        />
      );

    case 'multiselect':
    case 'autocomplete-multi':
      return (
        <AutocompleteMultiSelect
          label={label}
          options={options}
          value={value as (string | number)[] | undefined}
          onChange={onChange as ((value: (string | number)[], options?: SelectOption[]) => void) | undefined}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          maxChipsDisplay={maxChipsDisplay}
          showSelectAll={showSelectAll}
          clearable={clearable}
          groupBy={groupBy}
          className={className}
          {...rest}
        />
      );

    case 'file':
      return (
        <FileUpload
          label={label}
          variant={uploadVariant}
          value={value as File[] | UploadedFileItem[] | undefined}
          onChange={onChange as ((files: (File | UploadedFileItem)[]) => void) | undefined}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          multiple={multiple}
          maxFiles={maxFiles}
          maxSizeInMB={maxSizeInMB}
          acceptedFileTypes={acceptedFileTypes}
          placeholder={placeholder}
          description={description}
          className={className}
        />
      );

    case 'switch':
      return (
        <Switch
          label={label}
          description={description}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          error={error}
          helperText={helperText}
          className={className}
        />
      );

    case 'textarea':
      return (
        <TextArea
          label={label}
          rows={rows}
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={className}
          {...rest}
        />
      );

    case 'date':
      return (
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          className={className}
          {...rest}
        />
      );

    case 'checkbox':
      return (
        <Checkbox
          label={label || ''}
          checked={checked}
          onChange={onChange}
          error={error}
          helperText={helperText}
          disabled={disabled}
          className={className}
          {...rest}
        />
      );

    case 'radio':
      return (
        <RadioGroup
          label={label}
          options={options}
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          className={className}
          {...rest}
        />
      );

    case 'text':
    default:
      return (
        <Input
          type={type}
          label={label}
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={className}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          {...rest}
        />
      );
  }
}
