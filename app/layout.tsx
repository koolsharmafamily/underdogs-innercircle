import type { Metadata } from 'next';
import { Cinzel, EB_Garamond, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/ui/Providers';
import { Nav } from '@/ui/Nav';
import { SceneTicks } from '@/ui/SceneTicks';
import { Cursor } from '@/ui/Cursor';
import { DomLoader } from '@/ui/DomLoader';
import { Overlays } from '@/ui/Overlays';
import { Experience } from '@/webgl/Experience';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Underdogs Innercircle — Different worlds. Same coin.',
  description:
    'The private, invite-only sanctuary of Underdogs Entertainment, Nagpur. Curated nights, unrepeatable worlds, one golden currency.',
  openGraph: {
    title: 'Underdogs Innercircle — Different worlds. Same coin.',
    description:
      'The private, invite-only sanctuary of Underdogs Entertainment, Nagpur.',
    images: ['/brand/launch-post.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="vault"
      className={`${cinzel.variable} ${ebGaramond.variable} ${inter.variable}`}
    >
      <body className="bg-[#141414] text-[#ece1cf] selection:bg-[#cbb074] selection:text-[#141414]">
        {/* Skip link for keyboard accessibility (Part 9.2 & Part 9.5) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#cbb074] text-[#141414] font-mono text-xs font-bold uppercase rounded-sm"
        >
          Skip to main content
        </a>

        {/* Global animated film grain overlay (Part 2.4 & V16) */}
        <div className="film-grain" aria-hidden="true" />

        <Providers>
          {/* Server/Client First-Light DOM Loader (S00) */}
          <DomLoader />

          {/* Persistent Three.js Canvas Scene */}
          <Experience />

          {/* Persistent UI elements */}
          <Nav />
          <SceneTicks />
          <Cursor />
          <Overlays />

          {/* Semantic DOM Main Document */}
          <div id="main-content" className="relative z-10">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
