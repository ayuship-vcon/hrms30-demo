import { Box, Button, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { SelectedOrganization } from "../core/types";

interface ActionButtonsProps {
  onSave: () => void;
  onReset: () => void;
  selected: SelectedOrganization;
  isSaving?: boolean;
}
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSave,
  onReset,
  selected,
  isSaving = false,
}) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
    <Button variant="contained" startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />} onClick={onSave} disabled={isSaving}>
      {selected.level ? "Update" : "Add"}
    </Button>
    <Button
      variant="outlined"
      startIcon={<RestartAltIcon />}
      onClick={onReset}
      disabled={Boolean(selected.level) || isSaving}
    >
      Reset
    </Button>
  </Box>
);
