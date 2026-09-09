import dashboardData from "@/shared/data/dashboard.data.json";

export interface DashboardUserEntry {
  id: string;
  displayName: string;
  fullName: string;
  employeeCode: string;
  completionPercentage: number;
}

interface DashboardDataStructure {
  users?: Record<string, DashboardUserEntry>;
}

const usersMap: Record<string, DashboardUserEntry> =
  (dashboardData as unknown as DashboardDataStructure).users || {};