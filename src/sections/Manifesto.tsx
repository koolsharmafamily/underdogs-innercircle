'use client';

import { useAppStore } from '@/state/store';
import { sound } from '@/audio/sound';

export function Manifesto() {
  const openOverlay = useAppStore((s) => s.openOverlay);

  return (
    <section
      id="manifesto"
      data-scene="manifesto"
      className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24 flex flex-col justify-center pointer-events-none"
    >
      <div className="max-w-5xl pointer-events-auto mx-auto w-full space-y-10">
        {/* Label */}
        <div className="flex items-center justify-between border-b border-[#C8B08A]/12 pb-3.5">
          <div className="font-mono text-[10px] text-[#C8B08A] tracking-[0.25em] uppercase flex items-center gap-2.5">
            <span className="text-[#8E7B62]">(02)</span>
            <span>The Covenant</span>
            <span className="w-8 h-[1px] bg-[#C8B08A]/30" />
            <span className="text-[#8E7B62]">Heads & Tails · Two Registers</span>
          </div>
        </div>

        {/* Duality Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Heads: The Amplitude */}
          <div className="border border-[#C8B08A]/15 bg-[#0F0E0C]/80 backdrop-blur-2xl p-7 sm:p-9 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-[1px]">
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-[#8E7B62] uppercase">
              <span>HEADS · SIDE A</span>
              <span>THE PUBLIC ARENA</span>
            </div>

            <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-light text-[#EDE2D0] tracking-[0.1em]">
              THE AMPLITUDE.
            </h3>

            <p className="font-serif text-sm sm:text-base text-[#E8E2D8]/80 leading-relaxed font-light">
              Underdogs is the stadium party. The sweat, the bass pressure, hundreds locked into a single wall of sound across Nagpur. Unapologetic, raw, and electric.
            </p>

            <div className="pt-3 font-mono text-[9px] text-[#8E7B62] uppercase tracking-[0.22em] border-t border-[#C8B08A]/10">
              PUBLIC ACCESS · SORTMYSCENE
            </div>
          </div>

          {/* Tails: The Sanctuary */}
          <div className="border border-[#C8B08A]/25 bg-[#141310]/90 backdrop-blur-2xl p-7 sm:p-9 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.55)] relative rounded-[1px]">
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-[#C8B08A] uppercase">
              <span>TAILS · SIDE B</span>
              <span>THE SIXTY LEDGER</span>
            </div>

            <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-normal ic-gold-text tracking-[0.1em]">
              THE SANCTUARY.
            </h3>

            <p className="font-serif text-sm sm:text-base text-[#E8E2D8]/90 leading-relaxed font-light">
              The Innercircle is the sanctuary behind the curtain. Intimate, unhurried, sixty numbered coins. You look around the room and everyone is attuned to the exact same frequency.
            </p>

            <div className="pt-3 flex items-center justify-between font-mono text-[9px] text-[#C8B08A] uppercase tracking-[0.22em] border-t border-[#C8B08A]/15">
              <span>INVITE-ONLY · GATED LEDGER</span>
              <button
                onClick={() => {
                  sound?.playTick(1.0);
                  openOverlay('coin');
                }}
                className="hover:text-[#EDE2D0] transition-colors cursor-pointer font-bold tracking-[0.2em]"
              >
                Request Mint ↗
              </button>
            </div>
          </div>
        </div>

        {/* Curatorial Partnership Badge */}
        <div className="p-6 bg-[#0F0E0C]/75 border border-[#C8B08A]/15 rounded-[1px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8B08A]/60" />
            <span className="font-mono text-[9px] text-[#8E7B62] uppercase tracking-[0.25em]">
              CURATORIAL PARTNERSHIP
            </span>
            <span className="w-6 h-[1px] bg-[#C8B08A]/25 hidden sm:inline-block" />
            <span className="font-['Cinzel'] text-xs sm:text-sm font-normal tracking-[0.16em] text-[#EDE2D0]">
              UNDERDOGS × LIVE BY ALL MEANS
            </span>
          </div>
          <div className="font-mono text-[9px] text-[#C8B08A]/80 uppercase tracking-[0.22em]">
            ARCHIVAL EDITION · NAGPUR CHAPTER
          </div>
        </div>
      </div>
    </section>
  );
}
