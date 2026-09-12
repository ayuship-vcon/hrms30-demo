import React from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowId,
} from "@mui/x-data-grid";

const DEFAULT_WIDTH = 180;

interface ReportColumn<RowType = Record<string, unknown>>
  extends Omit<GridColDef, "renderCell" | "valueGetter"> {
  sticky?: boolean;
  renderCell?: (params: {
    row: RowType;
    value: unknown;
    field: string;
  }) => React.ReactNode;
  valueGetter?: (row: RowType) => unknown;
}

interface ReportTableProps<RowType extends Record<string, unknown>> {
  columns: ReportColumn<RowType>[];
  rows: RowType[];
  rowId?: keyof RowType | ((row: RowType) => GridRowId);
  onRowClick?: (params: GridRowParams<RowType>) => void;
}

export default function ReportTable<
  RowType extends Record<string, unknown>,
>({
  columns,
  rows,
  rowId = "id" as keyof RowType,
  onRowClick,
}: ReportTableProps<RowType>) {

  const gridColumns = React.useMemo<GridColDef<RowType>[]>(
    () =>
      columns.map((column) => ({
        ...column,
        width: column.width || DEFAULT_WIDTH,
        minWidth: column.width || DEFAULT_WIDTH,
        flex: undefined,

        pinnable: column.sticky === true,

        renderCell: column.renderCell
          ? (params) =>
              column.renderCell?.({
                row: params.row,
                value: params.value,
                field: params.field,
              })
          : undefined,

        // Keep your existing valueGetter working
        valueGetter: column.valueGetter
          ? (_value, row) =>
              column.valueGetter?.(row)
          : undefined,
      })),
    [columns],
  );

  const getRowId = React.useCallback(
    (row: RowType): GridRowId =>
      typeof rowId === "function"
        ? rowId(row)
        : (row[rowId] as GridRowId),
    [rowId],
  );

  const pinnedColumns = React.useMemo(
    () => ({
      left: columns
        .filter((column) => column.sticky)
        .map((column) => column.field),
    }),
    [columns],
  );

  return (
    <Box
      sx={{
        width: "100%",

        "& .MuiDataGrid-root": {
          border: 0,
          margin: 2,
        },

        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#F8FAFC",
          minHeight: 62,
          maxHeight: 62,
        },

        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#F8FAFC",
          color: "#172554",
          fontWeight: 700,
          fontSize: 14,
        },

        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 700,
        },

        "& .MuiDataGrid-cell": {
          height: 72,
          minHeight: 72,
          maxHeight: 72,
          fontSize: 14,
          borderBottom: "1px solid #EDF1F5",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },

        "& .MuiDataGrid-row": {
          minHeight: 72,
          maxHeight: 72,
        },

        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#F8FAFC",
        },

        "& .MuiDataGrid-pinnedColumns": {
          backgroundColor: "#FFFFFF",
        },

        "& .MuiDataGrid-pinnedColumnHeaders": {
          backgroundColor: "#F8FAFC",
        },

        "& .MuiDataGrid-footerContainer": {
          display: "none",
        },

        "& .MuiDataGrid-virtualScroller": {
          overflowX: "auto",
        },

        "& .MuiDataGrid-scrollbar--horizontal": {
          height: 7,
        },

        "& .MuiDataGrid-scrollbar--horizontal::-webkit-scrollbar": {
          height: 7,
        },

        "& .MuiDataGrid-scrollbar--horizontal::-webkit-scrollbar-thumb": {
          backgroundColor: "#CBD5E1",
          borderRadius: 20,
        },
      }}
    >
      <DataGrid<RowType>
        rows={rows}
        columns={gridColumns}
        getRowId={getRowId}
        pinnedColumns={pinnedColumns}
        disableRowSelectionOnClick
        disableColumnMenu={false}
        disableColumnResize={false}
        hideFooter
        rowHeight={72}
        columnHeaderHeight={62}
        onRowClick={onRowClick}
        autoHeight
      />
    </Box>
  );
}
