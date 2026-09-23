import { Chip } from '@mui/material';

interface StatusChipProps {
  active: boolean;
}

export const StatusChip = ({
  active,
}: StatusChipProps) => {
  return (
    <Chip
      size="small"
      label={active ? 'Active' : 'Inactive'}
      sx={{
        height: 26,
        fontWeight: 600,

        bgcolor: active ? '#DCFCE7' : '#FEE2E2',
        color: active ? '#15803D' : '#DC2626',

        '& .MuiChip-label': {
          px: 1.5,
        },

        '&::before': {
          content: '""',
          width: 7,
          height: 7,
          borderRadius: '50%',
          bgcolor: active ? '#16A34A' : '#EF4444',
          ml: 1.2,
        },
      }}
    />
  );
};