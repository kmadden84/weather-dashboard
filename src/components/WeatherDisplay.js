import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  CircularProgress,
  IconButton
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const WeatherDisplay = ({ currentWeather, units, error, loading, isSelectedDay = false, onBack }) => {
  // If loading or error and no current weather, show loading indicator
  if ((loading && !currentWeather) || (error && !currentWeather)) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {loading ? 'Loading weather data...' : 'Could not load weather data.'}
        </Typography>
      </Box>
    );
  }

  // No weather data to display
  if (!currentWeather) {
    return null;
  }

  // Get temperature unit symbol
  const tempUnit = units === 'imperial' ? 'F' : 'C';

  // Helper function to get weather icon
  const getWeatherIcon = (condition, isDay = true, size = 'large', color) => {
    const iconProps = { 
      fontSize: size, 
      sx: { color: color || 'primary.main' } 
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

  return (
    <Card sx={{ 
      mb: 4, 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px'
    }}>
      <CardContent sx={{ p: 3 }}>
        {isSelectedDay && onBack && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton 
              onClick={onBack} 
              sx={{ mr: 2, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">
              {currentWeather.day}'s Forecast
            </Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              {!isSelectedDay && (
                <>
                  <Typography variant="h5" gutterBottom>
                    {currentWeather.city}, {currentWeather.country}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {currentWeather.date}
                  </Typography>
                </>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                {getWeatherIcon(currentWeather.condition, currentWeather.isDay, 'large')}
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
                {isSelectedDay ? (
                  `High: ${currentWeather.high}°${tempUnit} / Low: ${currentWeather.low}°${tempUnit}`
                ) : (
                  `Feels like ${currentWeather.feelsLike}°${tempUnit}`
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <OpacityIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Humidity</Typography>
                    <Typography variant="body1">{currentWeather.humidity}%</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Box sx={{ mr: 1, transform: 'rotate(45deg)' }}>
                    <FlashOnIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Wind</Typography>
                    <Typography variant="body1">{currentWeather.windSpeed} {units === 'imperial' ? 'mph' : 'm/s'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <WbSunnyIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Sunrise</Typography>
                    <Typography variant="body1">{currentWeather.sunrise || "N/A"}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <NightsStayIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Sunset</Typography>
                    <Typography variant="body1">{currentWeather.sunset || "N/A"}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay; 