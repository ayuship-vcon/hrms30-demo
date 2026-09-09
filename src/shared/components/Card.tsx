import React from 'react';
import { Paper, type PaperProps } from '@mui/material';

export interface CardProps extends PaperProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  icon,
  children,
  className = '',
  ...props
}) => {
  return (
    <Paper
      elevation={0}
      className={`p-4 sm:p-5 rounded-sm border border-border bg-surface shadow-card transition-all ${className}`}
      {...props}
    >
      {(title || action || icon) && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-borderLight">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-8 h-8 rounded-sm bg-neutralLight text-navy flex items-center justify-center">
                {icon}
              </div>
            )}
            <div>
              {title && <h3 className="text-sm font-bold text-navy tracking-tight">{title}</h3>}
              {subtitle && <p className="text-sm text-neutralDark-muted mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </Paper>
  );
};
