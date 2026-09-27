'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 text-center bg-[#050505] text-[#ece1cf] relative z-20">
      <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase mb-4">
        (10) SCATTERED FIELD
      </div>
      <h1 className="font-['Cinzel'] text-6xl sm:text-8xl font-black text-[#f3e0ac] tracking-widest mb-4">
        404
      </h1>
      <p className="font-serif text-lg sm:text-xl text-[#ece1cf]/80 max-w-md mb-8">
        This part of the field hasn't been built.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#cbb074] text-[#141414] font-mono text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#f3e0ac] transition-all"
      >
        Back to the start →
      </Link>
    </div>
  );
}
