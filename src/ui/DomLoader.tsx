'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/state/store';

export function DomLoader() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const setProgress = useAppStore((s) => s.setProgress);

  const [counter, setCounter] = useState(0);
  const [smoothPct, setSmoothPct] = useState(0);
  const rafRef = useRef<number | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const skipIntro = useCallback(() => {
    clearAllTimers();
    setCounter(100);
    setSmoothPct(100);
    setProgress(100);
    setPhase('done');
  }, [clearAllTimers, setPhase, setProgress]);

  // Buttery-smooth RAF-driven loading progression (0 -> 100 in 2.4s, fades smoothly into 3D scene at 3.0s)
  useEffect(() => {
    const startTime = performance.now();
    const duration = 2300; // 2.3 seconds to reach 100%

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(1, Math.max(0, elapsed / duration));

      // Silky smooth cubic ease-out
      const easedT = 1 - Math.pow(1 - rawT, 3);
      const currentPct = Math.round(easedT * 100);

      setSmoothPct(easedT * 100);
      setCounter(currentPct);
      setProgress(currentPct);

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    // Staged 3D camera transitions
    const t1 = setTimeout(() => setPhase('firstLight'), 700);
    const t2 = setTimeout(() => setPhase('descent'), 1500);
    const t3 = setTimeout(() => setPhase('handoff'), 2400);
    const t4 = setTimeout(() => {
      setCounter(100);
      setSmoothPct(100);
      setProgress(100);
      setPhase('done');
    }, 3000);

    timeoutsRef.current.push(t1, t2, t3, t4);

    // Keyboard instant skip handler
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
  }, [clearAllTimers, setPhase, setProgress, skipIntro]);

  if (phase === 'done') {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] bg-[#080706] flex flex-col justify-between p-8 md:p-14 select-none transition-opacity duration-700 ease-out ${
        phase === 'handoff' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8B08A]" />
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#8E7B62] uppercase">
            UNDERDOGS INNERCIRCLE · NAGPUR
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            skipIntro();
          }}
          className="font-mono text-[10px] text-[#C8B08A] hover:text-[#EDE2D0] border border-[#C8B08A]/30 hover:border-[#C8B08A]/60 font-medium tracking-[0.22em] uppercase px-3.5 py-1.5 rounded-[1px] transition-colors cursor-pointer"
          aria-label="Skip Introduction"
        >
          Skip [Esc] ✕
        </button>
      </div>

      {/* Center Stage: Medallion Emblem & Silky Expanding Hairline Track */}
      <div className="w-full flex flex-col items-center justify-center my-auto space-y-8">
        {/* Emblem Crest */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[1px] border border-[#C8B08A]/30 bg-[#0F0E0C] shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#080706]">
            <Image
              src="/brand/logo.jpg"
              alt="Underdogs Medallion Crest"
              fill
              priority
              className="object-cover opacity-90 transition-transform duration-1000 ease-out scale-105"
            />
          </div>
          {/* Subtle outer breathing ring */}
          <div className="absolute -inset-1.5 rounded-full border border-[#C8B08A]/15 animate-pulse" />
        </div>

        {/* Dual Expanding Champagne Hairline with Center Keystone */}
        <div className="w-full max-w-md sm:max-w-xl flex flex-col items-center px-4 space-y-3">
          <div className="w-full relative h-[2px] flex items-center justify-center">
            {/* Background Track */}
            <div className="absolute inset-0 bg-[#8E7B62]/20 rounded-full" />

            {/* Hardware-accelerated smooth progress line expanding from center */}
            <div
              className="absolute h-[2px] bg-gradient-to-r from-[#8E7B62] via-[#EDE2D0] to-[#8E7B62] shadow-[0_0_12px_rgba(200,176,138,0.5)] transition-all ease-out"
              style={{
                width: `${smoothPct}%`,
                left: `${(100 - smoothPct) / 2}%`,
              }}
            />

            {/* Glowing Center Keystone */}
            <div className="relative z-10 w-2 h-2 rotate-45 bg-[#EDE2D0] shadow-[0_0_10px_rgba(237,226,208,0.9)]" />
          </div>

          {/* Micro Status Label */}
          <div className="flex justify-between w-full font-mono text-[9px] text-[#8E7B62] tracking-[0.25em] uppercase pt-1">
            <span>CALIBRATING SANCTUARY</span>
            <span>22K BULLION STRUCK</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Tabular Counter & Editorial Wordmark */}
      <div className="flex justify-between items-end border-t border-[#C8B08A]/15 pt-4">
        {/* Mono tabular counter */}
        <div className="font-mono text-xs md:text-sm text-[#C8B08A] tracking-[0.2em] font-medium">
          <span>{String(counter).padStart(3, '0')}</span>
          <span className="text-[#8E7B62] ml-1.5">/ 100</span>
        </div>

        {/* Brand Letters Reveal */}
        <div className="font-['Cinzel'] text-xs md:text-sm tracking-[0.35em] font-light text-[#EDE2D0]">
          {'UNDERDOGS INNERCIRCLE'
            .split('')
            .slice(0, Math.ceil((smoothPct / 100) * 22))
            .join('')}
        </div>
      </div>
    </div>
  );
}
