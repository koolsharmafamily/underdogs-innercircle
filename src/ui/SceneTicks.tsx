'use client';

import { usePathname } from 'next/navigation';
import { useAppStore } from '@/state/store';
import { scenes } from '@content/scenes';
import { getLenis } from '@/motion/clock';

const cleanLabels: Record<string, { num: string; name: string }> = {
  hero: { num: '01', name: 'The Vault' },
  manifesto: { num: '02', name: 'The Covenant' },
  work: { num: '03', name: 'The Nights' },
  capabilities: { num: '04', name: 'The Pillars' },
  process: { num: '05', name: 'The Passage' },
  proof: { num: '06', name: 'The Circle' },
  contact: { num: '07', name: 'The Mint' },
};

export function SceneTicks() {
  const pathname = usePathname();
  const currentScene = useAppStore((s) => s.currentScene);

  if (pathname !== '/') return null;

  const jumpToScene = (index: number) => {
    const el = document.getElementById(scenes[index].id);
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
    <aside
      className="fixed right-1.5 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end pointer-events-auto"
      aria-label="Chapter navigation"
    >
      <div className="bg-[#080707]/55 md:bg-[#080707]/85 backdrop-blur-sm md:backdrop-blur-md border border-[#cbb074]/25 md:border-[#cbb074]/40 px-1 py-2 md:px-4 md:py-4 rounded-full md:rounded-sm shadow-md md:shadow-[0_12px_35px_rgba(0,0,0,0.9)] flex flex-col items-center md:items-end gap-1.5 md:gap-2.5">
        {scenes.map((scene, idx) => {
          const isActive = currentScene === scene.id;
          const info = cleanLabels[scene.id] || {
            num: String(idx + 1).padStart(2, '0'),
            name: scene.title,
          };

          return (
            <button
              key={scene.id}
              onClick={() => jumpToScene(idx)}
              className={`group flex items-center justify-end gap-0 md:gap-2.5 p-0.5 md:py-1 md:px-0 cursor-pointer focus:outline-none transition-all duration-300 ${
                isActive ? 'md:scale-[1.03]' : 'opacity-70 hover:opacity-100'
              }`}
              aria-label={`Jump to ${info.num} ${info.name}`}
            >
              {/* Chapter Name (Desktop only — hidden on phone so it never blocks content) */}
              <span
                className={`hidden md:inline font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  isActive
                    ? 'text-[#f3e0ac] font-bold drop-shadow-[0_0_8px_rgba(243,224,172,0.45)]'
                    : 'text-[#ece1cf]/75 group-hover:text-[#f3e0ac]'
                }`}
              >
                {info.name}
              </span>

              {/* Chapter Number (Desktop only — hidden on phone) */}
              <span
                className={`hidden md:inline font-mono text-[11px] tracking-[0.12em] transition-all duration-300 ${
                  isActive
                    ? 'text-[#cbb074] font-bold'
                    : 'text-[#cbb074]/60 group-hover:text-[#cbb074]'
                }`}
              >
                {info.num}
              </span>

              {/* Indicator: Ultra-minimal micro-pill on phone, Prominent horizontal bar on desktop */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-[3px] h-3.5 md:h-[3px] md:w-9 bg-gradient-to-b md:bg-gradient-to-r from-[#cbb074] to-[#f3e0ac] shadow-[0_0_8px_rgba(243,224,172,0.85)] md:shadow-[0_0_12px_rgba(243,224,172,0.85)]'
                    : 'w-[3px] h-1.5 md:h-[2px] md:w-4 bg-[#cbb074]/35 md:group-hover:w-6 group-hover:bg-[#cbb074]/80'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
