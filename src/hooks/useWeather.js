import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCurrentWeather, getForecast, formatDate, isDaytime } from '../services/weatherApi';
import React from 'react';
import { showErrorToast, showSuccessToast, showInfoToast, showCustomToast, clearAllToasts } from '../utils/toastUtils';

const useWeather = (initialLocation = 'New York') => {
  const [location, setLocation] = useState(initialLocation);
  const [lastSuccessfulLocation, setLastSuccessfulLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('imperial'); // 'imperial' for Fahrenheit, 'metric' for Celsius
  const [selectedDay, setSelectedDay] = useState(null); // To track selected forecast day

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather and forecast in parallel
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(city, units),
        getForecast(city, units)
      ]);
      
      // Process current weather data
      const processedCurrentWeather = {
        city: currentData.name,
        country: currentData.sys.country,
        date: formatDate(currentData.dt),
        temperature: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed),
        windDirection: currentData.wind.deg,
        uvIndex: 5, // Note: OpenWeatherMap free tier doesn't include UV Index
        sunrise: new Date(currentData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        sunset: new Date(currentData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        icon: currentData.weather[0].icon,
        isDay: isDaytime(currentData.dt, currentData.sys.sunrise, currentData.sys.sunset)
      };
      
      setCurrentWeather(processedCurrentWeather);
      setForecast(forecastData);
      setLastSuccessfulLocation(city);
      setSelectedDay(null); // Reset selected day only on successful fetch
      setLoading(false);

      // Show success toast for a new location (but only if it's not the initial load)
      if (lastSuccessfulLocation !== null && city !== lastSuccessfulLocation) {
        showSuccessToast(`Weather data updated for ${currentData.name}`);
      }
    } catch (err) {
      console.error('Error in fetchWeatherData:', err);
      
      // Never set error state for API errors when we already have data
      // Only set error for catastrophic issues during first load
      if (currentWeather) {
        const errorMessage = getErrorMessage(err, city);
        showAppropriateToast(err, city);
        setLoading(false);
        
        // If we have a previous successful location, revert to it
        if (lastSuccessfulLocation) {
          setLocation(lastSuccessfulLocation);
        }
        return; // Exit early without setting any error state
      }
      
      // For first load without existing data:
      if (err.response && err.response.status === 404) {
        // Special case for 404 - show suggestions but no error state
        showAppropriateToast(err, city);
        setLoading(false);
        return; // Exit without setting error state
      }
      
      // Only if it's a catastrophic error on first load, set the error state
      setError("We couldn't load weather data. Please try again later.");
      setLoading(false);
    }
  };
  
  // Search for weather by location
  const searchLocation = (city) => {
    if (city && city.trim() !== '') {
      // Check if we're already fetching this location
      if (city.trim().toLowerCase() === location.trim().toLowerCase() && !loading) {
        showInfoToast("Already displaying weather for this location", { autoClose: 2000 });
      } else {
        // Clear any existing toasts before searching
        clearAllToasts();
        setLocation(city);
      }
    } else {
      showErrorToast("Please enter a city name");
    }
  };

  // Toggle temperature units
  const toggleUnits = () => {
    setUnits(prevUnits => {
      const newUnits = prevUnits === 'imperial' ? 'metric' : 'imperial';
      showInfoToast(`Temperature unit changed to ${newUnits === 'imperial' ? 'Fahrenheit' : 'Celsius'}`);
      return newUnits;
    });
  };

  // Select a day from the forecast
  const selectDay = (index) => {
    if (index === selectedDay) {
      setSelectedDay(null); // Deselect if already selected
    } else {
      setSelectedDay(index);
    }
  };
  
  // Fetch data whenever location or units change
  useEffect(() => {
    fetchWeatherData(location);
  }, [location, units]);

  // Add a function to generate city suggestions
  const suggestSimilarCities = (input) => {
    // List of common cities to suggest if the entered city isn't found
    const commonCities = [
      'New York', 'London', 'Paris', 'Tokyo', 'Berlin', 'Rome',
      'Madrid', 'Beijing', 'Sydney', 'Toronto', 'Dubai', 'Singapore',
      'Chicago', 'Los Angeles', 'Seattle', 'Miami', 'Boston', 'Atlanta',
      'San Francisco', 'Washington DC', 'Mumbai', 'Delhi', 'Moscow', 'Stockholm'
    ];
    
    // Simple suggestion logic - suggest cities that start with the same letter
    // or contain parts of the input
    const inputLower = input.toLowerCase();
    
    const suggestions = commonCities.filter(city => {
      const cityLower = city.toLowerCase();
      
      // Check if city starts with the same letter
      if (cityLower.startsWith(inputLower.charAt(0))) return true;
      
      // Check if the input is at least 3 chars and is contained in the city
      if (inputLower.length >= 3 && cityLower.includes(inputLower)) return true;
      
      // Check if the city is contained in the input (user might have typed too much)
      if (inputLower.length >= 5 && inputLower.includes(cityLower)) return true;
      
      return false;
    }).slice(0, 3); // Limit to 3 suggestions
    
    return suggestions;
  };

  // First, create a component for city suggestions
  const CitySuggestions = ({ suggestions, onSelectCity }) => {
    return (
      <div style={{ padding: '4px 0', color: '#333' }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
          City not found
        </div>
        <div style={{ color: '#333' }}>
          Did you mean: 
          {suggestions.map((city, index) => (
            <React.Fragment key={city}>
              <span 
                style={{ 
                  color: '#3498db', 
                  textDecoration: 'underline', 
                  cursor: 'pointer',
                  margin: '0 4px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  padding: '2px 6px',
                  backgroundColor: 'rgba(52, 152, 219, 0.1)',
                  borderRadius: '4px',
                }}
                onClick={() => onSelectCity(city)}
              >
                {city}
              </span>
              {index < suggestions.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
          ?
        </div>
      </div>
    );
  };

  // Helper to get appropriate error message
  const getErrorMessage = (err, city) => {
    if (err.response) {
      if (err.response.status === 404) {
        return `City "${city}" not found. Please check the spelling or try another location.`;
      } else if (err.response.status === 401) {
        return 'API key error. Please contact support.';
      } else if (err.response.status >= 500) {
        return 'Weather service is temporarily unavailable. Please try again later.';
      } else if (err.response.data && err.response.data.message) {
        return `Failed to fetch weather data: ${err.response.data.message}`;
      }
    } else if (err.request) {
      return 'Network error. Please check your connection and try again.';
    }
    return 'Failed to fetch weather data. Please try again.';
  };

  // Helper to show appropriate toast based on error
  const showAppropriateToast = (err, city) => {
    // First clear any existing toasts
    clearAllToasts();

    if (err.response && err.response.status === 404) {
      const suggestions = suggestSimilarCities(city);
      if (suggestions.length > 0) {
        // Show toast with suggestions using React component
        showCustomToast(
          <CitySuggestions 
            suggestions={suggestions} 
            onSelectCity={(suggestion) => searchLocation(suggestion)}
          />, 
          'error',
          {
            autoClose: 10000  // longer timeout for suggestions
          }
        );
      } else {
        showErrorToast(`City "${city}" not found. Please check the spelling or try another location.`);
      }
    } else if (err.response && err.response.status === 401) {
      showErrorToast('API key error. Please contact support.');
    } else if (err.response && err.response.status >= 500) {
      showErrorToast('Weather service is temporarily unavailable. Please try again later.');
    } else if (err.response && err.response.data && err.response.data.message) {
      showErrorToast(`Failed to fetch weather data: ${err.response.data.message}`);
    } else if (err.request) {
      showErrorToast('Network error. Please check your connection and try again.');
    } else {
      showErrorToast('Failed to fetch weather data. Please try again.');
    }
  };

  return {
    location,
    currentWeather,
    forecast,
    loading,
    error,
    searchLocation,
    units,
    toggleUnits,
    selectedDay,
    selectDay,
    // Add a function to clear errors
    clearError: () => setError(null)
  };
};

export default useWeather; 