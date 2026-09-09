import React, { useState, createContext, useContext, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ConfirmDialog } from './ConfirmDialog';

export interface ModalContextType {
  setHasUnsavedChanges: (dirty: boolean) => void;
  requestClose: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => useContext(ModalContext);

/**
 * Hook to automatically register form dirty state with parent Modal without re-render loops
 */
export const useFormDirtyGuard = (isDirty: boolean) => {
  const modal = useModal();
  const setHasUnsavedChanges = modal?.setHasUnsavedChanges;

  useEffect(() => {
    if (setHasUnsavedChanges) {
      setHasUnsavedChanges(isDirty);
    }
  }, [isDirty, setHasUnsavedChanges]);
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hasUnsavedChanges?: boolean;
  confirmTitle?: string;
  confirmMessage?: string;
}

/**
 * Universal MUI Modal Dialog Component
 * Intercepts top-right 'X' close button and backdrop clicks when there are unsaved changes.
 * Guaranteed 100% stable context references with 0% re-render loop possibility.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'sm',
  hasUnsavedChanges: controlledUnsavedChanges,
  confirmTitle = 'Discard Unsaved Changes?',
  confirmMessage = 'You have unsaved changes in this form. If you close now, your progress will be lost. Are you sure you want to discard?',
}) => {
  const isDirtyRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (controlledUnsavedChanges !== undefined) {
      isDirtyRef.current = controlledUnsavedChanges;
    }
  }, [controlledUnsavedChanges]);

  useEffect(() => {
    if (!isOpen) {
      isDirtyRef.current = false;
      setShowDiscardConfirm(false);
    }
  }, [isOpen]);

  const setHasUnsavedChanges = useCallback((dirty: boolean) => {
    isDirtyRef.current = dirty;
  }, []);

  const handleCloseRequest = useCallback(() => {
    if (isDirtyRef.current) {
      setShowDiscardConfirm(true);
    } else {
      onCloseRef.current();
    }
  }, []);

  const handleConfirmDiscard = useCallback(() => {
    setShowDiscardConfirm(false);
    isDirtyRef.current = false;
    onCloseRef.current();
  }, []);

  const contextValue = useMemo(
    () => ({
      setHasUnsavedChanges,
      requestClose: handleCloseRequest,
    }),
    [setHasUnsavedChanges, handleCloseRequest]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      <Dialog
        open={isOpen}
        onClose={handleCloseRequest}
        fullWidth
        maxWidth={maxWidth}
        PaperProps={{
          className: 'rounded-sm shadow-card border border-border overflow-hidden',
          sx: { borderRadius: '8px' },
        }}
      >
        {title && (
          <DialogTitle className="flex justify-between items-center px-5 py-3.5 border-b border-border bg-surface">
            <span className="text-base font-bold text-black tracking-tight">{title}</span>
            <IconButton
              size="small"
              onClick={handleCloseRequest}
              className="text-muted hover:text-black hover:bg-slate-100 -mr-1"
              aria-label="Close dialog"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
        )}
        <DialogContent className="!p-5 bg-surface overflow-y-auto">
          <div className="pt-1">{children}</div>
        </DialogContent>
        {footer && (
          <DialogActions className="px-5 py-3 border-t border-border bg-slate-50/50 flex justify-end items-center gap-3">
            {footer}
          </DialogActions>
        )}
      </Dialog>

      {/* Discard Confirmation Dialog on 'X' Close or Backdrop Click */}
      <ConfirmDialog
        isOpen={showDiscardConfirm}
        onClose={() => setShowDiscardConfirm(false)}
        onConfirm={handleConfirmDiscard}
        title={confirmTitle}
        message={confirmMessage}
        confirmLabel="Discard Changes"
        cancelLabel="Keep Editing"
        isDangerous={true}
      />
    </ModalContext.Provider>
  );
};
