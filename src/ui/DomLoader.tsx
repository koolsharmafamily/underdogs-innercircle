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
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('underdogs_intro_seen', 'true');
      } catch (_) {}
    }
    setCounter(100);
    setProgress(100);
    setPhase('done');
  }, [clearAllTimers, setPhase, setProgress]);

  // Check if user already saw or skipped intro in this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (sessionStorage.getItem('underdogs_intro_seen') === 'true') {
          setCounter(100);
          setProgress(100);
          setPhase('done');
          return;
        }
      } catch (_) {}
    }

    if (phase === 'done') return;

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 9) + 4;
      if (current >= 100) {
        current = 100;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setCounter(100);
        setProgress(100);
        setPhase('ready');

        const t1 = setTimeout(() => setPhase('firstLight'), 200);
        const t2 = setTimeout(() => setPhase('descent'), 600);
        const t3 = setTimeout(() => setPhase('handoff'), 1400);
        const t4 = setTimeout(() => {
          if (typeof window !== 'undefined') {
            try {
              sessionStorage.setItem('underdogs_intro_seen', 'true');
            } catch (_) {}
          }
          setPhase('done');
        }, 1800);

        timeoutsRef.current.push(t1, t2, t3, t4);
      } else {
        setCounter(current);
        setProgress(current);
      }
    }, 35);

    // Keyboard ESC listener for instant skip
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
  }, [phase, setPhase, setProgress, skipIntro, clearAllTimers]);

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
      className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-between p-8 md:p-14 select-none transition-opacity duration-500 ${
        phase === 'handoff' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Top Bar: Title & High-Priority Skip Intro Button */}
      <div className="flex justify-between items-center relative z-20">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#ece1cf]/40 uppercase">
          INITIATING THE CIRCLE
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            skipIntro();
          }}
          className="font-mono text-xs text-[#141414] bg-gradient-to-r from-[#b2955e] via-[#f3e0ac] to-[#cbb074] hover:brightness-110 font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-sm shadow-[0_0_20px_rgba(203,176,116,0.35)] cursor-pointer active:scale-95 transition-all"
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
                    ? 'h-24 bg-[#ece1cf] shadow-[0_0_12px_rgba(236,225,207,0.8)] scale-y-110'
                    : isLit
                    ? 'h-16 bg-[#cbb074] opacity-80'
                    : 'h-10 bg-[#ece1cf]/15'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Tabular Counter & Tracked Brand Letters */}
      <div className="flex justify-between items-end border-t border-[#ece1cf]/10 pt-4">
        {/* Mono tabular counter */}
        <div className="font-mono text-xs md:text-sm text-[#cbb074] tracking-[0.2em]">
          <span>{String(counter).padStart(3, '0')}</span>
          <span className="text-[#ece1cf]/30 ml-1">/ 100</span>
        </div>

        {/* Revealed Letters */}
        <div className="font-['Cinzel'] text-xs md:text-sm tracking-[0.3em] font-semibold text-[#ece1cf]">
          {'UNDERDOGS INNERCIRCLE'
            .split('')
            .slice(0, Math.ceil((counter / 100) * 22))
            .join('')}
        </div>
      </div>
    </div>
  );
}
