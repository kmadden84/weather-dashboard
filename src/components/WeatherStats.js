import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
  Divider
} from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';
import ExploreIcon from '@mui/icons-material/Explore';

const WeatherStats = ({ currentWeather, units }) => {
  if (!currentWeather) return null;

  const tempUnit = units === 'imperial' ? 'F' : 'C';
  const speedUnit = units === 'imperial' ? 'mph' : 'm/s';
  
  // Create a more detailed view of weather data
  const statItems = [
    {
      label: 'Feels Like',
      value: `${currentWeather.feelsLike}°${tempUnit}`,
      icon: <ThermostatIcon />,
      description: 'How the temperature actually feels on your skin'
    },
    {
      label: 'Humidity',
      value: `${currentWeather.humidity}%`,
      icon: <OpacityIcon />,
      description: 'The amount of water vapor in the air'
    },
    {
      label: 'Wind Speed',
      value: `${currentWeather.windSpeed} ${speedUnit}`,
      icon: <AirIcon />,
      description: 'How fast the air is moving'
    },
    {
      label: 'Wind Direction',
      value: getWindDirection(currentWeather.windDirection),
      icon: <ExploreIcon />,
      description: 'The direction the wind is blowing from'
    },
    {
      label: 'Pressure',
      value: currentWeather.pressure ? `${currentWeather.pressure} hPa` : 'N/A',
      icon: <CompressIcon />,
      description: 'Atmospheric pressure at sea level'
    },
    {
      label: 'UV Index',
      value: currentWeather.uvIndex || 'N/A',
      icon: <WbSunnyIcon />,
      description: 'Level of UV radiation from the sun'
    },
    {
      label: 'Visibility',
      value: currentWeather.visibility ? `${Math.round(currentWeather.visibility / 1000)} km` : 'N/A',
      icon: <VisibilityIcon />,
      description: 'The distance you can clearly see'
    },
    {
      label: 'Cloudiness',
      value: currentWeather.clouds ? `${currentWeather.clouds}%` : 'N/A',
      icon: <SpeedIcon />,
      description: 'Percentage of the sky covered by clouds'
    }
  ];

  return (
    <Box sx={{ color: 'white' }}>
      <Typography variant="h4" gutterBottom>
        Detailed Weather Statistics
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
        Current conditions in {currentWeather.city}, {currentWeather.country}
      </Typography>
      
      <Divider sx={{ mb: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />
      
      <Grid container spacing={3}>
        {statItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                transition: 'transform 0.2s, background-color 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ mr: 1, color: 'primary.main' }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" color="primary.light">
                  {item.label}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ my: 2 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Helper function to convert wind degree to direction
function getWindDirection(degrees) {
  if (degrees === undefined) return 'N/A';
  
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export default WeatherStats; 