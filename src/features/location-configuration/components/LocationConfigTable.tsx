import { useMemo, useState } from "react";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridCsvExportOptions,
  useGridApiContext,
} from "@mui/x-data-grid";

import type {
  LocationModuleConfig,
  LocationRecord,
} from "../core/types";

import { StatusChip } from "./StatusChip";

interface LocationConfigTableProps {
  config: LocationModuleConfig;
  rows: LocationRecord[];
  onEdit: (record: LocationRecord) => void;
  onDelete: (record: LocationRecord) => void;
  onRefresh?: () => void;
}

type StatusFilter = "all" | "active" | "inactive";

export const LocationConfigTable = ({
  config,
  rows,
  onEdit,
  onDelete,
  onRefresh,
}: LocationConfigTableProps) => {
  const Icon = config.icon;

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLElement | null>(null);

  const filteredRows = useMemo(() => {
    if (statusFilter === "active") {
      return rows.filter((row) => row.active);
    }

    if (statusFilter === "inactive") {
      return rows.filter((row) => !row.active);
    }

    return rows;
  }, [rows, statusFilter]);

  const columns = useMemo<GridColDef<LocationRecord>[]>(() => {
    const dynamicColumns: GridColDef<LocationRecord>[] =
      config.columns.map((column) => ({
        field: column.field,
        headerName: column.label,
        flex: 1,
        minWidth: 160,
        sortable: true,

        renderCell:
          column.type === "status"
            ? (params) => (
                <StatusChip
                  active={Boolean(params.row.active)}
                />
              )
            : undefined,
      }));

    const actionsColumn: GridColDef<LocationRecord> = {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,

      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => onEdit(params.row)}
              sx={{
                bgcolor: "#EFF6FF",
                color: "#1261C9",
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => onDelete(params.row)}
              sx={{
                bgcolor: "#FFF1F2",
                color: "#E11D48",
              }}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    };

    return [
      {
        field: "id",
        headerName: "#",
        width: 70,
        sortable: false,
        filterable: false,
      },
      ...dynamicColumns,
      actionsColumn,
    ];
  }, [
    config.columns,
    onDelete,
    onEdit,
  ]);

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: 570,
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E6EDF7",
        boxShadow:
          "0px 8px 32px rgba(24, 73, 125, 0.06)",
      }}
    >
      <Box sx={{ p: 3, pb: 2 }}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                display: "grid",
                placeItems: "center",
                borderRadius: 3,
                bgcolor: "#E7F0FF",
                color: "#1261C9",
              }}
            >
              <Icon />
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                color="#102044"
              >
                {config.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {config.description}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
          >
            <SummaryBox
              label="Total"
              value={rows.length}
              bg="#F3F7FC"
              color="#102044"
            />

            <SummaryBox
              label="Active"
              value={
                rows.filter((row) => row.active).length
              }
              bg="#ECFDF3"
              color="#15803D"
            />

            <SummaryBox
              label="Inactive"
              value={
                rows.filter((row) => !row.active).length
              }
              bg="#FEF2F2"
              color="#DC2626"
            />
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ px: 3, pb: 3 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          slots={{
            toolbar: () => (
              <CustomToolbar
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                filterAnchorEl={filterAnchorEl}
                setFilterAnchorEl={setFilterAnchorEl}
                onRefresh={onRefresh}
              />
            ),
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              color: "#102044",
              fontWeight: 700,
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-cell": {
              borderColor: "#EDF1F7",
              display: "flex",
              alignItems: "center",
            },

            "& .MuiDataGrid-row:hover": {
              bgcolor: "#F8FAFC",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #EDF1F7",
            },

            "& .MuiDataGrid-toolbarContainer": {
              px: 0,
              py: 0,
              mb: 2,
            },

            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

interface CustomToolbarProps {
  statusFilter: StatusFilter;

  onStatusFilterChange: (
    value: StatusFilter,
  ) => void;

  filterAnchorEl: HTMLElement | null;

  setFilterAnchorEl: (
    value: HTMLElement | null,
  ) => void;

  onRefresh?: () => void;
}

const CustomToolbar = ({
  statusFilter,
  onStatusFilterChange,
  filterAnchorEl,
  setFilterAnchorEl,
  onRefresh,
}: CustomToolbarProps) => {
  const apiRef = useGridApiContext();

  const handleExport = () => {
    const options: GridCsvExportOptions = {
      fileName: "location-configuration",
      utf8WithBom: true,
    };

    apiRef.current.exportDataAsCsv(options);
  };

  const openFilter = Boolean(filterAnchorEl);

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 1,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<FilterAltOutlinedIcon />}
        onClick={(event) =>
          setFilterAnchorEl(event.currentTarget)
        }
        sx={{
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        Filter
      </Button>

      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={handleExport}
        sx={{
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        Export
      </Button>

      <Popover
        open={openFilter}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            p: 2.5,
            minWidth: 260,
          }}
        >
          <Typography
            fontWeight={700}
            mb={1.5}
          >
            Filter
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Status
          </Typography>

          <Select
            fullWidth
            size="small"
            value={statusFilter}
            onChange={(event) =>
              onStatusFilterChange(
                event.target.value as StatusFilter,
              )
            }
            sx={{
              mt: 0.5,
            }}
          >
            <MenuItem value="all">
              All
            </MenuItem>

            <MenuItem value="active">
              Active
            </MenuItem>

            <MenuItem value="inactive">
              Inactive
            </MenuItem>
          </Select>
        </Box>
      </Popover>
    </GridToolbarContainer>
  );
};

interface SummaryBoxProps {
  label: string;
  value: number;
  bg: string;
  color: string;
}

const SummaryBox = ({
  label,
  value,
  bg,
  color,
}: SummaryBoxProps) => (
  <Box
    sx={{
      minWidth: 78,
      px: 2,
      py: 1,
      borderRadius: 2.5,
      bgcolor: bg,
    }}
  >
    <Typography
      variant="caption"
      color="text.secondary"
    >
      {label}
    </Typography>

    <Typography
      fontWeight={700}
      color={color}
    >
      {value}
    </Typography>
  </Box>
);