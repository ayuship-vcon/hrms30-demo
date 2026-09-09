import React from 'react';
import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  Box,
  Badge,
} from '@mui/material';

export interface TabItem {
  id: string | number;
  label: string;
  icon?: React.ReactElement;
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  value: string | number;
  onChange: (tabId: string | number) => void;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  className?: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  value: string | number;
  activeValue: string | number;
  className?: string;
}

/**
 * Enterprise Tab Panel Container
 */
export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  activeValue,
  className = '',
}) => {
  if (value !== activeValue) return null;
  return <div className={`w-full py-4 animate-fadeIn ${className}`}>{children}</div>;
};

/**
 * Enterprise Tabs Component
 * 100% Pure Material UI, 8px radius, Deep Navy active indicator, zero inline CSS.
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onChange,
  variant = 'standard',
  className = '',
}) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: string | number) => {
    onChange(newValue);
  };

  return (
    <Box
      className={`w-full border-b border-border ${className}`}
      sx={{
        backgroundColor: '#FFFFFF',
      }}
    >
      <MuiTabs
        value={value}
        onChange={handleChange}
        variant={variant}
        scrollButtons="auto"
        sx={{
          minHeight: '42px',
          '& .MuiTabs-indicator': {
            backgroundColor: '#0b4668',
            height: '2.5px',
            borderRadius: '2px 2px 0 0',
          },
        }}
      >
        {tabs.map((tab) => (
          <MuiTab
            key={String(tab.id)}
            value={tab.id}
            disabled={tab.disabled}
            icon={tab.icon}
            iconPosition="start"
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge !== null && (
                  <Badge
                    badgeContent={tab.badge}
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '11px',
                        height: '18px',
                        minWidth: '18px',
                        borderRadius: '9px',
                        backgroundColor: String(tab.id) === String(value) ? '#0b4668' : '#F1F5F9',
                        color: String(tab.id) === String(value) ? '#ffffff' : '#64748B',
                        fontWeight: 700,
                      },
                    }}
                  />
                )}
              </Box>
            }
            sx={{
              minHeight: '42px',
              py: 1,
              px: 2.5,
              fontSize: '13.5px',
              fontWeight: 600,
              textTransform: 'none',
              color: '#64748B',
              '&.Mui-selected': {
                color: '#0b4668',
                fontWeight: 700,
              },
              '&:hover': {
                color: '#0b4668',
              },
            }}
          />
        ))}
      </MuiTabs>
    </Box>
  );
};
