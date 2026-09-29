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
      className="relative w-full py-20 md:py-28 px-6 md:px-16 flex flex-col justify-center text-[#E8E2D8] pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto space-y-10 pointer-events-auto">
        {/* Header */}
        <div className="max-w-2xl space-y-2.5 border-b border-[#C8B08A]/12 pb-4">
          <div className="font-mono text-[10px] text-[#C8B08A] tracking-[0.25em] uppercase flex items-center gap-2.5">
            <span className="text-[#8E7B62]">(05)</span>
            <span>The Passage</span>
            <span className="w-8 h-[1px] bg-[#C8B08A]/30" />
            <span className="text-[#8E7B62]">Initiation Protocol</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-[#EDE2D0]">
            The Sealed Coordinates.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#E8E2D8]/80 leading-relaxed font-light">
            The gathering is locked. The threshold is set. The secret coordinates unveil strictly 72 hours prior to members holding confirmed medallions.
          </p>
        </div>

        {/* Feature Grid: Artwork + 4 Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Champagne Flute Artwork */}
          <div className="lg:col-span-4 relative aspect-[9/14] max-h-[48vh] w-full rounded-[1px] overflow-hidden border border-[#C8B08A]/25 shadow-2xl group">
            <Image
              src="/brand/animation-theme.png"
              alt="Underdogs Innercircle Night"
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#EDE2D0] bg-[#080706]/85 p-2.5 border border-[#C8B08A]/20 backdrop-blur-md">
              72 HOURS BEFORE DOORS
            </div>
          </div>

          {/* 4 Process Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {processSteps.map((step) => (
              <div
                key={step.n}
                className="border border-[#C8B08A]/15 bg-[#0F0E0C]/80 backdrop-blur-2xl p-6 space-y-2.5 shadow-xl rounded-[1px]"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="text-lg font-light text-[#C8B08A] tracking-[0.16em]">
                    {step.n}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#8E7B62]">
                    PROTOCOL
                  </span>
                </div>

                <h3 className="font-['Cinzel'] text-base sm:text-lg font-normal text-[#EDE2D0] tracking-[0.06em]">
                  {step.title}
                </h3>

                <p className="font-serif text-xs text-[#E8E2D8]/80 leading-relaxed font-light">
                  {step.line}
                </p>

                <p className="font-mono text-[9px] text-[#8E7B62] pt-2 border-t border-[#C8B08A]/10 leading-normal tracking-[0.06em]">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-[#8E7B62] uppercase tracking-[0.24em] border-t border-[#C8B08A]/12 pt-4">
          <span>FOUR PROTOCOLS · ONE SEALED COIN</span>
          <button
            onClick={() => {
              sound?.playCoinMint();
              openOverlay('coin');
            }}
            className="text-[#C8B08A] hover:text-[#EDE2D0] transition-colors cursor-pointer font-semibold tracking-[0.22em]"
          >
            REQUEST YOUR COIN ↗
          </button>
        </div>
      </div>
    </section>
  );
}
