import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import type { Metric, OrganizationLevel, OrganizationNode } from "../types";

export const orgTree: OrganizationNode[] = [
  {
    id: 1,
    name: "vConstruct",
    level: "Company",
    code: "VCONSTRUCT",
    icon: BusinessIcon,
    children: [
      {
        id: 2,
        name: "Virtual Builder",
        level: "BU",
        code: "VB",
        icon: WorkIcon,
        children: [
          {
            name: "Operations",
            level: "Cluster",
            code: "OP",
            icon: AccountTreeIcon,
            children: [
              { name: "Northwest", level: "Team", code: "NW" },
              { name: "Southwest", level: "Team", code: "SW" },
              { name: "East Coast & Central", level: "Team", code: "EC&C" },
              {
                name: "West Coast & International",
                level: "Team",
                code: "WC&I",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Software Solutions for Construction",
        level: "BU",
        code: "SSC",
        icon: WorkIcon,
        children: [
          { name: "Office 365", level: "Team", code: "O365" },
          { name: "Integration Planning", level: "Team", code: "IP" },
        ],
      },
      {
        id: 4,
        name: "Design Science & Analytics",
        level: "BU",
        code: "DSA",
        icon: WorkIcon,
        children: [
          { name: "Data Analytics", level: "Team", code: "DA" },
          { name: "Data Engineering", level: "Team", code: "DE" },
        ],
      },
      {
        id: 5,
        name: "Corporate Functions",
        level: "BU",
        code: "CF",
        icon: WorkIcon,
        children: [
          { name: "HR-ops", level: "Team", code: "HR" },
          {
            name: "Systems",
            level: "Cluster",
            code: "Sys",
            icon: AccountTreeIcon,
            children: [{ name: "Enterprise App", level: "Team", code: "EA" }],
          },
        ],
      },
      {
        id: 6,
        name: "VC Labs",
        level: "BU",
        code: "VCLab",
        icon: WorkIcon,
        children: [{ name: "Niramaan", level: "Team", code: "Niramaan" }],
      },
    ],
  },
];

export const metrics: Metric[] = [
  {
    label: "Business Units",
    value: 5,
    background: "#eef2ff",
    color: "#322a88",
  },
  { label: "Clusters", value: 2, background: "#f5f3ff", color: "#7c3aed" },
  { label: "Teams", value: 12, background: "#ecfdf5", color: "#047857" },
  { label: "Sub Cluster", value: 5, background: "#eff6ff", color: "#0646f5" },
];

export const TAB_CONFIG: Record<OrganizationLevel, string[]> = {
  Company: ["Add", "Team Co-Lead", "Leave Approvers"],
  BU: ["Add", "BU Lead"],
  Cluster: ["Add", "Cluster Co-Lead"],
  Team: ["Add", "Team Co-Lead", "Leave Approvers"],
  SubCluster: ["Add", "Sub Cluster Co-Lead"],
};

export const parentOrganizations: OrganizationLevel[] = [
  "BU",
  "Cluster",
  "SubCluster",
  "Team",
];
export const parentGroupOptions: Record<string, string[]> = {
  BU: [],
  Cluster: ["BU"],
  SubCluster: ["BU", "Cluster"],
  Team: ["BU", "Cluster", "SubCluster"],
};
export const parentGroupList: Record<string, string[]> = {
  BU: ["Virtual Builder", "Digital Services", "Engineering"],
  Cluster: ["Operations", "Delivery", "Support"],
  SubCluster: ["Northwest", "Southwest", "Central"],
};
export const leadTabs = [
  "Team Co-Lead",
  "BU Lead",
  "Cluster Co-Lead",
  "Sub Cluster Co-Lead",
];

export const flattenTree = (tree: OrganizationNode[]) => {
  const result: Array<OrganizationNode & { parent: OrganizationNode | null }> =
    [];
  const traverse = (
    nodes: OrganizationNode[],
    parent: OrganizationNode | null = null,
  ) => {
    nodes.forEach((node) => {
      result.push({ ...node, parent });
      if (node.children) traverse(node.children, node);
    });
  };
  traverse(tree);
  return result;
};

export const findParent = (
  tree: OrganizationNode[],
  targetName?: string,
  parent: OrganizationNode | null = null,
): OrganizationNode | null => {
  for (const node of tree) {
    if (node.name === targetName) return parent;
    if (node.children) {
      const found = findParent(node.children, targetName, node);
      if (found) return found;
    }
  }
  return null;
};
