import { useEffect } from "react";
import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { AddEditTab } from "./AddEditTab";
import { TeamLeadTab } from "./TeamLeadTab";
import { LeaveApproversTab } from "./LeaveApproversTab";
import { ActionButtons } from "./ActionButtons";
import { leadTabs, TAB_CONFIG } from "../core/constants";
import type { OrganizationTab, SelectedOrganization } from "../core/types";
interface Props {
  selected: SelectedOrganization;
  activeTab: OrganizationTab;
  setActiveTab: (tab: OrganizationTab) => void;
  onSave: () => void;
  onReset: () => void;
}
export const OrganizationDetails: React.FC<Props> = ({
  selected,
  activeTab,
  setActiveTab,
  onSave,
  onReset,
}) => {
  const tabs = TAB_CONFIG[selected.level ?? "Company"] ?? ["Add"];
  useEffect(() => setActiveTab("Add"), [selected, setActiveTab]);
  const renderTab = () =>
    activeTab === "Add" ? (
      <AddEditTab selected={selected} />
    ) : leadTabs.includes(activeTab) ? (
      <TeamLeadTab selected={selected} activeTab={activeTab} />
    ) : activeTab === "Leave Approvers" ? (
      <LeaveApproversTab selected={selected} activeTab={activeTab} />
    ) : null;
  return (
    <Box sx={{ p: { xs: 2, md: 2.5 }, height: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h5" fontWeight={800}>
            {selected.name || "Add Organization"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selected.level
              ? `${selected.level} · ${selected.code} · Active`
              : "Select an organization"}
          </Typography>
        </Box>
      </Stack>
      <Paper
        elevation={1}
        sx={{ mb: 2.5, borderRadius: 3, overflow: "hidden" }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, value: OrganizationTab) => setActiveTab(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab}
              value={tab}
              label={tab}
              sx={{ textTransform: "none", fontWeight: 700 }}
            />
          ))}
        </Tabs>
      </Paper>
      {renderTab()}
      <ActionButtons onSave={onSave} onReset={onReset} selected={selected} />
    </Box>
  );
};
