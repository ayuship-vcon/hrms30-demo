import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { flattenTree, orgTree } from '@/features/vertical-org-structure/core/constants';
import type {
  AssignmentTab,
  Employee,
  OrganizationAssignments,
  VerticalOrganizationAssignmentState,
} from '@/features/vertical-org-structure/core/types';

const defaultEmployees: Employee[] = [
  { id: 'EMP001', name: 'Sample Employee 1', designation: 'Manager' },
  { id: 'EMP002', name: 'Sample Employee 2', designation: 'Architect' },
  { id: 'EMP003', name: 'Sample Employee 3', designation: 'Developer' },
];

const assignmentTabs: AssignmentTab[] = [
  'Team Co-Lead',
  'BU Lead',
  'Cluster Co-Lead',
  'Sub Cluster Co-Lead',
  'Leave Approvers',
];

const initialAssignments = Object.fromEntries(
  flattenTree(orgTree).map((node) => [
    String(node.id ?? `${node.level}:${node.name}`),
    Object.fromEntries(assignmentTabs.map((tab) => [tab, defaultEmployees.map((employee) => ({ ...employee }))])),
  ]),
) as Record<string, OrganizationAssignments>;

const initialState: VerticalOrganizationAssignmentState = {
  assignments: initialAssignments,
  lastUpdatedKey: null,
};

export const verticalOrgSlice = createSlice({
  name: 'verticalOrg',
  initialState,
  reducers: {
    setOrganizationAssignments: (
      state,
      action: PayloadAction<{ organizationKey: string; assignments: OrganizationAssignments }>,
    ) => {
      state.assignments[action.payload.organizationKey] = action.payload.assignments;
      state.lastUpdatedKey = action.payload.organizationKey;
    },
    assignEmployeesToOrganization: (
      state,
      action: PayloadAction<{ organizationKey: string; tab: AssignmentTab; employees: Employee[] }>,
    ) => {
      const { organizationKey, tab, employees } = action.payload;
      state.assignments[organizationKey] = {
        ...state.assignments[organizationKey],
        [tab]: employees,
      };
      state.lastUpdatedKey = organizationKey;
    },
    removeEmployeeFromOrganization: (
      state,
      action: PayloadAction<{ organizationKey: string; tab: AssignmentTab; employeeId: string }>,
    ) => {
      const { organizationKey, tab, employeeId } = action.payload;
      const current = state.assignments[organizationKey]?.[tab] ?? [];
      state.assignments[organizationKey] = {
        ...state.assignments[organizationKey],
        [tab]: current.filter((employee) => employee.id !== employeeId),
      };
      state.lastUpdatedKey = organizationKey;
    },
    clearOrganizationAssignments: (state, action: PayloadAction<string>) => {
      delete state.assignments[action.payload];
      state.lastUpdatedKey = action.payload;
    },
  },
});

export const {
  setOrganizationAssignments,
  assignEmployeesToOrganization,
  removeEmployeeFromOrganization,
  clearOrganizationAssignments,
} = verticalOrgSlice.actions;

export default verticalOrgSlice.reducer;
