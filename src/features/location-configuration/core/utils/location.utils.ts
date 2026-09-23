import type {
  LocationFormValues,
  LocationRecord,
} from '../types';

export const DEFAULT_LOCATION_FORM_VALUES: LocationFormValues = {
  countryName: '',
  stateName: '',
  cityName: '',
  active: true,
};

export const mapRecordToFormValues = (
  record?: LocationRecord | null,
): LocationFormValues => {
  if (!record) {
    return {
      ...DEFAULT_LOCATION_FORM_VALUES,
    };
  }

  return {
    countryName: record.countryName ?? '',
    stateName: record.stateName ?? '',
    cityName: record.cityName ?? '',
    active: record.active,
  };
};