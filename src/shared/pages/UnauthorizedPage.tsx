import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { ROUTES } from "@/shared/constants/routes.constants";
import { useRoleRouteGuard } from "@/shared/hooks/useRoleRouteGuard";

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useRoleRouteGuard();

  return (
    <Box sx={{ minHeight: "calc(100vh - 9rem)", display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 2, sm: 3 }, py: { xs: 4, sm: 6 } }}>
      <Stack spacing={3} alignItems="center" textAlign="center" sx={{ width: "100%", maxWidth: 560 }}>
        <Box
          sx={{
            width: { xs: 88, sm: 104 },
            height: { xs: 88, sm: 104 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            bgcolor: "warning.light",
            color: "warning.dark",
          }}
        >
          <WarningAmberRoundedIcon sx={{ fontSize: { xs: 46, sm: 54 } }} />
        </Box>
        <Stack spacing={1} alignItems="center">
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: "0.18em" }}
          >
            Error 403
          </Typography>
          <Typography variant="h4" component="h1" fontWeight={700} color="text.primary">
            Access restricted
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 460 }}>
            You don&apos;t have permission to view this page with your current role. If you believe this is a mistake, contact your administrator.
          </Typography>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: "100%", maxWidth: 380 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(ROUTES.DASHBOARD, { replace: true })}
          >
            Back to Dashboard
          </Button>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UnauthorizedPage;
