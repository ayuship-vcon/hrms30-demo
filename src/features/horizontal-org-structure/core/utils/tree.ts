import type {
  OrganizationNode,
  OrganizationNodeWithParent,
} from "../types/horizontal-org.types";

export const flattenTree = (
  tree: OrganizationNode[],
): OrganizationNodeWithParent[] => {
  const result: OrganizationNodeWithParent[] = [];
  const traverse = (nodes: OrganizationNode[], parent: OrganizationNode | null = null) => {
    nodes.forEach((node) => {
      result.push({ ...node, parent });
      if (node.children) traverse(node.children, node);
    });
  };
  traverse(tree);
  return result;
};

export const findParent = (
  tree: OrganizationNode[],
  targetName: string,
  parent: OrganizationNode | null = null,
): OrganizationNode | null => {
  for (const node of tree) {
    if (node.name === targetName) return parent;
    if (node.children) {
      const found = findParent(node.children, targetName, node);
      if (found) return found;
    }
  }
  return null;
};

