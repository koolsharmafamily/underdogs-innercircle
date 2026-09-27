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

  const currentScene = useAppStore((s) => s.currentScene);
  const isActive = currentScene === 'contact';

  return (
    <section
      id="contact"
      data-scene="contact"
      className="relative w-full min-h-[140vh] pointer-events-none"
    >
      <div
        className={`sticky top-0 min-h-[100svh] flex flex-col justify-between px-6 md:px-16 py-12 md:py-16 text-[#ece1cf] transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Header */}
        <div className="max-w-2xl pointer-events-auto space-y-2 border-b border-[#ece1cf]/15 pb-4">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(07)</span>
            <span>The Mint</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/60">Initiation & Registry</span>
          </div>

          <h2 className="font-['Cinzel'] text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#ece1cf]">
            Claim Your Place In The Circle.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#ece1cf]/80 leading-relaxed">
            Tell us who you are and what presence you bring into the room. We review all applications within two working days.
          </p>
        </div>

        {/* Central VIP Registry Card */}
        <div className="max-w-xl w-full mx-auto pointer-events-auto ic-frame-double bg-[#0a0808]/92 backdrop-blur-xl p-8 sm:p-10 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] my-auto text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full relative overflow-hidden border border-[#cbb074]/60">
              <Image
                src="/brand/logo.jpg"
                alt="Underdogs Emblem"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left font-mono">
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#cbb074]">
                CENTRAL REPOSITORY
              </span>
              <span className="font-['Cinzel'] text-xs font-bold text-[#ece1cf]">
                UNDERDOGS INNERCIRCLE
              </span>
            </div>
          </div>

          <p className="font-serif text-base sm:text-lg text-[#ece1cf]/90 leading-relaxed max-w-md mx-auto">
            Every coin is minted in polished gold and engraved with the holder's identity. A lifelong passport to Nagpur's most intimate private nights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                sound?.playCoinMint();
                openOverlay('coin');
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#b2955e] via-[#f3e0ac] to-[#cbb074] text-[#050505] font-mono text-xs font-black tracking-[0.2em] uppercase rounded-sm shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Request Your Coin ↗
            </button>

            <button
              onClick={() => {
                sound?.playTick(1.0);
                openOverlay('concierge');
              }}
              className="w-full sm:w-auto px-6 py-3.5 border border-[#cbb074]/60 text-[#f3e0ac] font-mono text-xs tracking-[0.16em] uppercase hover:bg-[#cbb074]/15 transition-all cursor-pointer rounded-sm"
            >
              Consult Goldie ✦
            </button>
          </div>

          {/* Copy Direct Concierge */}
          <div className="pt-4 border-t border-[#ece1cf]/15 flex items-center justify-between text-xs font-mono">
            <span className="text-[#ece1cf]/60">Direct Inquiries:</span>
            <button
              onClick={copyEmail}
              className="text-[#cbb074] hover:text-[#f3e0ac] flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
            >
              <span>{copied ? '✓ COPIED ADDRESS' : siteConfig.email}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pointer-events-auto flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] text-[#ece1cf]/50 uppercase tracking-widest border-t border-[#ece1cf]/15 pt-4">
          <div>
            © 2026 UNDERDOGS ENTERTAINMENT · ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/underdogsinnercircle"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#cbb074] transition-colors"
            >
              @underdogsinnercircle ↗
            </a>
            <a
              href="https://instagram.com/underdogs_nagpur"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#cbb074] transition-colors"
            >
              @underdogs_nagpur ↗
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-[#cbb074] transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
