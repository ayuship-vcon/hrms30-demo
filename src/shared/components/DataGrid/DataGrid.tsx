import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Checkbox,
  TableSortLabel,
  Menu,
  MenuItem,
  Select,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import { EmptyState } from '../EmptyState';
import { Pagination } from '../Pagination';
import { Button } from '../Button/Button';

export interface ColumnDef<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  hideable?: boolean; // If false, column cannot be hidden (e.g. actions)
  defaultHidden?: boolean;
  render?: (item: T, index: number) => React.ReactNode;
}

export type Column<T> = ColumnDef<T>;

export interface TablePaginationConfig {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalRecords?: number;
  pageSize?: number;
  onPageSizeChange?: (newPageSize: number) => void;
  pageSizeOptions?: number[];
}

export interface DataGridProps<T> {
  columns: ColumnDef<T>[];
  data?: T[] | { items?: T[] } | null;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  headerVariant?: 'navy' | 'clean'; // 'navy' (Deep Navy #0b4668) or 'clean' (Light Slate)
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T, index: number) => string | number;
  
  // Plugins
  enableColumnVisibility?: boolean;
  pagination?: TablePaginationConfig;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  selectable?: boolean;
  selectedKeys?: (string | number)[];
  onSelectKey?: (key: string | number) => void;
  onSelectAll?: () => void;
}

export function DataGrid<T>({
  columns,
  data,
  isLoading = false,
  emptyTitle = 'No records found',
  emptyMessage = 'There are no items matching the current view or search filters.',
  headerVariant = 'navy',
  onRowClick,
  keyExtractor,
  enableColumnVisibility = true,
  pagination,
  sortBy: controlledSortBy,
  sortDirection: controlledSortDirection = 'asc',
  onSort: controlledOnSort,
  selectable = false,
  selectedKeys = [],
  onSelectKey,
  onSelectAll,
}: DataGridProps<T>) {
  // Normalize raw data
  const rawRows: T[] = Array.isArray(data)
    ? data
    : data && typeof data === 'object' && 'items' in data && Array.isArray((data as { items: T[] }).items)
    ? (data as { items: T[] }).items
    : [];

  // =========================================================================
  // 1. Column Visibility Plugin
  // =========================================================================
  const [hiddenColumnKeys, setHiddenColumnKeys] = useState<string[]>(() =>
    columns.filter((c) => c.defaultHidden).map((c) => c.key)
  );
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);

  const visibleColumns = useMemo(
    () => columns.filter((col) => !hiddenColumnKeys.includes(col.key)),
    [columns, hiddenColumnKeys]
  );

  const toggleColumnVisibility = (key: string) => {
    setHiddenColumnKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const resetColumnVisibility = () => {
    setHiddenColumnKeys(columns.filter((c) => c.defaultHidden).map((c) => c.key));
  };

  // =========================================================================
  // 2. Client-Side Sorting Plugin (if controlled sort is not provided)
  // =========================================================================
  const [internalSortBy, setInternalSortBy] = useState<string | undefined>(controlledSortBy);
  const [internalSortDirection, setInternalSortDirection] = useState<'asc' | 'desc'>(
    controlledSortDirection
  );

  const currentSortBy = controlledSortBy !== undefined ? controlledSortBy : internalSortBy;
  const currentSortDir =
    controlledSortBy !== undefined ? controlledSortDirection : internalSortDirection;

  const handleSort = (key: string) => {
    if (controlledOnSort) {
      controlledOnSort(key);
    } else {
      if (internalSortBy === key) {
        setInternalSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setInternalSortBy(key);
        setInternalSortDirection('asc');
      }
    }
  };

  const sortedRows = useMemo(() => {
    if (controlledOnSort || !currentSortBy) return rawRows;
    return [...rawRows].sort((a: T, b: T) => {
      const recordA = a as Record<string, unknown>;
      const recordB = b as Record<string, unknown>;
      const valA = recordA[currentSortBy];
      const valB = recordB[currentSortBy];
      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return currentSortDir === 'asc' ? valA - valB : valB - valA;
      }
      return currentSortDir === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [rawRows, currentSortBy, currentSortDir, controlledOnSort]);

  const rows = sortedRows;
  const isNavyHeader = headerVariant === 'navy';
  const allSelected =
    rows.length > 0 && rows.every((row, idx) => selectedKeys.includes(keyExtractor(row, idx)));
  const someSelected =
    rows.some((row, idx) => selectedKeys.includes(keyExtractor(row, idx))) && !allSelected;

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={8}
        className="bg-surface rounded-sm border border-border shadow-card"
      >
        <CircularProgress size={34} thickness={4} sx={{ color: '#0b4668', mb: 1.5 }} />
        <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Loading records...
        </Typography>
      </Box>
    );
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyMessage}
        className="shadow-card"
      />
    );
  }

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={1.5}>
      {/* Table Toolbar: Column Visibility Controls */}
      {enableColumnVisibility && (
        <Box display="flex" justifyContent="flex-end" alignItems="center" px={0.5}>
          <Button
            variant="outline"
            size="small"
            leftIcon={<ViewColumnOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={(e) => setColumnMenuAnchor(e.currentTarget)}
            sx={{ height: '32px', fontSize: '12px', px: 1.5 }}
          >
            Columns ({visibleColumns.length}/{columns.length})
          </Button>

          <Menu
            anchorEl={columnMenuAnchor}
            open={Boolean(columnMenuAnchor)}
            onClose={() => setColumnMenuAnchor(null)}
            PaperProps={{
              sx: {
                borderRadius: '8px',
                p: 1,
                minWidth: 220,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E2E8F0',
              },
            }}
          >
            <Box px={1.5} py={0.75} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '12px', color: '#0b4668' }}>
                TOGGLE COLUMNS
              </Typography>
              {hiddenColumnKeys.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetColumnVisibility}
                  leftIcon={<RestartAltIcon sx={{ fontSize: 13 }} />}
                  className="!text-[11px] !font-semibold !text-primary hover:!underline !h-6 !px-1.5"
                >
                  Reset
                </Button>
              )}
            </Box>
            <Divider sx={{ my: 0.5 }} />
            {columns.map((col) => {
              const isChecked = !hiddenColumnKeys.includes(col.key);
              const isDisabled = col.hideable === false;

              return (
                <MenuItem
                  key={col.key}
                  dense
                  disabled={isDisabled}
                  onClick={() => !isDisabled && toggleColumnVisibility(col.key)}
                  sx={{
                    borderRadius: '6px',
                    py: 0.75,
                    px: 1.25,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    '&:hover': {
                      backgroundColor: isDisabled ? 'transparent' : '#F0F7FA',
                    },
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={isChecked}
                    disabled={isDisabled}
                    sx={{
                      p: 0,
                      pointerEvents: 'none',
                      '&.Mui-checked': { color: '#0b4668' },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '13px',
                      fontWeight: isChecked ? 600 : 400,
                      color: isDisabled ? '#94A3B8' : isChecked ? '#0b4668' : '#334155',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      flex: 1,
                    }}
                  >
                    {col.header}
                  </Typography>
                  {isDisabled && (
                    <Typography variant="caption" sx={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, pointerEvents: 'none' }}>
                      LOCKED
                    </Typography>
                  )}
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      )}

      {/* Main Table Container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          overflowX: 'auto',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 4px 4px -1px rgba(12, 12, 13, 0.08), 0px 2px 4px -1px rgba(12, 12, 13, 0.04)',
        }}
      >
        <Table size="medium" sx={{ minWidth: '100%', borderCollapse: 'collapse' }}>
          <TableHead sx={{ backgroundColor: isNavyHeader ? '#0b4668' : '#F8FAFC' }}>
            <TableRow>
              {selectable && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    backgroundColor: isNavyHeader ? '#0b4668' : '#F8FAFC',
                    borderBottom: isNavyHeader ? 'none' : '1px solid #E2E8F0',
                  }}
                >
                  <Checkbox
                    size="small"
                    indeterminate={someSelected}
                    checked={allSelected}
                    onChange={onSelectAll}
                    sx={{
                      color: isNavyHeader ? '#bad9e6' : undefined,
                      '&.Mui-checked': { color: isNavyHeader ? '#FFFFFF' : '#0b4668' },
                      '&.MuiCheckbox-indeterminate': { color: isNavyHeader ? '#FFFFFF' : '#0b4668' },
                    }}
                  />
                </TableCell>
              )}

              {visibleColumns.map((col) => {
                const isSorted = currentSortBy === col.key;
                return (
                  <TableCell
                    key={col.key}
                    align={col.align || 'left'}
                    style={{ width: col.width }}
                    sx={{
                      fontWeight: 600,
                      fontSize: '12px',
                      py: 1.75,
                      px: 2,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: isNavyHeader ? '#FFFFFF' : '#45464D',
                      borderBottom: isNavyHeader ? 'none' : '1px solid #E2E8F0',
                      userSelect: 'none',
                    }}
                  >
                    {col.sortable !== false ? (
                      <TableSortLabel
                        active={isSorted}
                        direction={isSorted ? currentSortDir : 'asc'}
                        onClick={() => handleSort(col.key)}
                        sx={{
                          color: isNavyHeader ? '#FFFFFF !important' : undefined,
                          '& .MuiTableSortLabel-icon': {
                            color: isNavyHeader ? '#bad9e6 !important' : '#0b4668 !important',
                          },
                        }}
                      >
                        {col.header}
                      </TableSortLabel>
                    ) : (
                      col.header
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((item, idx) => {
              const rowKey = keyExtractor(item, idx);
              const isSelected = selectedKeys.includes(rowKey);

              return (
                <TableRow
                  key={rowKey}
                  hover
                  selected={isSelected}
                  onClick={() => onRowClick?.(item)}
                  sx={{
                    borderBottom: '1px solid #E2E8F0',
                    transition: 'background-color 0.15s ease',
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:hover': {
                      backgroundColor: '#F8FAFC !important',
                    },
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  {selectable && (
                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => onSelectKey?.(rowKey)}
                        sx={{
                          '&.Mui-checked': { color: '#0b4668' },
                        }}
                      />
                    </TableCell>
                  )}

                  {visibleColumns.map((col) => (
                    <TableCell
                      key={col.key}
                      align={col.align || 'left'}
                      sx={{
                        fontSize: '13.5px',
                        color: '#45464D',
                        py: 1.5,
                        px: 2,
                        borderBottom: 'none',
                        verticalAlign: 'middle',
                      }}
                    >
                      {col.render
                        ? col.render(item, idx)
                        : (item as Record<string, unknown>)[col.key] !== undefined
                        ? String((item as Record<string, unknown>)[col.key])
                        : '-'}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Rich Pagination & Page Size Selector Footer (Renders ONLY if pagination is provided) */}
      {pagination && (
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          gap={2}
          mt={1.5}
          px={1}
          py={1}
          className="bg-slate-50/70 border border-slate-200/80 rounded-sm"
        >
          {/* Left: Rich Records Badge & Page Size Controls */}
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            {/* Records Summary Pill */}
            {pagination.totalRecords !== undefined && (
              <Box
                display="inline-flex"
                alignItems="center"
                gap={1}
                px={1.5}
                py={0.6}
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#0b4668',
                  }}
                />
                <Typography variant="caption" sx={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                  Showing <strong className="text-black font-semibold">{rows.length}</strong> of{' '}
                  <strong className="text-black font-semibold">{pagination.totalRecords}</strong> items
                </Typography>
              </Box>
            )}

            {/* Rich Page Size Dropdown (Only when onPageSizeChange is provided) */}
            {pagination.onPageSizeChange && (
              <Box
                display="inline-flex"
                alignItems="center"
                gap={1.25}
                px={1.5}
                py={0.4}
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
              >
                <FormatListNumberedOutlinedIcon sx={{ fontSize: 16, color: '#0b4668' }} />
                <Typography variant="caption" sx={{ fontSize: '12px', color: '#475569', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  Rows per page:
                </Typography>
                
                <Select
                  size="small"
                  value={pagination.pageSize || 10}
                  onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: '8px',
                        p: 0.5,
                        minWidth: 120,
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                      },
                    },
                  }}
                  sx={{
                    height: '28px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#0b4668',
                    borderRadius: '6px',
                    backgroundColor: '#F8FAFC',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#CBD5E1',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#0b4668',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#0b4668',
                      borderWidth: '1.5px',
                    },
                    '& .MuiSelect-select': {
                      py: 0.25,
                      px: 1.25,
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                >
                  {(pagination.pageSizeOptions || [5, 10, 25, 50]).map((sizeOpt) => {
                    const isSelected = (pagination.pageSize || 10) === sizeOpt;
                    return (
                      <MenuItem
                        key={sizeOpt}
                        value={sizeOpt}
                        sx={{
                          fontSize: '12.5px',
                          borderRadius: '6px',
                          py: 0.75,
                          px: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? '#0b4668' : '#334155',
                          backgroundColor: isSelected ? '#E6F4FA !important' : 'transparent',
                          '&:hover': {
                            backgroundColor: '#F0F7FA',
                          },
                        }}
                      >
                        <span>{sizeOpt} rows</span>
                        {isSelected && <CheckRoundedIcon sx={{ fontSize: 15, color: '#0b4668', ml: 1 }} />}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>
            )}
          </Box>

          {/* Right: Page Navigation */}
          {pagination.totalPages > 1 && (
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage}
              onChange={(_, page) => pagination.onPageChange(page)}
              className="my-0"
            />
          )}
        </Box>
      )}
    </Box>
  );
}
