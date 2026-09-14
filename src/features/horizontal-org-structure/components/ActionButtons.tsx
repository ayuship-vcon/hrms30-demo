import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { SelectedOrganization } from "../core/types/horizontal-org.types";

interface ActionButtonsProps {
  onSave: () => void;
  onReset: () => void;
  selected: SelectedOrganization;
}

export const ActionButtons = ({
  onSave,
  onReset,
  selected,
}: ActionButtonsProps) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
    <Button variant="contained" startIcon={<SaveIcon />} onClick={onSave}>
      {selected.level ? "Update" : "Add"}
    </Button>
    <Button
      variant="outlined"
      startIcon={<RestartAltIcon />}
      onClick={onReset}
      disabled={Boolean(selected.level)}
    >
      Reset
    </Button>
  </Box>
);

export default ActionButtons;
