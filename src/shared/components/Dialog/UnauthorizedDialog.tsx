import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button } from '../Button/Button';

export interface UnauthorizedDialogProps {
  isOpen: boolean;
  onLogout: () => void;
  onGoBack: () => void;
}

/**
 * Universal MUI Unauthorized Dialog (Zero inline CSS, exact 8px radius)
 */
export const UnauthorizedDialog: React.FC<UnauthorizedDialogProps> = ({
  isOpen,
  onLogout,
  onGoBack,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onGoBack}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: '8px' },
        className: 'overflow-hidden shadow-card border border-border',
      }}
    >
      <DialogContent className="!p-0 bg-surface">
        {/* Top colored banner */}
        <div className="bg-amber-50 border-b border-amber-100 px-5 py-4 flex flex-col items-center text-center gap-2.5">
          <div className="w-12 h-12 rounded-sm bg-amber-100 flex items-center justify-center text-amber-700">
            <WarningAmberRoundedIcon sx={{ fontSize: 26 }} />
          </div>
          <div>
            <h2 className="text-base font-bold text-black tracking-tight">
              Unauthorized Access
            </h2>
            <p className="text-sm text-muted mt-0.5 leading-relaxed max-w-[260px]">
              You don't have permission to view this page with your current role.
            </p>
          </div>
        </div>

        {/* Body message */}
        <div className="px-5 py-4">
          <p className="text-sm sm:text-sm text-muted-foreground leading-relaxed text-center">
            Would you like to go back to your dashboard, or log out and sign in
            with a different account?
          </p>
        </div>
      </DialogContent>

      <DialogActions className="px-5 py-3.5 border-t border-border bg-slate-50/50 flex gap-3 !justify-between">
        <Button
          variant="outline"
          onClick={onGoBack}
          leftIcon={<ArrowBackRoundedIcon sx={{ fontSize: 16 }} />}
          size="md"
          className="flex-1"
        >
          Go Back
        </Button>

        <Button
          variant="danger"
          onClick={onLogout}
          leftIcon={<LogoutRoundedIcon sx={{ fontSize: 16 }} />}
          size="md"
          className="flex-1"
        >
          Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};
