import type { SelectOption } from '@/shared/types/common.types';

export const HOLIDAY_TYPES: SelectOption<string>[] = [
  { label: 'National Holiday (Mandatory Off)', value: 'national' },
  { label: 'Regional / State Holiday', value: 'regional' },
  { label: 'Optional / Floating Holiday', value: 'optional' },
];

export const HOLIDAY_TYPE_COLORS: Record<string, string> = {
  national: 'badge-success',
  regional: 'badge-info',
  optional: 'badge-warning',
};
