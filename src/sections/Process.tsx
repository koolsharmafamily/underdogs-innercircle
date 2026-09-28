'use client';

import Image from 'next/image';
import { processSteps } from '@content/process';
import { useAppStore } from '@/state/store';
import { sound } from '@/audio/sound';

export function Process() {
  const openOverlay = useAppStore((s) => s.openOverlay);

  return (
    <section
      id="process"
      data-scene="process"
      className="relative w-full py-16 md:py-24 px-6 md:px-16 flex flex-col justify-center text-[#ece1cf] pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto space-y-8 pointer-events-auto">
        {/* Header */}
        <div className="max-w-2xl space-y-2 border-b border-[#ece1cf]/15 pb-4">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(05)</span>
            <span>The Passage</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/60">How It Works</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#ece1cf]">
            The Secret Drops Before Doors.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#ece1cf]/80 leading-relaxed">
            The night is set. The date is locked. The secret venue address drops 72 hours prior to members holding confirmed coins.
          </p>
        </div>

        {/* Feature Grid: Artwork + 4 Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Champagne Flute Artwork */}
          <div className="lg:col-span-4 relative aspect-[9/14] max-h-[48vh] w-full rounded-sm overflow-hidden border border-[#cbb074]/50 shadow-2xl group">
            <Image
              src="/brand/animation-theme.png"
              alt="Underdogs Innercircle Night"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#f3e0ac] bg-[#050505]/80 p-2 border border-[#cbb074]/30 backdrop-blur-sm">
              72 HOURS BEFORE DOORS
            </div>
          </div>

          {/* 4 Process Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {processSteps.map((step) => (
              <div
                key={step.n}
                className="ic-frame bg-[#0a0808]/85 backdrop-blur-md p-5 space-y-2 shadow-xl"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="text-xl font-bold text-[#cbb074]">
                    {step.n}
                  </span>
                </div>

                <h3 className="font-['Cinzel'] text-lg font-bold text-[#ece1cf]">
                  {step.title}
                </h3>

                <p className="font-serif text-xs text-[#ece1cf]/85 leading-relaxed">
                  {step.line}
                </p>

                <p className="font-mono text-[9px] text-[#ece1cf]/50 pt-2 border-t border-[#ece1cf]/10 leading-normal">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center font-mono text-[10px] text-[#ece1cf]/50 uppercase tracking-widest border-t border-[#ece1cf]/15 pt-3">
          <span>FOUR STEPS · ONE COIN</span>
          <button
            onClick={() => {
              sound?.playCoinMint();
              openOverlay('coin');
            }}
            className="text-[#cbb074] hover:text-[#f3e0ac] cursor-pointer font-bold"
          >
            REQUEST YOUR COIN ↗
          </button>
        </div>
      </div>
    </section>
  );
}
