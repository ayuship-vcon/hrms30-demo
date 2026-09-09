import type { Control, FieldValues, Path, PathValue, RegisterOptions } from 'react-hook-form';
import type { SelectOption } from '@/shared/types/common.types';

// -------------------------------------------------------------
// 1. Standalone Base Field Types (Without React Hook Form)
// -------------------------------------------------------------
export interface BaseFieldProps {
  label?: string;
  error?: string;
  isSuccess?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// -------------------------------------------------------------
// 2. React Hook Form Field Props (Generic & Type-Safe)
// -------------------------------------------------------------
export interface RHFFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  control?: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
}

// -------------------------------------------------------------
// 3. Option Types
// -------------------------------------------------------------
export type { SelectOption };
