import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detect mobile for optimized settings
    const isMobile = window.innerWidth < 768 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Initialize Lenis with optimized settings for each platform
    lenisRef.current = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Faster on mobile = less computation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1,
      touchMultiplier: isMobile ? 1 : 2, // Reduced touch multiplier for mobile
    });

    // Animation frame loop with optimized RAF
    let animationId: number;
    
    function raf(time: number) {
      lenisRef.current?.raf(time);
      animationId = requestAnimationFrame(raf);
    }

    animationId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      lenisRef.current?.destroy();
    };
  }, []);

  return lenisRef;
}
