import React from 'react';
import { Alert } from '@mui/material';

export interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  if (!message) return null;
  return (
    <Alert severity="error" className={`my-2 text-sm ${className}`}>
      {message}
    </Alert>
  );
};
