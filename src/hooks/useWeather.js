import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast, formatDate, isDaytime } from '../services/weatherApi';

const useWeather = (initialLocation = 'New York') => {
  const [location, setLocation] = useState(initialLocation);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('imperial'); // 'imperial' for Fahrenheit, 'metric' for Celsius
  const [selectedDay, setSelectedDay] = useState(null); // To track selected forecast day

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    setSelectedDay(null); // Reset selected day when fetching new data
    
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
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
      console.error('Error in fetchWeatherData:', err);
    }
  };
  
  // Search for weather by location
  const searchLocation = (city) => {
    if (city && city.trim() !== '') {
      setLocation(city);
    }
  };

  // Toggle temperature units
  const toggleUnits = () => {
    setUnits(prevUnits => prevUnits === 'imperial' ? 'metric' : 'imperial');
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
    selectDay
  };
};

export default useWeather; 