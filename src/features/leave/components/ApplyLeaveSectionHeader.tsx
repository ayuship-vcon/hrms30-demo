import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export const ApplyLeaveSectionHeader: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string }> = ({ icon, title, subtitle }) => (
  <Stack direction="row" spacing={1.5} alignItems="center">
    <Box sx={{ width: 35, height: 35, borderRadius: '9px', bgcolor: '#eef4f6', color: 'primary.main', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{icon}</Box>
    <Box>
      <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0b4668', lineHeight: 1.25 }}>{title}</Typography>
      {subtitle && <Typography sx={{ fontSize: 12, color: '#6b7280', mt: 0.3 }}>{subtitle}</Typography>}
    </Box>
  </Stack>
);
