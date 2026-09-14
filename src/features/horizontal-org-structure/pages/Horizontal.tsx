import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { metrics } from "../core/constants/binding";
import TreeNode from "../components/TreeNode";
import HorizontalOrganizationDetails from "../components/HorizontalOrganizationDetails";
import type { SelectedOrganization } from "../core/types/horizontal-org.types";
import type { OrganizationNode } from "../core/types/horizontal-org.types";
import { useAppDispatch, useAppSelector } from "@/core/redux";
import {
  clearHorizontalOrganizationSelection,
  selectHorizontalOrganization,
  selectHorizontalOrganizations,
  selectSelectedHorizontalOrganization,
  addHorizontalOrganization,
  updateHorizontalOrganization,
  deleteHorizontalOrganization,
} from "@/core/redux/horizontal-org";

const countNodesByLevel = (nodes: OrganizationNode[], level: OrganizationNode["level"]): number =>
  nodes.reduce(
    (count, node) => count + (node.level === level ? 1 : 0) + countNodesByLevel(node.children ?? [], level),
    0,
  );

export const Horizontal = () => {
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(selectHorizontalOrganizations);
  const selected = useAppSelector(selectSelectedHorizontalOrganization);
  const metricValues = useMemo(
    () => ({
      Company: countNodesByLevel(organizations, "Company"),
      "Functional Groups": countNodesByLevel(organizations, "Group"),
      "Functional Teams": countNodesByLevel(organizations, "Team"),
    }),
    [organizations],
  );
  const [activeTab, setActiveTab] = useState("Add");
  const [collapseTrigger, setCollapseTrigger] = useState(0);
  const [expandTrigger, setExpandTrigger] = useState(0);
  const [isTreeCollapsed, setIsTreeCollapsed] = useState(false);
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
        }}
      >
        <Stack spacing={2.5} sx={{ width: "100%" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              Horizontal Organization Structure Configuration
            </h1>
          </div>
          <p className="text-sm text-muted mt-1">
            Configure Company, BU, Cluster, Team and future hierarchy levels with tree navigation, node details, mappings and live org chart preview.
          </p>
        </div>
      </div>
          {/* <Paper
            elevation={6}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 4,
              color: "#ffffff",
              background:
                "linear-gradient(90deg, #020617 0%, #172554 55%, #312e81 100%)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#ffffff", mt: 0.5, fontSize: { xs: "1.7rem", md: "2.125rem" } }}
            >
              Organization Structure Configuration
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, maxWidth: 850, color: "#cbd5e1" }}
            >
              Configure Company, BU, Cluster, Team and future hierarchy levels
              with tree navigation, node details, mappings and live org chart
              preview.
            </Typography>
          </Paper> */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
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
                    {metricValues[metric.label as keyof typeof metricValues]}
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
                gridTemplateRows: { xs: "auto", lg: "minmax(0, 1fr)" },
                p: 2,
                height: { xs: "auto", lg: 650 },
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  minHeight: 0,
                  height: { xs: "auto", lg: "100%" },
                  maxHeight: { xs: "none", lg: "100%" },
                  display: "flex",
                  flexDirection: "column",
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
                    onClick={() => dispatch(clearHorizontalOrganizationSelection())}
                    title="Add Node"
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <Box sx={{ minHeight: 0, flex: 1, overflowY: { xs: "visible", lg: "auto" }, overflowX: "hidden" }}>
                <Stack spacing={0.5}>
                  {organizations.map((node) => (
                    <TreeNode
                      key={node.name}
                      node={node}
                      selected={selected}
                      onSelect={(node: SelectedOrganization) => dispatch(selectHorizontalOrganization(node))}
                      collapseTrigger={collapseTrigger}
                      expandTrigger={expandTrigger}
                    />
                  ))}
                </Stack>
                </Box>
              </Box>
              <Box>
                <HorizontalOrganizationDetails
                  selected={selected}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onSave={(node, parentName) => {
                    if (selected.name) dispatch(updateHorizontalOrganization({ node }));
                    else dispatch(addHorizontalOrganization({ node, parentName }));
                  }}
                  onReset={() => dispatch(clearHorizontalOrganizationSelection())}
                  onDelete={() => dispatch(deleteHorizontalOrganization(selected.id ?? `${selected.level}:${selected.name}`))}
                />
              </Box>
            </Box>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};
export default Horizontal;
