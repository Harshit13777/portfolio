'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
} from 'motion/react';
import {
  Wifi,
  Zap,
  Cpu,
  Radio,
  Layers,
  Code2,
  Pause,
  Play,
  Gauge,
  ArrowRight,
  ExternalLink,
  Sparkles,
  X,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import { SkillCategoryTrack, SkillItem } from '@/types/skills';

const typedSkills: SkillCategoryTrack[] = skillsData as SkillCategoryTrack[];

interface ProjectStub {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  thumbnail: string;
  company: {
    name: string;
    role: string;
    duration: string;
  };
  caseStudy?: {
    results?: { label: string; value: string }[];
  };
}

const allProjects: ProjectStub[] = (projectsData as unknown as ProjectStub[]).map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  category: p.category,
  tags: p.tags || [],
  thumbnail: p.thumbnail,
  company: p.company,
  caseStudy: p.caseStudy,
}));

function renderIcon(item: SkillItem) {
  if (item.iconUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.iconUrl}
        alt={item.name}
        className="w-4 h-4 object-contain shrink-0 transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
    );
  }

  const iconColor = item.iconColor || 'currentColor';
  switch (item.fallbackIcon) {
    case 'wifi':
      return <Wifi className="w-4 h-4 shrink-0" style={{ color: iconColor }} />;
    case 'zap':
      return <Zap className="w-4 h-4 shrink-0" style={{ color: iconColor }} />;
    case 'radio':
      return <Radio className="w-4 h-4 shrink-0" style={{ color: iconColor }} />;
    case 'cpu':
      return <Cpu className="w-4 h-4 shrink-0" style={{ color: iconColor }} />;
    case 'layers':
      return <Layers className="w-4 h-4 shrink-0" style={{ color: iconColor }} />;
    default:
      return <Code2 className="w-4 h-4 shrink-0" style={{ color: iconColor }} />;
  }
}

export function SkillsTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2>(1);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [selectedSkillModal, setSelectedSkillModal] = useState<{
    skill: SkillItem;
    category: string;
  } | null>(null);

  // Pre-calculate project linkages for fast lookup
  const skillProjectsMap = useMemo(() => {
    const map = new Map<string, ProjectStub[]>();

    typedSkills.forEach((track) => {
      track.items.forEach((item) => {
        const lowerName = item.name.toLowerCase();
        const matches = allProjects.filter((p) =>
          p.tags.some((t) => {
            const lowerTag = t.toLowerCase();
            return (
              lowerTag === lowerName ||
              lowerTag.includes(lowerName) ||
              lowerName.includes(lowerTag)
            );
          })
        );
        map.set(item.name, matches);
      });
    });

    return map;
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(typedSkills.map((t) => t.category)));
  }, []);

  const baseSpeedSeconds = speedMultiplier === 1 ? 42 : 21;

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSkillModal(null);
    };
    if (selectedSkillModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedSkillModal]);

  const modalProjects = selectedSkillModal
    ? skillProjectsMap.get(selectedSkillModal.skill.name) || []
    : [];

  return (
    <section className="relative w-full py-12 border-y border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-100/50 dark:bg-zinc-900/40 overflow-hidden space-y-6">
      {/* Side Edge Ambient Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent z-20 pointer-events-none" />

      {/* Top Header & Interactive Control Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <h3 className="text-sm sm:text-base font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
              Technical Stack Ecosystem
            </h3>
            <span className="hidden md:inline-flex px-2.5 py-0.5 rounded-full bg-accent-muted text-accent text-[11px] font-mono font-semibold border border-accent-muted">
              Click any skill to view linked projects
            </span>
          </div>

          {/* Interactive HUD Controls (Play/Pause, Speed 1x/2x) */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-accent hover:border-accent transition-colors shadow-xs cursor-pointer"
              title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-accent" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Pause</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-accent hover:border-accent transition-colors shadow-xs cursor-pointer"
              title="Toggle flow velocity"
            >
              <Gauge className="w-3.5 h-3.5 text-accent" />
              <span>{speedMultiplier}x Speed</span>
            </button>
          </div>
        </div>

        {/* Domain Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter(null)}
            className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeCategoryFilter === null
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-accent'
            }`}
          >
            All Tracks
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() =>
                setActiveCategoryFilter((prev) => (prev === cat ? null : cat))
              }
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Categorized Multi-Track Scrollers */}
      <div className="space-y-3.5">
        {typedSkills.map((categoryTrack, rowIdx) => {
          const isCategorySelected =
            activeCategoryFilter === null || activeCategoryFilter === categoryTrack.category;
          const isReverse = categoryTrack.direction === 'right';
          const animationClass = isReverse ? 'animate-marquee-right' : 'animate-marquee-left';

          return (
            <div
              key={categoryTrack.id || rowIdx}
              className={`relative flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-3 transition-opacity duration-500 ${
                isCategorySelected ? 'opacity-100' : 'opacity-25 blur-xs'
              }`}
            >
              {/* Category Sticky Tag (Desktop side tag + Mobile/Tablet inline tag) */}
              <div className="hidden lg:flex shrink-0 items-center justify-end w-48 pr-4 border-r-2 border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                {categoryTrack.category}
              </div>

              {/* Mobile/Tablet Category Indicator */}
              <div className="flex lg:hidden items-center gap-2 px-4 sm:px-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent">
                  {categoryTrack.category}
                </span>
              </div>

              {/* Infinite Running Marquee Track with Motion Hover */}
              <div
                className={`flex overflow-hidden marquee-container w-full ${
                  isPaused ? 'marquee-paused' : ''
                }`}
              >
                <div
                  className={`flex shrink-0 items-center ${animationClass}`}
                  style={{
                    animationDuration: `${baseSpeedSeconds}s`,
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                >
                  {/* Track 1 */}
                  <div className="flex shrink-0 items-center gap-3 pr-3">
                    {categoryTrack.items.map((skill, idx) => {
                      const hasProjects = !!skillProjectsMap.get(skill.name)?.length;
                      return (
                        <button
                          key={`s1-${idx}`}
                          type="button"
                          onClick={() =>
                            setSelectedSkillModal({
                              skill,
                              category: categoryTrack.category,
                            })
                          }
                          className="group relative inline-flex shrink-0 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-xs font-bold text-zinc-900 dark:text-zinc-100 shadow-xs hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 whitespace-nowrap cursor-pointer hover:-translate-y-1"
                        >
                          {renderIcon(skill)}
                          <span>{skill.name}</span>
                          {hasProjects && (
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent group-hover:animate-ping" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Track 2 - Seamless Loop */}
                  <div className="flex shrink-0 items-center gap-3 pr-3">
                    {categoryTrack.items.map((skill, idx) => {
                      const hasProjects = !!skillProjectsMap.get(skill.name)?.length;
                      return (
                        <button
                          key={`s2-${idx}`}
                          type="button"
                          onClick={() =>
                            setSelectedSkillModal({
                              skill,
                              category: categoryTrack.category,
                            })
                          }
                          className="group relative inline-flex shrink-0 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-xs font-bold text-zinc-900 dark:text-zinc-100 shadow-xs hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 whitespace-nowrap cursor-pointer hover:-translate-y-1"
                        >
                          {renderIcon(skill)}
                          <span>{skill.name}</span>
                          {hasProjects && (
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent group-hover:animate-ping" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 Interactive Project Navigator Modal */}
      <AnimatePresence>
        {selectedSkillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkillModal(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 z-10 max-h-[85vh] overflow-y-auto space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 shadow-xs">
                    {renderIcon(selectedSkillModal.skill)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold">
                        {selectedSkillModal.category}
                      </span>
                      <span className="text-zinc-400">•</span>
                      <span className="text-xs text-zinc-500 font-mono">
                        {modalProjects.length} linked project{modalProjects.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      Projects Built With {selectedSkillModal.skill.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSkillModal(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Projects List or Fallback */}
              {modalProjects.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                    Production Case Studies Featuring This Technology:
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    {modalProjects.map((proj) => {
                      const topResult = proj.caseStudy?.results?.[0];
                      return (
                        <div
                          key={proj.id}
                          className="group relative rounded-2xl p-5 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-accent transition-all duration-300 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5 mb-1">
                                <Briefcase className="w-3 h-3" />
                                {proj.company.name} • {proj.company.role}
                              </span>
                              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors">
                                {proj.title}
                              </h4>
                            </div>

                            {topResult && (
                              <span className="shrink-0 px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-accent text-accent-foreground shadow-xs self-start">
                                {topResult.value} {topResult.label}
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {proj.subtitle}
                          </p>

                          {/* Matching Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            {proj.tags.map((tag) => {
                              const isMatch =
                                tag.toLowerCase() === selectedSkillModal.skill.name.toLowerCase() ||
                                tag.toLowerCase().includes(selectedSkillModal.skill.name.toLowerCase()) ||
                                selectedSkillModal.skill.name.toLowerCase().includes(tag.toLowerCase());

                              return (
                                <span
                                  key={tag}
                                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                                    isMatch
                                      ? 'bg-accent text-accent-foreground font-bold shadow-xs'
                                      : 'bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                                  }`}
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>

                          {/* Navigation Button */}
                          <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
                            <span className="text-xs text-zinc-500 font-mono">
                              Deep-dive architecture & metrics
                            </span>
                            <Link
                              href={`/projects/${proj.slug}`}
                              onClick={() => setSelectedSkillModal(null)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:brightness-110 shadow-sm transition-all"
                            >
                              Explore Case Study
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-accent-muted text-accent flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Core Architectural Toolchain
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                    <strong className="text-zinc-900 dark:text-zinc-200">{selectedSkillModal.skill.name}</strong> is an active foundation across Harshit&apos;s production systems. Explore all production case studies in the project archive.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/projects"
                      onClick={() => setSelectedSkillModal(null)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:brightness-110 shadow-sm transition-all"
                    >
                      Browse All Projects in Archive
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 font-mono">
                <span>Press ESC or click outside to dismiss</span>
                <Link
                  href={`/projects?search=${encodeURIComponent(selectedSkillModal.skill.name)}`}
                  onClick={() => setSelectedSkillModal(null)}
                  className="text-accent hover:underline inline-flex items-center gap-1 font-sans font-semibold"
                >
                  Filter full directory by this technology →
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused !important;
        }

        .marquee-paused .animate-marquee-left,
        .marquee-paused .animate-marquee-right {
          animation-play-state: paused !important;
        }

        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: loopLeft 42s linear infinite;
        }

        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: loopRight 42s linear infinite;
        }

        @keyframes loopLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes loopRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
