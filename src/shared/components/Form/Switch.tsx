import React from 'react';
import {
  FormControlLabel,
  Switch as MuiSwitch,
  Typography,
  Box,
  FormHelperText,
} from '@mui/material';
import type { BaseFieldProps } from './form.types';

export interface SwitchProps extends BaseFieldProps {
  checked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  size?: 'small' | 'medium';
}

/**
 * Enterprise Boolean Switch Toggle Component
 * 100% Pure Material UI, Brand Deep Navy styling, zero inline CSS.
 */
export const Switch: React.FC<SwitchProps> = ({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  error,
  helperText,
  size = 'medium',
  className = '',
}) => {
  const hasError = Boolean(error);

  return (
    <Box className={`flex flex-col gap-0.5 ${className}`}>
      <FormControlLabel
        control={
          <MuiSwitch
            checked={checked}
            disabled={disabled}
            size={size}
            onChange={(e) => onChange?.(e.target.checked, e)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#0b4668',
                '&:hover': {
                  backgroundColor: 'rgba(11, 70, 104, 0.08)',
                },
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#0b4668',
              },
            }}
          />
        }
        label={
          <Box display="flex" flexDirection="column">
            {label && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: disabled ? '#94A3B8' : '#1E293B',
                }}
              >
                {label}
              </Typography>
            )}
            {description && (
              <Typography
                variant="caption"
                sx={{
                  fontSize: '11.5px',
                  color: '#64748B',
                  lineHeight: 1.3,
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
        }
        sx={{ ml: 0, mr: 0, gap: 1 }}
      />
      {(error || helperText) && (
        <FormHelperText
          sx={{
            fontSize: '11px',
            color: hasError ? '#b22b32' : '#64748B',
            ml: 1,
          }}
        >
          {error || helperText}
        </FormHelperText>
      )}
    </Box>
  );
};
