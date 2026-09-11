import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { buildOrganizationTree, metrics, orgTree as fallbackOrgTree } from "../core/constants";
import type { OrganizationTab, SelectedOrganization } from "../core/types";
import { TreeNode } from "../components/TreeNode";
import { OrganizationDetails } from "../components/OrganizationDetails";
import {
  useGetOrganizationGroupsQuery,
  useGetOrganizationLevelsQuery,
} from "@/core/api/organization";
import type {
  OrganizationGroup,
  OrganizationLevel,
} from "@/core/api/organization";
import fallbackGroups from "../core/data/organization-groups.json";
import fallbackLevels from "../core/data/organization-levels.json";

export const VerticalOrgStructurePage: React.FC = () => {
  const [selected, setSelected] = useState<SelectedOrganization>({});
  const [activeTab, setActiveTab] = useState<OrganizationTab>("Add");
  const [collapseTrigger, setCollapseTrigger] = useState(0);
  const [expandTrigger, setExpandTrigger] = useState(0);
  const [isTreeCollapsed, setIsTreeCollapsed] = useState(false);
  const groupsQuery = useGetOrganizationGroupsQuery();
  const levelsQuery = useGetOrganizationLevelsQuery();
  const organizationGroups = (groupsQuery.data?.length
    ? groupsQuery.data
    : fallbackGroups.items) as OrganizationGroup[];
  const organizationLevels = (levelsQuery.data?.length
    ? levelsQuery.data
    : fallbackLevels.items) as OrganizationLevel[];
  const orgTree = useMemo(
    () =>
      organizationGroups.length > 0 && organizationLevels.length > 0
        ? buildOrganizationTree(organizationGroups, organizationLevels)
        : fallbackOrgTree,
    [organizationGroups, organizationLevels],
  );
  const handleToggleTree = () => {
    if (isTreeCollapsed) setExpandTrigger((previous) => previous + 1);
    else setCollapseTrigger((previous) => previous + 1);
    setIsTreeCollapsed((previous) => !previous);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          spacing={2.5}
          sx={{
            maxWidth: 1500,
            mx: "auto",
            width: "100%",
            px: { xs: 2, sm: 3, md: 0 },
            mb: 6,
          }}
        >
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
           <div>
             <div className="flex items-center gap-2">
               <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Vertical Organization Structure Configuration</h1>
             </div>
             <p className="text-sm text-muted mt-1">
              Configure Company, BU, Cluster, Team and future hierarchy
                  levels with tree navigation, node details, mappings and live
                  org chart preview.
             </p>
           </div>
          
         </div>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            {metrics.map((metric) => (
              <Card key={metric.label} elevation={1} sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Chip
                    label={metric.label}
                    size="small"
                    sx={{
                      mb: 1.5,
                      fontWeight: 700,
                      backgroundColor: metric.background,
                      color: metric.color,
                    }}
                  />
                  <Typography variant="h5" fontWeight={800}>
                    {metric.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Configured in current hierarchy
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Card elevation={6} sx={{ borderRadius: 4, overflow: "hidden" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "310px minmax(0, 1fr) 40px",
                },
                p: 2,
                minHeight: 650,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRight: { lg: "1px solid" },
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" alignItems="center" sx={{ mb: 1.5 }}>
                  <Typography
                    variant="overline"
                    fontWeight={800}
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    Hierarchy Tree
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      mr: 1,
                    }}
                    onClick={handleToggleTree}
                    title={isTreeCollapsed ? "Expand All" : "Collapse All"}
                  >
                    {isTreeCollapsed ? (
                      <UnfoldMoreIcon fontSize="small" />
                    ) : (
                      <UnfoldLessIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                    onClick={() => setSelected({})}
                    title="Add Node"
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <Stack spacing={0.5}>
                  {orgTree.map((node) => (
                    <TreeNode
                      key={node.name}
                      node={node}
                      selected={selected}
                      onSelect={setSelected}
                      collapseTrigger={collapseTrigger}
                      expandTrigger={expandTrigger}
                    />
                  ))}
                </Stack>
              </Box>
              <Box>
                <OrganizationDetails
                  selected={selected}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onSave={() => undefined}
                  onReset={() => undefined}
                  organizationTree={orgTree}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button variant="contained" startIcon={<SaveIcon />}>
                    Save
                  </Button>
                  <Button variant="outlined" startIcon={<RestartAltIcon />}>
                    Reset
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default VerticalOrgStructurePage;
