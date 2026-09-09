import React from 'react';
import {
  Dialog,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Button } from '../Button/Button';

export interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
}

/**
 * Universal MUI Delete Confirmation Dialog (Zero inline CSS, exact 8px radius)
 */
export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Permanent Deletion',
  message = 'Are you sure you want to delete this record? This action is permanent and cannot be undone.',
  itemName,
  isLoading = false,
  confirmText = 'Delete Record',
  cancelText = 'Cancel',
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
      <div className="relative p-5 sm:p-6 bg-surface flex flex-col items-center text-center">
        {/* Close Button */}
        {!isLoading && (
          <IconButton
            size="small"
            onClick={onClose}
            className="!absolute !top-3 !right-3 text-muted hover:text-black"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}

        {/* Warning Icon Badge */}
        <div className="w-12 h-12 rounded-sm bg-destructive-bg text-destructive flex items-center justify-center mb-3">
          <DeleteForeverOutlinedIcon sx={{ fontSize: 28 }} />
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-black tracking-tight mb-1">
          {title}
        </h3>
        
        <p className="text-sm text-muted leading-relaxed max-w-xs mb-3">
          {message}
        </p>

        {/* Item Highlight Chip */}
        {itemName && (
          <div className="inline-flex items-center gap-1.5 bg-slate-100 text-black font-semibold text-sm px-3 py-1.5 rounded-sm border border-border mb-4">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            <span className="truncate max-w-[200px]">{itemName}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            size="md"
            className="w-full"
          >
            {cancelText}
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            size="md"
            className="w-full"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
