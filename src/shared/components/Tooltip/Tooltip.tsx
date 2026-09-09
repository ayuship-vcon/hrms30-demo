import React from 'react';
import {
  Tooltip as MuiTooltip,
  type TooltipProps as MuiTooltipProps,
} from '@mui/material';

export interface TooltipProps extends Omit<MuiTooltipProps, 'title'> {
  title: React.ReactNode;
  children: React.ReactElement;
  arrow?: boolean;
  theme?: 'dark' | 'light';
}

/**
 * Enterprise Tooltip Component with 8px radius
 * 100% Pure Material UI, zero inline CSS.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  arrow = true,
  placement = 'top',
  theme = 'dark',
  ...props
}) => {
  const isLight = theme === 'light';

  return (
    <MuiTooltip
      title={title}
      arrow={arrow}
      placement={placement}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: isLight ? '#FFFFFF' : '#0F172A',
            color: isLight ? '#1E293B' : '#FFFFFF',
            boxShadow: isLight
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
            border: isLight ? '1px solid #E2E8F0' : 'none',
            fontSize: '12px',
            fontWeight: 500,
            borderRadius: '6px',
            px: 1.5,
            py: 0.75,
            '& .MuiTooltip-arrow': {
              color: isLight ? '#FFFFFF' : '#0F172A',
              '&::before': isLight
                ? {
                    border: '1px solid #E2E8F0',
                  }
                : {},
            },
          },
        },
      }}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
};
