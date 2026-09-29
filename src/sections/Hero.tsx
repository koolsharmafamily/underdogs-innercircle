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
      <div className="pointer-events-auto flex flex-col items-center space-y-4 pt-2 sm:pt-4">
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C8B08A]/40" />
          <span className="font-mono text-[9px] sm:text-[10px] text-[#C8B08A] tracking-[0.3em] uppercase">
            Nagpur, India · Private Event Series
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C8B08A]/40" />
        </div>

        {/* Underdogs Gold Coin Floating Crest */}
        <div
          onClick={() => sound?.playCoinMint()}
          className="group relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer rounded-full p-[1px] border border-[#C8B08A]/35 bg-[#0F0E0C]/90 shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition-all duration-500"
          title="Underdogs Medallion — Tap to Ring"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#080706]">
            <Image
              src="/brand/logo.jpg"
              alt="Underdogs Innercircle Gold Medallion"
              fill
              priority
              className="object-cover group-hover:rotate-6 transition-transform duration-700 opacity-95 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      {/* Centerpiece Hero Title */}
      <div className="pointer-events-auto max-w-4xl space-y-4 my-auto py-8">
        <h1 className="font-['Cinzel'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.14em] uppercase ic-gold-text leading-[1.05]">
          UNDERDOGS
          <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.32em] text-[#EDE2D0] mt-3">
            INNERCIRCLE
          </span>
        </h1>

        <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[#C8B08A]/90 tracking-wide max-w-2xl mx-auto font-light">
          "Different worlds. Same coin."
        </p>

        {/* Museum Editorial VIP Dossier Card */}
        <div className="border border-[#C8B08A]/15 bg-[#0F0E0C]/80 backdrop-blur-2xl max-w-lg mx-auto p-6 sm:p-8 text-center space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] mt-5 rounded-[1px]">
          <div className="flex items-center justify-between font-mono text-[9px] text-[#8E7B62] tracking-[0.25em] uppercase border-b border-[#C8B08A]/10 pb-2.5">
            <span>EST. 2026</span>
            <span>INVITE-ONLY SANCTUARY</span>
            <span>NOCTURNE SERIES</span>
          </div>

          <p className="font-serif text-xs sm:text-sm text-[#E8E2D8]/85 leading-relaxed font-light">
            The private living room behind the rage. Limited strictly to individuals whose presence defines the cultural frequency of Nagpur.
          </p>

          <div className="flex items-center justify-center pt-2">
            <button
              onClick={() => openOverlay('coin')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C8B08A] text-[#080706] font-mono text-[10px] tracking-[0.22em] uppercase rounded-[1px] shadow-lg hover:bg-[#EDE2D0] transition-colors duration-400 font-semibold cursor-pointer"
            >
              Request Your Coin ↗
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar Indicator */}
      <div className="pointer-events-auto w-full max-w-5xl flex items-center justify-between border-t border-[#C8B08A]/12 pt-4 font-mono text-[9px] sm:text-[10px] text-[#8E7B62] uppercase tracking-[0.24em]">
        <button
          onClick={scrollDown}
          className="hover:text-[#C8B08A] transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
          aria-label="Scroll to The Covenant"
        >
          <span>Enter The Vault</span>
          <span className="inline-block text-[#C8B08A]">↓</span>
        </button>
        <div className="flex items-center gap-2 text-[#C8B08A]/90">
          <span className="w-1 h-1 rounded-full bg-[#C8B08A]" />
          <span>BY INVITATION ONLY · NAGPUR</span>
        </div>
      </div>
    </section>
  );
}
