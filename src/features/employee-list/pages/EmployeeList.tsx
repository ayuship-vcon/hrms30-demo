// src/features/employee/pages/EmployeeList.tsx
import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { ReportTable } from "@/shared/components/Reports"; 
import { employeeColumns } from "../components/employeeColumn"; 
import { EmployeeDetailsDialog } from "../components/EmployeeDetailsDialog";
import { useEmployeeList } from "../core/hooks/useEmployeeList";
import { EmployeeRecord } from "../core/types/employee.types";

export const EmployeeList: React.FC = () => {
  const { records, isLoading, isError } = useEmployeeList();
  const [selectedRecord, setSelectedRecord] = useState<EmployeeRecord | null>(
    null,
  );

  if (isError) {
    return <Typography color="error">Failed to load employee list.</Typography>;
  }

  return (
    <Box className="flex flex-col gap-6 p-6 w-full">
      <Typography variant="h5" className="font-semibold text-gray-900">
        Employee Directory
      </Typography>

      <Paper className="w-full shadow-sm rounded-lg overflow-hidden">
        <ReportTable
          data={records}
          columns={employeeColumns}
          loading={isLoading}
          onRowClick={(params) =>
            setSelectedRecord(params.row as EmployeeRecord)
          }
        />
      </Paper>

      <EmployeeDetailsDialog
        open={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        record={selectedRecord}
      />
    </Box>
  );
};

export default EmployeeList;
