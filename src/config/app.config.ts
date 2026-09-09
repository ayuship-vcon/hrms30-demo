export const APP_CONFIG = {
  name: 'HRMS Pro',
  company: 'Enterprise Core Systems Inc.',
  tagline: 'Modern Human Resource & Talent Management Platform',
  defaultTheme: 'light' as const,
  dateFormat: 'YYYY-MM-DD',
  displayDateFormat: 'MMM DD, YYYY',
  currency: 'USD',
  currencySymbol: '$',
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
  toastDurationMs: 4000,
  features: {
    attendanceGeoFencing: true,
    prpCalculationAutomation: true,
    multiLevelLeaveApproval: true,
  },
};
