import type { ElementType } from "react";

export type OrganizationLevel = "Company" | "Group" | "Team";

export interface OrganizationNode {
  id?: number | string;
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

export interface HorizontalOrganizationState {
  organizations: OrganizationNode[];
  selectedOrganization: SelectedOrganization;
  isLoading: boolean;
  error: string | null;
  lastOperation: "create" | "update" | "delete" | null;
}

export interface CreateHorizontalOrganizationInput {
  node: OrganizationNode;
  parentName?: string;
}

export interface UpdateHorizontalOrganizationInput {
  node: OrganizationNode;
}

export type HorizontalOrganizationResponse = OrganizationNode[] | { items: OrganizationNode[] };

