'use client';

import Image from 'next/image';
import { getLenis } from '@/motion/clock';
import { useAppStore } from '@/state/store';
import { sound } from '@/audio/sound';

export function Hero() {
  const openOverlay = useAppStore((s) => s.openOverlay);

  const scrollDown = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      sound?.playTick(1.2);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      data-scene="hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-between items-center px-6 pt-24 pb-10 md:py-24 text-center pointer-events-none"
    >
      {/* Top Tagline & Emblem */}
      <div className="pointer-events-auto flex flex-col items-center space-y-3 pt-2 sm:pt-4">
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#cbb074]" />
          <span className="font-mono text-[10px] sm:text-xs text-[#cbb074] tracking-[0.3em] uppercase">
            Nagpur, India · Private Event Series
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#cbb074]" />
        </div>

        {/* Underdogs Gold Coin Floating Crest */}
        <div
          onClick={() => sound?.playCoinMint()}
          className="group relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer rounded-full p-[2px] bg-gradient-to-tr from-[#73572b] via-[#f3e0ac] to-[#977947] shadow-[0_0_30px_rgba(203,176,116,0.3)] hover:scale-110 transition-transform duration-500"
          title="Underdogs Medallion"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#050505]">
            <Image
              src="/brand/logo.jpg"
              alt="Underdogs Innercircle Gold Medallion"
              fill
              priority
              className="object-cover group-hover:rotate-12 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Centerpiece Hero Title */}
      <div className="pointer-events-auto max-w-4xl space-y-4 my-auto py-6">
        <h1 className="font-['Cinzel'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.06em] uppercase ic-gold-text leading-[1.0] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          UNDERDOGS
          <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.28em] text-[#ece1cf] mt-2">
            INNERCIRCLE
          </span>
        </h1>

        <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#f3e0ac] tracking-wide max-w-2xl mx-auto drop-shadow-md">
          "Different worlds. Same coin."
        </p>

        {/* Luxury Clipped-Corner VIP Pass */}
        <div className="ic-frame-double bg-[#141414]/85 backdrop-blur-xl max-w-lg mx-auto p-6 sm:p-7 text-center space-y-4 shadow-2xl mt-4">
          <div className="flex items-center justify-between font-mono text-[9px] text-[#cbb074] tracking-[0.25em] uppercase border-b border-[#ece1cf]/10 pb-2">
            <span>EST. 2026</span>
            <span>INVITE-ONLY SANCTUARY</span>
            <span>NOCTURNE SERIES</span>
          </div>

          <p className="font-serif text-xs sm:text-sm text-[#ece1cf]/90 leading-relaxed">
            The private living room behind the rage. Limited to individuals whose presence defines the cultural frequency of Nagpur.
          </p>

          <div className="flex items-center justify-center pt-1">
            <button
              onClick={() => openOverlay('coin')}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#b2955e] via-[#f3e0ac] to-[#cbb074] text-[#050505] font-mono text-xs font-black tracking-[0.2em] uppercase rounded-sm shadow-xl hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              Request Your Coin ↗
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar Indicator */}
      <div className="pointer-events-auto w-full max-w-5xl flex items-center justify-between border-t border-[#ece1cf]/15 pt-4 font-mono text-[10px] text-[#ece1cf]/60 uppercase tracking-widest">
        <button
          onClick={scrollDown}
          className="hover:text-[#cbb074] transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
          aria-label="Scroll to The Covenant"
        >
          <span>Enter The Vault</span>
          <span className="inline-block animate-bounce text-[#cbb074]">↓</span>
        </button>
        <div className="flex items-center gap-2 text-[#cbb074]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cbb074]" />
          <span>BY INVITATION ONLY · NAGPUR</span>
        </div>
      </div>
    </section>
  );
}
