export interface OrganizationGroup {
  id: number;
  name: string;
  levelId: number;
  parentGroupId: number | null;
  shortName: string | null;
  groupPath: string | null;
  isActive: boolean;
  [key: string]: unknown;
}

export interface CreateOrganizationGroupRequest {
  name: string;
  levelId: number;
  parentGroupId: number;
  groupPath: string | null;
  shortName: string;
}

export interface OrganizationLevel {
  id: number;
  name: string;
  parentLevelId: number | null;
  shortName: string | null;
  levelType: string | null;
  sequence: number;
  structure: string | null;
  isActive: boolean;
  [key: string]: unknown;
}

export interface OrganizationCollection<T> {
  items: T[];
  totalCount?: number;
  pageNo?: number;
  pageSize?: number;
}
