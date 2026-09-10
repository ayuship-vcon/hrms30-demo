import React from 'react';
import { CalendarMonth, Check, Close, EventAvailableOutlined, InfoOutlined, NightsStayOutlined, Refresh, WbSunnyOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Typography } from '@mui/material';
import type { LeaveDay, LeaveDayMode } from '../core/types/applyLeave.types';
import { calculateLeaveTotals, formatDateLabel } from '../core/utils/applyLeave.utils';
import { ApplyLeaveSectionHeader } from './ApplyLeaveSectionHeader';

interface Props { open: boolean; startDate: string; endDate: string; days: LeaveDay[]; onClose: () => void; onModeChange: (date: string, mode: LeaveDayMode) => void; onReset: () => void; }

const ModeButton: React.FC<{ selected: boolean; color: 'green' | 'orange' | 'blue'; icon: React.ReactNode; onClick: () => void; children: React.ReactNode }> = ({ selected, color, icon, onClick, children }) => {
  const styles = { green: { bg: '#edf9f1', border: '#bfe8cd', text: '#16803a' }, orange: { bg: '#fff7ed', border: '#fed7aa', text: '#ea580c' }, blue: { bg: '#eef4f6', border: '#c7d2fe', text: '#0b4668' } }[color];
  return <Button size="small" startIcon={icon} onClick={onClick} sx={{ minWidth: 112, height: 32, border: '1px solid', borderColor: selected ? styles.border : '#dde3ec', bgcolor: selected ? styles.bg : '#fff', color: selected ? styles.text : '#475467', fontSize: 11.5, fontWeight: selected ? 700 : 500, '&:hover': { bgcolor: styles.bg } }}>{children}</Button>;
};

export const ApplyLeaveCustomizeDialog: React.FC<Props> = ({ open, startDate, endDate, days, onClose, onModeChange, onReset }) => {
  const totals = calculateLeaveTotals(days);
  return <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { maxWidth: 860, borderRadius: 2 } }}>
    <DialogTitle sx={{ p: 2.5, pb: 1.5 }}><Stack direction="row" justifyContent="space-between" alignItems="start"><ApplyLeaveSectionHeader icon={<CalendarMonth />} title="Customize Leave Dates" subtitle="Choose how leave should be applied for each day" /><IconButton size="small" onClick={onClose}><Close fontSize="small" /></IconButton></Stack></DialogTitle>
    <DialogContent sx={{ px: 2.5 }}>
      <Alert severity="info" icon={<InfoOutlined />} sx={{ mb: 1.5, py: 0.25, border: '1px solid #cdd9ff', bgcolor: '#f7f9ff', '& .MuiAlert-message': { fontSize: 12, color: '#0b4668' } }}>
        {days.length ? `You have selected ${days.length} day${days.length === 1 ? '' : 's'} (${formatDateLabel(startDate)} – ${formatDateLabel(endDate)})` : 'Select a valid date range to customize leave.'}
      </Alert>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1.5} sx={{ mb: 2 }}><Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap><Chip size="small" icon={<CalendarMonth />} label={`${totals.fullDays} Full Days`} sx={{ bgcolor: '#edf9f1', color: '#16803a' }} /><Chip size="small" icon={<WbSunnyOutlined />} label={`${totals.halfDays} Half Day${totals.halfDays === 1 ? '' : 's'}`} sx={{ bgcolor: '#fff7ed', color: '#ea580c' }} /><Chip size="small" label={`Total: ${totals.total} Days`} sx={{ bgcolor: '#eef4f6', color: '#0b4668' }} /></Stack><Button size="small" startIcon={<Refresh />} onClick={onReset}>Reset to Full Days</Button></Stack>
      <Box sx={{ overflowX: 'auto' }}><Box sx={{ minWidth: 730 }}><Box sx={{ display: 'grid', gridTemplateColumns: '130px 105px 1fr 1fr 1fr', gap: 1, px: .75, pb: 1 }}>{['Date', 'Day', 'Full Day', 'Half Day (First Half)', 'Half Day (Second Half)'].map((heading) => <Typography key={heading} sx={{ fontSize: 11, fontWeight: 700, color: '#344054' }}>{heading}</Typography>)}</Box>{days.map((day) => <Box key={day.date} sx={{ display: 'grid', gridTemplateColumns: '130px 105px 1fr 1fr 1fr', gap: 1, alignItems: 'center', borderTop: '1px solid #E2E8F0', py: 1, px: .75 }}><Typography sx={{ fontSize: 11.5, fontWeight: 600 }}>{day.label}</Typography><Typography sx={{ fontSize: 11, color: '#667085' }}>{day.day}</Typography><ModeButton selected={day.mode === 'full'} color="green" icon={<Check sx={{ fontSize: 15 }} />} onClick={() => onModeChange(day.date, 'full')}>Full Day</ModeButton><ModeButton selected={day.mode === 'firstHalf'} color="orange" icon={<WbSunnyOutlined sx={{ fontSize: 15 }} />} onClick={() => onModeChange(day.date, 'firstHalf')}>First Half</ModeButton><ModeButton selected={day.mode === 'secondHalf'} color="blue" icon={<NightsStayOutlined sx={{ fontSize: 15 }} />} onClick={() => onModeChange(day.date, 'secondHalf')}>Second Half</ModeButton></Box>)}</Box></Box>
      <Paper variant="outlined" sx={{ mt: 2, p: 1.5, borderRadius: 1.5, bgcolor: '#fcfcfd' }}><Stack direction="row" spacing={2} justifyContent="center" alignItems="center"><Typography sx={{ fontSize: 12 }}><b>{totals.fullDays}</b> Full Days</Typography><Typography color="text.secondary">+</Typography><Typography sx={{ fontSize: 12 }}><b>{totals.halfDays}</b> Half Days</Typography><Typography color="text.secondary">=</Typography><Stack direction="row" spacing={1} alignItems="center"><EventAvailableOutlined color="primary" /><Typography sx={{ fontSize: 12 }}><b>{totals.total}</b> Total Days</Typography></Stack></Stack></Paper>
    </DialogContent>
    <DialogActions sx={{ px: 2.5, pb: 2.2, pt: 1.7 }}><Button variant="outlined" onClick={onClose}>Cancel</Button><Button variant="contained" onClick={onClose} disableElevation sx={{ minWidth: 150 }}>Apply Changes</Button></DialogActions>
  </Dialog>;
};
