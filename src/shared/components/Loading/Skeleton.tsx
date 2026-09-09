import React from 'react';
import { Skeleton as MuiSkeleton, type SkeletonProps as MuiSkeletonProps } from '@mui/material';

export interface SkeletonProps extends Omit<MuiSkeletonProps, 'variant'> {
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  width?: number | string;
  height?: number | string;
  className?: string;
}

/**
 * Universal MUI Skeleton Component (Zero inline CSS, pure Material UI)
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  variant = 'rounded',
  className = '',
  sx,
  ...props
}) => {
  return (
    <MuiSkeleton
      variant={variant}
      width={width}
      height={height}
      className={className}
      animation="wave"
      sx={{
        borderRadius: variant === 'rounded' ? '8px' : undefined,
        backgroundColor: '#f1f5f9',
        ...sx,
      }}
      {...props}
    />
  );
};
