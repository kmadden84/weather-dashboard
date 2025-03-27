import axios from 'axios';

// OpenWeatherMap API key from environment variables
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Custom error for API issues
class WeatherApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'WeatherApiError';
    this.status = status;
    this.data = data;
    this.response = { status, data }; // Make compatible with axios error structure
  }
}

// Create axios instance with defaults
const weatherAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
  params: {
    appid: API_KEY
  }
});

// Validate API key is available
const validateApiKey = () => {
  if (!API_KEY) {
    throw new WeatherApiError(
      'Weather API key is missing. Please check your environment variables.',
      401,
      { message: 'API key missing' }
    );
  }
};

// Get current weather data by city name
export const getCurrentWeather = async (city, units = 'imperial') => {
  try {
    validateApiKey();
    
    if (!city || city.trim() === '') {
      throw new WeatherApiError(
        'City name is required',
        400,
        { message: 'City name is required' }
      );
    }
    
    const response = await weatherAxios.get('/weather', {
      params: {
        q: city,
        units: units, // 'imperial' for Fahrenheit, 'metric' for Celsius
        cnt: 0
      }
    });

    return response.data;
  } catch (error) {
    // If it's already our custom error, just rethrow it
    if (error instanceof WeatherApiError) {
      throw error;
    }
    
    // Handle axios errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const errorData = error.response.data || {};
      
      let message = 'Error fetching weather data';
      
      if (status === 404) {
        message = `City "${city}" not found`;
      } else if (status === 401) {
        message = 'Invalid API key';
      } else if (status >= 500) {
        message = 'Weather service is temporarily unavailable';
      } else if (errorData.message) {
        message = errorData.message;
      }
      
      throw new WeatherApiError(message, status, errorData);
    } else if (error.request) {
      // The request was made but no response was received
      throw new WeatherApiError(
        'Network error. No response received from weather service.',
        0,
        { message: 'Network error' }
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new WeatherApiError(
        'Error setting up weather request: ' + error.message,
        0,
        { message: error.message }
      );
    }
  }
};

// Get 5-day forecast data by city name
export const getForecast = async (city, units = 'imperial') => {
  try {
    validateApiKey();
    
    if (!city || city.trim() === '') {
      throw new WeatherApiError(
        'City name is required',
        400,
        { message: 'City name is required' }
      );
    }
    
    const response = await weatherAxios.get('/forecast', {
      params: {
        q: city,
        units: units,
        cnt: 40 // Get full 5-day forecast (40 timestamps, 8 per day)
      }
    });
    
    // Filter the forecast data to get one timestamp per day (preferably mid-day)
    const filteredData = {
      ...response.data,
      list: filterOneForecastPerDay(response.data.list)
    };
    
    // Process the filtered forecast data to get daily forecasts
    const dailyForecasts = processDailyForecasts(filteredData);
    return dailyForecasts;
  } catch (error) {
    // If it's already our custom error, just rethrow it
    if (error instanceof WeatherApiError) {
      throw error;
    }
    
    // Handle axios errors - similar handling as getCurrentWeather
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data || {};
      
      let message = 'Error fetching forecast data';
      
      if (status === 404) {
        message = `City "${city}" not found`;
      } else if (status === 401) {
        message = 'Invalid API key';
      } else if (status === 500) {
        message = 'Weather service is temporarily unavailable';
      } else if (errorData.message) {
        message = errorData.message;
      }
      
      throw new WeatherApiError(message, status, errorData);
    } else if (error.request) {
      throw new WeatherApiError(
        'Network error. No response received from weather service.',
        0,
        { message: 'Network error' }
      );
    } else {
      throw new WeatherApiError(
        'Error setting up forecast request: ' + error.message,
        0,
        { message: error.message }
      );
    }
  }
};

// Helper function to filter forecast list to get one forecast per day (preferably mid-day)
const filterOneForecastPerDay = (forecastList) => {
  const uniqueDays = {};
  
  // Group forecasts by day
  forecastList.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const hour = date.getHours();
    
    // Prefer timestamps around noon (12-14) for most representative daily weather
    if (!uniqueDays[day] || (hour >= 12 && hour <= 14)) {
      uniqueDays[day] = forecast;
    }
  });
  
  // Convert back to array
  return Object.values(uniqueDays);
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
    dailyData[day].temp = Math.round(forecast.main.temp);
    dailyData[day].humidity = forecast.main.humidity;
    dailyData[day].windSpeed = forecast.wind.speed;

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

// Get current weather data by coordinates
export const getWeatherByCoords = async (lat, lon, units = 'imperial') => {
  try {
    validateApiKey();
    
    if (lat === undefined || lon === undefined) {
      throw new WeatherApiError(
        'Latitude and longitude are required',
        400,
        { message: 'Latitude and longitude are required' }
      );
    }
    
    const response = await weatherAxios.get('/weather', {
      params: {
        lat: lat,
        lon: lon,
        units: units // 'imperial' for Fahrenheit, 'metric' for Celsius
      }
    });
    
    return response.data;
  } catch (error) {
    // If it's already our custom error, just rethrow it
    if (error instanceof WeatherApiError) {
      throw error;
    }
    
    // Handle axios errors
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data || {};
      
      let message = 'Error fetching weather data';
      
      if (status === 404) {
        message = 'Location not found';
      } else if (status === 401) {
        message = 'Invalid API key';
      } else if (status >= 500) {
        message = 'Weather service is temporarily unavailable';
      } else if (errorData.message) {
        message = errorData.message;
      }
      
      throw new WeatherApiError(message, status, errorData);
    } else if (error.request) {
      // The request was made but no response was received
      throw new WeatherApiError(
        'Network error. No response received from weather service.',
        0,
        { message: 'Network error' }
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new WeatherApiError(
        'Error setting up weather request: ' + error.message,
        0,
        { message: error.message }
      );
    }
  }
};

// Get 5-day forecast data by coordinates
export const getForecastByCoords = async (lat, lon, units = 'imperial') => {
  try {
    validateApiKey();
    
    if (lat === undefined || lon === undefined) {
      throw new WeatherApiError(
        'Latitude and longitude are required',
        400,
        { message: 'Latitude and longitude are required' }
      );
    }
    
    const response = await weatherAxios.get('/forecast', {
      params: {
        lat: lat,
        lon: lon,
        units: units,
        cnt: 40 // 5 days, 8 data points per day (every 3 hours)
      }
    });
    
    // Filter the forecast data to get one timestamp per day
    const filteredData = {
      ...response.data,
      list: filterOneForecastPerDay(response.data.list)
    };
    
    // Process the filtered forecast data to get daily forecasts
    const dailyForecasts = processDailyForecasts(filteredData);
    return dailyForecasts;
  } catch (error) {
    // If it's already our custom error, just rethrow it
    if (error instanceof WeatherApiError) {
      throw error;
    }
    
    // Handle axios errors - similar handling as getCurrentWeather
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data || {};
      
      let message = 'Error fetching forecast data';
      
      if (status === 404) {
        message = 'Location not found';
      } else if (status === 401) {
        message = 'Invalid API key';
      } else if (status >= 500) {
        message = 'Weather service is temporarily unavailable';
      } else if (errorData.message) {
        message = errorData.message;
      }
      
      throw new WeatherApiError(message, status, errorData);
    } else if (error.request) {
      throw new WeatherApiError(
        'Network error. No response received from weather service.',
        0,
        { message: 'Network error' }
      );
    } else {
      throw new WeatherApiError(
        'Error setting up forecast request: ' + error.message,
        0,
        { message: error.message }
      );
    }
  }
}; 