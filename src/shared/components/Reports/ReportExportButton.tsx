import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

interface ReportColumn<RowType = Record<string, unknown>> {
  field: string;
  headerName?: string;
  exportable?: boolean;
  valueGetter?: (row: RowType) => unknown;
}

interface ReportExportButtonProps<RowType = Record<string, unknown>> {
  rows: RowType[];
  columns: ReportColumn<RowType>[];
  fileName?: string;
}

export default function ReportExportButton<
  RowType extends Record<string, unknown>,
>({
  rows,
  columns,
  fileName = "report",
}: ReportExportButtonProps<RowType>) {
  const handleExport = () => {
    const exportColumns = columns.filter(
      (column) => column.exportable !== false,
    );

    const headers = exportColumns.map(
      (column) => column.headerName,
    );

    const data = rows.map((row) =>
      exportColumns.map((column) => {
        const value =
          column.valueGetter?.(row) ??
          row[column.field] ??
          "";

        return `"${String(value).replace(/"/g, '""')}"`;
      }),
    );

    const csv = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${fileName}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="contained"
      startIcon={<FileDownloadOutlinedIcon />}
      onClick={handleExport}
      sx={{
        height: 42,
        px: 2.25,
        textTransform: "none",
        borderRadius: "8px",
        bgcolor: "#073B75",
        boxShadow: "none",

        "&:hover": {
          bgcolor: "#052E5C",
          boxShadow: "none",
        },
      }}
    >
      Export Excel
    </Button>
  );
}
