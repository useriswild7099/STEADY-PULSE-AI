import { useState, useEffect, useCallback, useRef } from 'react';

interface ParallaxOptions {
  sensitivity?: number;
  mobileDisabled?: boolean;
}

export function useParallax({ sensitivity = 10, mobileDisabled = true }: ParallaxOptions = {}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const lastPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Store position immediately
    lastPosition.current = { x: e.clientX, y: e.clientY };
    
    // Throttle using RAF - only update once per frame
    if (rafId.current !== null) return;
    
    rafId.current = requestAnimationFrame(() => {
      const { innerWidth, innerHeight } = window;
      const x = (lastPosition.current.x - innerWidth / 2) / (innerWidth / 2);
      const y = (lastPosition.current.y - innerHeight / 2) / (innerHeight / 2);

      setOffset({
        x: x * sensitivity,
        y: y * sensitivity
      });

      setTilt({
        x: y * (sensitivity / 2), // Rotate X based on Y axis movement
        y: -x * (sensitivity / 2)  // Rotate Y based on X axis movement
      });
      
      rafId.current = null;
    });
  }, [sensitivity]);

  useEffect(() => {
    // Skip mouse events on mobile (touch devices don't use mouse parallax)
    if (mobileDisabled && window.innerWidth < 768) return;
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [handleMouseMove, mobileDisabled]);

  return { 
    offset, 
    tilt, 
    style: {
      '--parallax-x': `${offset.x}px`,
      '--parallax-y': `${offset.y}px`,
      '--rotate-x': `${tilt.x}deg`,
      '--rotate-y': `${tilt.y}deg`,
    } as React.CSSProperties 
  };
}

export function useScrollParallax(speed: number = 0.5) {
  const [offsetY, setOffsetY] = useState(0);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
      
      // Throttle using RAF - only update once per frame
      if (rafId.current !== null) return;
      
      rafId.current = requestAnimationFrame(() => {
        setOffsetY(lastScrollY.current * speed);
        rafId.current = null;
      });
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [speed]);

  return { 
    offsetY,
    style: { 
      transform: `translateY(${offsetY}px)`,
      willChange: 'transform'
    } as React.CSSProperties
  };
}
