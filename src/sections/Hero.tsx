'use client';

import { getLenis } from '@/motion/clock';
import { useAppStore } from '@/state/store';

export function Hero() {
  const openOverlay = useAppStore((s) => s.openOverlay);

  const scrollDown = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentScene = useAppStore((s) => s.currentScene);
  const isActive = currentScene === 'hero';

  return (
    <section
      id="hero"
      data-scene="hero"
      className="relative w-full h-[160vh] -mb-[100svh] pointer-events-none"
    >
      <div
        className={`sticky top-0 h-[100svh] flex flex-col justify-end p-8 md:p-16 lg:p-20 transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-2xl pointer-events-auto space-y-4 mb-8">
          {/* Label (Part 8.2 & Part 13 S01) */}
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(01)</span>
            <span>The Vault</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/50 hidden sm:inline">Nagpur, India</span>
          </div>

          {/* Monumental H1 */}
          <h1 className="font-['Cinzel'] text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.04em] text-[#ece1cf] leading-[1.05]">
            The Room Behind The Rage.
          </h1>

          {/* Lead paragraph */}
          <p className="font-serif text-base sm:text-lg text-[#ece1cf]/80 max-w-xl leading-relaxed">
            The private gated circle of Underdogs Entertainment. Curated nights, unrepeatable worlds, one golden currency.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => openOverlay('coin')}
              className="px-6 py-3 bg-[#cbb074] text-[#141414] font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#f3e0ac] transition-all cursor-pointer rounded-sm shadow-xl"
            >
              Request Your Coin ↗
            </button>
            <button
              onClick={() => openOverlay('concierge')}
              className="px-5 py-3 border border-[#cbb074]/40 text-[#cbb074] font-mono text-xs tracking-[0.15em] uppercase hover:border-[#cbb074] transition-colors cursor-pointer rounded-sm"
            >
              Ask Goldie ✦
            </button>
          </div>
        </div>

        {/* Scroll Indicator button (Part 13 S01) */}
        <div className="pointer-events-auto flex items-center justify-between border-t border-[#ece1cf]/10 pt-4 font-mono text-[10px] text-[#ece1cf]/50 uppercase tracking-widest">
          <button
            onClick={scrollDown}
            className="hover:text-[#cbb074] transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
            aria-label="Scroll to The Covenant"
          >
            <span>Scroll to Unfold</span>
            <span className="inline-block animate-bounce">↓</span>
          </button>
          <span>6.0M KINETIC MONOLITH</span>
        </div>
      </div>
    </section>
  );
}
