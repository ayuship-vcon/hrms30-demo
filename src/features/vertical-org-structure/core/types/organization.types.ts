import type { SvgIconComponent } from '@mui/icons-material';

export type OrganizationLevel = 'Company' | 'BU' | 'Cluster' | 'SubCluster' | 'Team' | "Group" | "Team";

export interface OrganizationNode {
  id?: number;
  name: string;
  level: OrganizationLevel;
  code: string;
  icon?: SvgIconComponent;
  children?: OrganizationNode[];
}

export interface Metric {
  label: string;
  value: number;
  background: string;
  color: string;
}

export type SelectedOrganization = Partial<OrganizationNode>;

export type OrganizationTab =
  | 'Add'
  | 'Team Co-Lead'
  | 'BU Lead'
  | 'Cluster Co-Lead'
  | 'Sub Cluster Co-Lead'
  | 'Leave Approvers';

export interface Employee {
  id: string;
  name: string;
  designation: string;
  primary?: string;
}

export type AssignmentTab = Exclude<OrganizationTab, 'Add'>;

export type OrganizationAssignments = Partial<Record<AssignmentTab, Employee[]>>;

export interface VerticalOrganizationAssignmentState {
  assignments: Record<string, OrganizationAssignments>;
  lastUpdatedKey: string | null;
}

export const getOrganizationKey = (organization: SelectedOrganization): string =>
  String(organization.id ?? `${organization.level ?? 'organization'}:${organization.name ?? 'new'}`);
