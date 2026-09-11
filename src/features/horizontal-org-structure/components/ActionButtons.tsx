import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { SelectedOrganization } from "../core/types/horizontal-org.types";

interface ActionButtonsProps {
  onSave: () => void;
  onReset: () => void;
  onDelete?: () => void;
  selected: SelectedOrganization;
}

export const ActionButtons = ({
  onSave,
  onReset,
  onDelete,
  selected,
}: ActionButtonsProps) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
    {onDelete && selected.level && selected.level !== "Company" && (
      <Button
        color="error"
        variant="outlined"
        startIcon={<DeleteOutlineIcon />}
        onClick={onDelete}
      >
        Delete
      </Button>
    )}
    <Button variant="contained" startIcon={<SaveIcon />} onClick={onSave}>
      Save
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
