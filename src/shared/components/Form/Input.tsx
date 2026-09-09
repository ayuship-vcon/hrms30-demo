import React, { forwardRef } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import type { BaseFieldProps } from './form.types';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export interface InputProps
  extends Omit<TextFieldProps, 'error' | 'label' | 'helperText'>,
    BaseFieldProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Universal Input Component
 * Clean notched outline without label-cutting box-shadows, 14px legible labels, and live status indicators.
 */
export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      label,
      error,
      isSuccess,
      helperText,
      required,
      disabled,
      className = '',
      leftIcon,
      rightIcon,
      InputProps: customInputProps,
      InputLabelProps: customInputLabelProps,
      sx,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const showSuccess = Boolean(isSuccess && !hasError);

    // Compute automatic trailing status icon if rightIcon is not provided
    const statusIcon = hasError ? (
      <ErrorOutlineRoundedIcon sx={{ fontSize: 18, color: '#b22b32' }} />
    ) : showSuccess ? (
      <CheckCircleRoundedIcon sx={{ fontSize: 18, color: '#4edea3' }} />
    ) : null;

    const trailingIcon = rightIcon || statusIcon;

    return (
      <div className={`w-full ${className}`}>
        <TextField
          ref={ref}
          label={label}
          required={required}
          disabled={disabled}
          error={hasError}
          helperText={error || helperText}
          size="small"
          fullWidth
          variant="outlined"
          className="bg-white"
          InputLabelProps={{
            ...customInputLabelProps,
            sx: {
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
              ...customInputLabelProps?.sx,
            },
          }}
          InputProps={{
            ...customInputProps,
            sx: {
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
              '& .MuiInputBase-input': {
                fontSize: '13.5px',
                height: '40px',
                py: 0,
                boxSizing: 'border-box',
              },
              ...customInputProps?.sx,
            },
            startAdornment: leftIcon ? (
              <span className="mr-2 flex items-center text-slate-400">{leftIcon}</span>
            ) : (
              customInputProps?.startAdornment
            ),
            endAdornment: trailingIcon ? (
              <span className="ml-2 flex items-center">{trailingIcon}</span>
            ) : (
              customInputProps?.endAdornment
            ),
          }}
          sx={{
            '& .MuiFormHelperText-root': {
              fontSize: '11px',
              marginLeft: '4px',
              marginTop: '3px',
              color: hasError ? '#b22b32' : undefined,
            },
            ...sx,
          }}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
