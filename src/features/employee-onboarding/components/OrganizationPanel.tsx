import { useMemo, useState } from "react";
import {
  Box,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import {
  buildOrganizationTree,
  orgTree as fallbackOrgTree,
} from "@/features/vertical-org-structure/core";
import TreeNode from "@/shared/components";
import type {
  OrganizationNode,
  SelectedOrganization,
} from "@/features/vertical-org-structure/core/types";
import {
  useGetOrganizationGroupsQuery,
  useGetOrganizationLevelsQuery,
} from "@/core/api/organization";
import type {
  OrganizationGroup,
  OrganizationLevel,
} from "@/core/api/organization";
import fallbackGroups from "@/features/vertical-org-structure/core/data/organization-groups.json";
import fallbackLevels from "@/features/vertical-org-structure/core/data/organization-levels.json";

interface OrganizationPanelProps {
  onOrganizationGroupChange: (groupId: number) => void;
}

export const OrganizationPanel: React.FC<OrganizationPanelProps> = ({
  onOrganizationGroupChange,
}) => {
  const groupsQuery = useGetOrganizationGroupsQuery();
  const levelsQuery = useGetOrganizationLevelsQuery();
  const groups = (
    groupsQuery.data?.length ? groupsQuery.data : fallbackGroups.items
  ) as OrganizationGroup[];
  const levels = (
    levelsQuery.data?.length ? levelsQuery.data : fallbackLevels.items
  ) as OrganizationLevel[];
  const tree = useMemo(
    () =>
      groups.length && levels.length
        ? buildOrganizationTree(groups, levels)
        : fallbackOrgTree,
    [groups, levels],
  );
  const businessUnits = useMemo(() => tree[0]?.children ?? [], [tree]);
  const [selectedNode, setSelectedNode] = useState<SelectedOrganization>({});
  const [selectedBusinessUnit, setSelectedBusinessUnit] =
    useState<SelectedOrganization>({});
  const [collapseTrigger, setCollapseTrigger] = useState(0);
  const [expandTrigger, setExpandTrigger] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const selectNode = (node: SelectedOrganization) => {
    setSelectedNode(node);
    onOrganizationGroupChange(node.id ?? 0);
  };

  const handleBusinessUnitChange = (name: string) => {
    const node = businessUnits.find((item) => item.name === name) ?? {};
    setSelectedBusinessUnit(node);
    selectNode(node);
    setCollapseTrigger(0);
    setExpandTrigger(0);
    setCollapsed(false);
  };

  return (
    <Stack spacing={2.5}>
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          p: 1.5,
          borderRadius: 1.5,
        }}
      >
        <AccountTreeOutlinedIcon sx={{ color: "#075985", fontSize: 34 }} />
        <Box>
          <Typography variant="h6" fontWeight={800} color="#075985">
            Organizational Structure
          </Typography>
          <Typography variant="body2" color="#285784">
            Select a Business Unit to view the hierarchy. 
            <br/>Click on a group to assign the employee to that group.
          </Typography>
        </Box>
      </Box>
      <TextField
        select
        fullWidth
        size="small"
        required
        label="Business Unit"
        value={
          selectedBusinessUnit.level === "BU" ? selectedBusinessUnit.name : ""
        }
        onChange={(event) => handleBusinessUnitChange(event.target.value)}
      >
        <MenuItem value="">Select Business Unit</MenuItem>
        {businessUnits.map((unit) => (
          <MenuItem key={unit.id ?? unit.name} value={unit.name}>
            {unit.name}
          </MenuItem>
        ))}
      </TextField>
      <Paper
        variant="outlined"
        sx={{ p: 2, minHeight: 670, borderColor: "#cbdbea", borderRadius: 1.5 }}
      >
        <Stack direction="row" alignItems="center" sx={{ mb: 1.5 }}>
          <Typography
            variant="subtitle1"
            fontWeight={900}
            sx={{ flex: 1, color: "#0f2748" }}
          >
            HIERARCHY TREE
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              if (collapsed) setExpandTrigger((value) => value + 1);
              else setCollapseTrigger((value) => value + 1);
              setCollapsed((value) => !value);
            }}
            sx={{ border: "1px solid #cbdbea", mr: 1 }}
          >
            {collapsed ? (
              <ExpandMoreIcon />
            ) : (
              <ExpandMoreIcon sx={{ transform: "rotate(180deg)" }} />
            )}
          </IconButton>
        </Stack>
        {!selectedBusinessUnit.name ? (
          <Box
            sx={{
              minHeight: 590,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 3,
            }}
          >
            <Typography color="text.secondary">
              Select Business Unit to assign employee
            </Typography>
          </Box>
        ) : (
          <TreeNode
            node={selectedBusinessUnit as OrganizationNode}
            selected={selectedNode}
            onSelect={selectNode}
            collapseTrigger={collapseTrigger}
            expandTrigger={expandTrigger}
          />
        )}
      </Paper>
    </Stack>
  );
};
