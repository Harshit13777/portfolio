'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Play, ArrowRight, Smartphone, Eye } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { ProjectSummary, ProjectDetail } from '@/types/project';
import { EngagementBadge } from './EngagementBadge';
import { VideoModal } from './VideoModal';

interface Props {
  project: ProjectSummary | ProjectDetail;
  featuredHighlight?: boolean;
}

export function ProjectCard({ project, featuredHighlight = false }: Props) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const topMetric = project.topMetric || 
    ('caseStudy' in project ? (project as ProjectDetail).caseStudy?.results?.[0] : undefined);

  return (
    <>
      <div 
        className={`group flex flex-col bg-white dark:bg-zinc-900/70 hover:bg-zinc-50/50 dark:hover:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-emerald-500/40 dark:hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 ${
          featuredHighlight ? 'ring-1 ring-emerald-500/30' : ''
        }`}
      >
        {/* Media Thumbnail Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <EngagementBadge
              type={project.company.engagementType}
              companyName={project.company.name}
              className="backdrop-blur-md bg-black/60 text-white border-white/20 shadow-md"
            />
            {topMetric && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/90 text-zinc-950 font-mono shadow-md backdrop-blur-md">
                ⚡ {topMetric.value}
              </span>
            )}
          </div>

          {/* Quick Video Trigger Overlay */}
          {project.links.videoUrl && (
            <button
              onClick={() => setIsVideoOpen(true)}
              className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold shadow-lg transition-transform transform hover:scale-105 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Watch Demo
            </button>
          )}

          {/* Quick Case Study Link in Top Corner */}
          <Link
            href={`/projects/${project.slug}`}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-medium border border-white/20 backdrop-blur-md transition-colors shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-300" />
            Case Study
          </Link>
        </div>

        {/* Card Body */}
        <div className="flex-1 flex flex-col p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              {project.category}
            </span>
            <span>{project.company.duration}</span>
          </div>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
            {project.subtitle}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/50"
              >
                {tech}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800/40 text-zinc-500">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Footer Action Links */}
          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {project.links.liveUrl && (
                <a
                  href={project.links.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Demo"
                  title="Live Demo"
                  className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.links.linkedInUrl && (
                <a
                  href={project.links.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Post"
                  title="LinkedIn Post"
                  className="p-2 rounded-lg bg-zinc-100 hover:bg-blue-50 dark:bg-zinc-800 dark:hover:bg-blue-900/40 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {project.links.playStoreUrl && (
                <a
                  href={project.links.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Play Store"
                  title="Play Store"
                  className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Smartphone className="w-4 h-4" />
                </a>
              )}
              {project.links.githubUrl && (
                <a
                  href={project.links.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                  title="Source Code"
                  className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 group/link transition-colors"
            >
              Deep Dive
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal Trigger */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={project.links.videoUrl}
        title={project.title}
      />
    </>
  );
}
