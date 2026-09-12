import { useCallback, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { useCreateEmployeeOnboardingMutation } from "@/core/api/employee";
import { useGetCoreRolesQuery } from "@/core/api/roles";
import type { CreateEmployeeOnboardingRequest } from "@/core/api/employee";
import type { EmployeeOnboardingFormValues } from "../core/types";
import { Toast } from "@/shared/components";
import { getErrorMessage } from "@/shared/utils/apiError.utils";
import { EmployeeForm } from "./EmployeeForm";
import { OrganizationPanel } from "./OrganizationPanel";

export const EmployeeOnboardingPageContent: React.FC = () => {
  const [organizationGroupId, setOrganizationGroupId] = useState(0);
  const [formResetKey, setFormResetKey] = useState(0);
  const [toast, setToast] = useState<{ message: string; severity: "success" | "error" } | null>(null);
  const [createEmployee, { isLoading }] = useCreateEmployeeOnboardingMutation();
  const rolesQuery = useGetCoreRolesQuery();

  const handleSave = useCallback(async (values: EmployeeOnboardingFormValues) => {
    const payload: CreateEmployeeOnboardingRequest = {
      userId: 2,
      organizationGroupId,
      roleId: Number(values.roleId),
      employeeId: values.employeeNumber.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      dateOfJoining: new Date(`${values.dateOfJoining}T00:00:00.000Z`).toISOString(),
      officeEmailId: values.officeEmail.trim(),
      statusDescription: values.status || "Active",
    };
    try {
      await createEmployee(payload).unwrap();
      setFormResetKey((value) => value + 1);
      setToast({ message: "Employee created successfully.", severity: "success" });
    } catch (error) {
      setToast({ message: getErrorMessage(error, "Unable to create employee."), severity: "error" });
    }
  }, [createEmployee, organizationGroupId]);

  return (
    <Box sx={{ color: "#102a4c" }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, color: "#102a4c", fontSize: { xs: "1.7rem", md: "2rem" } }}>
        Employee Management
      </Typography>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 }, borderColor: "#c9e0f0", borderRadius: "0 7px 7px 7px", boxShadow: "0 2px 8px rgba(22, 76, 112, 0.04)" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.45fr) minmax(390px, 1fr)" }, gap: { xs: 3, lg: 2 }, "& > :last-child": { borderLeft: { lg: "1px solid #d9e6ef" }, pl: { lg: 2 } } }}>
          <Stack spacing={3}>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", p: 1.5, bgcolor: "#f1f8fd", borderRadius: 1.5 }}>
              <PersonAddAlt1OutlinedIcon sx={{ color: "#075985", fontSize: 34 }} />
              <Box><Typography variant="h6" fontWeight={800} color="#075985">Add New vConstruct Employee</Typography><Typography variant="body2" color="#285784">Fill in the employee details and select the organizational placement from the right panel.</Typography></Box>
            </Box>
            <EmployeeForm organizationGroupId={organizationGroupId} roles={rolesQuery.data ?? []} isSaving={isLoading} resetKey={formResetKey} onSave={handleSave} />
          </Stack>
          <OrganizationPanel onOrganizationGroupChange={setOrganizationGroupId} />
        </Box>
      </Paper>
      <Toast isOpen={Boolean(toast)} message={toast?.message ?? ""} severity={toast?.severity} onClose={() => setToast(null)} />
    </Box>
  );
};
