'use client';

import Image from 'next/image';
import { proofQuotes, clientPastNights } from '@content/proof';
import { useAppStore } from '@/state/store';
import { sound } from '@/audio/sound';

export function Proof() {
  const openOverlay = useAppStore((s) => s.openOverlay);

  return (
    <section
      id="proof"
      data-scene="proof"
      className="relative w-full py-20 md:py-28 px-6 md:px-16 flex flex-col justify-center text-[#E8E2D8] pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto space-y-10 pointer-events-auto">
        {/* Header */}
        <div className="max-w-2xl space-y-2.5 border-b border-[#C8B08A]/12 pb-4">
          <div className="font-mono text-[10px] text-[#C8B08A] tracking-[0.25em] uppercase flex items-center gap-2.5">
            <span className="text-[#8E7B62]">(06)</span>
            <span>The Circle</span>
            <span className="w-8 h-[1px] bg-[#C8B08A]/30" />
            <span className="text-[#8E7B62]">Voices of the Vault</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-[#EDE2D0]">
            Attested by the Circle.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#E8E2D8]/80 leading-relaxed font-light">
            Every gathering leaves an indelible imprint. Unfiltered attestations from verified coin holders.
          </p>
        </div>

        {/* Quotes & Past Nights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Pull Quote with Coin Wax Seal */}
          <div className="lg:col-span-7 border border-[#C8B08A]/20 bg-[#0F0E0C]/85 backdrop-blur-2xl p-8 sm:p-10 space-y-6 shadow-2xl relative rounded-[1px]">
            <div className="flex items-center gap-4">
              <div
                onClick={() => sound?.playCoinMint()}
                className="w-12 h-12 rounded-full relative overflow-hidden border border-[#C8B08A]/35 shadow-md cursor-pointer hover:border-[#C8B08A] transition-colors bg-[#080706]"
                title="Underdogs Wax Seal"
              >
                <Image
                  src="/brand/logo.jpg"
                  alt="Underdogs Gold Coin Wax Seal"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#8E7B62] uppercase tracking-[0.25em] block">
                  VERIFIED PATRON ATTESTATION
                </span>
                <span className="font-['Cinzel'] text-xs font-normal text-[#EDE2D0] tracking-[0.14em]">
                  NOCTURNE SERIES ARCHIVE
                </span>
              </div>
            </div>

            <div className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#EDE2D0]/95 leading-relaxed font-light">
              "{proofQuotes[0].quote}"
            </div>

            <div className="font-mono text-xs text-[#C8B08A] pt-4 border-t border-[#C8B08A]/12 flex justify-between items-center">
              <span className="tracking-[0.1em]">{proofQuotes[0].author} · <span className="text-[#8E7B62]">{proofQuotes[0].role}</span></span>
              <span className="text-[#8E7B62] text-[10px] tracking-[0.18em]">{proofQuotes[0].night}</span>
            </div>
          </div>

          {/* Past Cohorts & Nights Archive */}
          <div className="lg:col-span-5 border border-[#C8B08A]/15 bg-[#141310]/85 backdrop-blur-2xl p-7 space-y-4 rounded-[1px]">
            <div className="flex items-center justify-between border-b border-[#C8B08A]/10 pb-2.5">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#C8B08A] uppercase">
                PAST GATHERINGS (NAGPUR)
              </span>
              <span className="font-mono text-[9px] text-[#8E7B62] uppercase tracking-[0.2em]">
                ARCHIVED
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs text-[#E8E2D8]/80">
              {clientPastNights.slice(0, 5).map((night, idx) => (
                <div key={idx} className="flex items-center gap-2.5 py-1.5 border-b border-[#C8B08A]/6">
                  <span className="text-[#C8B08A] text-[9px]">✦</span>
                  <span className="truncate text-[11px] tracking-[0.06em] text-[#E8E2D8]/90">{night}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => openOverlay('index')}
              className="w-full py-3 mt-3 bg-[#080706] border border-[#C8B08A]/25 hover:border-[#C8B08A] text-[#C8B08A] hover:text-[#EDE2D0] font-mono text-[10px] tracking-[0.22em] uppercase rounded-[1px] transition-all cursor-pointer text-center block"
            >
              Browse Complete Archive [5] ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
