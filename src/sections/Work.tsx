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
      className="relative w-full py-20 md:py-28 px-6 md:px-16 flex flex-col justify-center pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto space-y-10 pointer-events-auto">
        {/* Top Header & Minimalist Horizontal Tabs */}
        <div className="flex flex-wrap justify-between items-center gap-6 border-b border-[#C8B08A]/12 pb-4">
          <div className="font-mono text-[10px] text-[#C8B08A] tracking-[0.25em] uppercase flex items-center gap-2.5">
            <span className="text-[#8E7B62]">(03)</span>
            <span>The Nights</span>
            <span className="w-8 h-[1px] bg-[#C8B08A]/30" />
            <span className="text-[#8E7B62]">Curated Productions</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Minimalist horizontal tabs */}
            <div className="flex items-center gap-5">
              {projects.map((p, idx) => (
                <button
                  key={p.slug}
                  onClick={() => {
                    sound?.playTick(1.0);
                    setActiveProjectIndex(idx);
                  }}
                  className={`group relative pb-2 font-mono text-[11px] tracking-[0.2em] transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'text-[#EDE2D0] font-semibold'
                      : 'text-[#8E7B62] hover:text-[#C8B08A]'
                  }`}
                  aria-label={`Select Nocturne ${idx + 1}`}
                >
                  <span>0{idx + 1}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C8B08A] transition-all duration-300 ${
                      activeIndex === idx ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50 group-hover:opacity-40'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                sound?.playTick(1.0);
                openOverlay('index');
              }}
              className="font-mono text-[9px] text-[#C8B08A] hover:text-[#EDE2D0] tracking-[0.22em] uppercase border border-[#C8B08A]/30 px-3.5 py-1.5 rounded-[1px] cursor-pointer hover:bg-[#C8B08A]/5 transition-colors"
            >
              Archive [5] ↗
            </button>
          </div>
        </div>

        {/* Active Project Luxury Feature Card */}
        <div className="max-w-4xl w-full mx-auto">
          <div className="border border-[#C8B08A]/15 bg-[#0F0E0C]/85 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.6)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-[1px]">
            {/* Visual Cover Preview */}
            <div className="md:col-span-5 relative aspect-[4/5] w-full rounded-[1px] overflow-hidden border border-[#C8B08A]/25 shadow-xl group">
              <Image
                src={currentProject.cover.src}
                alt={currentProject.title}
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-3 left-3 right-3 font-mono text-[9px] uppercase tracking-[0.22em] bg-[#080706]/85 p-2.5 border border-[#C8B08A]/20 text-[#EDE2D0] backdrop-blur-md">
                VENUE: {currentProject.venue}
              </div>
            </div>

            {/* Editorial Information */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex justify-between items-center font-mono text-[10px] text-[#C8B08A] tracking-[0.22em]">
                <span className="font-semibold">
                  NOCTURNE {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <span className="text-[#8E7B62] uppercase">{currentProject.discipline} · {currentProject.year}</span>
              </div>

              <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.08em] text-[#EDE2D0] leading-tight">
                {currentProject.title}
              </h2>

              <p className="font-serif text-sm sm:text-base text-[#E8E2D8]/80 leading-relaxed font-light">
                {currentProject.summary}
              </p>

              {/* Specs Dossier */}
              <div className="grid grid-cols-2 gap-4 pt-3.5 border-t border-[#C8B08A]/12 font-mono text-[10px] text-[#E8E2D8]/70">
                <div>
                  <span className="text-[#8E7B62] block uppercase tracking-[0.24em] text-[9px] mb-0.5">Curator & Sound</span>
                  <span className="truncate block text-[#EDE2D0]/90">{currentProject.curator}</span>
                </div>
                <div>
                  <span className="text-[#8E7B62] block uppercase tracking-[0.24em] text-[9px] mb-0.5">Dress Code</span>
                  <span className="text-[#EDE2D0]/90">{currentProject.dressCode}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link
                  href={`/work/${currentProject.slug}`}
                  onClick={() => sound?.playTick(1.2)}
                  className="px-7 py-3 bg-[#C8B08A] text-[#080706] font-mono text-[10px] font-semibold tracking-[0.22em] uppercase rounded-[1px] hover:bg-[#EDE2D0] transition-colors duration-400 shadow-md"
                >
                  View Dossier ↗
                </Link>
                <button
                  onClick={() => {
                    sound?.playTick(1.0);
                    openOverlay('coin');
                  }}
                  className="px-6 py-3 border border-[#C8B08A]/30 text-[#C8B08A] hover:border-[#C8B08A] hover:bg-[#C8B08A]/5 font-mono text-[10px] tracking-[0.22em] uppercase rounded-[1px] transition-colors cursor-pointer"
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
