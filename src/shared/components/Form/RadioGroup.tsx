import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio as MuiRadio,
  FormHelperText,
  type RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material';
import type { BaseFieldProps, SelectOption } from './form.types';

export interface RadioGroupProps
  extends Omit<MuiRadioGroupProps, 'error'>,
    BaseFieldProps {
  options: SelectOption[];
  row?: boolean;
}

/**
 * Standalone RadioGroup Component (Works WITHOUT React Hook Form)
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  helperText,
  required,
  disabled,
  options,
  value,
  onChange,
  row = true,
  className = '',
  ...props
}) => {
  return (
    <FormControl
      error={Boolean(error)}
      disabled={disabled}
      required={required}
      className={`bg-white ${className}`}
    >
      {label && <FormLabel className="text-sm font-semibold text-gray-600 mb-1">{label}</FormLabel>}
      <MuiRadioGroup row={row} value={value} onChange={onChange} {...props}>
        {options.map((opt) => (
          <FormControlLabel
            key={String(opt.value)}
            value={opt.value}
            disabled={opt.disabled}
            control={<MuiRadio size="small" color="primary" />}
            label={<span className="text-sm text-gray-700">{opt.label}</span>}
          />
        ))}
      </MuiRadioGroup>
      {(error || helperText) && (
        <FormHelperText error={Boolean(error)}>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
