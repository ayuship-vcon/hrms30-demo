import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Button } from '../Button/Button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
}

/**
 * Universal MUI ConfirmDialog Component (Independent native MUI Dialog - No circular dependencies)
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDangerous = false,
  isLoading = false,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        className: 'rounded-sm shadow-card border border-border overflow-hidden',
        sx: { borderRadius: '8px' },
      }}
    >
      <DialogTitle className="flex justify-between items-center px-5 py-3.5 border-b border-border bg-surface">
        <div className="flex items-center gap-2">
          {isDangerous && (
            <WarningAmberRoundedIcon sx={{ fontSize: 20, color: '#b22b32' }} />
          )}
          <span className="text-base font-bold text-black tracking-tight">{title}</span>
        </div>
        {!isLoading && (
          <IconButton
            size="small"
            onClick={onClose}
            className="text-muted hover:text-black hover:bg-slate-100 -mr-1"
            aria-label="Close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent className="!p-5 bg-surface">
        <Typography sx={{ fontSize: '13.5px', color: '#45464D', lineHeight: 1.6 }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions className="px-5 py-3 border-t border-border bg-slate-50/50 flex justify-end items-center gap-3">
        <Button variant="outline" onClick={onClose} disabled={isLoading} size="md">
          {cancelLabel}
        </Button>
        <Button
          variant={isDangerous ? 'danger' : 'primary'}
          onClick={onConfirm}
          isLoading={isLoading}
          size="md"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
