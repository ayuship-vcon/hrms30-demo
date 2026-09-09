import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface ReportExportButtonProps {
  onExport: () => void | Promise<void>;
  isLoading?: boolean;
  label?: string;
  disabled?: boolean;
}

export const ReportExportButton: React.FC<ReportExportButtonProps> = ({
  onExport,
  isLoading = false,
  label = "Export",
  disabled = false,
}) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={onExport}
      disabled={disabled || isLoading}
      startIcon={
        isLoading ? (
          <CircularProgress size={16} />
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        )
      }
      className="bg-white"
    >
      {label}
    </Button>
  );
};

export default ReportExportButton;
