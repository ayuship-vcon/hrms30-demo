import type { LeaveDay, LeaveDayMode } from '../types/applyLeave.types';

export const formatDateLabel = (date: string) => {
  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const toLocalDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const createLeaveDays = (startDate: string, endDate: string): LeaveDay[] => {
  if (!startDate || !endDate || startDate > endDate) return [];

  const days: LeaveDay[] = [];
  const current = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  while (current <= end) {
    // Do not use toISOString here: it converts midnight to UTC and shifts
    // the displayed date back one day in time zones west/east of UTC.
    const date = toLocalDateValue(current);
    days.push({
      date,
      label: formatDateLabel(date),
      day: current.toLocaleDateString('en-US', { weekday: 'long' }),
      mode: 'full',
    });
    current.setDate(current.getDate() + 1);
  }

  return days;
};

export const calculateLeaveTotals = (days: LeaveDay[]) => {
  const fullDays = days.filter((day) => day.mode === 'full').length;
  const halfDays = days.length - fullDays;
  return { fullDays, halfDays, total: fullDays + halfDays * 0.5 };
};

export const updateLeaveDayMode = (days: LeaveDay[], date: string, mode: LeaveDayMode) =>
  days.map((day) => (day.date === date ? { ...day, mode } : day));
