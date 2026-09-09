import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface ReportFiltersProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  children,
  title = "Filters",
  className = "",
}) => {
  return (
    <Box
      className={`flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 ${className}`}
    >
      {title && (
        <Typography variant="subtitle2" className="text-gray-700 font-semibold">
          {title}
        </Typography>
      )}
      <Box className="flex flex-wrap items-center gap-4">{children}</Box>
    </Box>
  );
};

export default ReportFilters;
