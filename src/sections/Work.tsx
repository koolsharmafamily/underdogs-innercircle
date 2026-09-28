'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/state/store';
import { projects } from '@content/projects';
import { sound } from '@/audio/sound';

export function Work() {
  const activeIndex = useAppStore((s) => s.activeProjectIndex);
  const setActiveProjectIndex = useAppStore((s) => s.setActiveProjectIndex);
  const openOverlay = useAppStore((s) => s.openOverlay);
  const currentProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="work"
      data-scene="work"
      className="relative w-full py-16 md:py-24 px-6 md:px-16 flex flex-col justify-center pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto space-y-8 pointer-events-auto">
        {/* Top Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#ece1cf]/15 pb-4">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(03)</span>
            <span>The Nights</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/60">Curated Productions</span>
          </div>

          <div className="flex items-center gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.slug}
                onClick={() => {
                  sound?.playTick(1.0);
                  setActiveProjectIndex(idx);
                }}
                className={`font-mono text-xs px-2.5 py-1 rounded-sm border transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-[#cbb074] text-[#050505] border-[#cbb074] font-bold'
                    : 'bg-[#0a0808]/80 text-[#ece1cf]/70 border-[#cbb074]/30 hover:border-[#cbb074]'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
            <button
              onClick={() => {
                sound?.playTick(1.0);
                openOverlay('index');
              }}
              className="ml-2 font-mono text-xs text-[#cbb074] hover:text-[#f3e0ac] tracking-widest uppercase border border-[#cbb074]/40 px-3.5 py-1 rounded-sm cursor-pointer hover:bg-[#cbb074]/10 transition-colors"
            >
              Archive [5] ↗
            </button>
          </div>
        </div>

        {/* Active Project Luxury Feature Card */}
        <div className="max-w-4xl w-full mx-auto">
          <div className="ic-frame-double bg-[#0c0a0a]/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Cover Preview */}
            <div className="md:col-span-5 relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[#cbb074]/40 shadow-xl group">
              <Image
                src={currentProject.cover.src}
                alt={currentProject.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-3 left-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] bg-[#050505]/80 p-2 border border-[#cbb074]/30 text-[#f3e0ac] backdrop-blur-sm">
                VENUE: {currentProject.venue}
              </div>
            </div>

            {/* Editorial Information */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex justify-between items-center font-mono text-xs text-[#cbb074] tracking-[0.2em]">
                <span className="font-bold">
                  NOCTURNE {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <span className="text-[#ece1cf]/60 uppercase">{currentProject.discipline} · {currentProject.year}</span>
              </div>

              <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#ece1cf] leading-tight">
                {currentProject.title}
              </h2>

              <p className="font-serif text-sm sm:text-base text-[#ece1cf]/85 leading-relaxed">
                {currentProject.summary}
              </p>

              {/* Specs Dossier */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#ece1cf]/15 font-mono text-[10px] text-[#ece1cf]/70">
                <div>
                  <span className="text-[#cbb074] block uppercase tracking-widest text-[9px]">Curator & Sound</span>
                  <span className="truncate block">{currentProject.curator}</span>
                </div>
                <div>
                  <span className="text-[#cbb074] block uppercase tracking-widest text-[9px]">Dress Code</span>
                  <span>{currentProject.dressCode}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/work/${currentProject.slug}`}
                  onClick={() => sound?.playTick(1.2)}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#b2955e] via-[#f3e0ac] to-[#cbb074] text-[#050505] font-mono text-xs font-bold tracking-[0.18em] uppercase rounded-sm hover:scale-105 transition-all shadow-lg"
                >
                  View Dossier ↗
                </Link>
                <button
                  onClick={() => {
                    sound?.playTick(1.0);
                    openOverlay('coin');
                  }}
                  className="px-5 py-2.5 border border-[#cbb074]/50 text-[#cbb074] hover:text-[#f3e0ac] font-mono text-xs tracking-[0.16em] uppercase hover:bg-[#cbb074]/10 transition-colors cursor-pointer rounded-sm"
                >
                  Request Coin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
