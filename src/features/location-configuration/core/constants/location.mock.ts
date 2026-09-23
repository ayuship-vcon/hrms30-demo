
import type {
  LocationOption,
  LocationRecord,
} from '../types/location.types';

export const MOCK_COUNTRIES: LocationRecord[] = [
  {
    id: 1,
    countryName: 'Nepal',
    active: false,
  },
  {
    id: 2,
    countryName: 'India',
    active: true,
  },
  {
    id: 3,
    countryName: 'United States',
    active: true,
  },
  {
    id: 4,
    countryName: 'Bhutan',
    active: true,
  },
  {
    id: 5,
    countryName: 'Iran',
    active: true,
  },
];

export const MOCK_STATES: LocationRecord[] = [
  {
    id: 1,
    countryName: 'India',
    stateName: 'Jammu and Kashmir',
    active: true,
  },
  {
    id: 2,
    countryName: 'India',
    stateName: 'Tamil Nadu',
    active: true,
  },
  {
    id: 3,
    countryName: 'India',
    stateName: 'Nagaland',
    active: true,
  },
  {
    id: 4,
    countryName: 'India',
    stateName: 'Maharashtra',
    active: true,
  },
];

export const MOCK_CITIES: LocationRecord[] = [
  {
    id: 1,
    countryName: 'India',
    stateName: 'Telangana',
    cityName: 'Hyderabad',
    active: true,
  },
  {
    id: 2,
    countryName: 'India',
    stateName: 'Maharashtra',
    cityName: 'Mumbai',
    active: true,
  },
  {
    id: 3,
    countryName: 'India',
    stateName: 'Karnataka',
    cityName: 'Bengaluru',
    active: true,
  },
];

export const COUNTRY_OPTIONS: LocationOption[] = [
  {
    label: 'India',
    value: 'India',
  },
  {
    label: 'United States',
    value: 'United States',
  },
  {
    label: 'Nepal',
    value: 'Nepal',
  },
  {
    label: 'Bhutan',
    value: 'Bhutan',
  },
];

export const STATE_OPTIONS: LocationOption[] = [
  {
    label: 'Maharashtra',
    value: 'Maharashtra',
  },
  {
    label: 'Karnataka',
    value: 'Karnataka',
  },
  {
    label: 'Telangana',
    value: 'Telangana',
  },
  {
    label: 'Tamil Nadu',
    value: 'Tamil Nadu',
  },
];