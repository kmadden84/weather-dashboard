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
    transform: rotate(0deg);
    opacity: 0.5;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.5;
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

// Add a new animation for sun rays
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

// Styled Components for different weather elements
const Cloud = styled('div')(({ theme, index }) => ({
  position: 'absolute',
  width: '180px',
  height: '60px',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderRadius: '50px',
  filter: 'blur(6px)',
  boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.5)',
  animation: `${floatCloud} ${5 + index * 2}s ease-in-out infinite`,
  animationDelay: `${index * 0.5}s`,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-30px',
    left: '40px',
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '50%',
    boxShadow: '40px 0 0 20px rgba(255, 255, 255, 0.85)',
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
  top: '50px',
  right: '50px',
  width: '300px',
  height: '300px',
  opacity: 0.4,
  animation: `${sunRay} 120s linear infinite`,
  borderRadius: '50%',
  overflow: 'hidden',
  zIndex: 0,
});

const SunRayEffect = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  background: 'radial-gradient(circle, rgba(255,223,130,0.8) 0%, rgba(255,255,255,0) 70%)',
  boxShadow: '0 0 50px rgba(255, 223, 130, 0.5)',
  borderRadius: '50%',
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
  
  // Create clouds with better distribution and varying sizes
  const renderClouds = () => {
    return Array.from({ length: 10 }).map((_, index) => {
      const scale = 0.4 + (index % 3) * 0.25;
      const topPos = (index % 5) * 15 + 5;
      const leftPos = (index * 10) % 100;
      
      return (
        <Cloud 
          key={`cloud-${index}`} 
          index={index} 
          style={{
            top: `${topPos}%`,
            left: `${leftPos}%`,
            transform: `scale(${scale})`,
            opacity: 0.7 + Math.random() * 0.3,
            zIndex: index < 5 ? 0 : 1, // Some clouds in front, some behind
          }}
        />
      );
    });
  };
  
  // Create additional sun rays for clear weather
  const renderSunEffects = () => {
    return (
      <>
        {/* Main sun */}
        <Box
          sx={{
            position: 'absolute',
            top: '80px',
            right: '80px',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(255,223,130,1) 0%, rgba(255,223,130,0.7) 40%, rgba(255,223,130,0) 70%)',
            boxShadow: '0 0 60px rgba(255, 223, 130, 0.8)',
            borderRadius: '50%',
            animation: `${pulse} 4s ease-in-out infinite`,
            zIndex: 2,
          }}
        />
        
        {/* Light beams - create rays that radiate from center */}
        <Box
          sx={{
            position: 'absolute',
            top: '140px',
            right: '140px',
            width: '0',
            height: '0',
            zIndex: 1,
          }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <Box
              key={`sunbeam-${index}`}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '300px',
                height: '3px',
                background: 'linear-gradient(90deg, rgba(255,223,130,0.8) 0%, rgba(255,223,130,0) 100%)',
                transformOrigin: '0 0',
                transform: `rotate(${index * 30}deg)`,
                opacity: 0.6,
              }}
            />
          ))}
        </Box>
        
        {/* Ambient glow */}
        <Box
          sx={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,223,130,0.2) 0%, rgba(255,223,130,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            animation: `${pulse} 8s ease-in-out infinite`,
          }}
        />
        
        {/* Additional glow spots */}
        {Array.from({ length: 8 }).map((_, index) => {
          const randomX = 5 + Math.random() * 80;
          const randomY = 5 + Math.random() * 80;
          const size = 20 + Math.random() * 60;
          return (
            <Box
              key={`glow-${index}`}
              sx={{
                position: 'absolute',
                top: `${randomY}%`,
                left: `${randomX}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'radial-gradient(circle, rgba(255,223,130,0.3) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(8px)',
                animation: `${pulse} ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                zIndex: 0,
              }}
            />
          );
        })}
      </>
    );
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
      return renderSunEffects();
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