import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

/**
 * Universal MUI Loader Component (Zero inline CSS, pure Material UI)
 */
export const Loader: React.FC<LoaderProps> = ({ size = 'md', text, className = '' }) => {
  const getDimension = () => {
    switch (size) {
      case 'sm':
        return 20;
      case 'lg':
        return 40;
      case 'md':
      default:
        return 28;
    }
  };

  const dim = getDimension();

  return (
    <Box
      display="inline-flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
      className={className}
    >
      <CircularProgress
        size={dim}
        thickness={4}
        sx={{ color: '#0b4668' }}
      />
      {text && (
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            color: '#6B7280',
            fontWeight: 500,
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};
