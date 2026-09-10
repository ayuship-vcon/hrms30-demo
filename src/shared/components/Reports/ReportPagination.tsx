import {
  Box,
  TablePagination,
} from "@mui/material";

interface ReportPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (value: number) => void;
  rowsPerPageOptions?: number[];
}

export default function ReportPagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50],
}: ReportPaginationProps) {
  return (
    <Box
      sx={{
        borderTop: "1px solid #E5EAF1",
      }}
    >
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={(_, newPage) =>
          onPageChange(newPage)
        }
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(
            Number(e.target.value),
          )
        }
        labelDisplayedRows={({ from, to, count }) =>
          `Showing ${from}–${to} of ${count} entries`
        }
      />
    </Box>
  );
}
