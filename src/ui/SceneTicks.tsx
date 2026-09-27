'use client';

import { usePathname } from 'next/navigation';
import { useAppStore } from '@/state/store';
import { scenes } from '@content/scenes';
import { getLenis } from '@/motion/clock';

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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-5 pointer-events-auto"
      aria-label="Scene navigation"
    >
      {scenes.map((scene, idx) => {
        const isActive = currentScene === scene.id;

        return (
          <button
            key={scene.id}
            onClick={() => jumpToScene(idx)}
            className="group flex items-center gap-3 py-1 cursor-pointer focus:outline-none"
            aria-label={`Jump to ${scene.label}`}
          >
            {/* Hover label */}
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                isActive ? 'text-[#cbb074] opacity-100' : 'text-[#ece1cf]/70'
              }`}
            >
              {scene.label}
            </span>

            {/* Hairline Tick */}
            <span
              className={`h-[1px] block transition-all duration-300 ${
                isActive
                  ? 'w-7 bg-[#cbb074] opacity-100 shadow-[0_0_8px_rgba(203,176,116,0.5)]'
                  : 'w-2 bg-[#ece1cf]/25 group-hover:w-4 group-hover:bg-[#ece1cf]/60'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
