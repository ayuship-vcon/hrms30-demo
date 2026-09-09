import React from 'react';
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  FormHelperText,
  type CheckboxProps as MuiCheckboxProps,
} from '@mui/material';
import type { BaseFieldProps } from './form.types';

export interface CheckboxProps
  extends Omit<MuiCheckboxProps, 'error'>,
    BaseFieldProps {
  label: string;
}

/**
 * Standalone Checkbox Component (Works WITHOUT React Hook Form)
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col my-2 ${className}`}>
      <FormControlLabel
        control={<MuiCheckbox size="small" color="primary" disabled={disabled} {...props} />}
        label={<span className="text-sm text-gray-700 select-none">{label}</span>}
      />
      {(error || helperText) && (
        <FormHelperText error={Boolean(error)}>{error || helperText}</FormHelperText>
      )}
    </div>
  );
};
