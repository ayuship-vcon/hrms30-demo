import type { RawApiMenuItem, MenuGroup, MenuItem } from '@/core/api/menu';

/**
 * Checks if a value represents null/empty from backend ("NULL", null, undefined, "")
 */
function isNullOrEmpty(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  const str = String(val).trim();
  return str === '' || str.toUpperCase() === 'NULL';
}

/**
 * Transforms flat raw database API menu items into a sorted, hierarchical structure.
 *
 * Rules:
 * 1. Root Group: Items where parentKey is "NULL", null, or empty.
 * 2. Child Item: Items where parentKey matches a Root Group's rightKey.
 * 3. Root Sorting: Sorted ascending by sequence (1, 2, 3...).
 * 4. Child Sorting: Sorted ascending by child sequence (1, 2, 3...).
 */
export function transformApiMenuToHierarchy(rawItems: RawApiMenuItem[]): MenuGroup[] {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return [];
  }

  // The menu endpoint is already scoped to the logged-in user. Every returned
  // row is therefore a menu permission record that should be represented.
  // rightValue is preserved for downstream permission checks, not used to
  // hide rows here because valid responses can contain rightValue: 0.

  // 1. Identify Root Menu Groups (parentKey === "NULL")
  const rootItems = rawItems.filter((item) => isNullOrEmpty(item.parentKey));

  // 2. Sort Root Groups by sequence
  rootItems.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

  // 3. Extract Child Items
  const childItems = rawItems.filter((item) => !isNullOrEmpty(item.parentKey));

  // 4. Map each Root Group to its child items
  const menuGroups: MenuGroup[] = rootItems.map((root) => {
    const children = childItems.filter(
      (child) => child.parentKey === root.rightKey,
    );

    children.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

    const transformedMenuItems: MenuItem[] = children.map((child) => {
      const cleanRoute = isNullOrEmpty(child.route) ? '' : String(child.route).trim();
      const cleanIcon = isNullOrEmpty(child.icon) ? undefined : String(child.icon).trim();

      return {
        title: child.menuName,
        route: cleanRoute,
        icon: cleanIcon,
        sequence: child.sequence || 0,
        rightKey: child.rightKey,
        rightValue: typeof child.rightValue === 'number' ? child.rightValue : 0,
      };
    });

    const cleanParentIcon = isNullOrEmpty(root.icon) ? undefined : String(root.icon).trim();

    return {
      id: root.rightKey,
      menu: root.menuName,
      sequence: root.sequence || 0,
      icon: cleanParentIcon,
      menuitems: transformedMenuItems,
    };
  });

  return menuGroups.filter((group) => group.menuitems.length > 0);
}

/**
 * Extracts a flat list of all active allowed routes from menu groups for route guarding
 */
export function extractAllowedRoutesFromMenu(groups: MenuGroup[]): Set<string> {
  const allowed = new Set<string>();

  // Dashboard routes always allowed
  allowed.add('/');
  allowed.add('/dashboard');
    allowed.add('/auth/login');
  allowed.add('/success');

  groups.forEach((group) => {
    group.menuitems.forEach((item) => {
      if (item.route && item.route !== 'NULL') {
        allowed.add(item.route);
      }
    });
  });

  if (allowed.size === 0) {
    allowed.add('/dashboard');
  }

  return allowed;
}
