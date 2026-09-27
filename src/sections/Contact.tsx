'use client';

import { useState } from 'react';
import { useAppStore } from '@/state/store';
import { siteConfig } from '@content/site';
import { getLenis } from '@/motion/clock';

export function Contact() {
  const openOverlay = useAppStore((s) => s.openOverlay);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
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
      className="relative w-full min-h-[120vh] pointer-events-none"
    >
      <div
        className={`sticky top-0 min-h-[100svh] flex flex-col justify-between p-8 md:p-16 lg:p-20 text-[#ece1cf] transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Header */}
        <div className="max-w-xl pointer-events-auto space-y-2">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>(07)</span>
            <span>The Mint</span>
            <span className="w-8 h-[1px] bg-[#cbb074]/40" />
            <span className="text-[#ece1cf]/50">Resolution & Initiation</span>
          </div>

          <h2 className="font-['Cinzel'] text-4xl sm:text-5xl font-bold tracking-tight">
            Claim Your Place In The Circle.
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#ece1cf]/75 leading-relaxed">
            Tell us who you are and what presence you bring into the room. We review all applications within two working days.
          </p>
        </div>

        {/* Central Call to Action Box */}
        <div className="max-w-lg pointer-events-auto bg-[#050505]/80 backdrop-blur-md p-8 border border-[#cbb074]/40 rounded-sm space-y-6 shadow-2xl my-auto">
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#cbb074] uppercase block">
              MEMBERSHIP REGISTRY
            </span>
            <div className="font-['Cinzel'] text-2xl font-bold text-[#f3e0ac]">
              UNDERDOGS INNERCIRCLE
            </div>
            <p className="font-serif text-xs text-[#ece1cf]/70 leading-relaxed">
              Every coin is minted in polished gold and engraved with the holder’s name. A lifelong key to Nagpur’s most intimate private nights.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => openOverlay('coin')}
              className="w-full py-4 bg-[#cbb074] text-[#141414] font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#f3e0ac] transition-all cursor-pointer rounded-sm shadow-xl"
            >
              Request Your Coin ↗
            </button>

            <button
              onClick={() => openOverlay('concierge')}
              className="w-full py-3 bg-transparent border border-[#cbb074]/40 text-[#cbb074] font-mono text-xs tracking-[0.15em] uppercase hover:border-[#cbb074] transition-colors cursor-pointer rounded-sm"
            >
              Consult Goldie (Concierge) ✦
            </button>
          </div>

          {/* Email with Copy */}
          <div className="pt-4 border-t border-[#ece1cf]/10 flex items-center justify-between font-mono text-xs">
            <button
              onClick={copyEmail}
              className="hover:text-[#cbb074] transition-colors cursor-pointer text-left"
            >
              <span className="block text-[10px] text-[#ece1cf]/40 uppercase">Direct Concierge</span>
              <span className="text-[#f3e0ac]">{siteConfig.email}</span>
            </button>
            <span className="text-[10px] text-[#cbb074]">
              {copied ? 'COPIED ✓' : 'CLICK TO COPY'}
            </span>
          </div>
        </div>

        {/* Global Footer (Part 9.4 & Part 13 S07) */}
        <footer className="pointer-events-auto border-t border-[#ece1cf]/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-[#ece1cf]/60">
          <div>
            © 2026 UNDERDOGS INNERCIRCLE · NAGPUR, INDIA
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#cbb074] transition-colors"
            >
              @underdogsinnercircle ↗
            </a>
            <a
              href={siteConfig.socials.instagramMain}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#cbb074] transition-colors hidden md:inline"
            >
              @underdogs_nagpur ↗
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-[#cbb074] transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
