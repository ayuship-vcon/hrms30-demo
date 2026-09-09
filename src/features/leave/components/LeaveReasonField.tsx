import React from 'react';
import { TextArea } from '@/shared/components';

export interface LeaveReasonFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const LeaveReasonField: React.FC<LeaveReasonFieldProps> = ({ value, onChange, error }) => {
  return (
    <TextArea
      label="Reason for Request"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      placeholder="State the reason clearly for fast manager approval..."
    />
  );
};
