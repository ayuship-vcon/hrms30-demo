import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';

export interface DynamicIconProps {
  /** Exact Material Icon name from Database / API (e.g. "PeopleAltOutlined", "CalendarTodayOutlined", "AccessTimeOutlined") */
  name?: string | null;
  size?: number;
  className?: string;
  color?: string;
  fallback?: React.ReactNode;
}

/**
 * Universal Direct-Name Dynamic Icon Resolver
 * Directly renders any Material 3 Icon from database strings with zero alias indirection.
 */
export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  size = 18,
  className = '',
  color,
  fallback,
}) => {
  if (!name) {
    return (
      (fallback as React.ReactElement) || (
        <FiberManualRecordOutlinedIcon sx={{ fontSize: size, color }} className={className} />
      )
    );
  }

  // Directly lookup exact component from @mui/icons-material
  const trimmedName = name.trim();
  const iconsMap = MuiIcons as unknown as Record<
    string,
    React.ComponentType<{ sx?: Record<string, unknown>; className?: string }>
  >;
  const IconComponent =
    iconsMap[trimmedName] ||
    iconsMap[`${trimmedName}Outlined`] ||
    iconsMap[`${trimmedName}Icon`];

  if (!IconComponent) {
    return (
      (fallback as React.ReactElement) || (
        <FiberManualRecordOutlinedIcon sx={{ fontSize: size, color }} className={className} />
      )
    );
  }

  return <IconComponent sx={{ fontSize: size, color }} className={className} />;
};
