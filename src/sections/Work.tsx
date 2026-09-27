'use client';

import { useAppStore } from '@/state/store';
import { projects } from '@content/projects';

export function Work() {
  const activeIndex = useAppStore((s) => s.activeProjectIndex);
  const openOverlay = useAppStore((s) => s.openOverlay);
  const currentScene = useAppStore((s) => s.currentScene);
  const isActive = currentScene === 'work';
  const currentProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="work"
      data-scene="work"
      className="relative w-full h-[440vh] -mb-[100svh] pointer-events-none"
    >
      <div
        className={`sticky top-0 h-[100svh] flex flex-col justify-between p-8 md:p-16 transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(03)</span>
            <span>The Nights</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/50">336 Kinetic Screen Fins</span>
          </div>

          <button
            onClick={() => openOverlay('index')}
            className="font-mono text-xs text-[#cbb074] hover:text-[#f3e0ac] tracking-widest uppercase border border-[#cbb074]/30 px-3 py-1 rounded-sm cursor-pointer"
          >
            All Nights Archive [5] ↗
          </button>
        </div>

        {/* Active Project Card Display */}
        <div className="max-w-2xl pointer-events-auto bg-[#050505]/70 backdrop-blur-md p-6 sm:p-8 border-l-2 border-[#cbb074] rounded-sm space-y-4 shadow-2xl">
          {/* Counter & Year */}
          <div className="flex justify-between items-center font-mono text-xs text-[#cbb074] tracking-[0.2em]">
            <span>
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <span className="text-[#ece1cf]/60 uppercase">{currentProject.year} ARCHIVE</span>
          </div>

          {/* Project Title */}
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#ece1cf]">
            {currentProject.title}
          </h2>

          {/* Summary */}
          <p className="font-serif text-sm sm:text-base text-[#ece1cf]/80 leading-relaxed">
            {currentProject.summary}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px] text-[#ece1cf]/60 border-t border-[#ece1cf]/10">
            <div>
              <span className="text-[#cbb074] block text-[9px] uppercase">Curator</span>
              {currentProject.curator}
            </div>
            <div>
              <span className="text-[#cbb074] block text-[9px] uppercase">Sound Profile</span>
              {currentProject.sound}
            </div>
            <div>
              <span className="text-[#cbb074] block text-[9px] uppercase">Venue & Date</span>
              {currentProject.date}
            </div>
            <div>
              <span className="text-[#cbb074] block text-[9px] uppercase">Dress Code</span>
              {currentProject.dressCode}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => openOverlay('coin')}
              className="px-5 py-2.5 bg-[#cbb074] text-[#141414] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#f3e0ac] transition-all cursor-pointer rounded-sm"
            >
              Request Access →
            </button>
            <span className="font-mono text-[10px] text-[#ece1cf]/40 uppercase tracking-widest hidden sm:inline">
              Scroll to flip project
            </span>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="pointer-events-auto flex justify-between items-center font-mono text-[10px] text-[#ece1cf]/40 uppercase tracking-widest border-t border-[#ece1cf]/10 pt-3">
          <span>DETERMINISTIC FLIP ADDRESSING</span>
          <span>PRESS ARROW KEYS OR SCROLL TO BROWSE</span>
        </div>
      </div>
    </section>
  );
}
