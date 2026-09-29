'use client';

import { useState } from 'react';
import { capabilities } from '@content/capabilities';

export function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="capabilities"
      data-scene="capabilities"
      className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-20 flex flex-col justify-center pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto space-y-10 pointer-events-auto">
        {/* Header */}
        <div className="max-w-xl space-y-2.5">
          <div className="font-mono text-[10px] text-[#C8B08A] tracking-[0.25em] uppercase flex items-center gap-2.5">
            <span className="text-[#8E7B62]">(04)</span>
            <span>The Pillars</span>
            <span className="w-8 h-[1px] bg-[#C8B08A]/30" />
            <span className="text-[#8E7B62]">Standards of the Circle</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-[#EDE2D0]">
            Four Tenets of the Circle.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#E8E2D8]/80 leading-relaxed font-light">
            Every tenet safeguards the sanctity, intimacy, and cultural frequency of our private gatherings.
          </p>
        </div>

        {/* 4 Tenets interactive selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {capabilities.map((cap, idx) => {
            const isSelected = activeTab === idx;
            return (
              <div
                key={cap.id}
                onClick={() => setActiveTab(idx)}
                className={`p-6 rounded-[1px] border transition-all duration-400 cursor-pointer backdrop-blur-2xl ${
                  isSelected
                    ? 'bg-[#141310]/95 text-[#EDE2D0] border-[#C8B08A]/50 shadow-[0_15px_40px_rgba(0,0,0,0.55)]'
                    : 'bg-[#0F0E0C]/80 hover:bg-[#141310]/85 text-[#E8E2D8]/80 border-[#C8B08A]/15'
                }`}
              >
                <div className="flex justify-between items-baseline mb-3 font-mono text-xs">
                  <span className={`text-[11px] tracking-[0.18em] ${isSelected ? 'text-[#EDE2D0] font-semibold' : 'text-[#8E7B62]'}`}>
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-['Cinzel'] text-lg font-normal mb-2 text-[#EDE2D0] tracking-[0.06em]">
                  {cap.name}
                </h3>

                <p className="font-serif text-xs leading-relaxed mb-4 text-[#E8E2D8]/75 font-light">
                  {cap.line}
                </p>

                {/* Services list */}
                <div className="space-y-1.5 font-mono text-[9px] border-t border-[#C8B08A]/12 pt-3.5 tracking-[0.12em] uppercase">
                  {cap.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-[#E8E2D8]/80">
                      <span className="text-[#C8B08A] text-[10px]">›</span>
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
