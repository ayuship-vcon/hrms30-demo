import { REGEX_PATTERNS } from '../constants/regex.constants';

export const isEmail = (value: string): boolean => {
  return REGEX_PATTERNS.EMAIL.test(value.trim());
};

export const isRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const minLength = (value: string, min: number): boolean => {
  return (value || '').length >= min;
};
