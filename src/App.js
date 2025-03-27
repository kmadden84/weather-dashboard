import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container,
  Typography, 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Paper,
  CircularProgress,
  Button,
  CardActionArea
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AlertIcon from '@mui/icons-material/ReportProblem';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useWeather from './hooks/useWeather';

// Define themes based on weather condition
const getTheme = (condition = 'clear') => {
  // Convert condition to lowercase for easier comparison
  const lowerCondition = condition ? condition.toLowerCase() : '';
  
  // Default theme properties
  const baseTheme = {
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
        fontSize: '2rem',
        letterSpacing: '0.05em',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.1rem',
        letterSpacing: '0.03em',
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundAttachment: 'fixed',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease-in-out',
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
  };

  // Sunny/Clear theme
  if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) {
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        h4: {
          ...baseTheme.typography.h4,
          background: 'linear-gradient(90deg, #f39c12, #e67e22)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 15px rgba(243, 156, 18, 0.5)',
        }
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#f39c12',
          light: '#f5b041',
          dark: '#e67e22',
        },
        secondary: {
          main: '#e74c3c',
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
      components: {
        ...baseTheme.components,
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f4fd 100%)',
              backgroundAttachment: 'fixed',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 10px 20px rgba(243, 156, 18, 0.1), 0 0 0 1px rgba(243, 156, 18, 0.05)',
              '&:hover': {
                boxShadow: '0 15px 30px rgba(243, 156, 18, 0.15), 0 0 0 1px rgba(243, 156, 18, 0.1)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: 'linear-gradient(90deg, #f39c12, #e67e22)',
              boxShadow: '0 0 15px rgba(243, 156, 18, 0.3)',
              '&:hover': {
                background: 'linear-gradient(90deg, #f5b041, #f39c12)',
                boxShadow: '0 0 20px rgba(243, 156, 18, 0.5)',
              },
            },
          },
        },
      },
    });
  }
  
  // Cloudy theme
  else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        h4: {
          ...baseTheme.typography.h4,
          background: 'linear-gradient(90deg, #7f8c8d, #95a5a6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 15px rgba(127, 140, 141, 0.5)',
        }
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#7f8c8d',
          light: '#95a5a6',
          dark: '#6c7a7d',
        },
        secondary: {
          main: '#3498db',
        },
        background: {
          default: '#ecf0f1',
          paper: '#f5f7f8',
        },
        text: {
          primary: '#2c3e50',
          secondary: '#57687c',
        },
      },
      components: {
        ...baseTheme.components,
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'linear-gradient(135deg, #ecf0f1 0%, #d6dde0 100%)',
              backgroundAttachment: 'fixed',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(245, 247, 248, 0.8)',
              boxShadow: '0 10px 20px rgba(127, 140, 141, 0.1), 0 0 0 1px rgba(127, 140, 141, 0.05)',
              '&:hover': {
                boxShadow: '0 15px 30px rgba(127, 140, 141, 0.15), 0 0 0 1px rgba(127, 140, 141, 0.1)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: 'linear-gradient(90deg, #7f8c8d, #95a5a6)',
              boxShadow: '0 0 15px rgba(127, 140, 141, 0.3)',
              '&:hover': {
                background: 'linear-gradient(90deg, #95a5a6, #7f8c8d)',
                boxShadow: '0 0 20px rgba(127, 140, 141, 0.5)',
              },
            },
          },
        },
      },
    });
  }
  
  // Rainy theme
  else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        h4: {
          ...baseTheme.typography.h4,
          background: 'linear-gradient(90deg, #3498db, #2980b9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 15px rgba(52, 152, 219, 0.5)',
        }
      },
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
          default: '#1e3d59',
          paper: '#2c506e',
        },
        text: {
          primary: '#f7fafc',
          secondary: '#cbd5e0',
        },
      },
      components: {
        ...baseTheme.components,
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'linear-gradient(135deg, #1e3d59 0%, #173451 100%)',
              backgroundAttachment: 'fixed',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(44, 80, 110, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              '&:hover': {
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: 'linear-gradient(90deg, #3498db, #2980b9)',
              boxShadow: '0 0 15px rgba(52, 152, 219, 0.5)',
              '&:hover': {
                background: 'linear-gradient(90deg, #5dade2, #3498db)',
                boxShadow: '0 0 20px rgba(52, 152, 219, 0.7)',
              },
            },
          },
        },
      },
    });
  }
  
  // Snowy theme
  else if (lowerCondition.includes('snow') || lowerCondition.includes('ice')) {
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        h4: {
          ...baseTheme.typography.h4,
          background: 'linear-gradient(90deg, #a7c5ee, #7aaeda)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 15px rgba(167, 197, 238, 0.5)',
        }
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#a7c5ee',
          light: '#bbd4f2',
          dark: '#7aaeda',
        },
        secondary: {
          main: '#9b59b6',
        },
        background: {
          default: '#e4eefa',
          paper: '#f5f9fe',
        },
        text: {
          primary: '#2c3e50',
          secondary: '#57687c',
        },
      },
      components: {
        ...baseTheme.components,
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'linear-gradient(135deg, #e4eefa 0%, #d2e4f7 100%)',
              backgroundAttachment: 'fixed',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(245, 249, 254, 0.8)',
              boxShadow: '0 10px 20px rgba(167, 197, 238, 0.1), 0 0 0 1px rgba(167, 197, 238, 0.05)',
              '&:hover': {
                boxShadow: '0 15px 30px rgba(167, 197, 238, 0.15), 0 0 0 1px rgba(167, 197, 238, 0.1)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: 'linear-gradient(90deg, #a7c5ee, #7aaeda)',
              boxShadow: '0 0 15px rgba(167, 197, 238, 0.3)',
              '&:hover': {
                background: 'linear-gradient(90deg, #bbd4f2, #a7c5ee)',
                boxShadow: '0 0 20px rgba(167, 197, 238, 0.5)',
              },
            },
          },
        },
      },
    });
  }
  
  // Thunderstorm theme
  else if (lowerCondition.includes('thunder')) {
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        h4: {
          ...baseTheme.typography.h4,
          background: 'linear-gradient(90deg, #9b59b6, #8e44ad)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 15px rgba(155, 89, 182, 0.5)',
        }
      },
      palette: {
        mode: 'dark',
        primary: {
          main: '#9b59b6',
          light: '#af7ac5',
          dark: '#8e44ad',
        },
        secondary: {
          main: '#f1c40f',
        },
        background: {
          default: '#1a1324',
          paper: '#34283e',
        },
        text: {
          primary: '#f7fafc',
          secondary: '#cbd5e0',
        },
      },
      components: {
        ...baseTheme.components,
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'linear-gradient(135deg, #1a1324 0%, #34283e 100%)',
              backgroundAttachment: 'fixed',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(52, 40, 62, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              '&:hover': {
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: 'linear-gradient(90deg, #9b59b6, #8e44ad)',
              boxShadow: '0 0 15px rgba(155, 89, 182, 0.5)',
              '&:hover': {
                background: 'linear-gradient(90deg, #af7ac5, #9b59b6)',
                boxShadow: '0 0 20px rgba(155, 89, 182, 0.7)',
              },
            },
          },
        },
      },
    });
  }
  
  // Default/Fallback (similar to clear but more neutral)
  else {
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        h4: {
          ...baseTheme.typography.h4,
          background: 'linear-gradient(90deg, #3498db, #2980b9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 15px rgba(52, 152, 219, 0.5)',
        }
      },
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
      components: {
        ...baseTheme.components,
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
              backgroundAttachment: 'fixed',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(45, 55, 72, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              '&:hover': {
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: 'linear-gradient(90deg, #3498db, #2980b9)',
              boxShadow: '0 0 15px rgba(52, 152, 219, 0.5)',
              '&:hover': {
                background: 'linear-gradient(90deg, #3498db, #2980b9)',
                boxShadow: '0 0 20px rgba(52, 152, 219, 0.7)',
              },
            },
          },
        },
      },
    });
  }
};

// Helper function to get the weather icon based on condition
const getWeatherIcon = (condition, isDay = true, size = 'large', color) => {
  const iconProps = { 
    fontSize: size, 
    sx: { color: color || '#3498db' } 
  };

  const lowerCondition = condition ? condition.toLowerCase() : '';
  
  if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) {
    return isDay ? <WbSunnyIcon {...iconProps} /> : <NightsStayIcon {...iconProps} />;
  } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
    return <CloudIcon {...iconProps} />;
  } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return <OpacityIcon {...iconProps} />;
  } else if (lowerCondition.includes('snow') || lowerCondition.includes('sleet') || lowerCondition.includes('ice')) {
    return <AcUnitIcon {...iconProps} />;
  } else if (lowerCondition.includes('thunder')) {
    return <FlashOnIcon {...iconProps} />;
  } else {
    return isDay ? <WbSunnyIcon {...iconProps} /> : <NightsStayIcon {...iconProps} />;
  }
};

function App() {
  const [searchInput, setSearchInput] = useState('');
  
  // Use our custom hook to fetch weather data
  const { 
    location, 
    currentWeather, 
    forecast, 
    loading, 
    error, 
    searchLocation,
    units,
    toggleUnits,
    selectedDay,
    selectDay
  } = useWeather('New York');
  
  // Get selected forecast day or current weather
  const selectedForecast = selectedDay !== null ? forecast[selectedDay] : null;
  
  // Determine which weather condition to use for theming
  const currentCondition = currentWeather?.condition || 'clear';
  const selectedCondition = selectedForecast?.condition || currentCondition;
  const themeCondition = selectedForecast ? selectedCondition : currentCondition;
  
  // Get theme based on weather condition
  const theme = getTheme(themeCondition);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      searchLocation(searchInput);
      setSearchInput('');
    }
  };

  // Get temperature unit symbol
  const tempUnit = units === 'imperial' ? 'F' : 'C';
  
  // For theme transition effect
  useEffect(() => {
    // This helps with smoother transitions between themes
    document.body.style.transition = 'background 0.5s ease';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ 
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: { xs: 2, sm: 3 } 
            }}
          >
            <Typography variant="h4">
              Weather Dashboard{currentWeather ? `: ${currentWeather.city}` : ''}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip title={`Switch to ${units === 'imperial' ? 'Celsius' : 'Fahrenheit'}`}>
                <IconButton 
                  onClick={toggleUnits} 
                  sx={{ 
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                    p: 1.5,
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  <DeviceThermostatIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Location Search Bar */}
          <Box sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search for a city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(45, 55, 72, 0.6)' 
                    : 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(45, 55, 72, 0.8)' 
                      : 'rgba(255, 255, 255, 0.9)',
                  }
                }
              }}
            />
          </Box>

          {/* Loading State */}
          {loading && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CircularProgress size={60} color="primary" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Loading weather data...
              </Typography>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <AlertIcon sx={{ fontSize: 60, color: 'error.main' }} />
              <Typography variant="h6" sx={{ mt: 2, color: 'error.main' }}>
                {error}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Please check your location and try again.
              </Typography>
            </Box>
          )}

          {/* Current Weather Card */}
          {!loading && !error && currentWeather && !selectedForecast && (
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {currentWeather.city}, {currentWeather.country}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {currentWeather.date}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        {getWeatherIcon(currentWeather.condition, currentWeather.isDay, '5rem', theme.palette.primary.main)}
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h2">
                            {currentWeather.temperature}°{tempUnit}
                          </Typography>
                          <Typography variant="body1">
                            {currentWeather.condition}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Feels like {currentWeather.feelsLike}°{tempUnit}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr' }, 
                      gap: 2,
                      height: '100%',
                      alignContent: 'center'
                    }}>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <OpacityIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Humidity</Typography>
                          <Typography variant="body1">{currentWeather.humidity}%</Typography>
                        </Box>
                      </Paper>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <AirIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Wind</Typography>
                          <Typography variant="body1">{currentWeather.windSpeed} {units === 'imperial' ? 'mph' : 'm/s'}</Typography>
                        </Box>
                      </Paper>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <WbSunnyIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">UV Index</Typography>
                          <Typography variant="body1">{currentWeather.uvIndex}</Typography>
                        </Box>
                      </Paper>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <WbSunnyIcon sx={{ 
                          color: theme.palette.primary.main, 
                          mr: 1,
                          transform: 'rotate(340deg)'
                        }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Sunrise</Typography>
                          <Typography variant="body1">{currentWeather.sunrise}</Typography>
                        </Box>
                      </Paper>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Selected Day Forecast Card */}
          {!loading && !error && selectedForecast && (
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton 
                    onClick={() => selectDay(null)} 
                    sx={{ mr: 2, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h5">
                    {selectedForecast.day}'s Forecast
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        {getWeatherIcon(selectedForecast.condition, true, '6rem', theme.palette.primary.main)}
                        <Typography variant="h3" sx={{ mt: 2 }}>
                          {Math.round((selectedForecast.high + selectedForecast.low) / 2)}°{tempUnit}
                        </Typography>
                        <Typography variant="h6">
                          {selectedForecast.condition}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        High: {selectedForecast.high}°{tempUnit} / Low: {selectedForecast.low}°{tempUnit}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      height: '100%',
                      p: 2
                    }}>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        Expected conditions: {selectedForecast.condition} throughout the day.
                      </Typography>
                      <Typography variant="body1">
                        Temperature range: {selectedForecast.low}°{tempUnit} to {selectedForecast.high}°{tempUnit}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        This is a forecast for {selectedForecast.day}. The data is based on predictions and may change slightly.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Forecast Cards */}
          {!loading && !error && forecast && forecast.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>5-Day Forecast</Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {forecast.map((day, index) => {
                  // Generate a theme for this forecast day to use its colors
                  const dayTheme = getTheme(day.condition);
                  
                  return (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                      <Card 
                        sx={{ 
                          textAlign: 'center', 
                          py: 2,
                          px: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          transform: selectedDay === index ? 'scale(1.05)' : 'none',
                          border: selectedDay === index 
                            ? `2px solid ${dayTheme.palette.primary.main}` 
                            : '2px solid transparent',
                          boxShadow: selectedDay === index 
                            ? `0 0 15px ${dayTheme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.2)' 
                                : `rgba(0, 0, 0, 0.2)`}` 
                            : 'none',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: `0 10px 20px ${dayTheme.palette.mode === 'dark' 
                              ? 'rgba(0, 0, 0, 0.3)' 
                              : 'rgba(0, 0, 0, 0.15)'}`,
                            borderColor: dayTheme.palette.primary.main,
                          },
                          minHeight: '200px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::after': selectedDay === index ? {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '5px',
                            background: `linear-gradient(90deg, ${dayTheme.palette.primary.main}, ${dayTheme.palette.primary.dark})`,
                          } : {}
                        }}
                      >
                        <CardActionArea 
                          onClick={() => selectDay(index)}
                          sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            height: '100%',
                            p: 2
                          }}
                        >
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {day.day}
                          </Typography>
                          <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                            {getWeatherIcon(day.condition, true, '3rem', dayTheme.palette.primary.main)}
                          </Box>
                          <Typography variant="body1" sx={{ mt: 1, mb: 1, fontWeight: 'medium' }}>
                            {day.high}° / {day.low}°{tempUnit}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {day.condition}
                          </Typography>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
