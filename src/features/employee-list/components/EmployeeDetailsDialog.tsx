// src/features/employee/components/EmployeeDetailsDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { EmployeeRecord } from "../core/types/employee.types";

interface EmployeeDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  record?: EmployeeRecord | null;
}

export const EmployeeDetailsDialog: React.FC<EmployeeDetailsDialogProps> = ({
  open,
  onClose,
  record,
}) => {
  if (!record) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="font-semibold">Employee Details</DialogTitle>
      <DialogContent dividers className="flex flex-col gap-3">
        <Typography>
          <strong>Name:</strong> {record.name} ({record.employeeId})
        </Typography>
        <Typography>
          <strong>Role:</strong> {record.designation} - {record.teamName}
        </Typography>
        <Typography>
          <strong>Location:</strong> {record.officeLocation}
        </Typography>
        <Typography>
          <strong>Email:</strong> {record.emailId}
        </Typography>
        <Typography>
          <strong>Status:</strong> {record.status}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          disableElevation
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
