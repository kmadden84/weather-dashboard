import React, { useState, useRef, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';
import './styles/toast.css';
import { theme } from './themes/themes';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherStats from './components/WeatherStats';
import WeatherAnimations from './components/WeatherAnimations';
import ForecastDisplay from './components/ForecastDisplay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useWeather from './hooks/useWeather';
import { showErrorToast } from './utils/toastUtils';

function App() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  
  // Use our custom hook to fetch weather data
  const { 
    currentWeather, 
    forecast, 
    location, 
    searchLocation, 
    units, 
    toggleUnits, 
    loading, 
    error,
    selectedDay,
    selectDay
  } = useWeather();

  // Get selected forecast day or current weather data
  const selectedForecast = selectedDay !== null ? forecast[selectedDay] : null;

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleGeolocationError = (error) => {
    let message = 'Could not get your location. ';
    
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message += 'Location permission was denied.';
        break;
      case error.POSITION_UNAVAILABLE:
        message += 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        message += 'The request to get location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        message += 'An unknown error occurred.';
        break;
      default:
        message += 'Please try again later.';
    }
    
    // Use the utility function instead of direct toast call
    showErrorToast(message);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          limit={3}
        />
        {/* Weather animations based on current condition with parallax effect */}
        <Box
          ref={containerRef}
          className={`main-container ${detailsOpen ? 'details-open' : ''}`}
          sx={{
            position: 'relative',
            overflow: 'auto',
            height: '100vh',
            background: 'linear-gradient(to bottom, #64b5f6 0%, #bbdefb 100%)',
          }}
        >
          <WeatherAnimations 
            condition={selectedForecast?.condition || currentWeather?.condition} 
            scrollY={scrollY}
          />
          
          {/* Main content area */}
          <Container 
            maxWidth="lg"
            sx={{
              position: 'relative',
              zIndex: 2,
              py: 3,
              pt: { xs: 6, sm: 8 }
            }}
          >
            {/* Search Bar */}
            <SearchBar 
              location={location} 
              setLocation={searchLocation} 
              loading={loading}
              units={units}
              toggleUnits={toggleUnits}
              onGeolocationError={handleGeolocationError}
            />
            
            {/* Current Weather Display or Selected Day Forecast */}
            {selectedForecast ? (
              <WeatherDisplay 
                currentWeather={{
                  ...selectedForecast,
                  temperature: Math.round((selectedForecast.high + selectedForecast.low) / 2),
                  feelsLike: Math.round((selectedForecast.high + selectedForecast.low) / 2),
                  humidity: selectedForecast.humidity || 45,
                  windSpeed: selectedForecast.windSpeed || 5,
                  sunrise: selectedForecast.sunrise || '6:30 AM',
                  sunset: selectedForecast.sunset || '7:15 PM'
                }}
                units={units}
                error={error}
                loading={loading}
                isSelectedDay={true}
                onBack={() => selectDay(null)}
              />
            ) : (
              currentWeather && (
                <WeatherDisplay 
                  currentWeather={currentWeather} 
                  units={units}
                  error={error}
                  loading={loading}
                />
              )
            )}
            
            {/* Forecast Display */}
            {forecast && forecast.length > 0 && (
              <ForecastDisplay 
                forecast={forecast} 
                units={units}
                selectedDay={selectedDay}
                onSelectDay={selectDay}
              />
            )}
            
            {/* Detailed Weather Stats Button */}
            {currentWeather && !detailsOpen && !selectedForecast && (
              <Box 
                className="details-button"
                onClick={() => setDetailsOpen(true)}
                sx={{
                  cursor: 'pointer',
                  p: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  mt: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                View Detailed Weather Stats
              </Box>
            )}
          </Container>
          
          {/* Detailed Weather Stats Overlay */}
          {detailsOpen && currentWeather && (
            <Box
              className="details-overlay"
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
                zIndex: 10,
                p: 3,
                overflow: 'auto',
              }}
            >
              <Box 
                onClick={() => setDetailsOpen(false)}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  color: 'white',
                }}
              >
                <ArrowBackIcon /> Back to Weather
              </Box>
              <WeatherStats 
                currentWeather={currentWeather} 
                units={units}
              />
            </Box>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
