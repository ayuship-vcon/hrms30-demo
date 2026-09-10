import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import type { EmployeeOnboardingFormValues } from '../core/types';
import { INITIAL_EMPLOYEE_FORM } from '../core/types';

interface EmployeeFormProps {
  onSave?: (values: EmployeeOnboardingFormValues) => void;
}

const offices = ['Select Office', 'Bengaluru', 'Pune', 'New York'];
const statuses = ['Select Employee Status', 'Active', 'Inactive'];
const designations = ['Select Designation', 'Associate', 'Manager', 'Architect', 'Developer'];
const initials = ['Select Initials', 'AY', 'UK', 'VT'];
const approvers = ['Select Leave Approver', 'HR Operations', 'Team Manager'];
const sources = ['Select Source', 'Referral', 'Career Portal', 'Internal Transfer'];
const qualifications = ['Enter Highest Qualification', 'Bachelor’s Degree', 'Master’s Degree', 'Doctorate'];

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSave }) => {
  const [values, setValues] = useState<EmployeeOnboardingFormValues>(INITIAL_EMPLOYEE_FORM);

  const update = <K extends keyof EmployeeOnboardingFormValues>(
    key: K,
    value: EmployeeOnboardingFormValues[K],
  ) => setValues((current) => ({ ...current, [key]: value }));

  const selectField = (
    key: keyof EmployeeOnboardingFormValues,
    label: string,
    options: string[],
    required = false,
  ) => (
    <TextField
      select
      fullWidth
      size="small"
      label={label}
      required={required}
      value={values[key] as string}
      onChange={(event) => update(key, event.target.value)}
    >
      {options.map((option) => <MenuItem key={option} value={option === options[0] ? '' : option}>{option}</MenuItem>)}
    </TextField>
  );

  return (
    <Box component="form" onSubmit={(event) => { event.preventDefault(); onSave?.(values); }} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, columnGap: { xs: 0, md: 4 }, rowGap: 2.1 }}>
      {selectField('officeName', 'Office Name', offices, true)}
      <TextField type="date" fullWidth size="small" required label="Date of Joining" value={values.dateOfJoining} onChange={(event) => update('dateOfJoining', event.target.value)} InputLabelProps={{ shrink: true }} />
      <TextField fullWidth size="small" disabled label="Unit Name" placeholder="Auto-populated based on location" value={values.unitName} />
      {selectField('designation', 'Designation', designations)}
      {selectField('status', 'Status', statuses, true)}
      <TextField fullWidth size="small" label="Role" value={values.role} onChange={(event) => update('role', event.target.value)} />
      <TextField fullWidth size="small" required label="Emp No." value={values.employeeNumber} onChange={(event) => update('employeeNumber', event.target.value)} />
      <Box sx={{ minHeight: 40, display: 'flex', alignItems: 'center' }}><FormControlLabel control={<Checkbox size="small" checked={values.isPastEmployee} onChange={(event) => update('isPastEmployee', event.target.checked)} />} label="Is Past Employee" /></Box>
      {selectField('initials', 'Initials', initials, true)}
      {selectField('leaveApprover', 'Leave Approver', approvers)}
      <TextField fullWidth size="small" disabled label="Gender" value={values.gender} />
      {selectField('source', 'Source', sources)}
      <TextField fullWidth size="small" required label="First Name" placeholder="Enter first name" value={values.firstName} onChange={(event) => update('firstName', event.target.value)} />
      {selectField('highestQualification', 'Highest Qualification', qualifications)}
      <TextField fullWidth size="small" required label="Last Name" placeholder="Enter last name" value={values.lastName} onChange={(event) => update('lastName', event.target.value)} />
      <Box sx={{ minHeight: 40, display: 'flex', alignItems: 'center' }}><FormControlLabel control={<Checkbox size="small" checked={values.accommodation} onChange={(event) => update('accommodation', event.target.checked)} />} label="Accommodation" /></Box>
      <TextField fullWidth size="small" required label="Office Email Id" placeholder="Enter email" value={values.officeEmail} onChange={(event) => update('officeEmail', event.target.value)} sx={{ gridColumn: { md: '1 / 2' } }} />
      <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' }, display: 'flex', gap: 1.5, mt: { xs: 1, md: 2 } }}><Button type="submit" variant="contained" startIcon={<SaveOutlinedIcon />} sx={{ minWidth: 138 }}>Save</Button><Button type="button" variant="outlined" onClick={() => setValues(INITIAL_EMPLOYEE_FORM)} sx={{ minWidth: 124 }}>Cancel</Button></Box>
    </Box>
  );
};
