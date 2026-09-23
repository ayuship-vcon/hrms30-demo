import { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupIcon from "@mui/icons-material/Group";
import type { OrganizationNode, SelectedOrganization } from "../types/treenode.types";

interface TreeNodeProps {
  node: OrganizationNode;
  selected: SelectedOrganization;
  onSelect: (node: SelectedOrganization) => void;
  collapseTrigger: number;
  expandTrigger: number;
}

 const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  selected,
  onSelect,
  collapseTrigger,
  expandTrigger,
}) => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (collapseTrigger > 0) setOpen(false);
  }, [collapseTrigger]);
  useEffect(() => {
    if (expandTrigger > 0) setOpen(true);
  }, [expandTrigger]);
  const hasChildren = Boolean(node.children?.length);
  const NodeIcon = node.icon ?? GroupIcon;
  const active = selected.name === node.name;

  return (
    <Box>
      <Box
        onClick={() => onSelect(node?.level === "Company" ? {} : node)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1,
          py: 0.8,
          borderRadius: 2.5,
          cursor: "pointer",
          color: active ? "#fff" : "text.primary",
          backgroundColor: active ? "primary.main" : "transparent",
          transition: "0.2s",
          "&:hover": { backgroundColor: active ? "primary.dark" : "grey.100" },
        }}
      >
        {hasChildren ? (
          <IconButton
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((previous) => !previous);
            }}
            sx={{ color: "inherit", p: 0.25 }}
          >
            {open ? (
              <ExpandMoreIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            )}
          </IconButton>
        ) : (
          <Box sx={{ width: 28 }} />
        )}
        <NodeIcon fontSize="small" />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={700} noWrap>
            {node.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: active ? alpha("#fff", 0.75) : "text.secondary" }}
          >
            {node.level} · {node.code}
          </Typography>
        </Box>
      </Box>
      {hasChildren && (
        <Stack
          spacing={0.5}
          sx={{
            display: open ? "flex" : "none",
            mt: 0.5,
            ml: 2.5,
            pl: 1,
            borderLeft: "1px dashed",
            borderColor: "divider",
          }}
        >
          {node.children?.map((child) => (
            <TreeNode
              key={`${child.level}-${child.name}`}
              node={child}
              selected={selected}
              onSelect={onSelect}
              collapseTrigger={collapseTrigger}
              expandTrigger={expandTrigger}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TreeNode;