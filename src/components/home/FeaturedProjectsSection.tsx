'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from 'motion/react';
import {
  Play,
  ArrowRight,
  ExternalLink,
  Smartphone,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { ProjectSummary, ProjectDetail } from '@/types/project';
import { EngagementBadge } from '@/components/ui/EngagementBadge';
import { VideoModal } from '@/components/ui/VideoModal';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import projectsJson from '@/data/projects.json';

// Pre-index full case study data for quick-view access
const projectDetailsMap = new Map<string, ProjectDetail>();
(projectsJson as unknown as ProjectDetail[]).forEach((p) => {
  projectDetailsMap.set(p.slug, p);
});

interface StageSlotCardProps {
  project: ProjectSummary;
  idx: number;
  totalCards: number;
  smoothProgress: MotionValue<number>;
  slotDistance: number;
  onOpenVideo: (url: string, title: string) => void;
  isArchitectureExpanded: boolean;
  onToggleArchitecture: () => void;
}

function StageSlotCard({
  project,
  idx,
  totalCards,
  smoothProgress,
  slotDistance,
  onOpenVideo,
  isArchitectureExpanded,
  onToggleArchitecture,
}: StageSlotCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Desktop subtle mouse cursor 3D tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 280,
    damping: 28,
  });
  const tiltRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), {
    stiffness: 280,
    damping: 28,
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

  const architecturePoints =
    projectDetailsMap.get(project.slug)?.caseStudy?.architecturePoints || [];

  // Slot offset:
  // offset = 0   => MID slot (dead center, hero)
  // offset = +1  => RIGHT slot (incoming, small)
  // offset = -1  => LEFT slot (outgoing/previous, small)
  // offset > +1.5 or < -1.5 => Off-stage
  const offset = useTransform(smoothProgress, (p) => idx - p);

  // Horizontal position on stage
  const x = useTransform(offset, (off) => off * slotDistance);

  // Monotonic scale: 0.70 at sides/slots -> 1.02 at center MID
  const scale = useTransform(offset, (off) => {
    const dist = Math.abs(off);
    const factor = Math.max(0, 1 - Math.min(dist, 1));
    return 0.70 + factor * 0.32;
  });

  // Opacity: 1.0 at center MID, 0.45 at LEFT/RIGHT slots, drops to 0 if off-stage
  const opacity = useTransform(offset, (off) => {
    const dist = Math.abs(off);
    if (dist >= 1.6) return 0;
    const factor = Math.max(0, 1 - Math.min(dist, 1));
    return 0.40 + factor * 0.60;
  });

  // Pointer events: only clickable when on stage
  const pointerEvents = useTransform(offset, (off) => {
    return Math.abs(off) <= 1.2 ? 'auto' : 'none';
  });

  // Radiant Accent Glow: Ignites at MID center when |offset| < 0.28
  const boxShadow = useTransform(offset, (off) => {
    const dist = Math.abs(off);
    if (dist >= 0.28) {
      return '0 15px 30px -10px rgba(0, 0, 0, 0.4)';
    }
    const glowFactor = (0.28 - dist) / 0.28;
    const spread = Math.round(glowFactor * 50);
    const alpha = (glowFactor * 0.6).toFixed(2);
    return `0 0 ${spread}px rgba(var(--accent-rgb), ${alpha}), 0 25px 60px -12px rgba(0, 0, 0, 0.7)`;
  });

  // Border highlight intensity at center MID
  const borderColor = useTransform(offset, (off) => {
    const dist = Math.abs(off);
    if (dist < 0.25) {
      return 'var(--accent)';
    }
    return 'rgba(161, 161, 170, 0.25)';
  });

  // Layering Stacking Order (zIndex): Active center card sits on top (30)
  const zIndex = useTransform(offset, (off) => {
    const dist = Math.abs(off);
    return Math.round(30 - Math.min(dist, 2) * 10);
  });

  // 3D Perspective Tilt: Left card tilted +8deg, Center 0deg, Right card tilted -8deg
  const depthRotateY = useTransform(offset, (off) => {
    const clamped = Math.max(-1, Math.min(1, off));
    return clamped * -8;
  });

  // Vertical drop for receded cards
  const depthY = useTransform(offset, (off) => {
    const dist = Math.abs(off);
    const factor = Math.min(dist, 1);
    return factor * 16;
  });

  return (
    <motion.div
      style={{
        x,
        y: depthY,
        zIndex,
        opacity,
        pointerEvents: pointerEvents as unknown as React.CSSProperties['pointerEvents'],
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84vw] sm:w-[62vw] lg:w-[50vw] max-w-[640px] min-w-[320px] sm:min-w-[460px] h-[70vh] sm:h-[74vh] lg:h-[76vh] select-none"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          scale,
          boxShadow,
          borderColor,
          rotateX: tiltRotateX,
          rotateY: depthRotateY,
          transformPerspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full w-full rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl transition-colors duration-300 overflow-hidden flex flex-col justify-between"
      >
        {/* Ambient Radial Spotlight following Cursor */}
        {isHovered && mousePixelPos && (
          <div
            className="pointer-events-none absolute -inset-px opacity-25 dark:opacity-40 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(450px circle at ${mousePixelPos.x}px ${mousePixelPos.y}px, var(--accent), transparent 70%)`,
            }}
          />
        )}

        <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-0 h-full overflow-y-auto md:overflow-hidden">
          {/* Media Panel (Left 5 columns on desktop, full height) */}
          <div className="relative aspect-video md:aspect-auto md:col-span-5 overflow-hidden bg-zinc-950 min-h-[190px] md:min-h-full group/thumb flex flex-col justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

            {/* Floating Top Badges */}
            <div className="relative top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
              <EngagementBadge
                type={project.company.engagementType}
                companyName={project.company.name}
                className="backdrop-blur-md bg-black/70 text-white border-white/20 shadow-md text-xs px-2.5 py-1"
              />
              {project.topMetric && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-accent text-accent-foreground font-mono shadow-md backdrop-blur-md">
                  ⚡ {project.topMetric.value}
                </span>
              )}
            </div>

            {/* Optional Video Demo Button */}
            {project.links.videoUrl && (
              <div className="relative p-3.5 z-10 mt-auto">
                <button
                  type="button"
                  onClick={() => onOpenVideo(project.links.videoUrl!, project.title)}
                  className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold shadow-xl transition-transform hover:scale-105 cursor-pointer"
                >
                  <span className="absolute -inset-1 rounded-xl bg-accent/40 animate-ping pointer-events-none" />
                  <Play className="relative w-3.5 h-3.5 fill-current" />
                  <span className="relative">Watch Demo</span>
                </button>
              </div>
            )}
          </div>

          {/* Details & Specs Panel (Right 7 columns on desktop) */}
          <div className="md:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-3 overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <span className="uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {project.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-zinc-400">Project {idx + 1} of {totalCards}</span>
                  <span className="text-zinc-400">•</span>
                  <span>{project.company.duration}</span>
                </span>
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-accent transition-colors leading-snug">
                <Link href={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal line-clamp-3">
                {project.subtitle}
              </p>

              {/* Tech Tag Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/60 font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2 py-0.5 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800/40 text-zinc-500 font-mono">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Architecture Spec Quick-View */}
              {architecturePoints.length > 0 && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  <button
                    type="button"
                    onClick={onToggleArchitecture}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline cursor-pointer mb-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>System Architecture Spec</span>
                    {isArchitectureExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isArchitectureExpanded && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 overflow-hidden"
                      >
                        {architecturePoints.slice(0, 2).map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-start gap-2">
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

            {/* Card Action Footer */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                {project.links.liveUrl && (
                  <a
                    href={project.links.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                    title="Live Production App"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.links.playStoreUrl && (
                  <a
                    href={project.links.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors"
                    title="Google Play Store"
                  >
                    <Smartphone className="w-4 h-4" />
                  </a>
                )}
                {project.links.githubUrl && (
                  <a
                    href={project.links.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {project.links.linkedInUrl && (
                  <a
                    href={project.links.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-blue-50 dark:bg-zinc-800 dark:hover:bg-blue-900/40 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="LinkedIn Case Study"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs font-bold transition-all shadow-md group/btn"
              >
                <span>Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturedProjectsSection({ projects }: { projects: ProjectSummary[] }) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [expandedArchitecture, setExpandedArchitecture] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [slotDistance, setSlotDistance] = useState(480);

  // Measure stage dimensions and set slot distance so LEFT and RIGHT slots fit comfortably
  useEffect(() => {
    const calculateDistance = () => {
      const windowWidth = window.innerWidth;
      // On desktop, card moves ~34vw to reach LEFT/RIGHT slot; on mobile ~42vw
      const dist = windowWidth >= 1024
        ? Math.min(520, windowWidth * 0.35)
        : windowWidth >= 640
        ? Math.min(440, windowWidth * 0.38)
        : Math.round(windowWidth * 0.44);
      setSlotDistance(dist);
    };

    calculateDistance();
    window.addEventListener('resize', calculateDistance);
    return () => window.removeEventListener('resize', calculateDistance);
  }, []);

  // Track vertical scroll progress inside the outer container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map progress: 0 to (projects.length - 1)
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, Math.max(1, projects.length - 1)]);
  const smoothProgress = useSpring(rawProgress, { stiffness: 120, damping: 22 });

  // Update current active card index based on smooth progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (p) => {
      const idx = Math.min(
        projects.length - 1,
        Math.max(0, Math.round(p))
      );
      setCurrentIndex(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress, projects.length]);

  const toggleArchitecture = (slug: string) => {
    setExpandedArchitecture((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const handlePrev = () => {
    if (!containerRef.current) return;
    const targetIdx = Math.max(0, currentIndex - 1);
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + (targetIdx / (projects.length - 1)) * containerHeight;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (!containerRef.current) return;
    const targetIdx = Math.min(projects.length - 1, currentIndex + 1);
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + (targetIdx / (projects.length - 1)) * containerHeight;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  if (!projects || projects.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${Math.max(260, projects.length * 70)}vh`,
      }}
    >
      {/* Sticky viewport pinned to screen showcasing the fixed 3-slot stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6">
        {/* Streamlined Minimal Top Strip: Loading Bar & Compact HUD */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 space-y-2.5">
          <div className="flex items-center justify-between gap-4">
            {/* Minimal Left Pill */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                Section 03 / Production Systems
              </span>
              <span className="hidden sm:inline text-xs text-zinc-400 font-mono">•</span>
              <span className="hidden sm:inline text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[280px]">
                {projects[currentIndex]?.title}
              </span>
            </div>

            {/* Compact Right Controls & Counter */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 shadow-sm">
                <span className="text-accent">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-zinc-400">/</span>
                <span>{String(projects.length).padStart(2, '0')}</span>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === projects.length - 1}
                  className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs font-semibold transition-colors"
              >
                <span>All Projects</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Minimal Top Loading Bar with Radiant Accent Glow */}
          <div className="w-full h-1.5 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-full overflow-hidden shadow-inner">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
              className="h-full bg-accent shadow-[0_0_12px_var(--accent)]"
            />
          </div>
        </div>

        {/* 🎴 The 3-Slot Stage (LEFT, MID, RIGHT): Anchored to viewport center */}
        <div
          ref={stageRef}
          className="relative w-full h-[74vh] sm:h-[78vh] flex items-center justify-center overflow-hidden my-auto"
        >
          {projects.map((project, idx) => (
            <StageSlotCard
              key={project.id}
              project={project}
              idx={idx}
              totalCards={projects.length}
              smoothProgress={smoothProgress}
              slotDistance={slotDistance}
              onOpenVideo={(url, title) => setActiveVideo({ url, title })}
              isArchitectureExpanded={!!expandedArchitecture[project.slug]}
              onToggleArchitecture={() => toggleArchitecture(project.slug)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
        />
      )}
    </div>
  );
}
