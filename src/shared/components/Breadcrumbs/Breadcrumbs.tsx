import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homePath?: string;
  className?: string;
}

/**
 * Enterprise Breadcrumbs Component
 * 100% Pure Material UI, zero inline CSS.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
  homePath = '/dashboard',
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <Box className={`flex items-center ${className}`}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: 16, color: '#94A3B8' }} />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-li': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        {showHome && (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(homePath)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#64748B',
              fontSize: '13px',
              fontWeight: 500,
              '&:hover': {
                color: '#0b4668',
              },
            }}
          >
            <HomeOutlinedIcon sx={{ fontSize: 17, mr: 0.5 }} />
            <span>Home</span>
          </Link>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast || !item.path) {
            return (
              <Typography
                key={item.label}
                variant="caption"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  fontWeight: isLast ? 700 : 500,
                  color: isLast ? '#0b4668' : '#64748B',
                }}
              >
                {item.icon && <Box component="span" sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>}
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={item.label}
              underline="hover"
              color="inherit"
              onClick={() => navigate(item.path!)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#64748B',
                fontSize: '13px',
                fontWeight: 500,
                '&:hover': {
                  color: '#0b4668',
                },
              }}
            >
              {item.icon && <Box component="span" sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>}
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};
