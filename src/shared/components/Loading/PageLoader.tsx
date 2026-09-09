import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

export interface PageLoaderProps {
  message?: string;
  description?: string;
  fullScreen?: boolean;
  minHeight?: string | number;
}

/**
 * Enterprise Full Page / Section Loading Indicator
 * 100% Pure Material UI, Zero inline CSS, Deep Navy Brand Styling.
 */
export const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading workspace data...',
  description = 'Please wait while we retrieve the latest information',
  fullScreen = false,
  minHeight = '60vh',
}) => {
  return (
    <Fade in={true} timeout={300}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{
          minHeight: fullScreen ? '100vh' : minHeight,
          width: '100%',
          py: 6,
          px: 3,
        }}
      >
        {/* Brand Circular Progress with Inner Subtle Glow */}
        <Box position="relative" display="inline-flex" mb={2.5}>
          <CircularProgress
            variant="indeterminate"
            disableShrink
            size={46}
            thickness={4}
            sx={{
              color: '#0b4668',
              animationDuration: '750ms',
            }}
          />
        </Box>

        {/* Loading Title */}
        <Typography
          variant="h6"
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#111827',
            letterSpacing: '-0.01em',
            mb: 0.5,
          }}
        >
          {message}
        </Typography>

        {/* Subtitle Description */}
        {description && (
          <Typography
            variant="body2"
            sx={{
              fontSize: '13px',
              color: '#64748B',
              maxWidth: 380,
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Fade>
  );
};
