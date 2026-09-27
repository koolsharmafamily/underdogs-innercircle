'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/state/store';

export function DomLoader() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const progress = useAppStore((s) => s.progress);
  const setProgress = useAppStore((s) => s.setProgress);

  const [counter, setCounter] = useState(0);

  // Progressive loader simulation and asset check (Part 13 S00)
  useEffect(() => {
    if (phase === 'done') return;

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setCounter(100);
        setProgress(100);
        setPhase('ready');

        // Sequence steps (Part 13 S00):
        // 0.3s -> firstLight (slats rotate, striped flash)
        setTimeout(() => setPhase('firstLight'), 300);
        // 1.0s -> descent (rows rise, tower fills, camera orbits)
        setTimeout(() => setPhase('descent'), 1000);
        // 2.2s -> handoff (Hero text in, scroll enabled)
        setTimeout(() => setPhase('handoff'), 2200);
        // 2.6s -> done
        setTimeout(() => setPhase('done'), 2600);
      } else {
        setCounter(current);
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [phase, setPhase, setProgress]);

  const skipIntro = () => {
    setCounter(100);
    setProgress(100);
    setPhase('done');
  };

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
      className={`fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-8 md:p-14 select-none transition-opacity duration-700 pointer-events-auto ${
        phase === 'handoff' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Skip button for keyboard accessibility */}
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#ece1cf]/40 uppercase">
          INITIATING THE CIRCLE
        </span>
        <button
          onClick={skipIntro}
          className="font-mono text-[11px] text-[#cbb074] hover:text-[#f3e0ac] tracking-[0.15em] uppercase border border-[#cbb074]/30 px-3 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#cbb074] cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>

      {/* Centre: 96 fine hairline slats (Part 13 S00) lighting from centre outward */}
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
