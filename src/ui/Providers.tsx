'use client';

import { useEffect } from 'react';
import { startClock } from '@/motion/clock';
import { useAppStore } from '@/state/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  useEffect(() => {
    // Detect prefers-reduced-motion media query
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const onMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mql.addEventListener('change', onMediaChange);

    // Start single continuous clock (Lenis + GSAP + Three.js)
    const cleanupClock = startClock();

    return () => {
      mql.removeEventListener('change', onMediaChange);
      cleanupClock();
    };
  }, [setReducedMotion]);

  return <>{children}</>;
}
