import axios from 'axios';

// OpenWeatherMap API key from environment variables
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather data by city name
export const getCurrentWeather = async (city, units = 'imperial') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units // 'imperial' for Fahrenheit, 'metric' for Celsius
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get 5-day forecast data by city name
export const getForecast = async (city, units = 'imperial') => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units,
        cnt: 40 // 5 days, 8 data points per day (every 3 hours)
      }
    });
    
    // Process the forecast data to get daily forecasts
    const dailyForecasts = processDailyForecasts(response.data);
    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Helper function to process the 5-day forecast into daily data
const processDailyForecasts = (forecastData) => {
  const dailyData = {};
  
  // Group forecast by day
  forecastData.list.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    if (!dailyData[day]) {
      dailyData[day] = {
        day,
        high: -Infinity,
        low: Infinity,
        conditions: [],
        conditionCounts: {}
      };
    }
    
    // Update high/low temperatures
    dailyData[day].high = Math.max(dailyData[day].high, Math.round(forecast.main.temp_max));
    dailyData[day].low = Math.min(dailyData[day].low, Math.round(forecast.main.temp_min));
    
    // Track weather conditions to determine most common
    const condition = forecast.weather[0].main;
    dailyData[day].conditions.push(condition);
    dailyData[day].conditionCounts[condition] = (dailyData[day].conditionCounts[condition] || 0) + 1;
  });
  
  // Determine most common condition for each day
  Object.values(dailyData).forEach(day => {
    let maxCount = 0;
    let mostCommonCondition = '';
    
    Object.entries(day.conditionCounts).forEach(([condition, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonCondition = condition;
      }
    });
    
    day.condition = mostCommonCondition;
    delete day.conditions;
    delete day.conditionCounts;
  });
  
  // Convert to array and limit to 5 days
  return Object.values(dailyData).slice(0, 5);
};

// Function to get weather icon based on condition and time
export const getWeatherIcon = (condition, isDay = true) => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return isDay ? 'WbSunny' : 'NightsStay';
  } else if (lowerCondition.includes('cloud')) {
    return 'Cloud';
  } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return 'Opacity';
  } else if (lowerCondition.includes('snow')) {
    return 'AcUnit';
  } else if (lowerCondition.includes('thunderstorm')) {
    return 'FlashOn';
  } else if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) {
    return 'Cloud';
  } else {
    return isDay ? 'WbSunny' : 'NightsStay';
  }
};

// Utility function to format temperature
export const formatTemp = (temp) => {
  return Math.round(temp);
};

// Utility function to format date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

// Function to determine if it's daytime based on sunrise/sunset
export const isDaytime = (dt, sunrise, sunset) => {
  return dt > sunrise && dt < sunset;
}; 