'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/state/store';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'view' | 'drag'>('default');
  const [visible, setVisible] = useState(false);
  const phase = useAppStore((s) => s.phase);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    let ringX = posX;
    let ringY = posY;

    const onMouseMove = (e: MouseEvent) => {
      posX = e.clientX;
      posY = e.clientY;
      if (!visible) setVisible(true);

      // Check hover targets for cursor states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('button, a, input, select')) {
        setCursorState('link');
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorState('view');
      } else if (target.closest('[data-cursor="drag"]')) {
        setCursorState('drag');
      } else {
        setCursorState('default');
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let rafId: number;
    const animate = () => {
      // Direct dot follow
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posX - 3}px, ${posY - 3}px, 0)`;
      }

      // Damped ring follow (lambda = 24)
      ringX += (posX - ringX) * 0.2;
      ringY += (posY - ringY) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!visible || phase !== 'done') return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Centre Dot */}
      <div
        ref={dotRef}
        className="w-1.5 h-1.5 bg-[#cbb074] rounded-full fixed top-0 left-0 transition-opacity duration-200"
      />

      {/* Hairline Ring */}
      <div
        ref={ringRef}
        className={`w-8 h-8 rounded-full border border-[#cbb074]/60 fixed top-0 left-0 transition-all duration-200 flex items-center justify-center ${
          cursorState === 'link'
            ? 'scale-150 border-[#f3e0ac] bg-[#cbb074]/10'
            : cursorState === 'view'
            ? 'scale-175 border-[#f3e0ac]'
            : cursorState === 'drag'
            ? 'scale-125 border-[#e32605]'
            : 'scale-100'
        }`}
      >
        {cursorState === 'view' && (
          <span className="font-mono text-[8px] text-[#f3e0ac] tracking-widest uppercase">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
}
