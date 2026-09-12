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
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const [createEmployee, { isLoading }] = useCreateEmployeeOnboardingMutation();
  const rolesQuery = useGetCoreRolesQuery();

  const handleSave = useCallback(
    async (values: EmployeeOnboardingFormValues) => {
      const payload: CreateEmployeeOnboardingRequest = {
        userId: 2,
        organizationGroupId,
        roleId: Number(values.roleId),
        employeeId: values.employeeNumber.trim(),
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        dateOfJoining: new Date(
          `${values.dateOfJoining}T00:00:00.000Z`,
        ).toISOString(),
        officeEmailId: values.officeEmail.trim(),
        statusDescription: values.status || "Active",
      };
      try {
        await createEmployee(payload).unwrap();
        setFormResetKey((value) => value + 1);
        setToast({
          message: "Employee created successfully.",
          severity: "success",
        });
      } catch (error) {
        setToast({
          message: getErrorMessage(error, "Unable to create employee."),
          severity: "error",
        });
      }
    },
    [createEmployee, organizationGroupId],
  );

  return (
    <Box sx={{ color: "#102a4c" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              Add New vConstruct Employee
            </h1>
          </div>
          <p className="text-sm text-muted mt-1">
              Fill in the employee details and select the organizational placement
            from the right panel.
          </p>
        </div>
      </div>
      <br></br>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 2.5 },
          borderColor: "#c9e0f0",
          borderRadius: "0 7px 7px 7px",
          boxShadow: "0 2px 8px rgba(22, 76, 112, 0.04)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 1.45fr) minmax(390px, 1fr)",
            },
            gap: { xs: 3, lg: 2 },
            "& > :last-child": {
              borderLeft: { lg: "1px solid #d9e6ef" },
              pl: { lg: 2 },
            },
          }}
        >
          <Stack spacing={3}>
            <EmployeeForm
              organizationGroupId={organizationGroupId}
              roles={rolesQuery.data ?? []}
              isSaving={isLoading}
              resetKey={formResetKey}
              onSave={handleSave}
            />
          </Stack>
          <OrganizationPanel
            onOrganizationGroupChange={setOrganizationGroupId}
          />
        </Box>
      </Paper>
      <Toast
        isOpen={Boolean(toast)}
        message={toast?.message ?? ""}
        severity={toast?.severity}
        onClose={() => setToast(null)}
      />
    </Box>
  );
};
