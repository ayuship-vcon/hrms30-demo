// src/features/employee/pages/EmployeeList.tsx

import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
  ReportSearch,
  ReportFilters,
  ReportColumnSelector,
  ReportTable,
  ReportExportButton,
  ReportPagination,
} from "@/shared/components/Reports";

import { employeeColumns } from "../components/employeeColumn";
import { EmployeeDetailsDialog } from "../components/EmployeeDetailsDialog";
import { useEmployeeList } from "../core/hooks/useEmployeeList";
import { EmployeeRecord } from "../core/types/employee.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants";

export const EmployeeList: React.FC = () => {
  const { records, isLoading, isError } = useEmployeeList();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(0);

  const [selectedRecord, setSelectedRecord] =
    React.useState<EmployeeRecord | null>(null);

  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [visibleColumns, setVisibleColumns] = React.useState<
    Record<string, boolean>
  >(() =>
    employeeColumns.reduce<Record<string, boolean>>((acc, column) => {
      // Keep all columns available in the selector, but only show fields
      // populated by the employee-directory response by default.
      acc[column.field] = [
        "employeeId",
        "name",
        "dateOfJoining",
        "emailId",
        "status",
      ].includes(column.field);
      return acc;
    }, {}),
  );

  const displayedColumns = React.useMemo(
    () =>
      employeeColumns.filter(
        (column) => visibleColumns[column.field] !== false,
      ),
    [visibleColumns],
  );

  const rows = records ?? [];
  const totalCount = records?.length ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleFiltersChange = (newFilters: any[]) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleRowClick = (params: any) => {
    setSelectedRecord(params.row as EmployeeRecord);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedRecord(null);
  };

  const handleAddEmployee = () => {
    navigate(ROUTES.EMPLOYEE_LIST.ADD);
    // Open Add Employee modal/drawer here
    // setAddEmployeeOpen(true);
  };

  if (isError) {
    return <Typography color="error">Failed to load employee list.</Typography>;
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        mt: 3,
        minWidth: 0,
        backgroundColor: "#f8fafc69",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              Employee List
            </h1>
          </div>
          <p className="text-sm text-muted mt-1">
            View list of employees and their details. Use the search and filters to find specific employees.
          </p>
        </div>
      </div>
      <br></br>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E5EAF1",
          borderRadius: 3,
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Toolbar */}
        <Box sx={{ p: 2.5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{
              width: "100%",
              flexWrap: "wrap",
              rowGap: 2,
            }}
          >
            {/* LEFT SIDE */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.25}
              sx={{
                flexWrap: "wrap",
                rowGap: 1.25,
              }}
            >
              <ReportFilters
                columns={employeeColumns}
                value={filters}
                onChange={handleFiltersChange}
              />

              <ReportColumnSelector
                columns={employeeColumns}
                visibleColumns={visibleColumns}
                onChange={setVisibleColumns}
              />

              <ReportExportButton
                rows={rows}
                columns={displayedColumns}
                fileName="employee-list"
              />
            </Stack>

            {/* RIGHT SIDE */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddEmployee}
              sx={{
                height: 42,
                px: 2.5,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "#073B75",
                boxShadow: "none",
                whiteSpace: "nowrap",

                "&:hover": {
                  bgcolor: "#052E5C",
                  boxShadow: "none",
                },
              }}
            >
              Add Employee
            </Button>
          </Stack>
        </Box>

        <ReportTable
          columns={displayedColumns}
          rows={rows}
          loading={isLoading}
          onRowClick={handleRowClick}
        />

        <ReportPagination
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />

        <EmployeeDetailsDialog
          open={detailsOpen}
          record={selectedRecord}
          onClose={handleDetailsClose}
        />
      </Paper>
    </Box>
  );
};

export default EmployeeList;
