import { useEffect, useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { findParent, flattenTree } from "../core/utils/tree";
import {
  orgTree,
  parentGroupList,
  parentGroupOptions,
  parentOrganizations,
} from "../core/constants/binding";
import type {
  SelectedOrganization,
  OrganizationLevel,
} from "../core/types/horizontal-org.types";
import ActionButtons from "./ActionButtons";
import type { OrganizationNode } from "../core/types/horizontal-org.types";
import { useAppSelector } from "@/core/redux";
import { selectHorizontalOrganizations } from "@/core/redux/horizontal-org";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";

interface AddEditTabProps {
  selected: SelectedOrganization;
  onSave: (node: OrganizationNode, parentName?: string) => void;
  onReset: () => void;
  onDelete?: () => void;
}
const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <TextField
    label={label}
    value={value}
    fullWidth
    size="small"
    disabled
    slotProps={{ input: { readOnly: true } }}
  />
);

export const AddEditTab = ({
  selected,
  onSave,
  onReset,
  onDelete,
}: AddEditTabProps) => {
  const organizations = useAppSelector(selectHorizontalOrganizations);
  const [status, setStatus] = useState("Active");
  const [groupName, setGroupName] = useState("");
  const [level, setLevel] = useState<OrganizationLevel | "">("");
  const [parentGroup, setParentGroup] = useState<OrganizationLevel | "">("");
  const [parentGroupName, setParentGroupName] = useState("");
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isEdit = Object.keys(selected).length > 0;

  useEffect(() => {
    setLevel(selected.level ?? "");
    setGroupName(selected.name ?? "");
    setShortName(selected.code ?? "");
    setDescription(
      isEdit
        ? "Team responsible for regional operations and implementation delivery."
        : "",
    );
    const parent = selected.name ? findParent(orgTree, selected.name) : null;
    setParentGroup(parent?.level ?? "");
    setParentGroupName(parent?.name ?? "");
    setErrors({});
  }, [selected, isEdit]);

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  const handleLevelChange = (value: string) => {
    const nextLevel = value as OrganizationLevel;
    setLevel(nextLevel);
    setParentGroup(parentGroupOptions[nextLevel]?.[0] ?? "");
    setParentGroupName("");
    clearError("level");
    clearError("parentGroupName");
  };

  const handleSave = () => {
    const nextErrors: Record<string, string> = {};
    if (!level) nextErrors.level = "Select a level.";
    if (!groupName.trim()) nextErrors.groupName = "Enter a name.";
    else if (groupName.trim().length < 2) nextErrors.groupName = "Enter at least 2 characters.";
    if (!shortName.trim()) nextErrors.shortName = "Enter a short name.";
    else if (!/^[a-z0-9_-]+$/i.test(shortName.trim())) {
      nextErrors.shortName = "Use only letters, numbers, hyphens, or underscores.";
    }
    if (level === "Team" && !parentGroupName) {
      nextErrors.parentGroupName = "Select a parent group.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const icon = level === "Group" ? WorkIcon : GroupIcon;
    onSave(
      {
        id: selected.id,
        name: groupName.trim(),
        level,
        code: shortName.trim(),
        icon,
        children: selected.children,
      },
      parentGroupName || (level === "Group" ? "vConstruct" : undefined),
    );
  };

  const availableParentGroups = parentGroup
    ? Array.from(new Set([
        ...(parentGroupList[parentGroup as OrganizationLevel] ?? []),
        ...flattenTree(organizations)
          .filter((node) => node.level === parentGroup)
          .map((node) => node.name),
      ]))
    : [];

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
          gap: 2,
        }}
      >
        <ReadOnlyField label="Organization Name" value="vConstruct" />
        <TextField
          select
          label="Level"
          size="small"
          fullWidth
          value={level}
          error={Boolean(errors.level)}
          helperText={errors.level || " "}
          onChange={(event) => handleLevelChange(event.target.value)}
          disabled={isEdit}
        >
          {parentOrganizations.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Name"
          size="small"
          value={groupName}
          disabled={isEdit}
          error={Boolean(errors.groupName)}
          helperText={errors.groupName || " "}
          onChange={(event) => {
            setGroupName(event.target.value);
            clearError("groupName");
          }}
        />
        <TextField
          label="Short Name"
          value={shortName}
          disabled={isEdit}
          error={Boolean(errors.shortName)}
          helperText={errors.shortName || " "}
          onChange={(event) => {
            setShortName(event.target.value);
            clearError("shortName");
          }}
          size="small"
        />
        {parentGroupOptions[level as OrganizationLevel]?.length > 0 && (
          <TextField
            select
            label="Parent Group"
            size="small"
            fullWidth
            value={parentGroupName}
            disabled={isEdit}
            error={Boolean(errors.parentGroupName)}
            helperText={errors.parentGroupName || " "}
            onChange={(event) => {
              setParentGroupName(event.target.value);
              clearError("parentGroupName");
            }}
          >
            {availableParentGroups.map(
              (item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ),
            )}
          </TextField>
        )}
        <TextField
          select
          fullWidth
          size="small"
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <TextField
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          multiline
          minRows={4}
          fullWidth
          sx={{ gridColumn: { md: "1 / -1" } }}
        />
      </Box>
      <ActionButtons
        onSave={handleSave}
        onReset={onReset}
        selected={selected}
      />
    </>
  );
};

export default AddEditTab;
