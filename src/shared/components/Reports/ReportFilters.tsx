import React from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

/* ----------------------------------
 * Types
 * ---------------------------------- */

type FilterType = "text" | "number" | "date" | "select";

interface OperatorOption {
  label: string;
  value: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface ColumnFilter {
  type?: FilterType;
  operators?: string[];
  options?: FilterOption[];
}

export interface ReportColumn {
  field: string;
  headerName: string;
  filter?: ColumnFilter;
  [key: string]: unknown;
}

export interface ReportFilter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface ReportFiltersProps {
  columns?: ReportColumn[];
  value?: ReportFilter[];
  onChange: (filters: ReportFilter[]) => void;
}

/* ----------------------------------
 * Default Operators
 * ---------------------------------- */

const DEFAULT_OPERATORS: Record<FilterType, OperatorOption[]> = {
  text: [
    {
      label: "Contains",
      value: "contains",
    },
    {
      label: "Equals",
      value: "equals",
    },
  ],

  number: [
    {
      label: "Equals",
      value: "equals",
    },
  ],

  date: [
    {
      label: "Is",
      value: "equals",
    },
  ],

  select: [
    {
      label: "Is",
      value: "equals",
    },
    {
      label: "Is not",
      value: "notEquals",
    },
  ],
};

/* ----------------------------------
 * Create Filter
 * ---------------------------------- */

const createFilter = (): ReportFilter => ({
  id: crypto.randomUUID(),
  field: "",
  operator: "",
  value: "",
});

/* ----------------------------------
 * Component
 * ---------------------------------- */

export default function ReportFilters({
  columns = [],
  value = [],
  onChange,
}: ReportFiltersProps) {
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLElement | null>(null);

  const [draftFilters, setDraftFilters] =
    React.useState<ReportFilter[]>(value);

  const open = Boolean(anchorEl);

  const filterableColumns = React.useMemo(
    () =>
      columns.filter(
        (column) => column.filter,
      ),
    [columns],
  );

  const selectedFields = React.useMemo(
    () =>
      new Set(
        draftFilters
          .map((filter) => filter.field)
          .filter(Boolean),
      ),
    [draftFilters],
  );

  /* ----------------------------------
   * Open / Close
   * ---------------------------------- */

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setDraftFilters(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /* ----------------------------------
   * Add Filter
   * ---------------------------------- */

  const handleAddFilter = () => {
    const availableColumn = filterableColumns.find(
      (column) =>
        !selectedFields.has(column.field),
    );

    if (!availableColumn) {
      return;
    }

    const filterType =
      availableColumn.filter?.type || "text";

    const operators =
      availableColumn.filter?.operators?.length
        ? availableColumn.filter.operators
        : DEFAULT_OPERATORS[filterType].map(
            (operator) => operator.value,
          );

    setDraftFilters((current) => [
      ...current,
      {
        ...createFilter(),
        field: availableColumn.field,
        operator:
          operators?.[0] || "equals",
      },
    ]);
  };

  /* ----------------------------------
   * Remove Filter
   * ---------------------------------- */

  const handleRemoveFilter = (id: string) => {
    setDraftFilters((current) =>
      current.filter(
        (filter) => filter.id !== id,
      ),
    );
  };

  /* ----------------------------------
   * Field Change
   * ---------------------------------- */

  const handleFieldChange = (
    id: string,
    field: string,
  ) => {
    const column = filterableColumns.find(
      (item) => item.field === field,
    );

    const filterType =
      column?.filter?.type || "text";

    const operators =
      column?.filter?.operators?.length
        ? column.filter.operators
        : DEFAULT_OPERATORS[filterType].map(
            (operator) => operator.value,
          );

    setDraftFilters((current) =>
      current.map((filter) =>
        filter.id === id
          ? {
              ...filter,
              field,
              operator:
                operators?.[0] || "equals",
              value: "",
            }
          : filter,
      ),
    );
  };

  /* ----------------------------------
   * Value Change
   * ---------------------------------- */

  const handleValueChange = (
    id: string,
    key: "operator" | "value",
    value: string,
  ) => {
    setDraftFilters((current) =>
      current.map((filter) =>
        filter.id === id
          ? {
              ...filter,
              [key]: value,
            }
          : filter,
      ),
    );
  };

  /* ----------------------------------
   * Clear
   * ---------------------------------- */

  const handleClear = () => {
    setDraftFilters([]);
    onChange([]);
    handleClose();
  };

  /* ----------------------------------
   * Apply
   * ---------------------------------- */

  const handleApply = () => {
    const validFilters =
      draftFilters.filter(
        (filter) =>
          filter.field &&
          filter.operator &&
          filter.value !== "",
      );

    onChange(validFilters);
    handleClose();
  };

  /* ----------------------------------
   * Helpers
   * ---------------------------------- */

  const getColumn = (field: string) =>
    filterableColumns.find(
      (column) =>
        column.field === field,
    );

  const getOperators = (
    column?: ReportColumn,
  ): OperatorOption[] => {
    const type =
      column?.filter?.type || "text";

    return (
      column?.filter?.operators?.map(
        (operator) => {
          const defaultOperator =
            DEFAULT_OPERATORS[type]?.find(
              (item) =>
                item.value === operator,
            );

          return (
            defaultOperator || {
              label: operator,
              value: operator,
            }
          );
        },
      ) ||
      DEFAULT_OPERATORS[type] ||
      DEFAULT_OPERATORS.text
    );
  };

  const filterCount = value.length;

  const canAddFilter =
    draftFilters.length <
    filterableColumns.length;

  return (
    <>
      <Button
        variant="outlined"
        startIcon={
          <FilterAltOutlinedIcon />
        }
        onClick={handleOpen}
        sx={{
          height: 42,
          px: 1.75,
          textTransform: "none",
          borderRadius: 2,
          borderColor: "#D9DEE7",
          color: "#344054",
          fontWeight: 500,

          "&:hover": {
            borderColor: "#98A2B3",
            backgroundColor: "#F9FAFB",
          },
        }}
      >
        Filters

        {filterCount > 0 && (
          <Box
            component="span"
            sx={{
              ml: 1,
              minWidth: 22,
              height: 22,
              px: 0.75,
              borderRadius: 10,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EEF2FF",
              color: "#4338CA",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {filterCount}
          </Box>
        )}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 760,
              maxWidth:
                "calc(100vw - 32px)",
              borderRadius: 3,
              border:
                "1px solid #E4E7EC",
              boxShadow:
                "0px 12px 32px rgba(16, 24, 40, 0.12)",
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Header */}

        <Box sx={{ p: 2.25 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#101828",
                }}
              >
                Filter report
              </Typography>

              <Typography
                sx={{
                  mt: 0.35,
                  fontSize: 13,
                  color: "#667085",
                }}
              >
                Filter using any column in
                this report.
              </Typography>
            </Box>

            {draftFilters.length > 0 && (
              <Button
                size="small"
                onClick={() =>
                  setDraftFilters([])
                }
                sx={{
                  textTransform: "none",
                  color: "#667085",
                }}
              >
                Clear all
              </Button>
            )}
          </Stack>
        </Box>

        <Divider />

        {/* Filters */}

        <Box
          sx={{
            p: 2.25,
            maxHeight: 430,
            overflowY: "auto",
          }}
        >
          {draftFilters.length === 0 ? (
            <Box
              sx={{
                py: 5,
                textAlign: "center",
              }}
            >
              <FilterAltOutlinedIcon
                sx={{
                  fontSize: 36,
                  color: "#98A2B3",
                  mb: 1,
                }}
              />

              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#344054",
                }}
              >
                No filters added
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12,
                  color: "#667085",
                }}
              >
                Add a filter to narrow
                down your report.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1.5}>
              {draftFilters.map(
                (filter, index) => {
                  const column =
                    getColumn(
                      filter.field,
                    );

                  const type =
                    column?.filter?.type ||
                    "text";

                  const operators =
                    getOperators(column);

                  return (
                    <Box
                      key={filter.id}
                      sx={{
                        p: 1.5,
                        border:
                          "1px solid #EAECF0",
                        borderRadius: 2,
                        backgroundColor:
                          "#FCFCFD",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <Typography
                          sx={{
                            width: 60,
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#98A2B3",
                            textTransform:
                              "uppercase",
                          }}
                        >
                          Filter{" "}
                          {index + 1}
                        </Typography>

                        {/* Column */}

                        <Select
                          size="small"
                          value={
                            filter.field
                          }
                          onChange={(event) =>
                            handleFieldChange(
                              filter.id,
                              event.target
                                .value,
                            )
                          }
                          sx={{
                            width: 190,
                            backgroundColor:
                              "#fff",
                          }}
                        >
                          {filterableColumns.map(
                            (column) => {
                              const alreadyUsed =
                                selectedFields.has(
                                  column.field,
                                );

                              const currentField =
                                filter.field ===
                                column.field;

                              return (
                                <MenuItem
                                  key={
                                    column.field
                                  }
                                  value={
                                    column.field
                                  }
                                  disabled={
                                    alreadyUsed &&
                                    !currentField
                                  }
                                >
                                  {
                                    column.headerName
                                  }
                                </MenuItem>
                              );
                            },
                          )}
                        </Select>

                        {/* Operator */}

                        <Select
                          size="small"
                          value={
                            filter.operator
                          }
                          onChange={(event) =>
                            handleValueChange(
                              filter.id,
                              "operator",
                              event.target
                                .value,
                            )
                          }
                          sx={{
                            width: 150,
                            backgroundColor:
                              "#fff",
                          }}
                        >
                          {operators.map(
                            (operator) => (
                              <MenuItem
                                key={
                                  operator.value
                                }
                                value={
                                  operator.value
                                }
                              >
                                {
                                  operator.label
                                }
                              </MenuItem>
                            ),
                          )}
                        </Select>

                        {/* Value */}

                        {type ===
                        "select" ? (
                          <Select
                            size="small"
                            fullWidth
                            displayEmpty
                            value={
                              filter.value
                            }
                            onChange={(event) =>
                              handleValueChange(
                                filter.id,
                                "value",
                                event.target
                                  .value,
                              )
                            }
                            sx={{
                              backgroundColor:
                                "#fff",
                            }}
                          >
                            <MenuItem
                              value=""
                              disabled
                            >
                              Select value
                            </MenuItem>

                            {column?.filter?.options?.map(
                              (option) => (
                                <MenuItem
                                  key={
                                    option.value
                                  }
                                  value={
                                    option.value
                                  }
                                >
                                  {
                                    option.label
                                  }
                                </MenuItem>
                              ),
                            )}
                          </Select>
                        ) : (
                          <TextField
                            size="small"
                            fullWidth
                            type={
                              type === "date"
                                ? "date"
                                : type ===
                                    "number"
                                  ? "number"
                                  : "text"
                            }
                            placeholder={
                              type === "date"
                                ? ""
                                : "Enter value"
                            }
                            value={
                              filter.value
                            }
                            onChange={(event) =>
                              handleValueChange(
                                filter.id,
                                "value",
                                event.target
                                  .value,
                              )
                            }
                            slotProps={{
                              inputLabel: {
                                shrink:
                                  type ===
                                  "date",
                              },
                            }}
                            sx={{
                              backgroundColor:
                                "#fff",
                            }}
                          />
                        )}

                        <IconButton
                          size="small"
                          onClick={() =>
                            handleRemoveFilter(
                              filter.id,
                            )
                          }
                          sx={{
                            color: "#98A2B3",

                            "&:hover": {
                              color: "#D92D20",
                              backgroundColor:
                                "#FEF3F2",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>
                  );
                },
              )}
            </Stack>
          )}

          {/* Add Filter */}

          {canAddFilter && (
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddFilter}
              sx={{
                mt: 2,
                textTransform: "none",
                fontWeight: 600,
                color: "#0563D9",
              }}
            >
              Add filter
            </Button>
          )}
        </Box>

        <Divider />

        {/* Footer */}

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1}
          sx={{ p: 1.75 }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              borderColor: "#D0D5DD",
              color: "#344054",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleApply}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              boxShadow: "none",
              backgroundColor: "#0563D9",

              "&:hover": {
                backgroundColor: "#0454B8",
                boxShadow: "none",
              },
            }}
          >
            Apply filters
          </Button>
        </Stack>
      </Popover>
    </>
  );
}
