import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import type {
  Employee,
  OrganizationTab,
  SelectedOrganization,
} from "../core/types";
const allEmployees: Employee[] = [
  { id: "EMP001", name: "Ayushi", designation: "Manager" },
  { id: "EMP002", name: "Utkarsh", designation: "Architect" },
  { id: "EMP003", name: "Vatsal", designation: "Developer" },
  { id: "EMP004", name: "Kiran", designation: "Developer" },
];
const employees = [
  { id: "EMP001", name: "Sample Employee 1", designation: "Manager" },
  { id: "EMP002", name: "Sample Employee 2", designation: "Architect" },
  { id: "EMP003", name: "Sample Employee 3", designation: "Developer" },
];
export const TeamLeadTab: React.FC<{
  selected: SelectedOrganization;
  activeTab: OrganizationTab;
}> = ({ activeTab }) => {
  const [open, setOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2, gap: 15 }}
      >
        <Typography fontWeight={700}>Assigned {activeTab}</Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setOpen(true)}
        >
          Add {activeTab}
        </Button>
      </Stack>
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Employee Code</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Designation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add {activeTab}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Autocomplete
            multiple
            options={allEmployees}
            value={selectedEmployees}
            onChange={(_, value) => setSelectedEmployees(value)}
            getOptionLabel={(option) => `${option.name} (${option.id})`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Employees"
                placeholder="Search employees"
                margin="normal"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={selectedEmployees.length === 0}
            onClick={() => {
              setOpen(false);
              setSelectedEmployees([]);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
