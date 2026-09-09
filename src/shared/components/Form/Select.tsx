import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  type SelectProps as MuiSelectProps,
} from '@mui/material';
import type { BaseFieldProps, SelectOption } from './form.types';

export interface SelectProps
  extends Omit<MuiSelectProps, 'error' | 'label'>,
    BaseFieldProps {
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Universal Select Component with Clean Notched Outline and 14px Labels
 */
export const Select: React.FC<SelectProps> = ({
  label,
  error,
  isSuccess,
  helperText,
  required,
  disabled,
  options,
  value,
  onChange,
  className = '',
  id,
  placeholder,
  sx,
  ...props
}) => {
  const rawId = String(id || label || 'select');
  const labelId = `${rawId}-label`.toLowerCase().replace(/\s+/g, '-');
  const hasError = Boolean(error);
  const showSuccess = Boolean(isSuccess && !hasError);

  return (
    <div className={`w-full ${className}`}>
      <FormControl
        fullWidth
        size="small"
        error={hasError}
        disabled={disabled}
        required={required}
        className="bg-white"
        sx={{
          '& .MuiInputLabel-root': {
            fontSize: '14px',
            fontWeight: 500,
            color: hasError ? '#b22b32' : showSuccess ? '#065f46' : '#45464D',
            '&.Mui-focused': {
              color: hasError ? '#b22b32' : showSuccess ? '#065f46' : '#0b4668',
              fontWeight: 600,
            },
            '&.MuiInputLabel-shrink': {
              fontSize: '13px',
            },
          },
          '& .MuiFormHelperText-root': {
            fontSize: '11px',
            marginLeft: '4px',
            marginTop: '3px',
            color: hasError ? '#b22b32' : undefined,
          },
        }}
      >
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <MuiSelect
          labelId={labelId}
          label={label}
          value={value ?? ''}
          onChange={onChange}
          displayEmpty={Boolean(placeholder)}
          sx={{
            fontSize: '13.5px',
            borderRadius: '8px',
            height: '40px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: hasError ? '#b22b32' : showSuccess ? '#4edea3' : '#CBD5E1',
              borderWidth: hasError || showSuccess ? '1.5px' : '1px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: hasError ? '#b22b32' : showSuccess ? '#4edea3' : '#0b4668',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: hasError ? '#b22b32' : showSuccess ? '#4edea3' : '#0b4668',
              borderWidth: '2px',
            },
            '& .MuiSelect-select': {
              fontSize: '13.5px',
              height: '40px',
              py: 0,
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box',
            },
            ...sx,
          }}
          {...props}
        >
          {placeholder && (
            <MenuItem value="" disabled sx={{ fontSize: '13.5px' }}>
              <em>{placeholder}</em>
            </MenuItem>
          )}
          {options.map((opt) => (
            <MenuItem key={String(opt.value)} value={opt.value} disabled={opt.disabled} sx={{ fontSize: '13.5px' }}>
              {opt.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};
