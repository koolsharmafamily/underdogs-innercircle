'use client';

import { useState } from 'react';
import { capabilities } from '@content/capabilities';

export function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="capabilities"
      data-scene="capabilities"
      className="relative w-full py-16 md:py-24 px-6 md:px-16 lg:px-20 flex flex-col justify-center pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto space-y-8 pointer-events-auto">
        {/* Header */}
        <div className="max-w-xl space-y-2">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(04)</span>
            <span>The Pillars</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/60">Standards of the Circle</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#ece1cf]">
            Four Tenets of the Circle.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#ece1cf]/80 leading-relaxed">
            Every tenet safeguards the sanctity, intimacy, and standard of our private gatherings.
          </p>
        </div>

        {/* 4 Tenets interactive selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {capabilities.map((cap, idx) => {
            const isSelected = activeTab === idx;
            return (
              <div
                key={cap.id}
                onClick={() => setActiveTab(idx)}
                className={`p-5 rounded-sm border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-[#141414]/95 text-[#ece1cf] border-[#cbb074] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                    : 'bg-[#0a0808]/80 hover:bg-[#141414]/90 text-[#ece1cf]/85 border-[#cbb074]/25'
                }`}
              >
                <div className="flex justify-between items-baseline mb-2 font-mono text-xs">
                  <span className="text-[#cbb074] font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-['Cinzel'] text-xl font-bold mb-2 text-[#f3e0ac]">
                  {cap.name}
                </h3>

                <p className="font-serif text-xs leading-relaxed mb-4 text-[#ece1cf]/80">
                  {cap.line}
                </p>

                {/* Services list */}
                <div className="space-y-1 font-mono text-[10px] border-t border-[#ece1cf]/15 pt-3">
                  {cap.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 text-[#ece1cf]/85">
                      <span className="text-[#cbb074]">›</span>
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
