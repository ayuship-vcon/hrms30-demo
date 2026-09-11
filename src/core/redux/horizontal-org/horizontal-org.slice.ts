import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { orgTree } from "@/features/horizontal-org-structure/core/constants/binding";
import type {
  CreateHorizontalOrganizationInput,
  HorizontalOrganizationState,
  OrganizationNode,
  SelectedOrganization,
  UpdateHorizontalOrganizationInput,
} from "@/features/horizontal-org-structure/core/types/horizontal-org.types";

const cloneTree = (tree: OrganizationNode[]): OrganizationNode[] =>
  tree.map((node) => ({
    ...node,
    children: node.children ? cloneTree(node.children) : undefined,
  }));

const nodeKey = (node: OrganizationNode): string =>
  String(node.id ?? `${node.level}:${node.name}`);

const updateTree = (
  tree: OrganizationNode[],
  predicate: (node: OrganizationNode) => boolean,
  updater: (node: OrganizationNode) => OrganizationNode | null,
): OrganizationNode[] =>
  tree.flatMap((node) => {
    if (predicate(node)) {
      const nextNode = updater(node);
      return nextNode ? [nextNode] : [];
    }
    return [
      {
        ...node,
        children: node.children
          ? updateTree(node.children, predicate, updater)
          : undefined,
      },
    ];
  });

const findNode = (
  tree: OrganizationNode[],
  key: string,
): OrganizationNode | null => {
  for (const node of tree) {
    if (nodeKey(node) === key) return node;
    const childMatch = node.children ? findNode(node.children, key) : null;
    if (childMatch) return childMatch;
  }
  return null;
};

const addToParent = (
  tree: OrganizationNode[],
  parentName: string,
  child: OrganizationNode,
): OrganizationNode[] =>
  tree.map((node) => {
    if (node.name === parentName)
      return { ...node, children: [...(node.children ?? []), child] };
    return {
      ...node,
      children: node.children
        ? addToParent(node.children, parentName, child)
        : undefined,
    };
  });

const initialState: HorizontalOrganizationState = {
  organizations: cloneTree(orgTree),
  selectedOrganization: {},
  isLoading: false,
  error: null,
  lastOperation: null,
};

export const horizontalOrgSlice = createSlice({
  name: "horizontalOrg",
  initialState,
  reducers: {
    setHorizontalOrganizations: (
      state,
      action: PayloadAction<OrganizationNode[]>,
    ) => {
      state.organizations = cloneTree(action.payload);
      state.error = null;
    },
    setHorizontalOrgLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHorizontalOrgError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    selectHorizontalOrganization: (
      state,
      action: PayloadAction<SelectedOrganization>,
    ) => {
      state.selectedOrganization = action.payload;
    },
    clearHorizontalOrganizationSelection: (state) => {
      state.selectedOrganization = {};
    },
    addHorizontalOrganization: (
      state,
      action: PayloadAction<CreateHorizontalOrganizationInput>,
    ) => {
      const { node, parentName } = action.payload;
       const createdNode: OrganizationNode = { ...node, id: node.id ?? `${node.level}:${node.name}` };
       state.organizations = parentName
         ? addToParent(state.organizations, parentName, createdNode)
         : [...state.organizations, createdNode];
       state.selectedOrganization = createdNode;
      state.lastOperation = "create";
      state.error = null;
    },
    updateHorizontalOrganization: (
      state,
      action: PayloadAction<UpdateHorizontalOrganizationInput>,
    ) => {
      const { node } = action.payload;
      state.organizations = updateTree(
        state.organizations,
        (current) => nodeKey(current) === nodeKey(node),
        (current) => ({
          ...current,
          ...node,
          children: node.children ?? current.children,
        }),
      );
      state.selectedOrganization = node;
      state.lastOperation = "update";
      state.error = null;
    },
    deleteHorizontalOrganization: (
      state,
      action: PayloadAction<string | number>,
    ) => {
      const key = String(action.payload);
      const deleted = findNode(state.organizations, key);
      if (!deleted || deleted.level === "Company") {
        state.error = "The company root cannot be deleted.";
        return;
      }
      state.organizations = updateTree(
        state.organizations,
        (node) => nodeKey(node) === key,
        () => null,
      );
      if (nodeKey(state.selectedOrganization as OrganizationNode) === key)
        state.selectedOrganization = {};
      state.lastOperation = "delete";
      state.error = null;
    },
    resetHorizontalOrganizations: (state) => {
      state.organizations = cloneTree(orgTree);
      state.selectedOrganization = {};
      state.error = null;
      state.lastOperation = null;
    },
  },
});

export const {
  setHorizontalOrganizations,
  setHorizontalOrgLoading,
  setHorizontalOrgError,
  selectHorizontalOrganization,
  clearHorizontalOrganizationSelection,
  addHorizontalOrganization,
  updateHorizontalOrganization,
  deleteHorizontalOrganization,
  resetHorizontalOrganizations,
} = horizontalOrgSlice.actions;

export default horizontalOrgSlice.reducer;
