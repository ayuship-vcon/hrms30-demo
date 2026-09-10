import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import type {
  OrganizationMetric,
  OrganizationNode,
  OrganizationLevel,
} from "../types/horizontal-org.types";

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
        name: "Quality Assurance",
        level: "Group",
        code: "QA",
        icon: WorkIcon,
        children: [
          { name: "Operations", level: "Team", code: "OP" },
          { name: "AI/ML", level: "Team", code: "SW" },
        ],
      },
      {
        id: 3,
        name: "Software Solutions",
        level: "Group",
        code: "SS",
        icon: WorkIcon,
        children: [
          { name: "Office 365", level: "Team", code: "O365" },
          { name: "Integration Planning", level: "Team", code: "IP" },
        ],
      },
      {
        id: 6,
        name: "Data Analytics",
        level: "Group",
        code: "DA",
        icon: WorkIcon,
        children: [{ name: "Niramaan", level: "Team", code: "Niramaan" }],
      },
    ],
  },
];

export const metrics: OrganizationMetric[] = [
  { label: "Company", value: 1, background: "#eef2ff", color: "#322a88" },
  { label: "Functional Groups", value: 3, background: "#f5f3ff", color: "#7c3aed" },
  { label: "Functional Teams", value: 5, background: "#ecfdf5", color: "#047857" },
];

export const parentOrganizations: OrganizationLevel[] = ["Group", "Team"];
export const parentGroupOptions: Record<OrganizationLevel, OrganizationLevel[]> = {
  Company: [],
  Group: [],
  Team: ["Group"],
};
export const parentGroupList: Record<OrganizationLevel, string[]> = {
  Company: [],
  Group: ["Software Solutions", "Quality Assurance", "Data Analytics"],
  Team: ["Operations", "Delivery", "Support"],
};

