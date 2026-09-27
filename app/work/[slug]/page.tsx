import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@content/projects';
import { CaseStudyClient } from './CaseStudyClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Case Study | Underdogs Innercircle' };

  return {
    title: `${project.title} — Underdogs Innercircle`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Underdogs Innercircle`,
      description: project.summary,
      images: [project.cover.src],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return <CaseStudyClient project={project} nextProject={nextProject} />;
}
