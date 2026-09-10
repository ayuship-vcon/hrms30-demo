import React from "react";

import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";

interface ReportColumn {
  field: string;
  headerName: string;
  sticky?: boolean;
}

interface ReportColumnSelectorProps {
  columns?: ReportColumn[];
  visibleColumns?: Record<string, boolean>;
  onChange: (visibleColumns: Record<string, boolean>) => void;
}

export default function ReportColumnSelector({
  columns = [],
  visibleColumns = {},
  onChange,
}: ReportColumnSelectorProps) {
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (column: ReportColumn) => {
    console.log(
      visibleColumns,
      column,
      "visibleColumnsvisibleColumns",
    );

    if (column.sticky) {
      return;
    }

    onChange({
      ...visibleColumns,

      [column.field]:
        visibleColumns[column.field] === false,
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ViewColumnOutlinedIcon />}
        onClick={handleOpen}
        sx={{
          height: 42,
          px: 2,
          borderRadius: "8px",

          textTransform: "none",

          fontWeight: 600,

          color: "#172554",

          borderColor: "#D7DFEA",

          "&:hover": {
            bgcolor: "#F8FAFC",
            borderColor: "#B9C5D4",
          },
        }}
      >
        Columns
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            width: 240,
            maxHeight: 420,

            borderRadius: "10px",

            border:
              "1px solid #E5EAF1",

            boxShadow:
              "0 10px 35px rgba(15, 23, 42, 0.10)",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            pt: 1.5,
            pb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "#172554",
            }}
          >
            Select columns
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: 12,
              color: "#64748B",
            }}
          >
            Choose columns to display
          </Typography>
        </Box>

        {columns.map((column) => {
          const checked =
            visibleColumns[column.field] !== false;

          return (
            <MenuItem
              key={column.field}
              disabled={column.sticky}
              onClick={() =>
                handleToggle(column)
              }
              sx={{
                minHeight: 42,

                "&.Mui-disabled": {
                  opacity: 0.65,
                },
              }}
            >
              <Checkbox
                size="small"
                checked={checked}
                disabled={column.sticky}
                sx={{
                  py: 0,
                }}
              />

              <ListItemText
                primary={column.headerName}
                secondary={
                  column.sticky
                    ? "Pinned"
                    : undefined
                }
                primaryTypographyProps={{
                  fontSize: 13,
                }}
                secondaryTypographyProps={{
                  fontSize: 11,
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
