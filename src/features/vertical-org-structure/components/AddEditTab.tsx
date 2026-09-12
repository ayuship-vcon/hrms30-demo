import { useEffect, useMemo, useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { findParent, orgTree } from "../core/constants";
import type { SelectedOrganization, OrganizationNode } from "../core/types";
import type { OrganizationGroup, OrganizationLevel as ApiOrganizationLevel } from "@/core/api/organization";

export interface OrganizationGroupFormValues {
  name: string;
  levelId: number | "";
  parentLevelId: number | "";
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
  validationErrors?: Record<string, string>;
}

export const AddEditTab: React.FC<AddEditTabProps> = ({
  selected,
  organizationTree = orgTree,
  availableLevels = [],
  organizationGroups = [],
  formValues,
  onFormChange,
  validationErrors = {},
}) => {
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");
  const isEdit = Object.keys(selected).length > 0;
  const selectedLevel = availableLevels.find((item) => item.id === Number(formValues.levelId));
  const parentLevelOptions = useMemo(() => {
    if (!selectedLevel) return [];
    const options: ApiOrganizationLevel[] = [];
    let parentId = selectedLevel.parentLevelId;
    while (parentId != null) {
      const parent = availableLevels.find((item) => item.id === parentId);
      if (!parent) break;
      options.push(parent);
      parentId = parent.parentLevelId;
    }
    const isTeam = selectedLevel.name.toLowerCase() === "team" || selectedLevel.shortName?.toLowerCase() === "tm";
    return isTeam ? options.filter((item) => item.id !== 100) : options.slice(0, 1);
  }, [availableLevels, selectedLevel?.id, selectedLevel?.parentLevelId]);
  const parentLevel = availableLevels.find(
    (item) => item.id === Number(formValues.parentLevelId),
  );
  const parentGroups = useMemo(
    () => formValues.parentLevelId === ""
      ? []
        : organizationGroups.filter((group) => group.isActive !== false && group.levelId === Number(formValues.parentLevelId)),
    [organizationGroups, formValues.parentLevelId],
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
      const selectedParentLevelId = organizationGroups.find(
        (group) => group.name === parent?.name,
      )?.levelId;
      onFormChange({
        name: selected.name ?? "",
        shortName: selected.code ?? "",
        levelId: selectedLevelId ?? "",
        parentLevelId: selectedParentLevelId ?? "",
        parentGroupId: selectedParentId ?? "",
      });
    }
  }, [availableLevels, isEdit, onFormChange, organizationGroups, organizationTree, selected]);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" }, gap: 2 }}>
      <ReadOnlyField label="Organization Name" value="vConstruct" />
      <TextField
        select label="Level" size="small" fullWidth value={formValues.levelId} error={Boolean(validationErrors.levelId)} helperText={validationErrors.levelId || ' '}
        onChange={(event) => {
          const nextLevelId = Number(event.target.value);
          const nextLevel = availableLevels.find((item) => item.id === nextLevelId);
          onFormChange({
            levelId: nextLevelId,
            parentLevelId: nextLevel?.parentLevelId ?? "",
            parentGroupId: "",
          });
        }}
        disabled={isEdit}
      >
        <MenuItem value="" disabled>Select level</MenuItem>
        {availableLevels
          .filter((item) => item.id !== 100 && item.isActive !== false && item.structure?.toLowerCase() === "vertical")
          .sort((a, b) => a.sequence - b.sequence)
          .map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
      </TextField>
      <TextField label="Group Name" size="small" value={formValues.name} error={Boolean(validationErrors.name)} helperText={validationErrors.name || ' '} disabled={isEdit} onChange={(event) => onFormChange({ name: event.target.value })} />
      <TextField label="Short Name" value={formValues.shortName} error={Boolean(validationErrors.shortName)} helperText={validationErrors.shortName || ' '} disabled={isEdit} onChange={(event) => onFormChange({ shortName: event.target.value })} size="small" />
      {parentLevelOptions.length > 0 && (
        <>
          <TextField
            select
            label="Parent Level"
            size="small"
            fullWidth
            value={formValues.parentLevelId}
            error={Boolean(validationErrors.parentLevelId)}
            helperText={validationErrors.parentLevelId || ' '}
            onChange={(event) => onFormChange({ parentLevelId: Number(event.target.value), parentGroupId: "" })}
          >
            {parentLevelOptions.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          </TextField>
        <TextField
          select label="Parent Group" size="small" fullWidth value={formValues.parentGroupId} error={Boolean(validationErrors.parentGroupId)} helperText={validationErrors.parentGroupId || ' '}
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
