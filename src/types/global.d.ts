export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string | number;

export interface KeyValuePair<T = unknown> {
  [key: string]: T;
}

export type ThemeMode = 'light' | 'dark' | 'system';
