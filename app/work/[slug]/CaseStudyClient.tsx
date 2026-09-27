'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@content/projects';
import { useAppStore } from '@/state/store';
import { sound } from '@/audio/sound';

interface Props {
  project: Project;
  nextProject: Project;
}

export function CaseStudyClient({ project, nextProject }: Props) {
  const setWorldMode = useAppStore((s) => s.setWorldMode);
  const openOverlay = useAppStore((s) => s.openOverlay);

  useEffect(() => {
    setWorldMode('case');
    window.scrollTo(0, 0);
    return () => {
      setWorldMode('home');
    };
  }, [setWorldMode]);

  return (
    <div className="relative min-h-screen text-[#ece1cf] selection:bg-[#cbb074] selection:text-[#050505] pb-32">
      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 md:pt-40">
        {/* Breadcrumb back navigation */}
        <div className="mb-10 flex items-center justify-between border-b border-[#ece1cf]/10 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[#cbb074] hover:text-[#f3e0ac] transition-colors"
            onClick={() => sound?.playTick(1.0)}
          >
            <span>← Back to Monument</span>
          </Link>
          <button
            onClick={() => openOverlay('index')}
            className="font-mono text-xs tracking-[0.16em] uppercase hover:text-[#cbb074] transition-colors cursor-pointer text-[#ece1cf]/70"
          >
            The Nights Archive (5)
          </button>
        </div>
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#cbb074]" />
            <span>Underdogs Innercircle · Nocturne {project.year}</span>
          </div>

          <h1 className="font-['Cinzel'] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f3e0ac] mb-8 leading-[1.05]">
            {project.title}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#ece1cf]/90 font-light leading-relaxed max-w-3xl mb-12">
            {project.summary}
          </p>

          {/* Dossier Meta Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-[#ece1cf]/15 font-mono text-xs">
            <div>
              <span className="block text-[10px] text-[#cbb074] uppercase tracking-[0.2em] mb-1">
                Curator / Lineup
              </span>
              <span className="text-[#ece1cf]/90">{project.curator}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#cbb074] uppercase tracking-[0.2em] mb-1">
                Date & Gathering
              </span>
              <span className="text-[#ece1cf]/90">{project.date}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#cbb074] uppercase tracking-[0.2em] mb-1">
                Secret Venue
              </span>
              <span className="text-[#ece1cf]/90">{project.venue}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#cbb074] uppercase tracking-[0.2em] mb-1">
                Dress Code
              </span>
              <span className="text-[#ece1cf]/90">{project.dressCode}</span>
            </div>
          </div>
        </header>

        {/* Hero Slat Feature Media */}
        <section className="mb-20">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-[#cbb074]/30 group shadow-2xl">
            {/* Louver slat overlay effect */}
            <div className="absolute inset-0 grid grid-cols-12 pointer-events-none z-10 opacity-30 group-hover:opacity-10 transition-opacity duration-700">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-[#050505]/60 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
              ))}
            </div>

            <Image
              src={project.cover.src}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              priority
            />

            <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] uppercase tracking-[0.2em] bg-[#050505]/80 px-3 py-1.5 backdrop-blur-sm border border-[#cbb074]/20 text-[#cbb074]">
              Audio Signature: {project.sound}
            </div>
          </div>
        </section>

        {/* Editorial Blocks */}
        <section className="space-y-20 mb-28">
          {project.blocks.map((block, idx) => {
            if (block.type === 'text') {
              return (
                <div key={idx} className="max-w-2xl font-serif text-lg leading-relaxed text-[#ece1cf]/85">
                  <p>{block.content}</p>
                </div>
              );
            }

            if (block.type === 'image' && block.images?.[0]) {
              return (
                <div key={idx} className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[#ece1cf]/10">
                  <Image
                    src={block.images[0]}
                    alt={`${project.title} scene ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            }

            if (block.type === 'twoUp' && block.images && block.images.length >= 2) {
              return (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {block.images.slice(0, 2).map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-[#ece1cf]/10">
                      <Image
                        src={img}
                        alt={`${project.title} detail ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              );
            }

            if (block.type === 'quote') {
              return (
                <blockquote key={idx} className="my-16 pl-8 border-l-2 border-[#cbb074] max-w-3xl">
                  <p className="font-serif italic text-2xl md:text-3xl text-[#f3e0ac] mb-4 leading-snug">
                    "{block.content}"
                  </p>
                  <footer className="font-mono text-xs tracking-[0.18em] uppercase text-[#cbb074]">
                    — {block.author} <span className="opacity-60">({block.role})</span>
                  </footer>
                </blockquote>
              );
            }

            if (block.type === 'credits' && block.items) {
              return (
                <div key={idx} className="p-8 bg-[#141414]/70 border border-[#ece1cf]/10 rounded-sm">
                  <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#cbb074] mb-6">
                    Production & Curatorial Credits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
                    {block.items.map((item, i) => (
                      <div key={i}>
                        <span className="block text-[10px] text-[#ece1cf]/50 uppercase tracking-widest mb-1">
                          {item.label}
                        </span>
                        <span className="text-[#ece1cf] font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </section>

        {/* Next Project Descent (Part 13 A29) */}
        <section className="pt-16 border-t border-[#ece1cf]/15">
          <div className="font-mono text-xs text-[#cbb074] tracking-[0.25em] uppercase mb-4">
            Next Curated Night →
          </div>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group block p-8 md:p-12 bg-[#141414] hover:bg-[#1a1816] border border-[#cbb074]/30 hover:border-[#cbb074] transition-all duration-500 rounded-sm"
            onClick={() => sound?.playTick(1.2)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs text-[#ece1cf]/60 uppercase tracking-[0.18em] block mb-2">
                  {nextProject.discipline} · {nextProject.year}
                </span>
                <h3 className="font-['Cinzel'] text-3xl md:text-5xl font-bold text-[#ece1cf] group-hover:text-[#f3e0ac] transition-colors">
                  {nextProject.title}
                </h3>
              </div>
              <div className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#cbb074] group-hover:translate-x-2 transition-transform duration-300">
                View Dossier →
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
