import type { ElementType } from "react";

export type OrganizationLevel = "Company" | "Group" | "Team";

export interface OrganizationNode {
  id?: number;
  name: string;
  level: OrganizationLevel;
  code: string;
  icon?: ElementType;
  children?: OrganizationNode[];
}

export interface OrganizationNodeWithParent extends OrganizationNode {
  parent: OrganizationNode | null;
}

export interface OrganizationMetric {
  label: string;
  value: number;
  background: string;
  color: string;
}

export type SelectedOrganization = Partial<OrganizationNode>;

