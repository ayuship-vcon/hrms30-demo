import { useEffect, useMemo, useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { findParent, orgTree } from "../core/constants";
import type { SelectedOrganization, OrganizationNode } from "../core/types";
import type { OrganizationGroup, OrganizationLevel as ApiOrganizationLevel } from "@/core/api/organization";

export interface OrganizationGroupFormValues {
  name: string;
  levelId: number | "";
  parentGroupId: number | "";
  shortName: string;
}

const ReadOnlyField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <TextField label={label} value={value} fullWidth size="small" disabled InputProps={{ readOnly: true }} />
);

interface AddEditTabProps {
  selected: SelectedOrganization;
  organizationTree?: OrganizationNode[];
  availableLevels?: ApiOrganizationLevel[];
  organizationGroups?: OrganizationGroup[];
  formValues: OrganizationGroupFormValues;
  onFormChange: (values: Partial<OrganizationGroupFormValues>) => void;
}

export const AddEditTab: React.FC<AddEditTabProps> = ({
  selected,
  organizationTree = orgTree,
  availableLevels = [],
  organizationGroups = [],
  formValues,
  onFormChange,
}) => {
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");
  const isEdit = Object.keys(selected).length > 0;
  const selectedLevel = availableLevels.find((item) => item.id === Number(formValues.levelId));
  const parentLevel = availableLevels.find(
    (item) => item.id === selectedLevel?.parentLevelId,
  );
  const parentGroups = useMemo(
    () => selectedLevel?.parentLevelId == null
      ? []
      : organizationGroups.filter((group) => group.isActive !== false && group.levelId === selectedLevel.parentLevelId),
    [organizationGroups, selectedLevel?.id, selectedLevel?.parentLevelId],
  );

  useEffect(() => {
    setDescription(isEdit ? "Team responsible for regional operations and implementation delivery." : "");
    if (isEdit) {
      const parent = findParent(organizationTree, selected.name);
      const selectedLevelId = availableLevels.find(
        (item) => item.name === selected.level || item.shortName === selected.level,
      )?.id;
      const selectedParentId = organizationGroups.find(
        (group) => group.name === parent?.name,
      )?.id;
      onFormChange({
        name: selected.name ?? "",
        shortName: selected.code ?? "",
        levelId: selectedLevelId ?? "",
        parentGroupId: selectedParentId ?? "",
      });
    }
  }, [availableLevels, isEdit, onFormChange, organizationGroups, organizationTree, selected]);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" }, gap: 2 }}>
      <ReadOnlyField label="Organization Name" value="vConstruct" />
      <TextField
        select label="Level" size="small" fullWidth value={formValues.levelId}
        onChange={(event) => onFormChange({ levelId: Number(event.target.value), parentGroupId: "" })}
        disabled={isEdit}
      >
        <MenuItem value="" disabled>Select level</MenuItem>
        {availableLevels
          .filter((item) => item.id !== 100 && item.isActive !== false)
          .sort((a, b) => a.sequence - b.sequence)
          .map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
      </TextField>
      <TextField label="Group Name" size="small" value={formValues.name} disabled={isEdit} onChange={(event) => onFormChange({ name: event.target.value })} />
      <TextField label="Short Name" value={formValues.shortName} disabled={isEdit} onChange={(event) => onFormChange({ shortName: event.target.value })} size="small" />
      {selectedLevel?.parentLevelId != null && (
        <>
          <TextField
            select
            label="Parent Level"
            size="small"
            fullWidth
            value={parentLevel?.id ?? ""}
            disabled
          >
            {parentLevel && <MenuItem value={parentLevel.id}>{parentLevel.name}</MenuItem>}
          </TextField>
        <TextField
          select label="Parent Group" size="small" fullWidth value={formValues.parentGroupId}
          onChange={(event) => onFormChange({ parentGroupId: Number(event.target.value) })}
          disabled={isEdit}
        >
          <MenuItem value="" disabled>Select parent group</MenuItem>
          {parentGroups.map((group) => <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>)}
        </TextField>
        </>
      )}
      <TextField select fullWidth size="small" label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>
      <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} multiline minRows={4} fullWidth sx={{ gridColumn: { md: "1 / -1" } }} />
    </Box>
  );
};
