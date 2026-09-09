import type { BaseEntity } from '@/shared/types/common.types';

export interface AuditLog extends BaseEntity {
  action: string;
  performedBy: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface AdminSettings {
  companyName: string;
  defaultTimezone: string;
  fiscalYearStart: string;
  mfaEnforced: boolean;
  autoApproveLeavesUnderDays: number;
}

export interface AdminState {
  settings: AdminSettings;
  auditLogs: AuditLog[];
  isLoading: boolean;
  error: string | null;
}
