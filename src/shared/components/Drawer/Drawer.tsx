import React from 'react';
import {
  Drawer as MuiDrawer,
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Enterprise Slide-over Drawer / Sheet Component
 * 100% Pure Material UI, zero inline CSS.
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  anchor = 'right',
  width = 440,
  children,
  footer,
}) => {
  return (
    <MuiDrawer
      anchor={anchor}
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: width },
          maxWidth: '100vw',
          backgroundColor: '#FFFFFF',
          boxShadow: '-8px 0 25px -5px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        px={3}
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #E2E8F0"
      >
        <Box>
          {title && (
            <Typography
              variant="h6"
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#0b4668',
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="caption" sx={{ fontSize: '12px', color: '#64748B' }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: '#64748B',
            '&:hover': {
              color: '#0b4668',
              backgroundColor: '#F1F5F9',
            },
          }}
          aria-label="Close drawer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Drawer Body */}
      <Box p={3} flex={1} overflow="auto">
        {children}
      </Box>

      {/* Drawer Footer */}
      {footer && (
        <Box
          px={3}
          py={2}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={1.5}
          sx={{
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
          }}
        >
          {footer}
        </Box>
      )}
    </MuiDrawer>
  );
};
