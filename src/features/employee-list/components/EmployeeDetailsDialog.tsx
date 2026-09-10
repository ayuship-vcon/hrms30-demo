// src/features/employee/components/EmployeeDetailsDialog.tsx

import React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

import { EmployeeRecord } from "../core/types/employee.types";

interface EmployeeDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  record?: EmployeeRecord | null;
}

interface DetailItemProps {
  label: string;
  value?: React.ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 13,
          color: "#64748B",
          mb: 0.7,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: "#172554",
        }}
      >
        {value || "-"}
      </Typography>
    </Box>
  );
};

export const EmployeeDetailsDialog: React.FC<
  EmployeeDetailsDialogProps
> = ({
  open,
  onClose,
  record,
}) => {
  if (!record) return null;

  const statusColor =
    record.status === "Active"
      ? "success"
      : record.status === "InActive"
        ? "error"
        : record.status === "Pending"
          ? "warning"
          : "default";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2.5,
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          px: 3.5,
          py: 2.5,
          borderBottom: "1px solid #E5EAF1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 700,
                color: "#172554",
              }}
            >
              Employee Details
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#64748B",
                mt: 0.5,
              }}
            >
              {record.employeeId}
            </Typography>
          </Box>

          <Chip
            label={record.status || "-"}
            color={statusColor}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 10,
            }}
          />
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3.5,
          py: 0,
        }}
      >
        {/* Employee Information */}
        <Box sx={{ py: 3 }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "#172554",
              mb: 2.5,
            }}
          >
            Employee Information
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              columnGap: 6,
              rowGap: 3,
            }}
          >
            <DetailItem
              label="Employee ID"
              value={record.employeeId}
            />

            <DetailItem
              label="Employee Name"
              value={record.name}
            />

            <DetailItem
              label="Status"
              value={record.status}
            />
          </Box>
        </Box>

        <Divider />

        {/* Work Information */}
        <Box sx={{ py: 3 }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "#172554",
              mb: 2.5,
            }}
          >
            Work Information
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              columnGap: 6,
              rowGap: 3,
            }}
          >
            <DetailItem
              label="Designation"
              value={record.designation}
            />

            <DetailItem
              label="Team"
              value={record.teamName}
            />

            <DetailItem
              label="Office Location"
              value={record.officeLocation}
            />
          </Box>
        </Box>

        <Divider />

        {/* Contact Information */}
        <Box sx={{ py: 3 }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "#172554",
              mb: 2.5,
            }}
          >
            Contact Information
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              columnGap: 6,
              rowGap: 3,
            }}
          >
            <DetailItem
              label="Email"
              value={record.emailId}
            />
          </Box>
        </Box>
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{
          px: 3.5,
          py: 2,
          borderTop: "1px solid #E5EAF1",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            minWidth: 90,
            height: 42,
            px: 2.5,
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;