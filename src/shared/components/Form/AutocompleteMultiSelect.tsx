import React, { useMemo } from 'react';
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  FormControl,
  FormHelperText,
  Checkbox,
  Chip,
  Box,
  Typography,
  Divider,
  ButtonBase,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import type { BaseFieldProps, SelectOption } from './form.types';

export interface AutocompleteMultiSelectProps extends BaseFieldProps {
  options: SelectOption[];
  value?: (string | number)[];
  onChange?: (values: (string | number)[], selectedOptions: SelectOption[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  maxChipsDisplay?: number;
  showSelectAll?: boolean;
  clearable?: boolean;
  groupBy?: (option: SelectOption) => string;
  id?: string;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" sx={{ color: '#94A3B8' }} />;
const checkedIcon = <CheckBoxIcon fontSize="small" sx={{ color: '#0b4668' }} />;

/**
 * Enterprise Autocomplete Multi-Select Component
 * Features: Type-to-search autocomplete, Checkboxes, Tag Chips, 'Select All' toggle.
 * 100% Pure Material UI, 8px radius, 40px height, notch-safe, zero inline CSS.
 */
export const AutocompleteMultiSelect: React.FC<AutocompleteMultiSelectProps> = ({
  label,
  error,
  isSuccess,
  helperText,
  required,
  disabled,
  options = [],
  value = [],
  onChange,
  onBlur,
  placeholder = 'Type to search and select multiple...',
  maxChipsDisplay = 3,
  showSelectAll = true,
  clearable = true,
  groupBy,
  className = '',
  id,
}) => {
  const hasError = Boolean(error);
  const showSuccess = Boolean(isSuccess && !hasError);

  // Map array of primitive values to option objects
  const selectedOptions = useMemo(() => {
    if (!Array.isArray(value)) return [];
    return options.filter((opt) => value.map(String).includes(String(opt.value)));
  }, [options, value]);

  const allSelected = options.length > 0 && selectedOptions.length === options.length;
  const someSelected = selectedOptions.length > 0 && selectedOptions.length < options.length;

  const handleSelectAllToggle = () => {
    if (allSelected) {
      onChange?.([], []);
    } else {
      const allValues = options.map((opt) => opt.value);
      onChange?.(allValues, [...options]);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <FormControl fullWidth error={hasError} disabled={disabled} required={required}>
        <MuiAutocomplete<SelectOption, true, boolean, false>
          multiple
          disableCloseOnSelect
          id={id || (label ? `autocomplete-multiselect-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)}
          options={options}
          value={selectedOptions}
          disabled={disabled}
          disableClearable={!clearable}
          groupBy={groupBy}
          getOptionLabel={(option) => option.label || ''}
          isOptionEqualToValue={(option, val) => String(option.value) === String(val.value)}
          onChange={(_event, newValue) => {
            const values = newValue.map((opt) => opt.value);
            onChange?.(values, newValue);
          }}
          PaperComponent={({ children, ...paperProps }) => (
            <Box
              {...paperProps}
              sx={{
                borderRadius: '8px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                border: '1px solid #E2E8F0',
                mt: 1,
                overflow: 'hidden',
                backgroundColor: '#ffffff',
              }}
            >
              {showSelectAll && options.length > 0 && (
                <Box>
                  <ButtonBase
                    onClick={handleSelectAllToggle}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      px: 2,
                      py: 1,
                      backgroundColor: '#F8FAFC',
                      '&:hover': {
                        backgroundColor: '#F1F5F9',
                      },
                    }}
                  >
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      indeterminateIcon={<IndeterminateCheckBoxIcon fontSize="small" sx={{ color: '#0b4668' }} />}
                      checked={allSelected}
                      indeterminate={someSelected}
                      size="small"
                      sx={{ mr: 1, p: 0.25 }}
                    />
                    <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 600, color: '#0b4668' }}>
                      {allSelected ? 'Deselect All' : 'Select All Options'}
                    </Typography>
                    <Typography variant="caption" sx={{ ml: 'auto', fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                      {selectedOptions.length}/{options.length} Selected
                    </Typography>
                  </ButtonBase>
                  <Divider />
                </Box>
              )}
              {children}
            </Box>
          )}
          renderOption={(props, option, { selected }) => (
            <Box
              component="li"
              {...props}
              key={String(option.value)}
              sx={{
                fontSize: '13.5px',
                py: 0.75,
                px: 1.5,
                display: 'flex',
                alignItems: 'center',
                '&[aria-selected="true"]': {
                  backgroundColor: '#eef7fc !important',
                },
                '&:hover': {
                  backgroundColor: '#f8fafc',
                },
              }}
            >
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
                size="small"
                sx={{ mr: 1, p: 0.25 }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: '13.5px',
                  color: selected ? '#0b4668' : '#1E293B',
                  fontWeight: selected ? 600 : 400,
                }}
              >
                {option.label}
              </Typography>
            </Box>
          )}
          renderTags={(tagValue, getTagProps) => {
            const numTags = tagValue.length;
            const overflow = numTags - maxChipsDisplay;

            return (
              <Box display="flex" flexWrap="wrap" gap={0.5} py={0.5}>
                {tagValue.slice(0, maxChipsDisplay).map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={String(option.value)}
                    label={option.label}
                    size="small"
                    sx={{
                      fontSize: '12px',
                      fontWeight: 600,
                      height: '24px',
                      borderRadius: '4px',
                      backgroundColor: '#eef7fc',
                      color: '#0b4668',
                      border: '1px solid #c8e4f5',
                      '& .MuiChip-deleteIcon': {
                        color: '#0b4668',
                        fontSize: '14px',
                        '&:hover': {
                          color: '#b22b32',
                        },
                      },
                    }}
                  />
                ))}
                {overflow > 0 && (
                  <Chip
                    label={`+${overflow} more`}
                    size="small"
                    sx={{
                      fontSize: '11px',
                      fontWeight: 600,
                      height: '24px',
                      borderRadius: '4px',
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: '1px solid #E2E8F0',
                    }}
                  />
                )}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={selectedOptions.length === 0 ? placeholder : undefined}
              required={required && selectedOptions.length === 0}
              error={hasError}
              onBlur={onBlur}
              size="small"
              sx={{
                '& .MuiInputLabel-root': {
                  fontSize: '14px',
                  fontWeight: 500,
                  color: hasError ? '#b22b32' : showSuccess ? '#065f46' : '#45464D',
                  '&.Mui-focused': {
                    color: hasError ? '#b22b32' : showSuccess ? '#065f46' : '#0b4668',
                    fontWeight: 600,
                  },
                  '&.MuiInputLabel-shrink': {
                    fontSize: '13px',
                  },
                },
                '& .MuiOutlinedInput-root': {
                  fontSize: '13.5px',
                  borderRadius: '8px',
                  minHeight: '40px',
                  backgroundColor: disabled ? '#F8FAFC' : '#FFFFFF',
                  padding: '2px 8px !important',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: hasError ? '#b22b32' : showSuccess ? '#4edea3' : '#CBD5E1',
                    borderWidth: hasError || showSuccess ? '1.5px' : '1px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: hasError ? '#b22b32' : showSuccess ? '#4edea3' : '#0b4668',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: hasError ? '#b22b32' : showSuccess ? '#4edea3' : '#0b4668',
                    borderWidth: '2px',
                  },
                },
              }}
            />
          )}
        />
        {(error || helperText) && (
          <FormHelperText
            sx={{
              fontSize: '11px',
              marginLeft: '4px',
              marginTop: '3px',
              color: hasError ? '#b22b32' : undefined,
            }}
          >
            {error || helperText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};
