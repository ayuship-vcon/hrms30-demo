import { useCallback } from 'react';
import type { CreateHolidayRequest } from '@/core/api/holiday';
import { useGetHolidaysQuery, useCreateHolidayMutation, useDeleteHolidayMutation } from '@/core/api/holiday';

export function useHoliday() {
  const holidaysQuery = useGetHolidaysQuery();
  const [createHolidayMutation] = useCreateHolidayMutation();
  const [deleteHolidayMutation] = useDeleteHolidayMutation();
  const holidays = holidaysQuery.data ?? [];
  const isLoading = holidaysQuery.isLoading;

  const createHoliday = useCallback(
    (data: CreateHolidayRequest) => {
      return createHolidayMutation(data).unwrap();
    },
    [createHolidayMutation]
  );

  const deleteHoliday = useCallback(
    (id: string) => {
      return deleteHolidayMutation(id).unwrap();
    },
    [deleteHolidayMutation]
  );

  return {
    holidays,
    isLoading,
    createHoliday,
    deleteHoliday,
  };
}
