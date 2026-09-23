import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import type {
  LocationModuleConfig,
  LocationType,
} from '../types/location.types';

export const LOCATION_CONFIG: Record<
  LocationType,
  LocationModuleConfig
> = {
  country: {
    key: 'country',

    label: 'Country',
    pluralLabel: 'Countries',

    title: 'Countries',
    addTitle: 'Add Country',
    editTitle: 'Edit Country',

    description: 'View and manage all configured countries',
    formDescription: 'Add a new country to the system',

    searchPlaceholder: 'Search country name...',

    icon: PublicOutlinedIcon,

    fields: [
      {
        name: 'countryName',
        label: 'Country Name',
        placeholder: 'Enter country name',
        type: 'text',
        required: true,
      },
    ],

    columns: [
      {
        field: 'countryName',
        label: 'Country Name',
      },
      {
        field: 'active',
        label: 'Status',
        type: 'status',
      },
    ],
  },

  state: {
    key: 'state',

    label: 'State',
    pluralLabel: 'States',

    title: 'States',
    addTitle: 'Add State',
    editTitle: 'Edit State',

    description: 'View and manage all configured states',
    formDescription: 'Add a new state to the system',

    searchPlaceholder: 'Search state name...',

    icon: AccountBalanceOutlinedIcon,

    fields: [
      {
        name: 'countryName',
        label: 'Country Name',
        placeholder: 'Select country',
        type: 'select',
        required: true,
      },
      {
        name: 'stateName',
        label: 'State Name',
        placeholder: 'Enter state name',
        type: 'text',
        required: true,
      },
    ],

    columns: [
      {
        field: 'countryName',
        label: 'Country Name',
      },
      {
        field: 'stateName',
        label: 'State Name',
      },
      {
        field: 'active',
        label: 'Status',
        type: 'status',
      },
    ],
  },

  city: {
    key: 'city',

    label: 'City',
    pluralLabel: 'Cities',

    title: 'Cities',
    addTitle: 'Add City',
    editTitle: 'Edit City',

    description: 'View and manage all configured cities',
    formDescription: 'Add a new city to the system',

    searchPlaceholder: 'Search city name...',

    icon: LocationOnOutlinedIcon,

    fields: [
      {
        name: 'countryName',
        label: 'Country Name',
        placeholder: 'Select country',
        type: 'select',
        required: true,
      },
      {
        name: 'stateName',
        label: 'State Name',
        placeholder: 'Select state',
        type: 'select',
        required: true,
      },
      {
        name: 'cityName',
        label: 'City Name',
        placeholder: 'Enter city name',
        type: 'text',
        required: true,
      },
    ],

    columns: [
      {
        field: 'countryName',
        label: 'Country Name',
      },
      {
        field: 'stateName',
        label: 'State Name',
      },
      {
        field: 'cityName',
        label: 'City Name',
      },
      {
        field: 'active',
        label: 'Status',
        type: 'status',
      },
    ],
  },
};