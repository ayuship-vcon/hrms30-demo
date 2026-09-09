// src/components/report/ReportTable.tsx
import React from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, LinearProgress, Typography } from "@mui/material";

// We use a generic type T that extends GridValidRowModel
// to ensure the data passed always satisfies DataGrid's requirement (having an 'id' property).
interface ReportTableProps<T extends GridValidRowModel> {
  data: T[];
  columns: GridColDef<T>[];
  loading?: boolean;
  onRowClick?: GridEventListener<"rowClick">;
  emptyMessage?: string;
}

export default function ReportTable<T extends GridValidRowModel>({
  data,
  columns,
  loading = false,
  onRowClick,
  emptyMessage = "No records found.",
}: ReportTableProps<T>) {
  return (
    <Box className="w-full h-[600px] bg-white rounded-lg">
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        onRowClick={onRowClick}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: () => (
            <Box className="flex items-center justify-center h-full">
              <Typography className="text-gray-500">{emptyMessage}</Typography>
            </Box>
          ),
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick
        className="border-none"
        // Tailwind classes can be passed to sx for deeper MUI slot customization if needed
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f9fafb", // Tailwind gray-50
            borderBottom: "1px solid #e5e7eb", // Tailwind gray-200
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
}
