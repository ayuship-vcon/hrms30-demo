import type { AccessRight, RawApiMenuItem, MenuGroup, MenuItem } from '@/core/api/menu';

/**
 * Checks if a value represents null/empty from backend ("NULL", null, undefined, "")
 */
function isNullOrEmpty(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  const str = String(val).trim();
  return str === '' || str.toUpperCase() === 'NULL';
}

function hasAccess(rightValue: unknown): boolean {
  if (rightValue === null || rightValue === undefined || rightValue === '') return true;
  if (typeof rightValue === 'boolean') return rightValue;
  if (typeof rightValue === 'number') return rightValue > 0;
  return ['1', 'true', 'yes', 'allow', 'allowed'].includes(String(rightValue).trim().toLowerCase());
}

const normalizeRightKey = (value: unknown) =>
  String(value ?? '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');

const accessRightIsAllowed = (right: AccessRight): boolean =>
  right.isActive !== false &&
  (hasAccess(right.rightAdmin) || hasAccess(right.rightDefault));

/** Menu metadata used when /AccessRights/{id} returns permission records only. */
const ACCESS_RIGHT_MENU: Array<RawApiMenuItem & { aliases?: string[] }> = [
  { rightKey: 'horizontal_emp', aliases: ['employee_list', 'employees'], menuName: 'Employee List', rightType: 'Menu', route: '/employee-list', icon: 'PeopleOutlined', parentKey: 'WORKFORCE', sequence: 1, roleId: null, role: null, groupIds: null, groups: null, rightValue: 1 },
  { rightKey: 'horizontal_org_str', aliases: ['horizontal_structure'], menuName: 'Horizontal Structure', rightType: 'Menu', route: '/configurations/horizontal-structure', icon: 'AccountTreeOutlined', parentKey: 'CONFIGURATIONS', sequence: 1, roleId: null, role: null, groupIds: null, groups: null, rightValue: 1 },
  { rightKey: 'vertical_org_str', aliases: ['vertical_structure'], menuName: 'Vertical Structure', rightType: 'Menu', route: '/configurations/vertical-structure', icon: 'AccountTreeOutlined', parentKey: 'CONFIGURATIONS', sequence: 2, roleId: null, role: null, groupIds: null, groups: null, rightValue: 1 },
  { rightKey: 'roles_privileges', aliases: ['roles_privileges'], menuName: 'Roles & Privileges', rightType: 'Menu', route: '/configurations/roles-privileges', icon: 'AdminPanelSettingsOutlined', parentKey: 'CONFIGURATIONS', sequence: 3, roleId: null, role: null, groupIds: null, groups: null, rightValue: 1 },
  { rightKey: 'add_emp', aliases: ['add_emp'], menuName: 'Employee Onboarding', rightType: 'Menu', route: '/add-employee', icon: 'AdminPanelSettingsOutlined', parentKey: 'WORKFORCE', sequence: 4, roleId: null, role: null, groupIds: null, groups: null, rightValue: 1 },
  { rightKey: 'apply-leave', aliases: ['apply-leave'], menuName: 'Apply Leave', rightType: 'Menu', route: '/apply-leave', icon: 'AdminPanelSettingsOutlined', parentKey: 'WORKFORCE', sequence: 5, roleId: null, role: null, groupIds: null, groups: null, rightValue: 1 },
];

const ACCESS_RIGHT_GROUPS: RawApiMenuItem[] = [
  { rightKey: 'WORKFORCE', menuName: 'Workforce', rightType: 'Group', route: null, icon: 'PeopleOutlined', parentKey: null, sequence: 1, roleId: null, role: null, groupIds: null, groups: null, rightValue: 1 },
  { rightKey: 'CONFIGURATIONS', menuName: 'Configurations', rightType: 'Group', route: null, icon: 'SettingsOutlined', parentKey: null, sequence: 3, roleId: null, role: null, groupIds: null, groups: null, rightValue: 1 },
];

/**
 * Transforms flat raw database API menu items into a sorted, hierarchical structure.
 *
 * Rules:
 * 1. Root Group: Items where parentKey is "NULL", null, or empty.
 * 2. Child Item: Items where parentKey matches a Root Group's rightKey.
 * 3. Root Sorting: Sorted ascending by sequence (1, 2, 3...).
 * 4. Child Sorting: Sorted ascending by child sequence (1, 2, 3...).
 */
export function transformApiMenuToHierarchy(rawItems: Array<RawApiMenuItem | AccessRight>): MenuGroup[] {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return [];
  }

  const isAccessRightRecord = (item: RawApiMenuItem | AccessRight): item is AccessRight =>
    typeof item.rightKey === 'string' && !('menuName' in item);

  // Normalize the access-right DTO into menu rows when the API does not return
  // menu metadata. This keeps the sidebar driven by rightKey rather than name.
  if (rawItems.some(isAccessRightRecord)) {
    const allowed = new Set(
      rawItems.filter(isAccessRightRecord).filter(accessRightIsAllowed).map((right) => normalizeRightKey(right.rightKey)),
    );
    const menuItems = ACCESS_RIGHT_MENU.filter((item) =>
      [item.rightKey, ...(item.aliases ?? [])].some((key) => allowed.has(normalizeRightKey(key))),
    );
    const groups = ACCESS_RIGHT_GROUPS.filter((group) =>
      menuItems.some((item) => item.parentKey === group.rightKey),
    );
    rawItems = [...groups, ...menuItems];
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
  const childItems = rawItems.filter(
    (item) => !isNullOrEmpty(item.parentKey) && hasAccess(item.rightValue),
  );

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
        rightValue: Number(child.rightValue) || (hasAccess(child.rightValue) ? 1 : 0),
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
