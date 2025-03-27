import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css'; // Import our custom toast styles
import { useTheme } from '@mui/material';

// This component wraps the ToastContainer with custom styling to match our app
const ToastManager = React.memo(() => {
  const theme = useTheme();
  
  // Custom styling for toast container based on current theme
  const toastTheme = theme.palette.mode === 'dark' ? 'dark' : 'light';
  
  // State to track if mount is complete
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Mark as mounted
    setIsMounted(true);
    
    // Small cleanup of any existing toasts or toast related elements
    const cleanup = () => {
      try {
        toast.clearWaitingQueue();
        const toastElements = document.querySelectorAll('.Toastify__toast-container');
        toastElements.forEach(el => {
          if (el.childElementCount === 0) {
            el.remove();
          }
        });
      } catch (e) {
        console.error('Error cleaning up toasts:', e);
      }
    };
    
    // Run cleanup after a short delay
    const timer = setTimeout(cleanup, 200);
    
    return () => {
      clearTimeout(timer);
      toast.clearWaitingQueue();
    };
  }, []);
  
  // Memoize the style object
  const styleVars = {
    '--toastify-color-light': 'rgba(255, 255, 255, 0.98)',
    '--toastify-color-dark': 'rgba(40, 40, 40, 0.98)',
    
    '--toastify-color-success': theme.palette.success.main,
    '--toastify-color-error': theme.palette.error.main,
    '--toastify-color-info': theme.palette.primary.main,
    '--toastify-color-warning': theme.palette.warning.main,
    
    '--toastify-icon-color-success': theme.palette.success.main,
    '--toastify-icon-color-error': theme.palette.error.main,
    '--toastify-icon-color-info': theme.palette.primary.main,
    '--toastify-icon-color-warning': theme.palette.warning.main,
    
    '--toastify-text-color-light': '#333',
    '--toastify-text-color-dark': '#fff',
    
    '--toastify-toast-width': 'auto',
    '--toastify-toast-background': 'transparent',
    '--toastify-toast-min-height': 'auto',
    '--toastify-toast-max-height': '800px',
  };
  
  // Don't render until mount is complete to avoid flash of wrong styles
  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="toast-manager-wrapper" style={{ position: 'fixed', zIndex: 9999999 }}>
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={toastTheme}
        limit={3}
        toastClassName={(context) => {
          const { type = 'default' } = context || {};
          return `Toastify__toast Toastify__toast--${type} weather-toast-${type}`;
        }}
        style={styleVars}
      />
    </div>
  );
});

export default ToastManager; 