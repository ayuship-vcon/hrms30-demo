import React from 'react';
import { ArrowForward, CalendarMonth } from '@mui/icons-material';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { LEAVE_BALANCES } from '../core/constants/applyLeave.constants';
import { ApplyLeaveSectionHeader } from './ApplyLeaveSectionHeader';

const todayLabel = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const ApplyLeaveBalanceCard: React.FC = () => (
  <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2, p: 2 }}>
    <ApplyLeaveSectionHeader icon={<CalendarMonth fontSize="small" />} title="Leave Balance" subtitle={`As on ${todayLabel}`} />
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      <Box sx={{ flex: 1, p: 2, minHeight: 82, borderRadius: 1.5, bgcolor: '#edf9f1' }}><Typography sx={{ fontSize: 12, color: '#475467' }}>Total Leaves Earned</Typography><Typography sx={{ fontSize: 25, fontWeight: 700, color: '#159447', mt: 0.5 }}>28 <Typography component="span" sx={{ fontSize: 12 }}>days</Typography></Typography></Box>
      <Box sx={{ flex: 1, p: 2, minHeight: 82, borderRadius: 1.5, bgcolor: '#eef4f6' }}><Typography sx={{ fontSize: 12, color: '#475467' }}>Leaves Utilized</Typography><Typography sx={{ fontSize: 25, fontWeight: 700, color: 'primary.main', mt: 0.5 }}>10 <Typography component="span" sx={{ fontSize: 12 }}>days</Typography></Typography></Box>
    </Stack>
    <Divider sx={{ my: 2.3 }} />
    <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1 }}>Leave Balance by Type</Typography>
    <Stack divider={<Divider flexItem />}>
      {LEAVE_BALANCES.map((item) => <Stack key={item.name} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25 }}><Stack direction="row" spacing={1.1} alignItems="center"><Box sx={{ width: 18, height: 18, borderRadius: '6px', bgcolor: `${item.color}18`, display: 'grid', placeItems: 'center' }}><Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: item.color }} /></Box><Typography sx={{ fontSize: 12.5, color: '#344054' }}>{item.name}</Typography></Stack><Typography sx={{ fontSize: 12.5, fontWeight: 600 }}>{item.days} days</Typography></Stack>)}
    </Stack>
    <Button endIcon={<ArrowForward />} size="small" sx={{ display: 'flex', mx: 'auto', mt: 1.5 }}>View all leave types</Button>
  </Paper>
);
