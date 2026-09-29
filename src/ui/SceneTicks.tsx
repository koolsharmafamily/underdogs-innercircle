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
      <div className="bg-[#080706]/60 md:bg-[#0F0E0C]/85 backdrop-blur-sm md:backdrop-blur-2xl border border-[#C8B08A]/20 md:border-[#C8B08A]/18 px-1 py-2 md:px-4 md:py-4 rounded-full md:rounded-[1px] shadow-md md:shadow-[0_15px_40px_rgba(0,0,0,0.65)] flex flex-col items-center md:items-end gap-1.5 md:gap-2.5">
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
                isActive ? 'opacity-100' : 'opacity-65 hover:opacity-100'
              }`}
              aria-label={`Jump to ${info.num} ${info.name}`}
            >
              {/* Chapter Name (Desktop only) */}
              <span
                className={`hidden md:inline font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                  isActive
                    ? 'text-[#EDE2D0] font-medium'
                    : 'text-[#8E7B62] group-hover:text-[#EDE2D0]'
                }`}
              >
                {info.name}
              </span>

              {/* Chapter Number (Desktop only) */}
              <span
                className={`hidden md:inline font-mono text-[10px] tracking-[0.14em] transition-all duration-300 ${
                  isActive
                    ? 'text-[#C8B08A] font-semibold'
                    : 'text-[#8E7B62]/70 group-hover:text-[#C8B08A]'
                }`}
              >
                {info.num}
              </span>

              {/* Indicator: Ultra-minimal micro-pill on phone, refined bar on desktop */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-[3px] h-3.5 md:h-[2px] md:w-8 bg-gradient-to-b md:bg-gradient-to-r from-[#C8B08A] to-[#EDE2D0] shadow-[0_0_6px_rgba(200,176,138,0.6)]'
                    : 'w-[3px] h-1.5 md:h-[1.5px] md:w-3.5 bg-[#C8B08A]/30 md:group-hover:w-5 group-hover:bg-[#C8B08A]/75'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
