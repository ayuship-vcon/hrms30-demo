import React from 'react';
import {
  FormControlLabel,
  Radio as MuiRadio,
  type RadioProps as MuiRadioProps,
} from '@mui/material';

export interface RadioProps extends MuiRadioProps {
  label: string;
}

export const Radio: React.FC<RadioProps> = ({ label, className = '', ...props }) => {
  return (
    <FormControlLabel
      control={<MuiRadio size="small" color="primary" {...props} />}
      label={<span className="text-sm text-gray-700">{label}</span>}
      className={className}
    />
  );
};
