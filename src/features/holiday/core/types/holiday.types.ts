import type { BaseEntity } from '@/shared/types/common.types';

export type HolidayType = 'national' | 'regional' | 'optional' | 'PUBLIC' | 'RESTRICTED' | 'OPTIONAL';

export interface Holiday extends BaseEntity {
  name: string;
  date: string;
  dayOfWeek: string;
  type: HolidayType;
  description?: string;
}

export interface HolidayState {
  holidays: Holiday[];
  isLoading: boolean;
  error: string | null;
}
