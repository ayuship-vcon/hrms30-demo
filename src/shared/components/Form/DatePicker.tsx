import React, { forwardRef } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { type InputProps } from './Input';

export interface DatePickerProps extends Omit<InputProps, 'type' | 'value' | 'onChange' | 'onBlur'> {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * Standalone DatePicker Component (Works WITHOUT React Hook Form)
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const { label, error, helperText, required, disabled, value, onChange, onBlur, sx, ...rest } = props;

  return (
    <MuiDatePicker
      label={label}
      value={value ? dayjs(value) : null}
      onChange={(date: Dayjs | null) => onChange?.(date?.isValid() ? date.format('YYYY-MM-DD') : '')}
      disabled={disabled}
      sx={sx}
      slotProps={{
        textField: {
          inputRef: ref as unknown as React.Ref<HTMLInputElement>,
          onBlur,
          required,
          error: Boolean(error),
          helperText: error || helperText,
          size: 'small',
          fullWidth: true,
          variant: 'outlined',
          InputLabelProps: { shrink: true },
          className: 'bg-white',
          ...rest,
        },
      }}
    />
  );
});

DatePicker.displayName = 'DatePicker';
