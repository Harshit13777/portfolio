'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Play,
  ArrowRight,
  ExternalLink,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ProjectSummary, ProjectDetail } from '@/types/project';
import { EngagementBadge } from '@/components/ui/EngagementBadge';
import { VideoModal } from '@/components/ui/VideoModal';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import projectsJson from '@/data/projects.json';

// Pre-index full case study data so architecture points are accessible in the quick-view
const projectDetailsMap = new Map<string, ProjectDetail>();
(projectsJson as unknown as ProjectDetail[]).forEach((p) => {
  projectDetailsMap.set(p.slug, p);
});

const CATEGORY_TABS = [
  { id: 'all', label: 'All Featured', icon: Layers },
  { id: 'mobile', label: 'Mobile & BLE', icon: Smartphone },
  { id: 'iot', label: 'IoT & Telemetry', icon: Cpu },
  { id: 'automation', label: 'Automation & Cloud', icon: Zap },
];

/**
 * 3D Perspective Tilt Card with Mouse-Following Ambient Spotlight
 */
function InteractiveProjectSpotlight({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physical springs for responsive 3D tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 300,
    damping: 30,
  });

  const [mousePixelPos, setMousePixelPos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    setMousePixelPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setMousePixelPos(null);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`relative overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-accent/10 ${className}`}
    >
      {/* Ambient Radial Spotlight following Cursor */}
      {isHovered && mousePixelPos && (
        <div
          className="pointer-events-none absolute -inset-px opacity-30 dark:opacity-40 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(420px circle at ${mousePixelPos.x}px ${mousePixelPos.y}px, var(--accent), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-20 h-full flex flex-col justify-between">{children}</div>
    </motion.div>
  );
}

export function FeaturedProjectsSection({ projects }: { projects: ProjectSummary[] }) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [expandedArchitecture, setExpandedArchitecture] = useState<Record<string, boolean>>({});

  const toggleArchitecture = (slug: string) => {
    setExpandedArchitecture((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  if (!projects || projects.length === 0) return null;

  const heroProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors shrink-0 self-start sm:self-auto"
        >
          Browse All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 1. Premier Hero Bento Card with 3D Spotlight */}
      <AnimatePresence mode="wait">
        {heroProject && (
          <motion.div
            key={`hero-${heroProject.id}`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="w-full"
          >
            <InteractiveProjectSpotlight className="border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/95 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Media Preview */}
                <div className="relative aspect-video lg:aspect-auto lg:col-span-7 overflow-hidden bg-zinc-950 min-h-[300px] lg:min-h-[460px] group/media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroProject.thumbnail}
                    alt={heroProject.title}
                    className="w-full h-full object-cover group-hover/media:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950/95 via-zinc-950/50 to-transparent" />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    <EngagementBadge
                      type={heroProject.company.engagementType}
                      companyName={heroProject.company.name}
                      className="backdrop-blur-md bg-black/70 text-white border-white/20 shadow-md"
                    />
                    {heroProject.topMetric && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-accent text-accent-foreground font-mono shadow-lg backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        <span>{heroProject.topMetric.value}</span>
                      </span>
                    )}
                  </div>

                  {/* Video Walkthrough Trigger with Pulsing Radar Ring */}
                  {heroProject.links.videoUrl && (
                    <div className="absolute bottom-4 left-4 z-10">
                      <button
                        onClick={() =>
                          setActiveVideo({
                            url: heroProject.links.videoUrl!,
                            title: heroProject.title,
                          })
                        }
                        className="group/btn relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold shadow-xl transition-all hover:scale-105 cursor-pointer"
                      >
                        <span className="absolute -inset-1 rounded-xl bg-accent/40 animate-ping pointer-events-none" />
                        <Play className="relative w-3.5 h-3.5 fill-current" />
                        <span className="relative">Watch Video Demo</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Information & Architecture Spec */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white dark:bg-zinc-900/90 space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        {heroProject.category}
                      </span>
                      <span className="font-mono">{heroProject.company.duration}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-accent transition-colors leading-tight">
                      <Link href={`/projects/${heroProject.slug}`}>
                        {heroProject.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {heroProject.subtitle}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {heroProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/60 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* In-Place Architecture Spec Quick-View */}
                    {projectDetailsMap.get(heroProject.slug)?.caseStudy?.architecturePoints && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => toggleArchitecture(heroProject.slug)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline cursor-pointer"
                        >
                          <span>System Architecture Spec</span>
                          {expandedArchitecture[heroProject.slug] ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedArchitecture[heroProject.slug] && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 overflow-hidden"
                            >
                              {projectDetailsMap
                                .get(heroProject.slug)
                                ?.caseStudy.architecturePoints.slice(0, 3)
                                .map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{point}</span>
                                  </li>
                                ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs font-bold transition-all shadow-md group/arrow"
                    >
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </InteractiveProjectSpotlight>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Secondary Featured Cards Grid with Staggered 3D Tilt */}
      {secondaryProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {secondaryProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 20,
                delay: idx * 0.1,
              }}
              className="h-full"
            >
              <InteractiveProjectSpotlight className="border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 h-full">
                {/* Media Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 group/thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/thumb:scale-108 transition-transform duration-600"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <EngagementBadge
                      type={project.company.engagementType}
                      companyName={project.company.name}
                      className="backdrop-blur-md bg-black/70 text-white border-white/20 shadow-md"
                    />
                    {project.topMetric && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-accent text-accent-foreground font-mono shadow-md backdrop-blur-md">
                        ⚡ {project.topMetric.value}
                      </span>
                    )}
                  </div>

                  {project.links.videoUrl && (
                    <button
                      onClick={() =>
                        setActiveVideo({
                          url: project.links.videoUrl!,
                          title: project.title,
                        })
                      }
                      className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-accent-foreground text-xs font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer z-10"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Watch Demo
                    </button>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-mono uppercase tracking-wider text-accent font-semibold">
                        {project.category}
                      </span>
                      <span className="font-mono">{project.company.duration}</span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-accent transition-colors line-clamp-1">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/50 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800/40 text-zinc-500 font-mono">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline group/link"
                    >
                      Deep Dive
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </InteractiveProjectSpotlight>
            </motion.div>
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
