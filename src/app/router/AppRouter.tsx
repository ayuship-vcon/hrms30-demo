import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes.constants";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";
import { PublicRoute } from "@/shared/components/PublicRoute";
import { PageLoader } from "@/shared/components/Loading/PageLoader";
import { useAuth } from "@/features/authentication";
import { GenericFeaturePage } from "@/shared/components/GenericFeaturePage";

// Layouts
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout/AuthLayout";

// Feature Pages
import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  AuthSuccessPage,
  AuthFailedPage,
} from "@/features/authentication";
import {
  EmployeePage,
  EmployeeDetails,
  CrewDashboard,
} from "@/features/employee";
import { ApplyLeavePage, LeavePage, LeaveDetails } from "@/features/leave";
import { AttendancePage, AttendanceDetails } from "@/features/attendance";
import { HolidayPage, HolidayDetails } from "@/features/holiday";
import { AdminPage, AdminDetails } from "@/features/administration";
import EmployeeList from "@/features/employee-list/pages/EmployeeList";
import { VerticalOrgStructurePage } from "@/features/vertical-org-structure";
import { Horizontal } from "@/features/horizontal-org-structure";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

/**
 * Unified Central Route Configuration Array
 * All paths strictly referenced from ROUTES constant.
 */
export const PROTECTED_APP_ROUTES: RouteConfig[] = [
  // 1. Dashboard Routes (Default & Dynamic :id for Users & Roles)
  // { path: ROUTES.ROOT, element: <CrewDashboard /> },
  // { path: ROUTES.DASHBOARD, element: <CrewDashboard /> },
  { path: ROUTES.DASHBOARD, element: <CrewDashboard /> },
  { path: ROUTES.ROOT, element: <CrewDashboard /> },

  // 2. Employee Directory Routes
  { path: ROUTES.EMPLOYEES.ROOT, element: <EmployeePage /> },
  { path: ROUTES.EMPLOYEES.CREATE, element: <EmployeePage /> },
  { path: ROUTES.EMPLOYEES.DETAILS(":id"), element: <EmployeeDetails /> },

  { path: ROUTES.EMPLOYEE_LIST.ROOT, element: <EmployeeList /> },

  // 3. Leave Routes
  { path: ROUTES.LEAVE.ROOT, element: <LeavePage /> },
  { path: ROUTES.LEAVE.APPLY, element: <ApplyLeavePage /> },
  { path: ROUTES.LEAVE.HISTORY, element: <LeavePage /> },
  { path: ROUTES.LEAVE.DETAILS(":id"), element: <LeaveDetails /> },

  // 4. Attendance Routes
  { path: ROUTES.ATTENDANCE.ROOT, element: <AttendancePage /> },
  { path: ROUTES.ATTENDANCE.LOGS, element: <AttendancePage /> },
  { path: ROUTES.ATTENDANCE.DETAILS(":id"), element: <AttendanceDetails /> },

  // 5. Holiday Routes
  { path: ROUTES.HOLIDAY.ROOT, element: <HolidayPage /> },
  { path: ROUTES.HOLIDAY.CALENDAR, element: <HolidayPage /> },
  { path: ROUTES.HOLIDAY.DETAILS(":id"), element: <HolidayDetails /> },

  // 6. Administration Routes
  { path: ROUTES.ADMIN.ROOT, element: <AdminPage /> },
  { path: ROUTES.ADMIN.SETTINGS, element: <AdminPage /> },
  { path: ROUTES.ADMIN.AUDIT, element: <AdminPage /> },
  { path: ROUTES.ADMIN.ROLES, element: <AdminPage /> },
  { path: ROUTES.ADMIN.DETAILS(":id"), element: <AdminDetails /> },

  // 7. Approvals Module Routes
  {
    path: ROUTES.APPROVALS.LEAVE_APPROVALS,
    element: (
      <GenericFeaturePage
        title="Leave Approvals"
        description="Review pending employee leave requests, check quota balances, and grant authorizations."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.APPROVALS.LEAVE_APPROVALS}`,
    element: (
      <GenericFeaturePage
        title="Leave Approvals"
        description="Review pending employee leave requests, check quota balances, and grant authorizations."
      />
    ),
  },
  {
    path: ROUTES.APPROVALS.EXPENSE_APPROVALS,
    element: (
      <GenericFeaturePage
        title="Expense Approvals"
        description="Review employee reimbursement claims, expense receipts, and grant financial authorizations."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.APPROVALS.EXPENSE_APPROVALS}`,
    element: (
      <GenericFeaturePage
        title="Expense Approvals"
        description="Review employee reimbursement claims, expense receipts, and grant financial authorizations."
      />
    ),
  },
  {
    path: ROUTES.APPROVALS.HR_LEVEL_1,
    element: (
      <GenericFeaturePage
        title="HR Level 1 Approval"
        description="Review initial employee change requests, onboarding workflows, and operational sign-offs."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.APPROVALS.HR_LEVEL_1}`,
    element: (
      <GenericFeaturePage
        title="HR Level 1 Approval"
        description="Review initial employee change requests, onboarding workflows, and operational sign-offs."
      />
    ),
  },
  {
    path: ROUTES.APPROVALS.HR_LEVEL_2,
    element: (
      <GenericFeaturePage
        title="HR Level 2 Approval"
        description="Executive HR sign-offs for promotions, departmental separations, and band changes."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.APPROVALS.HR_LEVEL_2}`,
    element: (
      <GenericFeaturePage
        title="HR Level 2 Approval"
        description="Executive HR sign-offs for promotions, departmental separations, and band changes."
      />
    ),
  },

  // 8. Reports Module Routes
  {
    path: ROUTES.REPORTS.BU,
    element: (
      <GenericFeaturePage
        title="BU Report"
        description="Aggregated business unit analytics, headcount metrics, and utilization dashboards."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.REPORTS.BU}`,
    element: (
      <GenericFeaturePage
        title="BU Report"
        description="Aggregated business unit analytics, headcount metrics, and utilization dashboards."
      />
    ),
  },
  {
    path: ROUTES.REPORTS.CLUSTER,
    element: (
      <GenericFeaturePage
        title="Cluster Report"
        description="Cross-functional cluster performance, project milestone status, and productivity dashboards."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.REPORTS.CLUSTER}`,
    element: (
      <GenericFeaturePage
        title="Cluster Report"
        description="Cross-functional cluster performance, project milestone status, and productivity dashboards."
      />
    ),
  },
  {
    path: ROUTES.REPORTS.TEAM,
    element: (
      <GenericFeaturePage
        title="Team Report"
        description="Direct team attendance, deliverables, performance rankings, and resource allocations."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.REPORTS.TEAM}`,
    element: (
      <GenericFeaturePage
        title="Team Report"
        description="Direct team attendance, deliverables, performance rankings, and resource allocations."
      />
    ),
  },
  {
    path: ROUTES.REPORTS.HR,
    element: (
      <GenericFeaturePage
        title="HR Report"
        description="Company-wide talent analytics, turnover rates, promotion cycles, and diversity statistics."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.REPORTS.HR}`,
    element: (
      <GenericFeaturePage
        title="HR Report"
        description="Company-wide talent analytics, turnover rates, promotion cycles, and diversity statistics."
      />
    ),
  },

  // 9. HR & PRP Secondary Feature Modules
  {
    path: ROUTES.HR.SEPARATION,
    element: (
      <GenericFeaturePage
        title="Employee Separation"
        description="Manage resignation submissions, exit interviews, and clearance checklists."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.HR.SEPARATION}`,
    element: (
      <GenericFeaturePage
        title="Employee Separation"
        description="Manage resignation submissions, exit interviews, and clearance checklists."
      />
    ),
  },
  {
    path: ROUTES.HR.PROMOTION,
    element: (
      <GenericFeaturePage
        title="Employee Promotion"
        description="Review promotion nominations, salary band updates, and leadership appraisal criteria."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.HR.PROMOTION}`,
    element: (
      <GenericFeaturePage
        title="Employee Promotion"
        description="Review promotion nominations, salary band updates, and leadership appraisal criteria."
      />
    ),
  },
  {
    path: ROUTES.PRP.MY_PERFORMANCE,
    element: (
      <GenericFeaturePage
        title="My Performance (PRP)"
        description="Track your individual quarterly goals, OKRs, KPI ratings, and self-review evaluations."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.PRP.MY_PERFORMANCE}`,
    element: (
      <GenericFeaturePage
        title="My Performance (PRP)"
        description="Track your individual quarterly goals, OKRs, KPI ratings, and self-review evaluations."
      />
    ),
  },
  {
    path: ROUTES.PRP.TEAM_PERFORMANCE,
    element: (
      <GenericFeaturePage
        title="Team Performance (PRP)"
        description="Review direct reports, department ratings distributions, and 360-degree feedback."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.PRP.TEAM_PERFORMANCE}`,
    element: (
      <GenericFeaturePage
        title="Team Performance (PRP)"
        description="Review direct reports, department ratings distributions, and 360-degree feedback."
      />
    ),
  },

  // 10. General Secondary Modules
  {
    path: ROUTES.MODULES.REIMBURSEMENTS,
    element: (
      <GenericFeaturePage
        title="Reimbursements"
        description="Submit expense claims, track reimbursement approvals, and download payout receipts."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.REIMBURSEMENTS}`,
    element: (
      <GenericFeaturePage
        title="Reimbursements"
        description="Submit expense claims, track reimbursement approvals, and download payout receipts."
      />
    ),
  },
  {
    path: ROUTES.MODULES.TRAVEL,
    element: (
      <GenericFeaturePage
        title="Travel Management"
        description="Book corporate flights, hotel accommodations, and view travel policies."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.TRAVEL}`,
    element: (
      <GenericFeaturePage
        title="Travel Management"
        description="Book corporate flights, hotel accommodations, and view travel policies."
      />
    ),
  },
  {
    path: ROUTES.MODULES.TALENT_HUB,
    element: (
      <GenericFeaturePage
        title="Talent Hub"
        description="Explore internal job opportunities, skill assessments, and career pathways."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.TALENT_HUB}`,
    element: (
      <GenericFeaturePage
        title="Talent Hub"
        description="Explore internal job opportunities, skill assessments, and career pathways."
      />
    ),
  },
  {
    path: ROUTES.MODULES.TALENT_HUB_RADAR,
    element: (
      <GenericFeaturePage
        title="Radar Chart"
        description="Visualize employee skill competencies and talent distribution across the organization."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.TALENT_HUB_RADAR}`,
    element: (
      <GenericFeaturePage
        title="Radar Chart"
        description="Visualize employee skill competencies and talent distribution across the organization."
      />
    ),
  },
  {
    path: ROUTES.MODULES.EXTERNAL_LINKS,
    element: (
      <GenericFeaturePage
        title="External Links"
        description="Access external company portals, DPR construction tools, and partner integrations."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.EXTERNAL_LINKS}`,
    element: (
      <GenericFeaturePage
        title="External Links"
        description="Access external company portals, DPR construction tools, and partner integrations."
      />
    ),
  },
  {
    path: ROUTES.MODULES.USER_GUIDE,
    element: (
      <GenericFeaturePage
        title="User Guide"
        description="Browse help articles, feature tutorials, and system documentation."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.USER_GUIDE}`,
    element: (
      <GenericFeaturePage
        title="User Guide"
        description="Browse help articles, feature tutorials, and system documentation."
      />
    ),
  },
  {
    path: ROUTES.MODULES.FEEDBACKS,
    element: (
      <GenericFeaturePage
        title="Employee Feedback"
        description="Share your feedback, suggest workplace improvements, and view survey results."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.FEEDBACKS}`,
    element: (
      <GenericFeaturePage
        title="Employee Feedback"
        description="Share your feedback, suggest workplace improvements, and view survey results."
      />
    ),
  },
  {
    path: ROUTES.MODULES.PAYROLL,
    element: (
      <GenericFeaturePage
        title="Payroll & Compensation"
        description="Access monthly payslips, tax declarations, and salary structure details."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.PAYROLL}`,
    element: (
      <GenericFeaturePage
        title="Payroll & Compensation"
        description="Access monthly payslips, tax declarations, and salary structure details."
      />
    ),
  },
  {
    path: ROUTES.MODULES.BENEFITS,
    element: (
      <GenericFeaturePage
        title="Employee Benefits"
        description="Review health insurance coverage, retirement plans, and wellness perks."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.BENEFITS}`,
    element: (
      <GenericFeaturePage
        title="Employee Benefits"
        description="Review health insurance coverage, retirement plans, and wellness perks."
      />
    ),
  },
  {
    path: ROUTES.MODULES.HR_LETTERS,
    element: (
      <GenericFeaturePage
        title="HR Letters & Verification"
        description="Generate employment verification letters, experience certificates, and official documents."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.HR_LETTERS}`,
    element: (
      <GenericFeaturePage
        title="HR Letters & Verification"
        description="Generate employment verification letters, experience certificates, and official documents."
      />
    ),
  },
  {
    path: ROUTES.MODULES.NEWS,
    element: (
      <GenericFeaturePage
        title="Organizational News & Announcements"
        description="Stay updated with company-wide news, events, and culture of accountability updates."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.MODULES.NEWS}`,
    element: (
      <GenericFeaturePage
        title="Organizational News & Announcements"
        description="Stay updated with company-wide news, events, and culture of accountability updates."
      />
    ),
  },

  // 11. Configurations Module Routes (POC placeholders)
  {
    path: ROUTES.CONFIGURATIONS.HORIZONTAL_STRUCTURE,
    element: <Horizontal />,
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.CONFIGURATIONS.HORIZONTAL_STRUCTURE}`,
    element: <Horizontal />,
  },
  {
    path: ROUTES.CONFIGURATIONS.VERTICAL_STRUCTURE,
    element: <VerticalOrgStructurePage />,
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.CONFIGURATIONS.VERTICAL_STRUCTURE}`,
    element: <VerticalOrgStructurePage />,
  },
  {
    path: ROUTES.CONFIGURATIONS.ROLES_PRIVILEGES,
    element: (
      <GenericFeaturePage
        title="Roles & Privileges"
        description="Manage system roles, menu rights, and permission levels across the organization."
      />
    ),
  },
  {
    path: `${ROUTES.DASHBOARD}${ROUTES.CONFIGURATIONS.ROLES_PRIVILEGES}`,
    element: (
      <GenericFeaturePage
        title="Roles & Privileges"
        description="Manage system roles, menu rights, and permission levels across the organization."
      />
    ),
  },
];

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense
      fallback={
        <PageLoader
          fullScreen
          message="Loading portal workspace..."
          description="Preparing modules and authentication session"
        />
      }
    >
      <Routes>
        {/* Standalone Success / Failure Routes for SSO */}
        <Route path={ROUTES.AUTH.SUCCESS} element={<AuthSuccessPage />} />
        <Route path={ROUTES.AUTH.FAILED} element={<AuthFailedPage />} />

        {/* Public / Auth Routes */}
        <Route
          element={
            <PublicRoute
              isAuthenticated={!isAuthenticated}
              redirectPath={ROUTES.DASHBOARD}
            />
          }
        >
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
            <Route
              path={ROUTES.AUTH.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={ROUTES.AUTH.RESET_PASSWORD}
              element={<ResetPasswordPage />}
            />
          </Route>
        </Route>

        {/* Protected Main Application Routes (Rendered from Unified Array) */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirectPath={ROUTES.AUTH.LOGIN}
            />
          }
        >
          <Route element={<MainLayout />}>
            {PROTECTED_APP_ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        {/* Wildcard Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to={!isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH.LOGIN}
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
};
