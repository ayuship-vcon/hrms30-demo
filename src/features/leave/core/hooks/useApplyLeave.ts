import { useMemo, useState } from 'react';
import { calculateLeaveTotals, createLeaveDays, updateLeaveDayMode } from '../utils/applyLeave.utils';
import type { LeaveDayMode } from '../types/applyLeave.types';

export const useApplyLeave = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(() => createLeaveDays('', ''));

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
