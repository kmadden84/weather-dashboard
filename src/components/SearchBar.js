import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const SearchBar = ({ 
  location, 
  setLocation, 
  loading, 
  units, 
  toggleUnits,
  onGeolocationError
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = searchInput.trim();
      if (trimmedInput) {
        setLocation(trimmedInput);
        setSearchInput('');
      } else {
        // If empty search, don't do anything
        e.preventDefault();
      }
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // We can only set a location string here, not coordinates
          // For demonstration, set to a nearby major city
          setLocation("Current Location");
        },
        (error) => {
          if (onGeolocationError) {
            onGeolocationError(error);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      if (onGeolocationError) {
        onGeolocationError({ code: "UNAVAILABLE", message: "Geolocation is not supported by this browser." });
      }
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' }, 
      alignItems: 'center',
      gap: 2,
      mb: 4,
      width: '100%'
    }}>
      <TextField
        fullWidth
        placeholder="Search for a city..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleSearch}
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Use current location">
                <IconButton 
                  onClick={handleGeolocation}
                  disabled={loading}
                >
                  <MyLocationIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            }
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      
      <Tooltip title={`Switch to ${units === 'imperial' ? 'Celsius' : 'Fahrenheit'}`}>
        <IconButton 
          onClick={toggleUnits} 
          disabled={loading}
          sx={{ 
            color: 'primary.main',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            p: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            }
          }}
        >
          <DeviceThermostatIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SearchBar; 