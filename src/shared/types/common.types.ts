export type SortDirection = 'asc' | 'desc';

export interface SortCriteria {
  field: string;
  direction: SortDirection;
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived' | 'approved' | 'rejected';

export interface SelectOption<T = string | number> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
