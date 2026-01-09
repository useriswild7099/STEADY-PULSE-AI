import { useState, useEffect, useCallback } from 'react';

interface ParallaxOptions {
  sensitivity?: number;
  mobileDisabled?: boolean;
}

export function useParallax({ sensitivity = 10, mobileDisabled = true }: ParallaxOptions = {}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (mobileDisabled && window.innerWidth < 768) return;

    const { innerWidth, innerHeight } = window;
    const { clientX, clientY } = e;
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);

    setOffset({
      x: x * sensitivity,
      y: y * sensitivity
    });

    setTilt({
      x: y * (sensitivity / 2), // Rotate X based on Y axis movement
      y: -x * (sensitivity / 2)  // Rotate Y based on X axis movement
    });
  }, [sensitivity, mobileDisabled]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return { offset, tilt, style: {
    '--parallax-x': `${offset.x}px`,
    '--parallax-y': `${offset.y}px`,
    '--rotate-x': `${tilt.x}deg`,
    '--rotate-y': `${tilt.y}deg`,
  } as React.CSSProperties };
}

export function useScrollParallax(speed: number = 0.5) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { 
    offsetY,
    style: { transform: `translateY(${offsetY}px)` } 
  };
}
