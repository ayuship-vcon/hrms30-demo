import type { RootState } from "../rootReducer";
import type {
  OrganizationNode,
  SelectedOrganization,
} from "@/features/horizontal-org-structure/core/types/horizontal-org.types";

export const selectHorizontalOrgState = (state: RootState) =>
  state.horizontalOrg;
export const selectHorizontalOrganizations = (
  state: RootState,
): OrganizationNode[] => state.horizontalOrg.organizations;
export const selectSelectedHorizontalOrganization = (
  state: RootState,
): SelectedOrganization => state.horizontalOrg.selectedOrganization;
export const selectHorizontalOrgLoading = (state: RootState): boolean =>
  state.horizontalOrg.isLoading;
export const selectHorizontalOrgError = (state: RootState): string | null =>
  state.horizontalOrg.error;
