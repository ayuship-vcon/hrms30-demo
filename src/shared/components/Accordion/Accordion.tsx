import React from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionSectionItem[];
  allowMultiple?: boolean;
  className?: string;
}

/**
 * Enterprise Accordion Component with 8px corner radius and Deep Navy accents
 * 100% Pure Material UI, zero inline CSS.
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.defaultExpanded) initial[item.id] = true;
    });
    return initial;
  });

  const handleChange = (panelId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    if (allowMultiple) {
      setExpanded((prev) => ({ ...prev, [panelId]: isExpanded }));
    } else {
      setExpanded({ [panelId]: isExpanded });
    }
  };

  return (
    <Box className={`flex flex-col gap-2.5 w-full ${className}`}>
      {items.map((item) => {
        const isCurrentExpanded = Boolean(expanded[item.id]);

        return (
          <MuiAccordion
            key={item.id}
            expanded={isCurrentExpanded}
            onChange={handleChange(item.id)}
            disabled={item.disabled}
            disableGutters
            elevation={0}
            sx={{
              border: '1px solid #E2E8F0',
              borderRadius: '8px !important',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <MuiAccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: isCurrentExpanded ? '#0b4668' : '#64748B' }} />}
              sx={{
                px: 2.5,
                py: 1,
                minHeight: '48px',
                backgroundColor: isCurrentExpanded ? '#f8fafc' : '#ffffff',
                borderBottom: isCurrentExpanded ? '1px solid #E2E8F0' : 'none',
                transition: 'background-color 0.2s',
                '& .MuiAccordionSummary-content': {
                  my: 1,
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5} width="100%">
                {item.icon && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: isCurrentExpanded ? '#0b4668' : '#64748B',
                    }}
                  >
                    {item.icon}
                  </Box>
                )}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: isCurrentExpanded ? '#0b4668' : '#1E293B',
                    }}
                  >
                    {item.title}
                  </Typography>
                  {item.subtitle && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '12px',
                        color: '#64748B',
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                  )}
                </Box>
              </Box>
            </MuiAccordionSummary>
            <MuiAccordionDetails sx={{ p: 3 }}>{item.content}</MuiAccordionDetails>
          </MuiAccordion>
        );
      })}
    </Box>
  );
};
