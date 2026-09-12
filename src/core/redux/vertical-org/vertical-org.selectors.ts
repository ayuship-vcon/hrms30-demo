import type { RootState } from '../rootReducer';
import type { AssignmentTab, Employee, SelectedOrganization } from '@/features/vertical-org-structure/core/types';
import { getOrganizationKey } from '@/features/vertical-org-structure/core/types';

export const selectVerticalOrgState = (state: RootState) => state.verticalOrg;
export const selectOrganizationAssignments = (state: RootState, organization: SelectedOrganization) =>
  state.verticalOrg.assignments[getOrganizationKey(organization)] ?? {};
export const selectAssignedEmployees = (
  state: RootState,
  organization: SelectedOrganization,
  tab: AssignmentTab,
): Employee[] => selectOrganizationAssignments(state, organization)[tab] ?? [];
