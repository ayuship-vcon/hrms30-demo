import React from 'react';
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  FormControl,
  FormHelperText,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import type { BaseFieldProps, SelectOption } from './form.types';

export interface AutocompleteProps extends BaseFieldProps {
  options: SelectOption[];
  value?: string | number | null;
  onChange?: (value: string | number | null, option: SelectOption | null) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  loading?: boolean;
  clearable?: boolean;
  freeSolo?: boolean;
  groupBy?: (option: SelectOption) => string;
  id?: string;
}

/**
 * Enterprise Single-Select Autocomplete Component
 * 100% Pure Material UI, 8px radius, 40px height, notch-safe, zero inline CSS.
 */
export const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  error,
  isSuccess,
  helperText,
  required,
  disabled,
  options = [],
  value,
  onChange,
  onBlur,
  placeholder = 'Search and select...',
  loading = false,
  clearable = true,
  freeSolo = false,
  groupBy,
  className = '',
  id,
}) => {
  const hasError = Boolean(error);
  const showSuccess = Boolean(isSuccess && !hasError);

  // Find matching option object for controlled value
  const selectedOption = React.useMemo(() => {
    if (value === undefined || value === null || value === '') return null;
    return options.find((opt) => String(opt.value) === String(value)) || null;
  }, [options, value]);

  return (
    <div className={`w-full ${className}`}>
      <FormControl fullWidth error={hasError} disabled={disabled} required={required}>
        <MuiAutocomplete<SelectOption, false, boolean, boolean>
          id={id || (label ? `autocomplete-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)}
          options={options}
          value={selectedOption}
          loading={loading}
          disableClearable={!clearable}
          freeSolo={freeSolo}
          groupBy={groupBy}
          disabled={disabled}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            return option.label || '';
          }}
          isOptionEqualToValue={(option, val) => {
            if (!option || !val) return false;
            return String(option.value) === String(val.value);
          }}
          onChange={(_event, newValue) => {
            if (!newValue) {
              onChange?.(null, null);
            } else if (typeof newValue === 'string') {
              onChange?.(newValue, { label: newValue, value: newValue });
            } else {
              onChange?.(newValue.value, newValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={!selectedOption ? placeholder : undefined}
              required={required}
              error={hasError}
              onBlur={onBlur}
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={18} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
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
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              key={String(option.value)}
              sx={{
                fontSize: '13.5px',
                py: 1,
                px: 1.5,
                '&[aria-selected="true"]': {
                  backgroundColor: '#eef7fc !important',
                  fontWeight: 600,
                  color: '#0b4668',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '13.5px' }}>
                {option.label}
              </Typography>
            </Box>
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
