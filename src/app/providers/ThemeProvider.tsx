import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { THEME_CONFIG } from '@/config/theme.config';

const theme = createTheme({
  palette: {
    primary: {
      main: THEME_CONFIG.colors.deepNavy, // #0b4668 Deep Navy
      light: THEME_CONFIG.colors.vibrantPrimary, // #457b8d
      dark: '#08354f',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: THEME_CONFIG.colors.vibrantPrimary, // #457b8d Vibrant Primary
      light: '#eef4f6',
      dark: '#366270',
      contrastText: '#FFFFFF',
    },
    success: {
      main: THEME_CONFIG.colors.successGreen, // #4edea3
      contrastText: '#065f46',
    },
    warning: {
      main: THEME_CONFIG.colors.warningAmber, // #fbbf24
      contrastText: '#92400e',
    },
    error: {
      main: THEME_CONFIG.colors.errorRed, // #b22b32
      contrastText: '#FFFFFF',
    },
    background: {
      default: THEME_CONFIG.colors.appBackground, // #f1f1f1
      paper: THEME_CONFIG.colors.surface, // #FFFFFF
    },
    text: {
      primary: '#000000',
      secondary: THEME_CONFIG.colors.neutralDarkGray, // #45464D
    },
    divider: THEME_CONFIG.colors.border,
  },
  typography: {
    fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'].join(','),
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          minHeight: '40px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '& fieldset': {
            borderColor: '#E2E8F0',
          },
          '&:hover fieldset': {
            borderColor: '#0b4668',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0b4668',
          },
        },
        input: {
          fontSize: '13px',
          padding: '8.5px 14px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          fontSize: '13px',
          borderColor: '#E2E8F0',
        },
        head: {
          backgroundColor: '#0b4668',
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      },
    },
  },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
