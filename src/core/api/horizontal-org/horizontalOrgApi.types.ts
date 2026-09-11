import type { OrganizationNode } from '@/features/horizontal-org-structure/core/types/horizontal-org.types';

export interface CreateHorizontalOrganizationRequest {
  node: OrganizationNode;
  parentName?: string;
}

export type UpdateHorizontalOrganizationRequest = OrganizationNode;
