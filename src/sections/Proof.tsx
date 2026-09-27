'use client';

import { proofQuotes, clientPastNights } from '@content/proof';
import { useAppStore } from '@/state/store';

export function Proof() {
  const currentScene = useAppStore((s) => s.currentScene);
  const isActive = currentScene === 'proof';

  return (
    <section
      id="proof"
      data-scene="proof"
      className="relative w-full h-[160vh] -mb-[100svh] pointer-events-none"
    >
      <div
        className={`sticky top-0 h-[100svh] flex flex-col justify-between p-8 md:p-16 lg:p-20 text-[#ece1cf] transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Header */}
        <div className="max-w-xl pointer-events-auto space-y-2">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(06)</span>
            <span>The Circle</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/50">Dawn Murmuration</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold tracking-tight">
            Voices of the Vault.
          </h2>
        </div>

        {/* Quotes & Past Nights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pointer-events-auto my-auto items-center">
          {/* Main Pull Quote */}
          <div className="lg:col-span-7 bg-[#050505]/75 backdrop-blur-md p-8 border-l-2 border-[#f3e0ac] rounded-sm space-y-4 shadow-2xl">
            <div className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#f3e0ac] leading-relaxed">
              "{proofQuotes[0].quote}"
            </div>

            <div className="font-mono text-xs text-[#cbb074] pt-2 border-t border-[#ece1cf]/10 flex justify-between items-center">
              <span>{proofQuotes[0].author} · {proofQuotes[0].role}</span>
              <span className="text-[#ece1cf]/50">{proofQuotes[0].night}</span>
            </div>
          </div>

          {/* Past Cohorts & Nights Archive */}
          <div className="lg:col-span-5 bg-[#141414]/70 backdrop-blur-md p-6 border border-[#ece1cf]/15 rounded-sm">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#cbb074] uppercase mb-3">
              PAST NIGHTS & GATHERINGS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] text-[#ece1cf]/70">
              {clientPastNights.map((night, idx) => (
                <div key={idx} className="flex items-center gap-1.5 py-1">
                  <span className="text-[#cbb074] text-[9px]">✦</span>
                  <span className="truncate">{night}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pointer-events-auto flex justify-between items-center font-mono text-[10px] text-[#ece1cf]/40 uppercase tracking-widest border-t border-[#ece1cf]/10 pt-3">
          <span>FLOCK FLOW ON CURL NOISE · SHIMMER AT FIRST LIGHT</span>
          <span>DISCRETION AND COMMUNITY PRESERVED</span>
        </div>
      </div>
    </section>
  );
}
