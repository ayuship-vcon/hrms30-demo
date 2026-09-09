/**
 * "The Visual Language of HRMS" Design System Tokens
 * Reference: Material 3 Design Kit for HRMS
 */

export const THEME_CONFIG = {
  colors: {
    // Primary Color Palette
    deepNavy: '#0b4668',
    vibrantPrimary: '#457b8d',
    successGreen: '#4edea3',
    warningAmber: '#fbbf24',
    errorRed: '#b22b32',
    neutralDarkGray: '#45464D',
    neutralLightGray: '#f1f1f1',
    black: '#000000',
    white: '#FFFFFF',

    // Semantic Role Mappings
    appBackground: '#f1f1f1',
    surface: '#FFFFFF',
    surfaceHover: '#f8fafc',
    
    // Sidebar & Navigation
    sidebar: '#FFFFFF',
    sidebarBorder: '#E2E8F0',
    activeNavBackground: '#0b4668',
    activeNavText: '#FFFFFF',
    
    // Service & Action Tiles
    tileBackground: '#f1f1f1',
    tileHover: '#e5e7eb',
    tileIcon: '#0b4668',
    
    // Status Badges & Indicators
    badgeActiveBg: '#e6f9f2',
    badgeActiveText: '#065f46',
    badgeActiveDot: '#4edea3',
    
    badgeOnLeaveBg: '#fef3c7',
    badgeOnLeaveText: '#92400e',
    badgeOnLeaveDot: '#fbbf24',
    
    badgeTerminatedBg: '#fee2e2',
    badgeTerminatedText: '#991b1b',
    badgeTerminatedDot: '#b22b32',

    // Circular Gauge Indicators
    gaugeTrack: '#f1f1f1',
    gaugeArc: '#0b4668',

    // Text Hierarchy
    textHeading: '#0b4668',
    textMain: '#45464D',
    textSub: '#45464D',
    textMuted: '#6B7280',
    textInverse: '#FFFFFF',

    // Borders & Dividers
    border: '#E2E8F0',
    borderLight: '#f1f1f1',
    borderDark: '#45464D',
  },
  
  fonts: {
    display: "'Inter', 'Segoe UI', sans-serif",
    sans: "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
    poppins: "'Inter', 'Segoe UI', sans-serif",
  },
  
  radii: {
    none: '0px',
    small: '8px',       // 8dp
    medium: '12px',     // 12dp
    large: '16px',      // 16dp
    extraLarge: '32px', // 32dp
    full: '9999px',     // Full
  },
  
  shadows: {
    '2xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    card: '0px 4px 4px -1px rgba(12, 12, 13, 0.08), 0px 2px 4px -1px rgba(12, 12, 13, 0.04)',
    cardHover: '0px 12px 24px -4px rgba(11, 70, 104, 0.12)',
  },
} as const;

export type ThemeConfig = typeof THEME_CONFIG;
