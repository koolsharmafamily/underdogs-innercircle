'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/state/store';
import { scenes } from '@content/scenes';
import { siteConfig } from '@content/site';
import { getLenis } from '@/motion/clock';

export function Menu() {
  const overlay = useAppStore((s) => s.overlay);
  const closeOverlay = useAppStore((s) => s.closeOverlay);
  const currentScene = useAppStore((s) => s.currentScene);
  const setShutterProgress = useAppStore((s) => s.setShutterProgress);
  const openOverlay = useAppStore((s) => s.openOverlay);

  const isOpen = overlay === 'menu';

  // Slat shutter animation trigger (Part 13 S09)
  useEffect(() => {
    if (isOpen) {
      setShutterProgress(1.0);
    } else {
      setShutterProgress(0.0);
    }
  }, [isOpen, setShutterProgress]);

  // Escape key handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeOverlay();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeOverlay]);

  if (!isOpen) return null;

  const navigateTo = (sceneId: string) => {
    closeOverlay();
    const el = document.getElementById(sceneId);
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
    <div
      className="fixed inset-0 z-50 bg-[#050505]/92 backdrop-blur-md flex flex-col justify-between p-8 md:p-16 text-[#ece1cf] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#ece1cf]/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#cbb074]" />
          <span className="font-['Cinzel'] tracking-[0.25em] text-xs font-semibold uppercase">
            UNDERDOGS INNERCIRCLE
          </span>
        </div>
        <button
          onClick={closeOverlay}
          className="font-mono text-xs text-[#cbb074] hover:text-[#f3e0ac] tracking-[0.18em] uppercase border border-[#cbb074]/30 px-3.5 py-1.5 rounded-sm cursor-pointer"
        >
          Close [Esc] ✕
        </button>
      </div>

      {/* Main Scene Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-10">
        <div className="lg:col-span-8 flex flex-col gap-5">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#cbb074] uppercase">
            CHAPTERS OF THE CIRCLE
          </span>
          <nav className="flex flex-col gap-2">
            {scenes.map((s, idx) => {
              const isActive = currentScene === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => navigateTo(s.id)}
                  className="group flex items-center justify-between text-left py-2.5 border-b border-[#ece1cf]/10 hover:border-[#cbb074] transition-colors cursor-pointer"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#cbb074]/60 group-hover:text-[#cbb074]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-['Cinzel'] text-xl sm:text-2xl md:text-3xl tracking-[0.08em] font-medium group-hover:translate-x-2 transition-transform duration-300">
                      {s.title}
                    </span>
                  </div>
                  {isActive && (
                    <span className="font-mono text-[10px] text-[#cbb074] uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cbb074] animate-ping" />
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Secondary Info Column */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-8 border-l border-[#ece1cf]/10 lg:pl-10">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-full relative overflow-hidden border border-[#cbb074] shadow-lg bg-[#050505]">
              <Image
                src="/brand/logo.jpg"
                alt="Underdogs Gold Coin Medallion"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#cbb074] uppercase">
              THE CONCIERGE & ACCESS
            </span>
            <p className="font-serif text-sm text-[#ece1cf]/70 leading-relaxed">
              Underdogs Innercircle is the invite-only sanctuary of Underdogs Entertainment, Nagpur. Every night is an unrepeatable cinematic experience.
            </p>
            <button
              onClick={() => {
                closeOverlay();
                openOverlay('coin');
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#cbb074] text-[#141414] font-semibold text-xs font-mono tracking-[0.15em] uppercase hover:bg-[#f3e0ac] transition-all cursor-pointer rounded-sm"
            >
              Request Your Coin ↗
            </button>
          </div>

          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="text-[10px] tracking-[0.25em] text-[#cbb074] uppercase">
              DIRECT CHANNELS
            </span>
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
              className="hover:text-[#cbb074] transition-colors"
            >
              @underdogs_nagpur (Main) ↗
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-[#cbb074] transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-[10px] font-mono opacity-50 border-t border-[#ece1cf]/10 pt-4">
        <span>NAGPUR, INDIA · CENTRAL REPOSITORY</span>
        <span>© 2026 UNDERDOGS ENTERTAINMENT</span>
      </div>
    </div>
  );
}
