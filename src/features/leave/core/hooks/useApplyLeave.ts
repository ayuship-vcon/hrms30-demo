import { useMemo, useState } from 'react';
import { DEFAULT_END_DATE, DEFAULT_START_DATE } from '../constants/applyLeave.constants';
import { calculateLeaveTotals, createLeaveDays, updateLeaveDayMode } from '../utils/applyLeave.utils';
import type { LeaveDayMode } from '../types/applyLeave.types';

export const useApplyLeave = () => {
  const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState(DEFAULT_END_DATE);
  const [days, setDays] = useState(() => createLeaveDays(DEFAULT_START_DATE, DEFAULT_END_DATE));

  const syncDates = (nextStartDate: string, nextEndDate: string) => {
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
    setDays(createLeaveDays(nextStartDate, nextEndDate));
  };

  const updateMode = (date: string, mode: LeaveDayMode) => {
    setDays((current) => updateLeaveDayMode(current, date, mode));
  };

  const resetDays = () => setDays((current) => current.map((day) => ({ ...day, mode: 'full' })));

  return {
    startDate,
    endDate,
    days,
    totals: useMemo(() => calculateLeaveTotals(days), [days]),
    syncDates,
    updateMode,
    resetDays,
  };
};
