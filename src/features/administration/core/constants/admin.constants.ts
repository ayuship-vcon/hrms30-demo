import type { SelectOption } from '@/shared/types/common.types';

export const TIMEZONES: SelectOption<string>[] = [
  { label: 'UTC+05:30 (India Standard Time)', value: 'UTC+05:30 (IST)' },
  { label: 'UTC+00:00 (Greenwich Mean Time)', value: 'UTC+00:00 (GMT)' },
  { label: 'UTC-05:00 (Eastern Standard Time)', value: 'UTC-05:00 (EST)' },
  { label: 'UTC-08:00 (Pacific Standard Time)', value: 'UTC-08:00 (PST)' },
];
