import { useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/core/redux';
import { assignEmployeesToOrganization, removeEmployeeFromOrganization, selectAssignedEmployees } from '@/core/redux/vertical-org';
import { getOrganizationKey } from '../core/types';
import type { AssignmentTab, Employee, SelectedOrganization } from '../core/types';

const allEmployees: Employee[] = [
  { id: 'EMP001', name: 'Ayushi', designation: 'Manager' },
  { id: 'EMP002', name: 'Utkarsh', designation: 'Architect' },
  { id: 'EMP003', name: 'Vatsal', designation: 'Developer' },
  { id: 'EMP004', name: 'Kiran', designation: 'Developer' },
];

interface Props { selected: SelectedOrganization; activeTab: AssignmentTab; }

export const EmployeeAssignmentTab: React.FC<Props> = ({ selected, activeTab }) => {
  const dispatch = useAppDispatch();
  const organizationKey = getOrganizationKey(selected);
  const employees = useAppSelector((state) => selectAssignedEmployees(state, selected, activeTab));
  const [open, setOpen] = useState(false);
  const [draftEmployees, setDraftEmployees] = useState<Employee[]>(employees);

  const openDialog = () => { setDraftEmployees(employees); setOpen(true); };
  const saveAssignments = () => {
    dispatch(assignEmployeesToOrganization({ organizationKey, tab: activeTab, employees: draftEmployees }));
    setOpen(false);
  };

  return <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, gap: 2 }}>
      <Typography fontWeight={700}>Assigned {activeTab}</Typography>
      <Button variant="contained" startIcon={<PersonAddIcon />} onClick={openDialog}>Add {activeTab}</Button>
    </Stack>
    <Box sx={{ overflowX: 'auto' }}>
      <Table size="small"><TableHead><TableRow><TableCell>Employee Code</TableCell><TableCell>Employee Name</TableCell><TableCell>Designation</TableCell><TableCell align="right">Action</TableCell></TableRow></TableHead>
        <TableBody>{employees.map((employee) => <TableRow key={employee.id} hover><TableCell>{employee.id}</TableCell><TableCell>{employee.name}</TableCell><TableCell>{employee.designation}</TableCell><TableCell align="right"><IconButton size="small" color="error" onClick={() => dispatch(removeEmployeeFromOrganization({ organizationKey, tab: activeTab, employeeId: employee.id }))}><DeleteOutlineIcon fontSize="small" /></IconButton></TableCell></TableRow>)}</TableBody>
      </Table>
    </Box>
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm"><DialogTitle>Add {activeTab}</DialogTitle><DialogContent sx={{ pt: 2 }}><Autocomplete multiple options={allEmployees} value={draftEmployees} onChange={(_, value) => setDraftEmployees(value)} getOptionLabel={(option) => `${option.name} (${option.id})`} isOptionEqualToValue={(option, value) => option.id === value.id} renderInput={(params) => <TextField {...params} label="Select Employees" placeholder="Search employees" margin="normal" />} /></DialogContent><DialogActions><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="contained" disabled={draftEmployees.length === 0} onClick={saveAssignments}>Save</Button></DialogActions></Dialog>
  </Paper>;
};
