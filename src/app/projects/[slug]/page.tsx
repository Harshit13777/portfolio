import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ExternalLink, 
  Smartphone, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Play
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { 
  getAllProjectSlugs, 
  getProjectBySlug, 
  getAdjacentProjects 
} from '@/lib/projects.service';
import { EngagementBadge } from '@/components/ui/EngagementBadge';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found | Harshit Soni' };
  }

  return {
    title: `${project.title} - Case Study | Harshit Soni`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} - Engineering Case Study`,
      description: project.subtitle,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(slug);

  const isVideoEmbed = project.links.videoUrl && (
    project.links.videoUrl.includes('youtube.com') ||
    project.links.videoUrl.includes('youtu.be') ||
    project.links.videoUrl.includes('loom.com')
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Projects & Studies
        </Link>
      </div>

      {/* Header Block */}
      <div className="space-y-6 border-b border-zinc-200 dark:border-zinc-800 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <EngagementBadge
            type={project.company.engagementType}
            companyName={project.company.name}
          />
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            {project.company.duration}
          </span>
          {project.company.location && (
            <span className="text-xs text-zinc-500">• {project.company.location}</span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          {project.subtitle}
        </p>

        {/* Action Link Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.links.liveUrl && (
            <a
              href={project.links.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 text-xs font-semibold shadow-md transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Live Production
            </a>
          )}
          {project.links.linkedInUrl && (
            <a
              href={project.links.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 dark:bg-zinc-900 dark:hover:bg-blue-950 text-zinc-700 hover:text-blue-600 dark:text-zinc-200 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold transition-colors shadow-xs"
            >
              <LinkedinIcon className="w-4 h-4" />
              View on LinkedIn
            </a>
          )}
          {project.links.playStoreUrl && (
            <a
              href={project.links.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold transition-colors shadow-xs"
            >
              <Smartphone className="w-4 h-4" />
              Google Play Store
            </a>
          )}
          {project.links.githubUrl ? (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold transition-colors shadow-xs"
            >
              <GithubIcon className="w-4 h-4" />
              Source Code
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
              🔒 Proprietary Enterprise Code
            </span>
          )}
        </div>
      </div>

      {/* Quantified Metrics Ribbon */}
      {project.caseStudy.results && project.caseStudy.results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
          {project.caseStudy.results.map((result, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {result.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{result.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Video Walkthrough Embed (If Available) */}
      {project.links.videoUrl && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-200">
            <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-current" />
            <span>Interactive Video Demo & Walkthrough</span>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            {isVideoEmbed ? (
              <iframe
                src={project.links.videoUrl}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={project.links.videoUrl}
                controls
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </section>
      )}

      {/* Problem & Challenge */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            <Layers className="w-4 h-4" />
            <span>Problem Context</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">The Problem</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.caseStudy.overview}
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Engineering Obstacles</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">The Technical Challenge</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.caseStudy.challenge}
          </p>
        </div>
      </section>

      {/* Solution & System Architecture */}
      <section className="space-y-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            Technical Implementation
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            System Architecture & Solution
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.caseStudy.solution}
          </p>
        </div>

        {/* Architecture Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {project.caseStudy.architecturePoints.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80"
            >
              <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Highlights */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Engineering Highlights</h2>
        <div className="space-y-3">
          {project.caseStudy.engineeringHighlights.map((highlight, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900/30 border border-zinc-200/90 dark:border-zinc-800 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies Used */}
      <section className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
          Technologies & Tools Leveraged
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Client Testimonial (if present) */}
      {project.testimonial && (
        <section className="pt-4">
          <TestimonialCard
            testimonial={project.testimonial}
            projectName={project.title}
          />
        </section>
      )}

      {/* Bottom Prev / Next Navigation */}
      <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-colors max-w-xs"
          >
            <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Previous Case Study
            </span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate w-full">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="flex flex-col items-end gap-1 p-4 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-right transition-colors max-w-xs"
          >
            <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
              Next Case Study <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate w-full">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
