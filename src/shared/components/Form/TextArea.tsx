import React, { forwardRef } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import type { BaseFieldProps } from './form.types';

export interface TextAreaProps
  extends Omit<TextFieldProps, 'error' | 'label' | 'helperText'>,
    BaseFieldProps {
  rows?: number;
}

/**
 * Universal TextArea Component with Clean Notched Outline and 14px Labels
 */
export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ label, error, isSuccess, helperText, required, disabled, rows = 3, className = '', sx, ...props }, ref) => {
    const hasError = Boolean(error);
    const showSuccess = Boolean(isSuccess && !hasError);

    return (
      <div className={`w-full ${className}`}>
        <TextField
          ref={ref}
          label={label}
          multiline
          rows={rows}
          required={required}
          disabled={disabled}
          error={hasError}
          helperText={error || helperText}
          size="small"
          fullWidth
          variant="outlined"
          className="bg-white"
          InputLabelProps={{
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
            },
          }}
          InputProps={{
            sx: {
              fontSize: '13.5px',
              borderRadius: '8px',
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
              },
            },
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

TextArea.displayName = 'TextArea';
