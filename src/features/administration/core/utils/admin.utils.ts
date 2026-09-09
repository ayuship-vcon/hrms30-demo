export const formatAuditAction = (action: string): string => {
  return action.replace(/_/g, ' ').toUpperCase();
};
