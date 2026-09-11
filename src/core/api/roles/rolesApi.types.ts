export interface CoreRole {
  id: number;
  name: string;
  shortName: string | null;
  roleType: string | null;
  sequence: number;
  isActive: boolean;
  [key: string]: unknown;
}
