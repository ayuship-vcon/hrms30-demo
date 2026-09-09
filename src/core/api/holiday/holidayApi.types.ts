import type { Holiday } from '@/features/holiday/core/types/holiday.types';

export type CreateHolidayRequest = Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>;
