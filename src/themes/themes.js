import { createTheme } from '@mui/material/styles';

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3498db',
      light: '#5dade2',
      dark: '#2980b9',
    },
    secondary: {
      main: '#2ecc71',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.03em',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3498db',
      light: '#5dade2',
      dark: '#2980b9',
    },
    secondary: {
      main: '#2ecc71',
    },
    background: {
      default: '#1a202c',
      paper: '#2d3748',
    },
    text: {
      primary: '#f7fafc',
      secondary: '#cbd5e0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.03em',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(45, 55, 72, 0.8)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

// Default theme (using light theme as base)
export const theme = lightTheme; 