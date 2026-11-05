'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, ExternalLink, Eye, Smartphone } from 'lucide-react';
import { ProjectSummary } from '@/types/project';
import { EngagementBadge } from '@/components/ui/EngagementBadge';
import { VideoModal } from '@/components/ui/VideoModal';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export function FeaturedProjectsSection({ projects }: { projects: ProjectSummary[] }) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  if (!projects || projects.length === 0) return null;

  // The primary highlighted project gets the premier cinematic bento hero card
  const heroProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
            <span>Engineering Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Featured Production Systems
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
            Highlighting core deployments across Bluetooth Low Energy mobile apps, distributed load engines, and enterprise backends.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors shrink-0"
        >
          Browse All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 1. Premier Hero Bento Card */}
      {heroProject && (
        <div className="group relative rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-zinc-900 shadow-xl transition-all duration-300 hover:border-accent/50 hover:shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Media Preview */}
            <div className="relative aspect-video lg:aspect-auto lg:col-span-7 overflow-hidden bg-zinc-950 min-h-[300px] lg:min-h-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroProject.thumbnail}
                alt={heroProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />

              {/* Floating Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <EngagementBadge
                  type={heroProject.company.engagementType}
                  companyName={heroProject.company.name}
                  className="backdrop-blur-md bg-black/60 text-white border-white/20 shadow-md"
                />
                {heroProject.topMetric && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground font-mono shadow-lg backdrop-blur-md">
                    ⚡ {heroProject.topMetric.value}
                  </span>
                )}
              </div>

              {/* Video Walkthrough Trigger */}
              {heroProject.links.videoUrl && (
                <button
                  onClick={() => setActiveVideo({ url: heroProject.links.videoUrl!, title: heroProject.title })}
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground text-xs font-semibold shadow-xl transition-all transform hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Watch Video Walkthrough
                </button>
              )}
            </div>

            {/* Information & Architecture Spec */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white dark:bg-zinc-900/90">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-mono uppercase tracking-wider text-accent font-semibold">
                    {heroProject.category}
                  </span>
                  <span>{heroProject.company.duration}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors leading-tight">
                  <Link href={`/projects/${heroProject.slug}`}>
                    {heroProject.title}
                  </Link>
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {heroProject.subtitle}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {heroProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/60 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {heroProject.links.liveUrl && (
                    <a
                      href={heroProject.links.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                      title="Visit Live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {heroProject.links.playStoreUrl && (
                    <a
                      href={heroProject.links.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors"
                      title="Google Play Store"
                    >
                      <Smartphone className="w-4 h-4" />
                    </a>
                  )}
                  {heroProject.links.githubUrl && (
                    <a
                      href={heroProject.links.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <Link
                  href={`/projects/${heroProject.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs font-semibold transition-all shadow-md"
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Secondary Featured Cards Grid */}
      {secondaryProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {secondaryProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-accent/40 dark:hover:border-zinc-700 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <EngagementBadge
                    type={project.company.engagementType}
                    companyName={project.company.name}
                    className="backdrop-blur-md bg-black/60 text-white border-white/20 shadow-md"
                  />
                  {project.topMetric && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground font-mono shadow-md backdrop-blur-md">
                      ⚡ {project.topMetric.value}
                    </span>
                  )}
                </div>

                {project.links.videoUrl && (
                  <button
                    onClick={() => setActiveVideo({ url: project.links.videoUrl!, title: project.title })}
                    className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-accent-foreground text-xs font-semibold shadow-lg transition-transform transform hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Watch Demo
                  </button>
                )}

                <Link
                  href={`/projects/${project.slug}`}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-medium border border-white/20 backdrop-blur-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-300" />
                  Case Study
                </Link>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-mono uppercase tracking-wider text-accent font-semibold">
                      {project.category}
                    </span>
                    <span>{project.company.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors mb-2 line-clamp-1">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                    {project.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/50"
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
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.links.liveUrl && (
                      <a
                        href={project.links.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                        title="Live Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.linkedInUrl && (
                      <a
                        href={project.links.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-zinc-100 hover:bg-blue-50 dark:bg-zinc-800 dark:hover:bg-blue-900/40 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="LinkedIn Post"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline group/link"
                  >
                    Deep Dive
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
        />
      )}
    </section>
  );
}
