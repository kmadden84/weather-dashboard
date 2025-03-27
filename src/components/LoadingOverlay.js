import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingOverlay = ({ isLoading, message = "Updating weather data..." }) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: '12px',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          maxWidth: '90%',
          width: '320px',
        }}
      >
        <CircularProgress color="primary" size={50} sx={{ mb: 2 }} />
        <Typography variant="h6" textAlign="center">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingOverlay; 