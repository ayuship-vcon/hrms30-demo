import type { SvgIconComponent } from '@mui/icons-material';

export type LocationType = 'country' | 'state' | 'city';

export type LocationFieldType = 'text' | 'select';

export interface LocationOption {
  label: string;
  value: string;
}

export interface LocationRecord {
  id: number;
  countryName?: string;
  stateName?: string;
  cityName?: string;
  active: boolean;
}

export interface LocationFormValues {
  countryName: string;
  stateName: string;
  cityName: string;
  active: boolean;
}

export interface LocationFieldConfig {
  name: keyof Pick<
    LocationFormValues,
    'countryName' | 'stateName' | 'cityName'
  >;
  label: string;
  placeholder: string;
  type: LocationFieldType;
  required?: boolean;
}

export interface LocationColumnConfig {
  field: keyof LocationRecord;
  label: string;
  type?: 'text' | 'status';
}

export interface LocationModuleConfig {
  key: LocationType;

  label: string;
  pluralLabel: string;

  title: string;
  addTitle: string;
  editTitle: string;

  description: string;
  formDescription: string;
  searchPlaceholder: string;

  icon: SvgIconComponent;

  fields: LocationFieldConfig[];
  columns: LocationColumnConfig[];
}

export interface LocationSelectOptions {
  countryName?: LocationOption[];
  stateName?: LocationOption[];
  cityName?: LocationOption[];
}