import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isDangerous?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  trigger?: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

/**
 * Enterprise Contextual Dropdown Action Menu Component
 * 100% Pure Material UI, 8px radius, zero inline CSS.
 */
export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  trigger,
  align = 'right',
  className = '',
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleItemClick = (item: ActionMenuItem, event: React.MouseEvent) => {
    event.stopPropagation();
    handleClose();
    item.onClick();
  };

  return (
    <div className={`inline-block ${className}`} onClick={(e) => e.stopPropagation()}>
      {trigger ? (
        <span onClick={handleClick} className="inline-flex cursor-pointer">
          {trigger}
        </span>
      ) : (
        <IconButton
          size="small"
          onClick={handleClick}
          sx={{
            color: '#64748B',
            '&:hover': { color: '#0b4668', backgroundColor: '#F1F5F9' },
          }}
          aria-label="More actions"
        >
          <MoreVertIcon sx={{ fontSize: 18 }} />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={(_e) => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: align === 'right' ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: align === 'right' ? 'right' : 'left',
        }}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            mt: 0.5,
            minWidth: 170,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #E2E8F0',
            py: 0.5,
          },
        }}
      >
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <MenuItem
              onClick={(e) => handleItemClick(item, e)}
              disabled={item.disabled}
              sx={{
                fontSize: '13px',
                fontWeight: 500,
                py: 1,
                px: 2,
                color: item.isDangerous ? '#dc2626' : '#1E293B',
                '&:hover': {
                  backgroundColor: item.isDangerous ? '#fff1f2' : '#F8FAFC',
                },
              }}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{
                    minWidth: 28,
                    color: item.isDangerous ? '#dc2626' : '#64748B',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '13px',
                  fontWeight: item.isDangerous ? 600 : 500,
                }}
              />
            </MenuItem>
            {item.divider && <Divider sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))}
      </Menu>
    </div>
  );
};
