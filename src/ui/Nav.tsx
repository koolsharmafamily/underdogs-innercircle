'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/state/store';
import { getLenis } from '@/motion/clock';
import { siteConfig } from '@content/site';
import { SoundToggle } from './SoundToggle';

export function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const currentScene = useAppStore((s) => s.currentScene);
  const openOverlay = useAppStore((s) => s.openOverlay);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const motionEnabled = useAppStore((s) => s.motionEnabled);
  const setMotionEnabled = useAppStore((s) => s.setMotionEnabled);
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  const isLightScene = currentScene === 'capabilities';

  const handleBrandClick = () => {
    if (pathname !== '/') {
      router.push('/');
    } else {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.6 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'vault' ? 'aegean' : 'vault';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const toggleMotion = () => {
    const nextMotion = !motionEnabled;
    setMotionEnabled(nextMotion);
    setReducedMotion(!nextMotion);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between transition-colors duration-500 pointer-events-auto text-[#ece1cf]"
    >
      {/* Brand Wordmark / Emblem (Click = Back to Top or Home) */}
      <button
        onClick={handleBrandClick}
        className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        aria-label="Underdogs Innercircle — Back to top"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden relative border border-[#cbb074] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-[0_0_15px_rgba(203,176,116,0.3)] flex-shrink-0 bg-[#050505]">
          <Image
            src="/brand/logo.jpg"
            alt="Underdogs Gold Coin Emblem"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-['Cinzel'] tracking-[0.22em] text-xs md:text-sm font-bold uppercase ic-gold-text">
            UNDERDOGS
          </span>
          <span className="text-[9px] tracking-[0.24em] font-mono text-[#cbb074] uppercase">
            INNERCIRCLE
          </span>
        </div>
      </button>

      {/* Nav Controls */}
      <nav className="flex items-center gap-4 sm:gap-7 font-mono text-[11px] tracking-[0.12em] uppercase">
        <button
          onClick={() => openOverlay('index')}
          className="hover:text-[#cbb074] transition-colors cursor-pointer"
        >
          The Nights
        </button>

        <button
          onClick={toggleTheme}
          className="hover:text-[#cbb074] transition-colors cursor-pointer hidden md:inline"
          title="Switch Theme: Vault Black / Aegean Island"
        >
          {theme === 'vault' ? 'Aegean' : 'Vault'}
        </button>

        <SoundToggle className="hidden md:inline-flex opacity-80" />

        <button
          onClick={() => openOverlay('menu')}
          className="hover:text-[#cbb074] transition-colors cursor-pointer px-2.5 py-1 border border-current rounded-sm"
        >
          Menu
        </button>

        {/* Primary CTA */}
        <button
          onClick={() => openOverlay('coin')}
          className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 bg-[#cbb074] text-[#141414] font-semibold tracking-[0.15em] rounded-sm hover:bg-[#f3e0ac] transition-all cursor-pointer text-[11px]"
        >
          Request Coin ↗
        </button>
      </nav>
    </header>
  );
}
