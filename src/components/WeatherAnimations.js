import React, { useEffect, useState } from 'react';
import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Keyframes for animations
const floatCloud = keyframes`
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-15px) translateX(15px);
    opacity: 1;
  }
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.8;
  }
`;

const rainDrop = keyframes`
  0% {
    transform: translateY(-100vh);
    opacity: 0;
  }
  70% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

const snowFall = keyframes`
  0% {
    transform: translateY(-10vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(100vh) translateX(20px);
    opacity: 0;
  }
`;

const sunRay = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.7;
  }
`;

const lightning = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  14% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  21% {
    opacity: 1;
  }
  24% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

// Styled Components for different weather elements
const Cloud = styled('div')(({ theme, index }) => ({
  position: 'absolute',
  width: '180px',
  height: '60px',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  borderRadius: '50px',
  filter: 'blur(10px)',
  animation: `${floatCloud} ${5 + index * 2}s ease-in-out infinite`,
  animationDelay: `${index * 0.5}s`,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-30px',
    left: '40px',
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: '50%',
    boxShadow: '40px 0 0 20px rgba(255, 255, 255, 0.4)',
  },
  zIndex: 0,
}));

const RainDrop = styled('div')(({ theme, index }) => ({
  position: 'absolute',
  width: '2px',
  height: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '0 0 5px 5px',
  animation: `${rainDrop} ${0.5 + Math.random() * 0.3}s linear infinite`,
  animationDelay: `${Math.random() * 2}s`,
  left: `${(index * 5) % 100}%`,
  top: '-20px',
  zIndex: 0,
}));

const Snowflake = styled('div')(({ theme, index }) => ({
  position: 'absolute',
  width: '8px',
  height: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
  animation: `${snowFall} ${5 + Math.random() * 5}s linear infinite`,
  animationDelay: `${Math.random() * 5}s`,
  left: `${Math.random() * 100}%`,
  top: '-10px',
  zIndex: 0,
}));

const SunRayWrapper = styled('div')({
  position: 'absolute',
  top: '30px',
  right: '30px',
  width: '200px',
  height: '200px',
  opacity: 0.6,
  animation: `${sunRay} 20s linear infinite`,
  zIndex: 0,
});

const SunRayEffect = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
});

const LightningFlash = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  animation: `${lightning} 7s infinite`,
  zIndex: 0,
});

const WeatherAnimations = ({ condition }) => {
  const lowerCondition = condition ? condition.toLowerCase() : '';
  const [currentCondition, setCurrentCondition] = useState(lowerCondition);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle condition changes with transition effect
  useEffect(() => {
    if (lowerCondition !== currentCondition) {
      setIsTransitioning(true);
      
      // Start transition to new animation after fade out
      const timer = setTimeout(() => {
        setCurrentCondition(lowerCondition);
        setIsTransitioning(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [lowerCondition, currentCondition]);
  
  // Create clouds
  const renderClouds = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Cloud 
        key={`cloud-${index}`} 
        index={index} 
        style={{
          top: `${10 + index * 8}%`,
          left: `${(index * 20) % 100}%`,
          transform: `scale(${0.5 + index * 0.2})`,
          opacity: 0.5 + Math.random() * 0.3,
        }}
      />
    ));
  };
  
  // Create rain drops
  const renderRain = () => {
    return Array.from({ length: 100 }).map((_, index) => (
      <RainDrop 
        key={`rain-${index}`} 
        index={index}
        style={{
          left: `${Math.random() * 100}%`,
        }}
      />
    ));
  };
  
  // Create snowflakes
  const renderSnow = () => {
    return Array.from({ length: 50 }).map((_, index) => (
      <Snowflake 
        key={`snow-${index}`} 
        index={index}
      />
    ));
  };
  
  // Determine which animation to render based on condition
  const renderWeatherAnimation = () => {
    if (currentCondition.includes('cloud') || currentCondition.includes('overcast')) {
      return renderClouds();
    } else if (currentCondition.includes('rain') || currentCondition.includes('drizzle')) {
      return (
        <>
          {renderClouds()}
          {renderRain()}
        </>
      );
    } else if (currentCondition.includes('snow')) {
      return (
        <>
          {renderClouds()}
          {renderSnow()}
        </>
      );
    } else if (currentCondition.includes('clear') || currentCondition.includes('sun')) {
      return (
        <SunRayWrapper>
          <SunRayEffect />
        </SunRayWrapper>
      );
    } else if (currentCondition.includes('thunder')) {
      return (
        <>
          {renderClouds()}
          {renderRain()}
          <LightningFlash />
        </>
      );
    }
    
    return null;
  };
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.5s ease',
        zIndex: 0,
      }}
    >
      {renderWeatherAnimation()}
    </Box>
  );
};

export default WeatherAnimations; 