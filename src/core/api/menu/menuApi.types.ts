/**
 * Raw Menu Item structure received directly from the Menu Rights API
 */
export interface RawApiMenuItem {
  roleId: string | number | null;
  role: string | null;
  groupIds: string | number | null;
  groups: string | null;
  rightKey: string;
  menuName: string;
  rightType: string;
  route: string | null;
  icon: string | null;
  parentKey: string | null;
  sequence: number;
  rightValue: number | string | boolean | null;
}

/** Access-right record returned by GET /AccessRights/{employeeId}. */
export interface AccessRight {
  id?: number;
  rightKey: string;
  name?: string | null;
  shortName?: string | null;
  description?: string | null;
  rightDefault?: number | boolean | null;
  rightAdmin?: number | boolean | null;
  rightType?: string | null;
  isActive?: boolean | number | null;
  [key: string]: unknown;
}

/**
 * Transformed Child Menu Item
 */
export interface MenuItem {
  title: string;
  route: string;
  icon?: string;
  sequence: number;
  rightKey: string;
  rightValue: number;
}

/**
 * Transformed Root Menu Group (Accordion / Section)
 */
export interface MenuGroup {
  id: string;
  menu: string;
  sequence: number;
  icon?: string;
  menuitems: MenuItem[];
}

export type EmployeeUserId = string | number;
