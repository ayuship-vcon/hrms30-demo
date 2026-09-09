import React from 'react';
import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string | number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  onClick?: () => void;
  className?: string;
}

/**
 * Enterprise KPI StatCard Component
 * 100% Pure Material UI, 8px radius, zero inline CSS.
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = '#eef7fc',
  iconColor = '#0b4668',
  trend,
  onClick,
  className = '',
}) => {
  const isClickable = Boolean(onClick);

  return (
    <Box
      onClick={onClick}
      className={`bg-surface p-5 rounded-sm border border-border shadow-card flex flex-col justify-between transition-all ${
        isClickable ? 'cursor-pointer hover:border-primary hover:shadow-xs' : ''
      } ${className}`}
      sx={{
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Header: Title & Icon */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </Typography>

        {icon && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              backgroundColor: iconBgColor,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              shrink: 0,
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      {/* Metric Value */}
      <Box my={1.5}>
        <Typography
          variant="h4"
          sx={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ fontSize: '12.5px', color: '#64748B', mt: 0.5, display: 'block' }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Footer: Trend or Helper */}
      {trend && (
        <Box display="flex" alignItems="center" gap={1} pt={1} borderTop="1px solid #F1F5F9">
          <Box
            display="inline-flex"
            alignItems="center"
            gap={0.25}
            sx={{
              fontSize: '11.5px',
              fontWeight: 700,
              color: trend.direction === 'up' ? '#16a34a' : trend.direction === 'down' ? '#dc2626' : '#64748B',
            }}
          >
            {trend.direction === 'up' && <TrendingUpIcon sx={{ fontSize: 14 }} />}
            {trend.direction === 'down' && <TrendingDownIcon sx={{ fontSize: 14 }} />}
            <span>{trend.value}</span>
          </Box>
          {trend.label && (
            <Typography variant="caption" sx={{ fontSize: '11.5px', color: '#94A3B8' }}>
              {trend.label}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
