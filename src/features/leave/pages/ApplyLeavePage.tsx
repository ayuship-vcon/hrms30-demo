import React, { useState } from 'react';
import { ArrowBack, CalendarMonth, CloudUploadOutlined, EditOutlined, EventAvailableOutlined, RestartAlt, SendOutlined } from '@mui/icons-material';
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@/shared/components/Form';
import { ApplyLeaveBalanceCard, ApplyLeaveCustomizeDialog, ApplyLeavePeopleCard, ApplyLeaveSectionHeader } from '../components';
import { APPROVERS, HRS, LEAVE_CATEGORIES } from '../core/constants/applyLeave.constants';
import { useApplyLeave } from '../core/hooks/useApplyLeave';

const borderColor = '#E2E8F0';
const fieldLabelSx = { mb: 0.8, fontSize: 12, fontWeight: 600, color: '#344054' };
const inputSx = { bgcolor: '#fff', borderRadius: 1.5, fontSize: 13 };

export const ApplyLeavePage: React.FC = () => {
  const { startDate, endDate, days, totals, syncDates, updateMode, resetDays } = useApplyLeave();
  const [selectedCategory, setSelectedCategory] = useState(LEAVE_CATEGORIES[0].label);
  const [leaveType, setLeaveType] = useState(LEAVE_CATEGORIES[0].options[0]);
  const [reason, setReason] = useState('');
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const updateStartDate = (value: string) => syncDates(value, endDate && value > endDate ? value : endDate);
  const updateEndDate = (value: string) => syncDates(startDate && value < startDate ? value : startDate, value);
  const canSubmit = Boolean(
    selectedCategory && leaveType && startDate && endDate && days.length > 0 && reason.trim(),
  );
  const clearForm = () => {
    syncDates('', '');
    setSelectedCategory(LEAVE_CATEGORIES[0].label);
    setLeaveType(LEAVE_CATEGORIES[0].options[0]);
    setReason('');
    setCustomizeOpen(false);
  };

  return <Box component="main" sx={{ width: '100%' }}>
    <Paper elevation={0} sx={{ mt: 1.5, border: `1px solid ${borderColor}`, borderRadius: 2, overflow: 'hidden', bgcolor: '#fbfcfe' }}>
      <Box sx={{ minHeight: 76, px: { xs: 2, md: 3 }, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, bgcolor: '#fff' }}>
        <Stack direction="row" spacing={2} alignItems="center"><Button aria-label="Back to leave" onClick={() => window.history.back()} sx={{ minWidth: 44, width: 44, height: 44, border: `1px solid ${borderColor}`, p: 0 }}><ArrowBack /></Button><Box><Typography sx={{ fontSize: 20, lineHeight: 1.2, fontWeight: 700, color: '#0b4668' }}>Apply for Leave</Typography><Typography sx={{ mt: .5, color: '#667085', fontSize: 13 }}>Submit your leave request</Typography></Box></Stack>
      </Box>
      <Box sx={{ p: { xs: 1.5, md: 2 }, display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 2.15fr) minmax(340px, .95fr)' }, gap: 2, alignItems: 'start' }}>
        <Paper component="form" onSubmit={(event) => event.preventDefault()} elevation={0} sx={{ p: { xs: 2, md: 2.5 }, border: `1px solid ${borderColor}`, borderRadius: 2, minWidth: 0 }}>
          <ApplyLeaveSectionHeader icon={<EventAvailableOutlined />} title="Leave Information" subtitle="Fill in the details to apply for leave" />
          <Box sx={{ mt: 2.5 }}><Typography sx={fieldLabelSx}>Leave Category <Required /></Typography><Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>{LEAVE_CATEGORIES.map((category) => <Chip key={category.label} label={category.label} clickable color={selectedCategory === category.label ? 'primary' : 'default'} variant={selectedCategory === category.label ? 'filled' : 'outlined'} onClick={() => { setSelectedCategory(category.label); setLeaveType(category.options[0]); }} sx={{ minWidth: 70, fontWeight: 600 }} />)}</Stack></Box>
          <Box sx={{ mt: 1.5 }}><Typography sx={fieldLabelSx}>Leave Type <Required /></Typography><FormControl fullWidth size="small"><Select value={leaveType} onChange={(event) => setLeaveType(event.target.value)} sx={inputSx}>{LEAVE_CATEGORIES.find((category) => category.label === selectedCategory)?.options.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}</Select></FormControl></Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr auto' }, gap: 2, mt: 2.5, alignItems: 'end' }}><DateField label="Start Date" value={startDate} onChange={updateStartDate} /><DateField label="End Date" value={endDate} onChange={updateEndDate} /><Button variant="outlined" startIcon={<EventAvailableOutlined />} sx={{ height: 41, px: 2.5, whiteSpace: 'nowrap' }}>Forecasted Leave Balance</Button></Box>
          <Paper variant="outlined" sx={{ mt: 2, px: 2, py: 1.4, borderColor: '#cfd9ff', bgcolor: '#f8faff', display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}><Stack direction="row" spacing={1.5} alignItems="center"><CalendarMonth sx={{ color: 'primary.main' }} /><Box><Typography sx={{ fontSize: 13, fontWeight: 700 }}>{days.length} day{days.length === 1 ? '' : 's'} selected</Typography><Typography sx={{ fontSize: 11.5, color: '#667085' }}>Includes {totals.fullDays} Full Days, {totals.halfDays} Half Day{totals.halfDays === 1 ? '' : 's'}</Typography></Box></Stack><Button size="small" endIcon={<EditOutlined />} onClick={() => setCustomizeOpen(true)} sx={{ whiteSpace: 'nowrap' }}>Customize dates</Button></Paper>
          <Box sx={{ mt: 2.5 }}><Typography sx={fieldLabelSx}>Reason for Leave <Required /></Typography><Box sx={{ position: 'relative' }}><TextField multiline minRows={4} fullWidth placeholder="Please provide the reason for your leave..." value={reason} onChange={(event) => setReason(event.target.value.slice(0, 500))} sx={inputSx} /><Typography sx={{ position: 'absolute', bottom: 9, right: 10, fontSize: 10, color: '#98a2b3' }}>{reason.length}/500</Typography></Box></Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2.5 }}>
            <Box><Typography sx={fieldLabelSx}>CC (Optional)</Typography><FormControl fullWidth size="small"><InputLabel>Select people to CC</InputLabel><Select label="Select people to CC" defaultValue="" sx={inputSx}><MenuItem value="aarav">Aarav Mehta</MenuItem><MenuItem value="priya">Priya Shah</MenuItem><MenuItem value="neha">Neha Kapoor</MenuItem></Select></FormControl></Box>
            <Box><Typography sx={fieldLabelSx}>Attachment (Optional)</Typography><Typography sx={{ fontSize: 11.5, color: '#7b8496', mb: 1 }}>Upload any supporting documents</Typography><Box component="label" sx={{ height: 104, border: '1px dashed #ccd5e3', borderRadius: 2, display: 'grid', placeItems: 'center', cursor: 'pointer', bgcolor: '#fff' }}><input type="file" hidden /><Stack alignItems="center" spacing={.5}><CloudUploadOutlined sx={{ color: '#667085' }} /><Typography sx={{ fontSize: 12, color: '#475467' }}>Click to upload or drag and drop</Typography><Typography sx={{ fontSize: 10.5, color: '#98a2b3' }}>PDF, JPG, PNG up to 5MB</Typography></Stack></Box></Box>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="flex-end" justifyContent="flex-end" sx={{ mt: 5, pt: 2, borderTop: `1px solid ${borderColor}` }}><Button variant="outlined" startIcon={<RestartAlt />} onClick={clearForm} sx={{ minWidth: 190, height: 44 }}>Clear / Reset</Button><Button type="submit" variant="contained" startIcon={<SendOutlined />} disableElevation disabled={!canSubmit} sx={{ minWidth: 190, height: 44 }}>Submit Leave Request</Button></Stack>
        </Paper>
        <Stack spacing={1.5}><ApplyLeaveBalanceCard /><ApplyLeavePeopleCard title="Approvers" subtitle="Your leave request will be sent to" people={APPROVERS} /><ApplyLeavePeopleCard title="HRs" subtitle="Your request will also be visible to" people={HRS} /></Stack>
      </Box>
    </Paper>
    <ApplyLeaveCustomizeDialog open={customizeOpen} startDate={startDate} endDate={endDate} days={days} onClose={() => setCustomizeOpen(false)} onModeChange={updateMode} onReset={resetDays} />
  </Box>;
};

const DateField: React.FC<{ label: string; value: string; onChange: (value: string) => void }> = ({ label, value, onChange }) => <Box><Typography sx={fieldLabelSx}>{label} <Required /></Typography><DatePicker value={value} onChange={onChange} sx={inputSx} /></Box>;
const Required: React.FC = () => <Box component="span" sx={{ color: '#b22b32' }}>*</Box>;
