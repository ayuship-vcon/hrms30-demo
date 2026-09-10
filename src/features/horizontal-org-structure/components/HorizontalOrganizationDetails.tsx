import { useEffect } from "react";
import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import AddEditTab from "./AddEditTab";
import ActionButtons from "./ActionButtons";
import type { SelectedOrganization } from "../core/types/horizontal-org.types";

interface DetailsProps { selected: SelectedOrganization; activeTab: string; setActiveTab: (tab: string) => void; onSave: () => void; onReset: () => void; }
export const HorizontalOrganizationDetails = ({ selected, activeTab, setActiveTab, onSave, onReset }: DetailsProps) => {
  useEffect(() => { setActiveTab("Add"); }, [selected, setActiveTab]);
  return <Box sx={{ p: { xs: 2, md: 2.5 }, height: "100%" }}>
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} justifyContent="space-between" sx={{ mb: 2 }}><Box><Typography variant="h5" fontWeight={800}>{selected.name || "Add New"}</Typography><Typography variant="body2" color="text.secondary">{selected.level ? `${selected.level} · ${selected.code} · Active` : "Select Horizontal Group and Team"}</Typography></Box></Stack>
    <Paper elevation={1} sx={{ mb: 2.5, borderRadius: 3, overflow: "hidden" }}><Tabs value={activeTab} onChange={(_, value: string) => setActiveTab(value)} variant="scrollable" scrollButtons="auto"><Tab value="Add" label="Add" sx={{ textTransform: "none", fontWeight: 700 }} /></Tabs></Paper>
    <AddEditTab selected={selected} />
    <ActionButtons onSave={onSave} onReset={onReset} selected={selected} />
  </Box>;
};
export default HorizontalOrganizationDetails;

