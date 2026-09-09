import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no items to display at this time.',
  action,
  icon,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-10 sm:p-12 text-center bg-surface rounded-sm border border-dashed border-border ${className}`}>
      <div className="text-muted mb-3">
        {icon || <InboxOutlinedIcon sx={{ fontSize: 44, color: '#94a3b8' }} />}
      </div>
      <h4 className="text-sm font-semibold text-black tracking-tight">{title}</h4>
      <p className="text-xs text-muted max-w-sm mt-1 mb-4 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
