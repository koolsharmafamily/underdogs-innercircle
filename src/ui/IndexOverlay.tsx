'use client';

import { useState } from 'react';
import Image from 'next/image';
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
      className="fixed inset-0 z-50 bg-[#080706]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 text-[#EDE2D0] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Archive of Nights"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-[#C8B08A]/15 pb-6">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#8E7B62] uppercase block">
            INDEX OF PRODUCTIONS
          </span>
          <h2 className="font-['Cinzel'] text-xl font-normal tracking-[0.1em] text-[#EDE2D0]">
            THE NIGHTS ARCHIVE
          </h2>
        </div>
        <button
          onClick={closeOverlay}
          className="font-mono text-xs text-[#C8B08A] hover:text-[#EDE2D0] tracking-[0.18em] uppercase border border-[#C8B08A]/30 hover:border-[#C8B08A]/60 px-3.5 py-1.5 transition-colors cursor-pointer"
        >
          Close [Esc] ✕
        </button>
      </div>

      {/* Main Grid: List on Left, Live Preview Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-auto py-8 items-center">
        {/* Project List */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-[#C8B08A]/10">
          {projects.map((proj, idx) => (
            <div
              key={proj.slug}
              onMouseEnter={() => setHoveredProject(proj)}
              onClick={() => navigateToProject(proj.slug)}
              className="group py-4.5 flex items-center justify-between cursor-pointer hover:pl-2 transition-all duration-300"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-[#8E7B62]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-['Cinzel'] text-xl sm:text-2xl text-[#EDE2D0] group-hover:text-[#C8B08A] font-normal transition-colors">
                    {proj.title}
                  </h3>
                  <span className="font-mono text-[10px] text-[#8E7B62] uppercase tracking-widest block mt-0.5">
                    {proj.year} · {proj.discipline} · {proj.venue}
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs text-[#C8B08A] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore →
              </span>
            </div>
          ))}
        </div>

        {/* Live Preview Card */}
        <div className="lg:col-span-5 ic-frame bg-[#0F0E0C]/90 p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden mb-4 border border-[#C8B08A]/25">
              <Image
                src={hoveredProject.cover.src}
                alt={hoveredProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-[#8E7B62] tracking-widest uppercase mb-2">
              <span>{hoveredProject.year} ARCHIVE</span>
              <span>{hoveredProject.discipline}</span>
            </div>
            <h4 className="font-['Cinzel'] text-2xl font-normal mb-1.5 text-[#EDE2D0]">
              {hoveredProject.title}
            </h4>
            <p className="font-serif text-xs text-[#EDE2D0]/70 font-light leading-relaxed line-clamp-2 mb-3">
              {hoveredProject.summary}
            </p>
          </div>

          <div className="space-y-1.5 font-mono text-[11px] text-[#EDE2D0]/70 border-t border-[#C8B08A]/15 pt-3">
            <div>
              <span className="text-[#8E7B62]">SOUND:</span> {hoveredProject.sound}
            </div>
            <div>
              <span className="text-[#8E7B62]">DRESS:</span> {hoveredProject.dressCode}
            </div>
            <div>
              <span className="text-[#8E7B62]">VENUE:</span> {hoveredProject.venue}
            </div>
          </div>

          <button
            onClick={() => navigateToProject(hoveredProject.slug)}
            className="w-full py-2.5 bg-[#C8B08A] text-[#080706] font-mono text-xs font-medium tracking-widest uppercase hover:bg-[#EDE2D0] transition-colors cursor-pointer rounded-sm mt-3"
          >
            Enter {hoveredProject.title} →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-[10px] font-mono text-[#8E7B62] border-t border-[#C8B08A]/15 pt-4">
        <span>CURATED COHORT GATHERINGS</span>
        <span>ACCESS RESTRICTED TO VERIFIED COIN HOLDERS</span>
      </div>
    </div>
  );
}
