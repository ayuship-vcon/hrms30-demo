import React from 'react';
import { Button } from '@/shared/components';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export interface LeaveRequestActionsProps {
  onApprove: () => void;
  onReject: () => void;
  isLoading?: boolean;
}

export const LeaveRequestActions: React.FC<LeaveRequestActionsProps> = ({
  onApprove,
  onReject,
  isLoading = false,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={onApprove}
        isLoading={isLoading}
        leftIcon={<CheckIcon fontSize="small" />}
      >
        Approve
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={onReject}
        isLoading={isLoading}
        leftIcon={<CloseIcon fontSize="small" />}
      >
        Reject
      </Button>
    </div>
  );
};
