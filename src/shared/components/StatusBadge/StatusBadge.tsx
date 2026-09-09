import React from 'react';
import { Box, Typography } from '@mui/material';

export type StatusType =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'present'
  | 'absent'
  | 'late'
  | 'on_leave'
  | 'draft'
  | 'cancelled'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | string;

export interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  variant?: 'subtle' | 'solid' | 'dot' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

interface StatusColorConfig {
  bg: string;
  text: string;
  border: string;
  dot: string;
  solidBg: string;
  solidText: string;
}

function resolveStatusColors(status: string): StatusColorConfig {
  const norm = status.toLowerCase().replace(/[\s-_]+/g, '');

  // 1. Success / Active / Approved / Present
  if (['active', 'approved', 'present', 'success', 'completed', 'verified'].includes(norm)) {
    return {
      bg: '#ecfdf5',
      text: '#065f46',
      border: '#a7f3d0',
      dot: '#10b981',
      solidBg: '#059669',
      solidText: '#ffffff',
    };
  }

  // 2. Warning / Pending / Late / In Progress
  if (['pending', 'late', 'warning', 'inprogress', 'review', 'waiting'].includes(norm)) {
    return {
      bg: '#fffbeb',
      text: '#92400e',
      border: '#fde68a',
      dot: '#f59e0b',
      solidBg: '#d97706',
      solidText: '#ffffff',
    };
  }

  // 3. Danger / Rejected / Absent / Error
  if (['rejected', 'absent', 'danger', 'error', 'cancelled', 'failed', 'declined'].includes(norm)) {
    return {
      bg: '#fff1f2',
      text: '#9f1239',
      border: '#fecdd3',
      dot: '#f43f5e',
      solidBg: '#e11d48',
      solidText: '#ffffff',
    };
  }

  // 4. Info / On Leave / Sky
  if (['onleave', 'leave', 'info', 'national', 'optional', 'regional'].includes(norm)) {
    return {
      bg: '#eef7fc',
      text: '#0b4668',
      border: '#bae6fd',
      dot: '#0284c7',
      solidBg: '#0b4668',
      solidText: '#ffffff',
    };
  }

  // 5. Neutral / Inactive / Default
  return {
    bg: '#f8fafc',
    text: '#475569',
    border: '#e2e8f0',
    dot: '#94a3b8',
    solidBg: '#64748b',
    solidText: '#ffffff',
  };
}

/**
 * Universal Enterprise Status Badge Component
 * 100% Pure Material UI, 8px radius, zero inline CSS.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  variant = 'subtle',
  size = 'md',
  className = '',
}) => {
  const colors = resolveStatusColors(status);
  const displayLabel = label || status.replace(/_/g, ' ').toUpperCase();

  const isSmall = size === 'sm';

  let sxConfig = {};

  if (variant === 'solid') {
    sxConfig = {
      backgroundColor: colors.solidBg,
      color: colors.solidText,
      border: 'none',
    };
  } else if (variant === 'outline') {
    sxConfig = {
      backgroundColor: 'transparent',
      color: colors.text,
      border: `1.5px solid ${colors.border}`,
    };
  } else {
    // Subtle default
    sxConfig = {
      backgroundColor: colors.bg,
      color: colors.text,
      border: `1px solid ${colors.border}`,
    };
  }

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap={0.75}
      className={className}
      sx={{
        borderRadius: '6px',
        px: isSmall ? 1 : 1.25,
        py: isSmall ? 0.25 : 0.5,
        height: isSmall ? '20px' : '24px',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...sxConfig,
      }}
    >
      {(variant === 'subtle' || variant === 'dot' || variant === 'outline') && (
        <Box
          component="span"
          sx={{
            width: isSmall ? 5 : 6,
            height: isSmall ? 5 : 6,
            borderRadius: '50%',
            backgroundColor: colors.dot,
            shrink: 0,
          }}
        />
      )}
      <Typography
        variant="caption"
        sx={{
          fontSize: isSmall ? '10.5px' : '11.5px',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1,
        }}
      >
        {displayLabel}
      </Typography>
    </Box>
  );
};
