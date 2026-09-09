import React from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor; // 'success' | 'info' | 'warning' | 'error'
  autoHideDuration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  message,
  severity = 'info',
  autoHideDuration = 4000,
}) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
