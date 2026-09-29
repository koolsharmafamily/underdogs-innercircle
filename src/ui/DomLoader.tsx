'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/state/store';

export function DomLoader() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const progress = useAppStore((s) => s.progress);
  const setProgress = useAppStore((s) => s.setProgress);

  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const skipIntro = useCallback(() => {
    clearAllTimers();
    setCounter(100);
    setProgress(100);
    setPhase('done');
  }, [clearAllTimers, setPhase, setProgress]);

  // Automatically progress 0 -> 100 and transition to homepage in 3 seconds
  useEffect(() => {
    const startTime = performance.now();
    const durationMs = 2500; // Counter reaches 100% at 2.5s, fades out by 3.0s

    intervalRef.current = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setCounter(pct);
      setProgress(pct);

      if (pct >= 100 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 30);

    // Stage 3D camera & slats and handoff to homepage at exactly 3 seconds
    const t1 = setTimeout(() => setPhase('firstLight'), 800);
    const t2 = setTimeout(() => setPhase('descent'), 1600);
    const t3 = setTimeout(() => setPhase('handoff'), 2500);
    const t4 = setTimeout(() => {
      setCounter(100);
      setProgress(100);
      setPhase('done');
    }, 3000);

    timeoutsRef.current.push(t1, t2, t3, t4);

    // Keyboard ESC/Space/Enter listener for instant skip
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        skipIntro();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      clearAllTimers();
      window.removeEventListener('keydown', onKeyDown);
    };
    // Run once on mount so phase transitions never cancel the 3-second timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'done') {
    return null;
  }

  const lineCount = 96;
  const litCount = Math.floor((counter / 100) * lineCount);
  const halfLit = Math.floor(litCount / 2);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] bg-[#080706] flex flex-col justify-between p-8 md:p-14 select-none transition-opacity duration-500 ${
        phase === 'handoff' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Top Bar: Title & High-Priority Skip Intro Button */}
      <div className="flex justify-between items-center relative z-20">
        <span className="font-mono text-[9px] tracking-[0.28em] text-[#8E7B62] uppercase">
          INITIATING THE CIRCLE
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            skipIntro();
          }}
          className="font-mono text-[10px] text-[#080706] bg-[#C8B08A] hover:bg-[#EDE2D0] font-semibold tracking-[0.22em] uppercase px-4 py-2 rounded-[1px] shadow-lg cursor-pointer transition-colors"
          aria-label="Skip Introduction"
        >
          Skip Intro →
        </button>
      </div>

      {/* Centre: 96 fine hairline slats lighting from centre outward */}
      <div className="w-full flex items-center justify-center my-auto">
        <div className="w-[72vw] max-w-[900px] h-24 flex items-center justify-between gap-[2px]">
          {Array.from({ length: lineCount }).map((_, i) => {
            const distanceFromCenter = Math.abs(i - lineCount / 2);
            const isLit = distanceFromCenter <= halfLit;
            const isKeystone = i === Math.floor(lineCount / 2);

            return (
              <span
                key={i}
                className={`w-[1px] block transition-all duration-300 ${
                  isKeystone
                    ? 'h-24 bg-[#EDE2D0] shadow-[0_0_12px_rgba(237,226,208,0.7)] scale-y-110'
                    : isLit
                    ? 'h-16 bg-[#C8B08A] opacity-90'
                    : 'h-10 bg-[#8E7B62]/20'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Tabular Counter & Tracked Brand Letters */}
      <div className="flex justify-between items-end border-t border-[#C8B08A]/10 pt-4">
        {/* Mono tabular counter */}
        <div className="font-mono text-xs md:text-sm text-[#C8B08A] tracking-[0.2em]">
          <span>{String(counter).padStart(3, '0')}</span>
          <span className="text-[#8E7B62] ml-1">/ 100</span>
        </div>

        {/* Revealed Letters */}
        <div className="font-['Cinzel'] text-xs md:text-sm tracking-[0.32em] font-light text-[#EDE2D0]">
          {'UNDERDOGS INNERCIRCLE'
            .split('')
            .slice(0, Math.ceil((counter / 100) * 22))
            .join('')}
        </div>
      </div>
    </div>
  );
}
