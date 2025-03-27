import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import SearchIcon from '@mui/icons-material/Search';

const EmptyState = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        py: 6, 
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '16px',
        textAlign: 'center',
        mb: 4
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          borderRadius: '50%', 
          backgroundColor: 'primary.light', 
          display: 'flex', 
          mb: 3 
        }}
      >
        <CloudIcon sx={{ fontSize: 60, color: 'white' }} />
      </Box>
      
      <Typography variant="h5" gutterBottom>
        Weather data unavailable
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px', mb: 2 }}>
        We couldn't retrieve the weather information. Please search for a valid city 
        or check your connection and try again.
      </Typography>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mt: 2,
          px: 3,
          py: 1,
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }}
      >
        <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          Search for a city in the search bar above
        </Typography>
      </Box>
    </Paper>
  );
};

export default EmptyState; 