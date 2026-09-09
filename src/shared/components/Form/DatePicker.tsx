import React, { forwardRef } from 'react';
import { Input, type InputProps } from './Input';

export interface DatePickerProps extends Omit<InputProps, 'type'> {}

/**
 * Standalone DatePicker Component (Works WITHOUT React Hook Form)
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  return (
    <Input
      ref={ref}
      type="date"
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
});

DatePicker.displayName = 'DatePicker';
