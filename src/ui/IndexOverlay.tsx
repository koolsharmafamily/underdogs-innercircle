'use client';

import { useState } from 'react';
import { useAppStore } from '@/state/store';
import { projects, Project } from '@content/projects';
import { getLenis } from '@/motion/clock';

export function IndexOverlay() {
  const overlay = useAppStore((s) => s.overlay);
  const closeOverlay = useAppStore((s) => s.closeOverlay);
  const [hoveredProject, setHoveredProject] = useState<Project>(projects[0]);

  const isOpen = overlay === 'index';
  if (!isOpen) return null;

  const navigateToProject = (slug: string) => {
    closeOverlay();
    const el = document.getElementById('work');
    if (el) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-lg flex flex-col justify-between p-8 md:p-16 text-[#ece1cf] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Archive of Nights"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-[#ece1cf]/15 pb-6">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#cbb074] uppercase block">
            INDEX OF PRODUCTIONS
          </span>
          <h2 className="font-['Cinzel'] text-xl font-bold tracking-[0.1em]">
            THE NIGHTS ARCHIVE
          </h2>
        </div>
        <button
          onClick={closeOverlay}
          className="font-mono text-xs text-[#cbb074] hover:text-[#f3e0ac] tracking-[0.18em] uppercase border border-[#cbb074]/30 px-3.5 py-1.5 rounded-sm cursor-pointer"
        >
          Close [Esc] ✕
        </button>
      </div>

      {/* Main Grid: List on Left, Live Preview Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-auto py-8 items-center">
        {/* Project List */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-[#ece1cf]/10">
          {projects.map((proj, idx) => (
            <div
              key={proj.slug}
              onMouseEnter={() => setHoveredProject(proj)}
              onClick={() => navigateToProject(proj.slug)}
              className="group py-4.5 flex items-center justify-between cursor-pointer hover:pl-2 transition-all duration-300"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-[#cbb074]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-['Cinzel'] text-xl sm:text-2xl group-hover:text-[#cbb074] transition-colors">
                    {proj.title}
                  </h3>
                  <span className="font-mono text-[10px] text-[#ece1cf]/50 uppercase tracking-widest block mt-0.5">
                    {proj.year} · {proj.discipline} · {proj.venue}
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs text-[#cbb074] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore →
              </span>
            </div>
          ))}
        </div>

        {/* Live Preview Card */}
        <div className="lg:col-span-5 bg-[#141414] border border-[#ece1cf]/15 p-6 rounded-sm flex flex-col justify-between h-[380px] shadow-2xl">
          <div>
            <div className="flex justify-between items-center text-[10px] font-mono text-[#cbb074] tracking-widest uppercase mb-3">
              <span>{hoveredProject.year} ARCHIVE</span>
              <span>{hoveredProject.discipline}</span>
            </div>
            <h4 className="font-['Cinzel'] text-2xl font-bold mb-2">
              {hoveredProject.title}
            </h4>
            <p className="font-serif text-xs text-[#ece1cf]/75 leading-relaxed line-clamp-3 mb-4">
              {hoveredProject.summary}
            </p>
          </div>

          <div className="space-y-1.5 font-mono text-[11px] text-[#ece1cf]/60 border-t border-[#ece1cf]/10 pt-3">
            <div>
              <span className="text-[#cbb074]">SOUND:</span> {hoveredProject.sound}
            </div>
            <div>
              <span className="text-[#cbb074]">DRESS:</span> {hoveredProject.dressCode}
            </div>
            <div>
              <span className="text-[#cbb074]">VENUE:</span> {hoveredProject.venue}
            </div>
          </div>

          <button
            onClick={() => navigateToProject(hoveredProject.slug)}
            className="w-full py-2.5 bg-[#cbb074] text-[#141414] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-[#f3e0ac] transition-all cursor-pointer rounded-sm mt-3"
          >
            Enter {hoveredProject.title} →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-[10px] font-mono opacity-50 border-t border-[#ece1cf]/10 pt-4">
        <span>CURATED COHORT GATHERINGS</span>
        <span>ACCESS RESTRICTED TO VERIFIED COIN HOLDERS</span>
      </div>
    </div>
  );
}
