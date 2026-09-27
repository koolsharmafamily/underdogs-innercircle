'use client';

import { useAppStore } from '@/state/store';

export function Manifesto() {
  const currentScene = useAppStore((s) => s.currentScene);
  const isActive = currentScene === 'manifesto';

  return (
    <section
      id="manifesto"
      data-scene="manifesto"
      className="relative w-full h-[220vh] -mb-[100svh] pointer-events-none"
    >
      <div
        className={`sticky top-0 h-[100svh] flex flex-col justify-center p-8 md:p-16 lg:p-24 transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-3xl pointer-events-auto space-y-12">
          {/* Label */}
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(02)</span>
            <span>The Covenant</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/50">Two Registers · One Motion</span>
          </div>

          {/* Three Manifesto Statements */}
          <div className="space-y-8 font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl text-[#ece1cf] tracking-[0.03em] leading-snug">
            <p>
              Most parties shout. <span className="text-[#f3e0ac] italic font-serif">Ours moves.</span>
            </p>

            <p className="opacity-90">
              Underdogs is the rage. The Innercircle is the{' '}
              <span className="text-[#cbb074] italic font-serif">sanctuary</span> behind it.
            </p>

            <p className="opacity-80">
              Different worlds, unrepeatable nights. Always the{' '}
              <span className="gold-gradient-text font-bold">same coin.</span>
            </p>
          </div>

          <div className="font-mono text-[10px] text-[#ece1cf]/40 uppercase tracking-[0.2em]">
            VORTEX SPIRAL IN 4 HELICAL STRANDS · 3.5 TURNS
          </div>
        </div>
      </div>
    </section>
  );
}
