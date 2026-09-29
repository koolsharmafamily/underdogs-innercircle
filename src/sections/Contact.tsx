'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/state/store';
import { siteConfig } from '@content/site';
import { getLenis } from '@/motion/clock';
import { sound } from '@/audio/sound';

export function Contact() {
  const openOverlay = useAppStore((s) => s.openOverlay);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    sound?.playTick(1.0);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    sound?.playTick(1.2);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      data-scene="contact"
      className="relative w-full min-h-[90svh] flex flex-col justify-between px-6 md:px-16 py-20 md:py-28 text-[#E8E2D8] pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col justify-between gap-14 pointer-events-auto">
        {/* Header */}
        <div className="max-w-2xl space-y-2.5 border-b border-[#C8B08A]/12 pb-4">
          <div className="font-mono text-[10px] text-[#C8B08A] tracking-[0.25em] uppercase flex items-center gap-2.5">
            <span className="text-[#8E7B62]">(07)</span>
            <span>The Private Registry</span>
            <span className="w-8 h-[1px] bg-[#C8B08A]/30" />
            <span className="text-[#8E7B62]">Request for Introduction</span>
          </div>

          <h2 className="font-['Cinzel'] text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] text-[#EDE2D0]">
            The Sixty Ledger.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#E8E2D8]/80 leading-relaxed font-light">
            Admission into the Circle is granted strictly through peer review or direct recommendation. Introduce yourself to the curatorial council.
          </p>
        </div>

        {/* Central VIP Registry Card */}
        <div className="max-w-xl w-full mx-auto border border-[#C8B08A]/18 bg-[#0F0E0C]/90 backdrop-blur-2xl p-8 sm:p-12 space-y-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] my-auto text-center rounded-[1px]">
          <div className="flex items-center justify-center gap-3.5">
            <div className="w-11 h-11 rounded-full relative overflow-hidden border border-[#C8B08A]/35 bg-[#080706]">
              <Image
                src="/brand/logo.jpg"
                alt="Underdogs Emblem"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left font-mono">
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8E7B62]">
                CENTRAL REGISTRY · NAGPUR
              </span>
              <span className="font-['Cinzel'] text-xs font-normal text-[#EDE2D0] tracking-[0.16em]">
                UNDERDOGS INNERCIRCLE
              </span>
            </div>
          </div>

          <p className="font-serif text-base sm:text-lg text-[#E8E2D8]/90 leading-relaxed max-w-md mx-auto font-light">
            Every coin is struck in antique gold and engraved with the holder's verified ledger number. A permanent passport to Nagpur's private nocturnes.
          </p>

          <div className="flex items-center justify-center pt-2">
            <button
              onClick={() => {
                sound?.playCoinMint();
                openOverlay('coin');
              }}
              className="w-full sm:w-auto px-9 py-3.5 bg-[#C8B08A] text-[#080706] font-mono text-[10px] font-semibold tracking-[0.24em] uppercase rounded-[1px] shadow-xl hover:bg-[#EDE2D0] transition-colors duration-400 cursor-pointer"
            >
              Request Introduction ↗
            </button>
          </div>

          {/* Copy Direct Email */}
          <div className="pt-4 border-t border-[#C8B08A]/12 flex items-center justify-between text-xs font-mono">
            <span className="text-[#8E7B62] text-[10px] uppercase tracking-[0.2em]">Curatorial Concierge:</span>
            <button
              onClick={copyEmail}
              className="text-[#C8B08A] hover:text-[#EDE2D0] flex items-center gap-1.5 cursor-pointer underline underline-offset-4 tracking-[0.1em]"
            >
              <span>{copied ? '✓ COPIED ADDRESS' : siteConfig.email}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[9px] sm:text-[10px] text-[#8E7B62] uppercase tracking-[0.24em] border-t border-[#C8B08A]/12 pt-5">
          <div>
            © 2026 UNDERDOGS ENTERTAINMENT · ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/underdogsinnercircle"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C8B08A] transition-colors"
            >
              @underdogsinnercircle ↗
            </a>
            <a
              href="https://instagram.com/underdogs_nagpur"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C8B08A] transition-colors"
            >
              @underdogs_nagpur ↗
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-[#C8B08A] transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
