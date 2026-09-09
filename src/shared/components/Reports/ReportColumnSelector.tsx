import React, { useState } from "react";
import { Button, Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

interface ReportColumnSelectorProps {
  columns: GridColDef[];
  visibleColumns: string[];
  onToggleColumn: (field: string) => void;
}

export const ReportColumnSelector: React.FC<ReportColumnSelectorProps> = ({
  columns,
  visibleColumns,
  onToggleColumn,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        className="bg-white"
        startIcon={
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
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
        }
      >
        Columns
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {columns.map((col) => (
          <MenuItem key={col.field} onClick={() => onToggleColumn(col.field)}>
            <Checkbox
              checked={visibleColumns.includes(col.field)}
              size="small"
            />
            <ListItemText primary={col.headerName || col.field} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ReportColumnSelector;
