import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import {
  Tab,
  Tabs,
} from '@mui/material';

import type { LocationType } from '../core/types';

interface LocationConfigTabsProps {
  value: LocationType;
  onChange: (value: LocationType) => void;
}

export const LocationConfigTabs = ({
  value,
  onChange,
}: LocationConfigTabsProps) => {
  return (
    <Tabs
      value={value}
      onChange={(_, newValue: LocationType) =>
        onChange(newValue)
      }
      sx={{
        minHeight: 46,

        '& .MuiTabs-indicator': {
          display: 'none',
        },

        '& .MuiTab-root': {
          minHeight: 46,
          minWidth: 120,
          mr: 1,

          px: 2.5,
          borderRadius: 2.5,

          textTransform: 'none',
          fontWeight: 600,

          color: '#24395B',
          bgcolor: '#FFFFFF',

          border: '1px solid #E8EEF7',
        },

        '& .MuiTab-root.Mui-selected': {
          color: '#FFFFFF',
          bgcolor: '#0B4DA2',
          borderColor: '#0B4DA2',
        },
      }}
    >
      <Tab
        value="country"
        label="Country"
        icon={<PublicOutlinedIcon />}
        iconPosition="start"
      />

      <Tab
        value="state"
        label="State"
        icon={<AccountBalanceOutlinedIcon />}
        iconPosition="start"
      />

      <Tab
        value="city"
        label="City"
        icon={<LocationOnOutlinedIcon />}
        iconPosition="start"
      />
    </Tabs>
  );
};