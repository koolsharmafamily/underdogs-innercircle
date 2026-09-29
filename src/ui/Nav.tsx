'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/state/store';
import { getLenis } from '@/motion/clock';
import { SoundToggle } from './SoundToggle';

export function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const openOverlay = useAppStore((s) => s.openOverlay);

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between transition-colors duration-500 pointer-events-auto text-[#E8E2D8]"
    >
      {/* Brand Wordmark / Emblem (Click = Back to Top or Home) */}
      <button
        onClick={handleBrandClick}
        className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        aria-label="Underdogs Innercircle — Back to top"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden relative border border-[#C8B08A]/35 group-hover:border-[#C8B08A] transition-colors duration-400 shadow-md flex-shrink-0 bg-[#080706]">
          <Image
            src="/brand/logo.jpg"
            alt="Underdogs Gold Coin Emblem"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-['Cinzel'] tracking-[0.22em] text-xs md:text-sm font-medium uppercase ic-gold-text">
            UNDERDOGS
          </span>
          <span className="text-[9px] tracking-[0.24em] font-mono text-[#C8B08A] uppercase">
            INNERCIRCLE
          </span>
        </div>
      </button>

      {/* Nav Controls */}
      <nav className="flex items-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase">
        <button
          onClick={() => openOverlay('index')}
          className="text-[#E8E2D8]/80 hover:text-[#EDE2D0] transition-colors cursor-pointer"
        >
          The Nights
        </button>

        <SoundToggle className="inline-flex" />

        <button
          onClick={() => openOverlay('menu')}
          className="hover:text-[#EDE2D0] hover:border-[#C8B08A] transition-colors cursor-pointer px-3 py-1.5 border border-[#C8B08A]/25 rounded-[1px] text-[#E8E2D8]"
        >
          Menu
        </button>

        {/* Primary CTA */}
        <button
          onClick={() => openOverlay('coin')}
          className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-[#C8B08A] text-[#080706] font-semibold tracking-[0.18em] rounded-[1px] hover:bg-[#EDE2D0] transition-colors cursor-pointer text-[10px]"
        >
          Request Coin ↗
        </button>
      </nav>
    </header>
  );
}
