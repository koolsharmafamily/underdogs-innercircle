'use client';

import { processSteps } from '@content/process';
import { useAppStore } from '@/state/store';

export function Process() {
  const currentScene = useAppStore((s) => s.currentScene);
  const isActive = currentScene === 'process';

  return (
    <section
      id="process"
      data-scene="process"
      className="relative w-full h-[320vh] -mb-[100svh] pointer-events-none"
    >
      <div
        className={`sticky top-0 h-[100svh] flex flex-col justify-between p-8 md:p-16 lg:p-20 text-[#ece1cf] transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Header */}
        <div className="max-w-xl pointer-events-auto space-y-2">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(05)</span>
            <span>The Passage</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/50">72M Spiral S-Curve Tunnel</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            How the Parts Find Their Places.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#ece1cf]/75 leading-relaxed">
            Four sequential gates illuminate as you travel deeper through the spiral tunnel. The journey from external spectator to verified coin holder.
          </p>
        </div>

        {/* 4 Process Gates in Depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto my-auto">
          {processSteps.map((step) => (
            <div
              key={step.n}
              className="bg-[#050505]/75 backdrop-blur-md p-6 border-t-2 border-[#ff5b1f] border-b border-l border-r border-[#ece1cf]/10 rounded-sm space-y-2.5 shadow-2xl"
            >
              <div className="flex items-center justify-between font-mono">
                <span className="text-2xl font-bold text-[#ff5b1f]">
                  {step.n}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb074]">
                  GATE ACTIVE
                </span>
              </div>

              <h3 className="font-['Cinzel'] text-xl font-bold text-[#ece1cf]">
                {step.title}
              </h3>

              <p className="font-serif text-xs text-[#ece1cf]/85 leading-relaxed">
                {step.line}
              </p>

              <p className="font-mono text-[10px] text-[#ece1cf]/50 pt-2 border-t border-[#ece1cf]/10 leading-normal">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pointer-events-auto flex justify-between items-center font-mono text-[10px] text-[#ece1cf]/40 uppercase tracking-widest border-t border-[#ece1cf]/10 pt-3">
          <span>60 TUNNEL FRAMES · 4 EMISSIVE GATES</span>
          <span>VELOCITY BANKING ≤ 3°</span>
        </div>
      </div>
    </section>
  );
}
