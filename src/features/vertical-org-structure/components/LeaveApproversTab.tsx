import { EmployeeAssignmentTab } from './EmployeeAssignmentTab';
import type { OrganizationTab, SelectedOrganization, AssignmentTab } from '../core/types';
export const LeaveApproversTab: React.FC<{
  selected: SelectedOrganization;
  activeTab: OrganizationTab;
}> = ({ activeTab, selected }) => <EmployeeAssignmentTab selected={selected} activeTab={activeTab as AssignmentTab} />;
