import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Card,
  CardActionArea,
  useTheme
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const ForecastDisplay = ({ forecast, units, selectedDay, onSelectDay }) => {
  const theme = useTheme();
  
  if (!forecast || forecast.length === 0) return null;
  
  const tempUnit = units === 'imperial' ? 'F' : 'C';
  
  // Helper function to get weather icon
  const getWeatherIcon = (condition, size = 'medium') => {
    const iconProps = { 
      fontSize: size, 
      sx: { color: theme.palette.primary.main } 
    };
  
    const lowerCondition = condition ? condition.toLowerCase() : '';
    
    if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) {
      return <WbSunnyIcon {...iconProps} />;
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return <CloudIcon {...iconProps} />;
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <OpacityIcon {...iconProps} />;
    } else if (lowerCondition.includes('snow') || lowerCondition.includes('sleet') || lowerCondition.includes('ice')) {
      return <AcUnitIcon {...iconProps} />;
    } else if (lowerCondition.includes('thunder')) {
      return <FlashOnIcon {...iconProps} />;
    } else {
      return <WbSunnyIcon {...iconProps} />;
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        5-Day Forecast
      </Typography>
      
      <Grid container spacing={2}>
        {forecast.map((day, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <Card 
              sx={{ 
                textAlign: 'center',
                borderRadius: 2,
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                transform: selectedDay === index ? 'scale(1.05)' : 'none',
                border: selectedDay === index 
                  ? `2px solid ${theme.palette.primary.main}` 
                  : '2px solid transparent',
                boxShadow: selectedDay === index 
                  ? `0 0 15px ${theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(0, 0, 0, 0.2)'}` 
                  : 'none',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`,
                  borderColor: theme.palette.primary.main,
                },
                position: 'relative',
                overflow: 'hidden',
                '&::after': selectedDay === index ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                } : {}
              }}
            >
              <CardActionArea 
                onClick={() => onSelectDay(index)}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  p: 2
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {day.day}
                </Typography>
                
                <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                  {getWeatherIcon(day.condition)}
                </Box>
                
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {day.high}° / {day.low}°{tempUnit}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {day.condition}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ForecastDisplay; 