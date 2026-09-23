import type { SvgIconComponent } from '@mui/icons-material';

export type OrganizationLevel = 'Company' | 'BU' | 'Cluster' | 'SubCluster' | 'Team';

export interface OrganizationNode {
  id?: number;
  name: string;
  level?: string;
  code: string;
  icon?: SvgIconComponent;
  children?: OrganizationNode[];
}

export type SelectedOrganization = Partial<OrganizationNode>;