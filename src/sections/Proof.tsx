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
      className="relative w-full py-16 md:py-24 px-6 md:px-16 flex flex-col justify-center text-[#ece1cf] pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto space-y-8 pointer-events-auto">
        {/* Header */}
        <div className="max-w-2xl space-y-2 border-b border-[#ece1cf]/15 pb-4">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(06)</span>
            <span>The Circle</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/60">Voices of the Vault</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#ece1cf]">
            Been Inside The Circle.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#ece1cf]/80 leading-relaxed">
            Every night is stamped like a wax seal. True testimony from guests holding verified coins.
          </p>
        </div>

        {/* Quotes & Past Nights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Pull Quote with Coin Wax Seal */}
          <div className="lg:col-span-7 ic-frame-double bg-[#0c0a0a]/90 backdrop-blur-xl p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center gap-4">
              <div
                onClick={() => sound?.playCoinMint()}
                className="w-12 h-12 rounded-full relative overflow-hidden border border-[#cbb074] shadow-md cursor-pointer hover:scale-110 transition-transform"
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
                <span className="font-mono text-[10px] text-[#cbb074] uppercase tracking-widest block">
                  VERIFIED MEMBER
                </span>
                <span className="font-['Cinzel'] text-xs font-bold text-[#ece1cf]">
                  NOCTURNE SERIES ARCHIVE
                </span>
              </div>
            </div>

            <div className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#f3e0ac] leading-relaxed">
              "{proofQuotes[0].quote}"
            </div>

            <div className="font-mono text-xs text-[#cbb074] pt-4 border-t border-[#ece1cf]/15 flex justify-between items-center">
              <span>{proofQuotes[0].author} · {proofQuotes[0].role}</span>
              <span className="text-[#ece1cf]/60">{proofQuotes[0].night}</span>
            </div>
          </div>

          {/* Past Cohorts & Nights Archive */}
          <div className="lg:col-span-5 ic-frame bg-[#141414]/85 backdrop-blur-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#ece1cf]/10 pb-2">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#cbb074] uppercase">
                PAST GATHERINGS (NAGPUR)
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs text-[#ece1cf]/80">
              {clientPastNights.slice(0, 5).map((night, idx) => (
                <div key={idx} className="flex items-center gap-2 py-1.5 border-b border-[#ece1cf]/5">
                  <span className="text-[#cbb074]">✦</span>
                  <span className="truncate">{night}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => openOverlay('index')}
              className="w-full py-2.5 mt-2 bg-[#050505] border border-[#cbb074]/30 hover:border-[#cbb074] text-[#cbb074] hover:text-[#f3e0ac] font-mono text-[11px] tracking-widest uppercase rounded-sm transition-all cursor-pointer text-center block"
            >
              Browse Complete Archive [5] ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
