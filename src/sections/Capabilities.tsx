'use client';

import { useState } from 'react';
import { capabilities } from '@content/capabilities';
import { useAppStore } from '@/state/store';

export function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);
  const currentScene = useAppStore((s) => s.currentScene);
  const isActive = currentScene === 'capabilities';

  return (
    <section
      id="capabilities"
      data-scene="capabilities"
      className="relative w-full h-[260vh] -mb-[100svh] pointer-events-none"
    >
      <div
        className={`sticky top-0 h-[100svh] flex flex-col justify-between p-8 md:p-16 lg:p-20 text-[#141210] transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Header */}
        <div className="max-w-xl pointer-events-auto space-y-2">
          <div className="font-mono text-xs text-[#73572b] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(04)</span>
            <span>The Pillars</span>
            <span className="w-8 h-[1px] bg-[#73572b]/40" />
            <span className="text-[#141210]/50">White Room Architecture</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141210]">
            Four Tenets of the Circle.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#141210]/75 leading-relaxed">
            Floating ceramic studies in paper-white space. Every tenet safeguards the sanctity and standard of our private gatherings.
          </p>
        </div>

        {/* 4 Studies interactive selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pointer-events-auto my-auto">
          {capabilities.map((cap, idx) => {
            const isSelected = activeTab === idx;
            return (
              <div
                key={cap.id}
                onClick={() => setActiveTab(idx)}
                className={`p-5 rounded-sm border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#141210] text-[#ece1cf] border-[#141210] shadow-xl'
                    : 'bg-[#EDE8DF]/50 hover:bg-[#EDE8DF] text-[#141210] border-[#141210]/15'
                }`}
              >
                <div className="flex justify-between items-baseline mb-2 font-mono text-xs">
                  <span className={isSelected ? 'text-[#cbb074]' : 'text-[#73572b]'}>
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">
                    {cap.form}
                  </span>
                </div>

                <h3 className="font-['Cinzel'] text-xl font-bold mb-2">
                  {cap.name}
                </h3>

                <p className={`font-serif text-xs leading-relaxed mb-4 ${isSelected ? 'text-[#ece1cf]/80' : 'text-[#141210]/70'}`}>
                  {cap.line}
                </p>

                {/* Services list */}
                <div className="space-y-1 font-mono text-[10px] border-t border-current/15 pt-3">
                  {cap.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 opacity-80">
                      <span className="text-[#cbb074]">›</span>
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pointer-events-auto flex justify-between items-center font-mono text-[10px] text-[#141210]/50 uppercase tracking-widest border-t border-[#141210]/15 pt-3">
          <span>RING · FAN · LATTICE · WAVE</span>
          <span>SELECT A STUDY TO EXAMINE THE BLUEPRINT</span>
        </div>
      </div>
    </section>
  );
}
