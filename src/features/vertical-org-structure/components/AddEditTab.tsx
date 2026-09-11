import { useEffect, useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import {
  findParent,
  orgTree,
  parentGroupList,
  parentGroupOptions,
  parentOrganizations,
} from "../core/constants";
import type { SelectedOrganization } from "../core/types";
import type { OrganizationNode } from "../core/types";

const ReadOnlyField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <TextField
    label={label}
    value={value}
    fullWidth
    size="small"
    disabled
    InputProps={{ readOnly: true }}
  />
);
export const AddEditTab: React.FC<{
  selected: SelectedOrganization;
  organizationTree?: OrganizationNode[];
}> = ({ selected, organizationTree = orgTree }) => {
  const [status, setStatus] = useState("Active");
  const [groupName, setGroupName] = useState("");
  const [level, setLevel] = useState("");
  const [parentGroup, setParentGroup] = useState("");
  const [parentGroupName, setParentGroupName] = useState("");
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");
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
    const parent = findParent(organizationTree, selected.name);
    setParentGroup(parent?.level ?? "");
    setParentGroupName(parent?.name ?? "");
  }, [selected, isEdit, organizationTree]);
  const handleLevelChange = (value: string) => {
    setLevel(value);
    setParentGroup(parentGroupOptions[value]?.[0] ?? "");
    setParentGroupName("");
  };
  return (
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
        label="Group Name"
        size="small"
        value={groupName}
        disabled={isEdit}
        onChange={(event) => setGroupName(event.target.value)}
      />
      <TextField
        label="Short Name"
        value={shortName}
        disabled={isEdit}
        onChange={(event) => setShortName(event.target.value)}
        size="small"
      />
      {parentGroupOptions[level]?.length > 0 && (
        <TextField
          select
          label="Parent Group"
          size="small"
          fullWidth
          value={parentGroup}
          onChange={(event) => {
            setParentGroup(event.target.value);
            setParentGroupName("");
          }}
        >
          {parentGroupOptions[level].map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </TextField>
      )}
      {parentGroupOptions[level]?.length > 0 && (
        <TextField
          select
          label={`${parentGroup} Name`}
          size="small"
          fullWidth
          value={parentGroupName}
          onChange={(event) => setParentGroupName(event.target.value)}
        >
          {(parentGroupList[parentGroup] ?? []).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
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
  );
};
