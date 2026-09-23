import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import {
  Box,
  Stack,
  Typography,
} from '@mui/material';

export const LocationPageHeader = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <Box
        sx={{
          width: 54,
          height: 54,
          borderRadius: 3,

          display: 'grid',
          placeItems: 'center',

          bgcolor: '#FFF0F1',
          color: '#EF4444',
        }}
      >
        <LocationOnOutlinedIcon />
      </Box>

      <Box>
        <Typography
          variant="h5"
          sx={{
            color: '#102044',
            fontWeight: 700,
          }}
        >
          Location Configuration
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Manage your countries, states and cities
          from here
        </Typography>
      </Box>
    </Stack>
  );
};