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
      className="fixed inset-0 z-50 bg-[#080706]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 text-[#EDE2D0] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#C8B08A]/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8B08A]" />
          <span className="font-['Cinzel'] tracking-[0.25em] text-xs font-medium uppercase text-[#EDE2D0]">
            UNDERDOGS INNERCIRCLE
          </span>
        </div>
        <button
          onClick={closeOverlay}
          className="font-mono text-xs text-[#C8B08A] hover:text-[#EDE2D0] tracking-[0.18em] uppercase border border-[#C8B08A]/30 hover:border-[#C8B08A]/60 px-3.5 py-1.5 transition-colors cursor-pointer"
        >
          Close [Esc] ✕
        </button>
      </div>

      {/* Main Scene Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-10">
        <div className="lg:col-span-8 flex flex-col gap-5">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#8E7B62] uppercase">
            CHAPTERS OF THE CIRCLE
          </span>
          <nav className="flex flex-col gap-2">
            {scenes.map((s, idx) => {
              const isActive = currentScene === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => navigateTo(s.id)}
                  className="group flex items-center justify-between text-left py-2.5 border-b border-[#EDE2D0]/10 hover:border-[#C8B08A]/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#8E7B62] group-hover:text-[#C8B08A] transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-['Cinzel'] text-xl sm:text-2xl md:text-3xl tracking-[0.08em] font-normal text-[#EDE2D0]/90 group-hover:text-[#EDE2D0] group-hover:translate-x-2 transition-all duration-300">
                      {s.title}
                    </span>
                  </div>
                  {isActive && (
                    <span className="font-mono text-[10px] text-[#C8B08A] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8B08A]" />
                      Current
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Secondary Info Column */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-8 border-l border-[#C8B08A]/15 lg:pl-10">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-full relative overflow-hidden border border-[#C8B08A]/35 shadow-xl bg-[#080706]">
              <Image
                src="/brand/logo.jpg"
                alt="Underdogs Medallion"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#8E7B62] uppercase">
              THE CONCIERGE & ACCESS
            </span>
            <p className="font-serif text-sm text-[#EDE2D0]/70 leading-relaxed font-light">
              Underdogs Innercircle is the invite-only sanctuary of Underdogs Entertainment, Nagpur. Every night is an unrepeatable cinematic experience.
            </p>
            <button
              onClick={() => {
                closeOverlay();
                openOverlay('coin');
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#C8B08A] text-[#080706] font-medium text-xs font-mono tracking-[0.18em] uppercase hover:bg-[#EDE2D0] transition-colors cursor-pointer"
            >
              Request Medallion ↗
            </button>
          </div>

          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="text-[10px] tracking-[0.25em] text-[#8E7B62] uppercase">
              DIRECT CHANNELS
            </span>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-[#EDE2D0]/75 hover:text-[#C8B08A] transition-colors"
            >
              @underdogsinnercircle ↗
            </a>
            <a
              href={siteConfig.socials.instagramMain}
              target="_blank"
              rel="noreferrer"
              className="text-[#EDE2D0]/75 hover:text-[#C8B08A] transition-colors"
            >
              @underdogs_nagpur (Main) ↗
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[#EDE2D0]/75 hover:text-[#C8B08A] transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-[10px] font-mono text-[#8E7B62] border-t border-[#C8B08A]/15 pt-4">
        <span>NAGPUR, INDIA · CENTRAL REPOSITORY</span>
        <span>© 2026 UNDERDOGS ENTERTAINMENT</span>
      </div>
    </div>
  );
}
