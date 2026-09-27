'use client';

import Image from 'next/image';
import { useAppStore } from '@/state/store';
import { sound } from '@/audio/sound';

export function Manifesto() {
  const currentScene = useAppStore((s) => s.currentScene);
  const openOverlay = useAppStore((s) => s.openOverlay);
  const isActive = currentScene === 'manifesto';

  return (
    <section
      id="manifesto"
      data-scene="manifesto"
      className="relative w-full h-[220vh] -mb-[100svh] pointer-events-none"
    >
      <div
        className={`sticky top-0 h-[100svh] flex flex-col justify-center px-6 md:px-16 lg:px-24 transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-5xl pointer-events-auto mx-auto w-full space-y-8">
          {/* Label */}
          <div className="flex items-center justify-between border-b border-[#ece1cf]/15 pb-3">
            <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
              <span>(02)</span>
              <span>The Covenant</span>
              <span className="w-8 h-[1px] bg-[#cbb074]/40" />
              <span className="text-[#ece1cf]/60">Heads & Tails · Two Registers</span>
            </div>
            <span className="font-mono text-[10px] text-[#f3e0ac] tracking-widest uppercase hidden sm:inline">
              VORTEX COIN ROTATION
            </span>
          </div>

          {/* Duality Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Heads: The Rage */}
            <div className="ic-frame bg-[#0a0808]/80 backdrop-blur-md p-6 sm:p-8 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#e32605] uppercase">
                <span>HEADS · SIDE A</span>
                <span>THE OPEN STAGE</span>
              </div>

              <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-black text-[#ece1cf] tracking-wide">
                THE RAGE.
              </h3>

              <p className="font-serif text-sm sm:text-base text-[#ece1cf]/80 leading-relaxed">
                Underdogs is the stadium party. The sweat, the bass pressure, hundreds locked into a single wall of sound across Nagpur. Unapologetic and electric.
              </p>

              <div className="pt-2 font-mono text-[10px] text-[#ece1cf]/50 uppercase tracking-widest border-t border-[#ece1cf]/10">
                PUBLIC TICKETS · SORTMYSCENE
              </div>
            </div>

            {/* Tails: The Room */}
            <div className="ic-frame-double bg-[#141414]/90 backdrop-blur-md p-6 sm:p-8 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#cbb074] uppercase">
                <span>TAILS · SIDE B</span>
                <span>THE INNERCIRCLE</span>
              </div>

              <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-black ic-gold-text tracking-wide">
                THE ROOM.
              </h3>

              <p className="font-serif text-sm sm:text-base text-[#ece1cf]/90 leading-relaxed">
                The Innercircle is the sanctuary behind the curtain. Intimate, unhurried, 60 numbered coins. You look around the room and everyone is locked into the same frequency.
              </p>

              <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-[#cbb074] uppercase tracking-widest border-t border-[#ece1cf]/15">
                <span>INVITE-ONLY · GATED COIN</span>
                <button
                  onClick={() => {
                    sound?.playTick(1.0);
                    openOverlay('coin');
                  }}
                  className="hover:underline cursor-pointer font-bold text-[#f3e0ac]"
                >
                  Request Mint ↗
                </button>
              </div>
            </div>
          </div>

          {/* Underdogs Collaboration Banner with Post example */}
          <div className="p-4 sm:p-6 bg-[#050505]/75 border border-[#cbb074]/30 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#cbb074]/40 flex-shrink-0">
                <Image
                  src="/brand/post-example.png"
                  alt="Underdogs collaboration post preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#cbb074] uppercase tracking-[0.2em] block">
                  Curatorial Partnership
                </span>
                <span className="font-['Cinzel'] text-sm sm:text-base font-bold text-[#ece1cf]">
                  Underdogs × Live By All Means
                </span>
              </div>
            </div>
            <div className="font-serif italic text-base text-[#f3e0ac]">
              "stay tuned"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
