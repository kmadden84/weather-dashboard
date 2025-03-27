import React, { useMemo } from 'react';
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

const rain = keyframes`
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

const snow = keyframes`
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
  animation: `${rain} ${0.5 + Math.random() * 0.3}s linear infinite`,
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
  animation: `${snow} ${5 + Math.random() * 5}s linear infinite`,
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

const WeatherAnimations = ({ condition, scrollY = 0 }) => {
  // Normalize condition to lowercase for easier matching
  const lowerCondition = condition ? condition.toLowerCase() : '';

  // Determine which animation to render based on condition
  const renderAnimation = useMemo(() => {
    // Clear or Sunny weather
    if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) {
      return renderSunnyAnimation(scrollY);
    }
    // Cloudy weather
    else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return renderCloudyAnimation(scrollY);
    }
    // Rainy weather
    else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return renderRainyAnimation(scrollY);
    }
    // Snowy weather
    else if (lowerCondition.includes('snow')) {
      return renderSnowyAnimation(scrollY);
    }
    // Thunderstorm
    else if (lowerCondition.includes('thunder')) {
      return renderThunderstormAnimation(scrollY);
    }
    // Default to clear/sunny if no condition or unknown
    else {
      return renderSunnyAnimation(scrollY);
    }
  }, [lowerCondition, scrollY]);

  return (
    <Box 
      sx={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none', // Make sure clicks pass through
        transform: `translateY(${scrollY * 0.3}px)`,
      }}
    >
      {renderAnimation}
    </Box>
  );
};

// Sunny weather animation
const renderSunnyAnimation = (scrollY) => {
  // Create an array of sun rays
  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) * (Math.PI / 180);
    return {
      angle,
      delay: i * 0.2,
      size: Math.random() * 0.4 + 0.8,
    };
  });

  return (
    <>
      {/* Gradient sky background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #64b5f6 0%, #bbdefb 100%)',
          opacity: 0.7,
        }}
      />
      
      {/* Sun */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '20%',
          transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.1}px)`,
        }}
      >
        {/* Sun glow effect */}
        <Box
          sx={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,236,95,0.6) 0%, rgba(255,167,38,0) 70%)',
            animation: `${pulse} 8s infinite ease-in-out`,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            filter: 'blur(8px)',
          }}
        />
        
        {/* Main sun circle */}
        <Box
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(to bottom right, #ffeb3b, #ff9800)',
            boxShadow: '0 0 20px rgba(255, 235, 59, 0.8)',
            zIndex: 1,
            position: 'relative',
          }}
        />
        
        {/* Sun rays */}
        {rays.map((ray, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '80px',
              height: '3px',
              background: 'linear-gradient(to right, rgba(255, 235, 59, 0.8), rgba(255, 152, 0, 0))',
              borderRadius: '2px',
              transformOrigin: '0 50%',
              transform: `rotate(${index * 30}deg)`,
              animation: `${sunRay} ${6 + ray.delay}s infinite linear`,
              animationDelay: `${ray.delay}s`,
              opacity: 0.8,
              zIndex: 0,
            }}
          />
        ))}
      </Box>
    </>
  );
};

// Cloudy weather animation
const renderCloudyAnimation = (scrollY) => {
  // Create an array of clouds with different properties
  const clouds = Array.from({ length: 8 }, (_, i) => ({
    top: `${Math.random() * 50 + 5}%`,
    left: `${Math.random() * 70}%`,
    scale: Math.random() * 0.5 + 0.7,
    opacity: Math.random() * 0.3 + 0.4,
    delay: i * 0.5,
    duration: Math.random() * 20 + 40,
  }));

  return (
    <>
      {/* Background color */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #90a4ae 0%, #cfd8dc 100%)',
          opacity: 0.7,
        }}
      />
      
      {/* Clouds */}
      {clouds.map((cloud, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: cloud.top,
            left: cloud.left,
            width: '200px',
            height: '60px',
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale}) translateY(${scrollY * 0.1}px)`,
            animation: `${floatCloud} ${cloud.duration}s infinite ease-in-out`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '50px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              left: '90px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '130px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '10px',
              left: '70px',
              width: '120px',
              height: '30px',
              borderRadius: '30px',
              background: 'white',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>
      ))}
    </>
  );
};

// Rainy weather animation
const renderRainyAnimation = (scrollY) => {
  // Create an array of raindrops with improved visibility
  const raindrops = Array.from({ length: 100 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 0.7 + 0.3}s`,
    animationDelay: `${Math.random() * 2}s`,
    opacity: Math.random() * 0.6 + 0.4, // Increased opacity
    width: Math.random() * 2 + 1, // Varied width
    height: Math.random() * 15 + 10, // Longer drops
  }));

  // Create a few clouds
  const clouds = Array.from({ length: 4 }, (_, i) => ({
    top: `${Math.random() * 30 + 5}%`,
    left: `${Math.random() * 70}%`,
    scale: Math.random() * 0.3 + 0.8,
    opacity: Math.random() * 0.2 + 0.7, // Increased opacity
    delay: i * 0.7,
    duration: Math.random() * 10 + 30,
  }));

  return (
    <>
      {/* Background color */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #546e7a 0%, #78909c 100%)',
          opacity: 0.8, // Increased opacity
        }}
      />
      
      {/* Rain clouds */}
      {clouds.map((cloud, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: cloud.top,
            left: cloud.left,
            width: '200px',
            height: '60px',
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale}) translateY(${scrollY * 0.05}px)`,
            animation: `${floatCloud} ${cloud.duration}s infinite ease-in-out`,
            animationDelay: `${cloud.delay}s`,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '50px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#78909c',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              left: '90px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#78909c',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '130px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#78909c',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#78909c',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '10px',
              left: '70px',
              width: '120px',
              height: '30px',
              borderRadius: '30px',
              background: '#78909c',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
        </Box>
      ))}
      
      {/* Raindrops with improved visibility */}
      {raindrops.map((raindrop, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: raindrop.left,
            top: '-5%',
            width: `${raindrop.width}px`,
            height: `${raindrop.height}px`,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.8))',
            opacity: raindrop.opacity,
            animation: `${rain} ${raindrop.animationDuration} infinite linear`,
            animationDelay: raindrop.animationDelay,
            borderRadius: '0 0 2px 2px',
            zIndex: 2,
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}
    </>
  );
};

// Snowy weather animation
const renderSnowyAnimation = (scrollY) => {
  // Create an array of snowflakes
  const snowflakes = Array.from({ length: 80 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    size: Math.random() * 5 + 2,
    animationDuration: `${Math.random() * 5 + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.3 + 0.4,
  }));

  return (
    <>
      {/* Background color */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #b0bec5 0%, #eceff1 100%)',
          opacity: 0.7,
        }}
      />
      
      {/* Snowflakes */}
      {snowflakes.map((snowflake, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: snowflake.left,
            top: '-5%',
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            background: 'white',
            borderRadius: '50%',
            opacity: snowflake.opacity,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
            animation: `${snow} ${snowflake.animationDuration} infinite linear`,
            animationDelay: snowflake.animationDelay,
          }}
        />
      ))}
    </>
  );
};

// Thunderstorm weather animation
const renderThunderstormAnimation = (scrollY) => {
  // Create arrays for raindrops and lightning flashes with improved visibility
  const raindrops = Array.from({ length: 80 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 0.7 + 0.3}s`,
    animationDelay: `${Math.random() * 2}s`,
    opacity: Math.random() * 0.8 + 0.2, // Increased opacity
    width: Math.random() * 2 + 1,
    height: Math.random() * 15 + 10,
  }));

  // Create lightning flashes with varying properties
  const lightningFlashes = Array.from({ length: 3 }, (_, i) => ({
    top: `${Math.random() * 30}%`,
    left: `${Math.random() * 70}%`,
    scale: Math.random() * 0.5 + 0.8,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 4, // Shorter duration for more frequent flashes
    opacity: Math.random() * 0.2 + 0.8, // Higher opacity
    width: Math.random() * 100 + 100,
    height: Math.random() * 200 + 300,
  }));

  // Create dark clouds
  const darkClouds = Array.from({ length: 5 }, (_, i) => ({
    top: `${Math.random() * 30 + 5}%`,
    left: `${Math.random() * 70}%`,
    scale: Math.random() * 0.4 + 0.7,
    opacity: Math.random() * 0.3 + 0.7, // Darker clouds
    delay: i * 0.6,
    duration: Math.random() * 10 + 20,
  }));

  return (
    <>
      {/* Dark stormy background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #37474f 0%, #263238 100%)',
          opacity: 0.9, // Darker background
        }}
      />
      
      {/* Dark clouds */}
      {darkClouds.map((cloud, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: cloud.top,
            left: cloud.left,
            width: '200px',
            height: '60px',
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale}) translateY(${scrollY * 0.05}px)`,
            animation: `${floatCloud} ${cloud.duration}s infinite ease-in-out`,
            animationDelay: `${cloud.delay}s`,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '50px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#455a64',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.3)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              left: '90px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#455a64',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.3)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '130px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#455a64',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.3)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#455a64',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.3)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '10px',
              left: '70px',
              width: '120px',
              height: '30px',
              borderRadius: '30px',
              background: '#455a64',
              boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.3)',
            }}
          />
        </Box>
      ))}
      
      {/* Lightning flashes */}
      {lightningFlashes.map((flash, index) => (
        <Box
          key={`lightning-${index}`}
          sx={{
            position: 'absolute',
            top: flash.top,
            left: flash.left,
            width: `${flash.width}px`,
            height: `${flash.height}px`,
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
            opacity: 0,
            animation: `${lightning} ${flash.duration}s infinite`,
            animationDelay: `${flash.delay}s`,
            zIndex: 3,
            transform: `scale(${flash.scale})`,
            pointerEvents: 'none',
          }}
        />
      ))}
      
      {/* Extra lightning bolt for dramatic effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '40%',
          width: '4px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.9)',
          opacity: 0,
          animation: `${lightning} 8s infinite`,
          animationDelay: '1.5s',
          zIndex: 3,
          transform: 'rotate(15deg)',
          clipPath: 'polygon(50% 0%, 0% 30%, 60% 50%, 20% 100%, 100% 40%, 40% 30%)',
          filter: 'blur(1px)',
          boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
        }}
      />
      
      {/* Raindrops */}
      {raindrops.map((raindrop, index) => (
        <Box
          key={`raindrop-${index}`}
          sx={{
            position: 'absolute',
            left: raindrop.left,
            top: '-5%',
            width: `${raindrop.width}px`,
            height: `${raindrop.height}px`,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.8))',
            opacity: raindrop.opacity,
            animation: `${rain} ${raindrop.animationDuration} infinite linear`,
            animationDelay: raindrop.animationDelay,
            borderRadius: '0 0 2px 2px',
            zIndex: 2,
          }}
        />
      ))}
    </>
  );
};

export default WeatherAnimations; 