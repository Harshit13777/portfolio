'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Plane,
} from 'lucide-react';
import { WORK_EXPERIENCE, ExperienceItem, AchievementItem } from '@/data/experience';

interface InteractiveMilestoneCardProps {
  exp: ExperienceItem;
  idx: number;
  isActive: boolean;
  isPast: boolean;
  isFuture: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onClickFocus: () => void;
}

function InteractiveMilestoneCard({
  exp,
  idx,
  isActive,
  isPast,
  isFuture,
  isExpanded,
  onToggleExpand,
  onClickFocus,
}: InteractiveMilestoneCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics using Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 300,
    damping: 30,
  });

  const [mousePixelPos, setMousePixelPos] = useState<{ x: number; y: number } | null>(null);

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
  };

  const featuredAchievements = exp.achievements.filter((a: AchievementItem) => a.featured);
  const displayedAchievements = isExpanded ? exp.achievements : featuredAchievements;
  const hasMore = exp.achievements.length > featuredAchievements.length;

  return (
    <motion.div
      data-exp-id={exp.id}
      initial={{
        opacity: 0,
        y: 40,
        z: -60,
        rotateX: -10,
        scale: 0.92,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 18,
        delay: idx * 0.08,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1200,
        transformOrigin: 'center top',
      }}
      className="relative group"
    >
      {/* 1. Timeline Beacon Node on the Spine (Centered on spine rail with clean spacing) */}
      <div className="absolute -left-[35px] sm:-left-[51px] top-8 z-20 flex items-center justify-center">
        {isActive ? (
          <div className="relative flex items-center justify-center">
            <span className="absolute w-7 h-7 rounded-full bg-accent/30 animate-ping" />
            <span
              className="relative w-3.5 h-3.5 rounded-full bg-accent border-2 border-white dark:border-zinc-950 shadow-md"
              style={{ boxShadow: '0 0 10px var(--accent)' }}
            />
          </div>
        ) : isPast ? (
          <span className="w-3 h-3 rounded-full bg-accent/70 border-2 border-white dark:border-zinc-950 shadow-xs" />
        ) : (
          <span className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 border-2 border-white dark:border-zinc-950 group-hover:bg-accent transition-colors" />
        )}
      </div>

      {/* 2. Main Interactive Notebook Page Card with 3D Depth Flip on Scroll */}
      <motion.div
        ref={cardRef}
        onClick={onClickFocus}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={
          isActive
            ? {
                // Current Page: Opened forward, fully focused and elevated
                y: 0,
                scale: 1.02,
                opacity: 1,
                z: 35,
                rotateX: 0,
                rotateY: 0,
              }
            : isPast
            ? {
                // Scrolled past: Current page turns down into the stack
                y: 22,
                scale: 0.94,
                opacity: 0.5,
                z: -45,
                rotateX: 8,
                rotateY: -1.5,
              }
            : {
                // Upcoming page: Waiting behind, ready to open when scrolled up or down
                y: -12,
                scale: 0.94,
                opacity: 0.5,
                z: -55,
                rotateX: -8,
                rotateY: 1.5,
              }
        }
        whileHover={{
          scale: isActive ? 1.03 : 0.98,
          opacity: 1,
          y: isActive ? -4 : 0,
          z: 50,
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center top',
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 24,
          mass: 0.8,
        }}
        className={`relative overflow-hidden p-6 sm:p-8 rounded-3xl cursor-pointer transition-colors duration-500 bg-white dark:bg-zinc-900/70 backdrop-blur-xs ${
          isActive
            ? 'border-2 border-accent shadow-2xl dark:shadow-accent/15 ring-2 ring-accent/20'
            : 'border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-lg'
        }`}
      >
        {/* Ambient Halo on Focused Card */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(900px circle at top left, var(--accent), transparent 65%)',
            }}
          />
        )}

        {/* Cursor Spotlight Follower */}
        {mousePixelPos && (
          <div
            className="pointer-events-none absolute -inset-px opacity-25 dark:opacity-35 transition-opacity duration-200"
            style={{
              background: `radial-gradient(350px circle at ${mousePixelPos.x}px ${mousePixelPos.y}px, var(--accent), transparent 70%)`,
            }}
          />
        )}

        {/* Content Container */}
        <div className="relative z-10 space-y-4">
          {/* Header Row: Role & Period */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <motion.h3
                  animate={{
                    color: isActive ? 'var(--accent)' : 'inherit',
                  }}
                  className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors"
                >
                  {exp.role}
                </motion.h3>
                {exp.current && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Current Role
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-accent flex items-center gap-2">
                <span>{exp.company}</span>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500 font-normal text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  {exp.location}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60 font-mono font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {exp.period}
              </span>
            </div>
          </div>

          {/* Role Summary */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            {exp.summary}
          </p>

          {/* Deliverables Section with Accordion */}
          {displayedAchievements.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-accent font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {isExpanded ? 'All Accomplishments' : 'Featured Accomplishments'}
                </span>

                {hasMore && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExpand();
                    }}
                    className="inline-flex items-center gap-1 text-xs font-sans font-medium text-zinc-500 hover:text-accent transition-colors cursor-pointer px-2 py-0.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {isExpanded ? (
                      <>
                        <span>Show featured only</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>+{exp.achievements.length - featuredAchievements.length} more details</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* AnimatePresence for smooth deliverables expansion */}
              <AnimatePresence initial={false}>
                <motion.ul
                  key={isExpanded ? 'expanded' : 'collapsed'}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2.5 overflow-hidden"
                >
                  {displayedAchievements.map((item, bulletIdx) => (
                    <motion.li
                      key={bulletIdx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: bulletIdx * 0.04 }}
                      className="flex items-start justify-between gap-3 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
                            isActive ? 'text-accent' : 'text-accent/80'
                          }`}
                        />
                        <span className="leading-relaxed font-medium">{item.text}</span>
                      </div>
                      {item.metric && (
                        <motion.span
                          animate={
                            isActive
                              ? { scale: [1, 1.08, 1] }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.4, delay: 0.15 }}
                          className="shrink-0 px-2.5 py-0.5 text-xs font-mono font-bold rounded-lg bg-accent text-accent-foreground shadow-xs"
                        >
                          {item.metric}
                        </motion.span>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
            {exp.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/50 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>(WORK_EXPERIENCE[0]?.id || '');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isPlaneHovered, setIsPlaneHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);

  // 1. Motion Scroll Tracking for the Flight Traveler
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 30%'],
  });

  // Smooth fluid spring for the vertical plane translation down the spine
  const smoothPlaneY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '96%']),
    {
      stiffness: 110,
      damping: 22,
      mass: 0.25,
    }
  );

  // Contrail height following the plane
  const smoothContrailHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '98%']),
    {
      stiffness: 110,
      damping: 22,
      mass: 0.25,
    }
  );

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 2. Track scroll direction & active card
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current + 2) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current - 2) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;

      const viewportHeight = window.innerHeight;
      const triggerY = viewportHeight * 0.45;
      const cards = containerRef.current.querySelectorAll<HTMLElement>('[data-exp-id]');
      let currentActive = activeId;

      cards.forEach((el) => {
        const cardRect = el.getBoundingClientRect();
        if (cardRect.top <= triggerY && cardRect.bottom >= triggerY - 80) {
          const id = el.getAttribute('data-exp-id');
          if (id) currentActive = id;
        }
      });

      if (currentActive && currentActive !== activeId) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  const activeIndex = WORK_EXPERIENCE.findIndex((e) => e.id === activeId);
  const activeExp = WORK_EXPERIENCE[activeIndex] || WORK_EXPERIENCE[0];
  const activeFeaturedMetric = activeExp?.achievements.find((a) => a.featured && a.metric)?.metric;

  const scrollToCard = (id: string) => {
    setActiveId(id);
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-exp-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header with Active Milestone Ticker Pill */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Proven Track Record</span>
            {activeIndex !== -1 && (
              <motion.span
                layoutId="milestone-badge"
                className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-accent-muted text-accent text-[11px] font-sans font-bold border border-accent-muted"
              >
                Milestone {activeIndex + 1} of {WORK_EXPERIENCE.length}
              </motion.span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Work Experience Timeline
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
            Interactive career milestones. Hover or track the flight navigator on the spine to preview career impact.
          </p>
        </div>

        <Link
          href="/resume"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors shrink-0"
        >
          View Full Detailed Resume
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Interactive Spine Timeline Container with generous left gutter */}
      <div ref={containerRef} className="relative pl-10 sm:pl-16 space-y-8">
        {/* Base Spine Line Track */}
        <div className="absolute left-[12px] sm:left-[20px] top-6 bottom-6 w-[2px] bg-linear-to-b from-accent/20 via-zinc-200 dark:via-zinc-800 to-transparent" />

        {/* Glowing Contrail Vapor Trail */}
        <motion.div
          className="absolute left-[12px] sm:left-[20px] top-6 w-[2px] bg-linear-to-b from-accent to-accent/40 z-10 origin-top pointer-events-none"
          style={{
            height: smoothContrailHeight,
            boxShadow: '0 0 10px var(--accent), 0 0 18px var(--accent)',
          }}
        />

        {/* ✈️ Interactive Flight Traveler (Plane) that moves on the spine */}
        <motion.div
          onMouseEnter={() => setIsPlaneHovered(true)}
          onMouseLeave={() => setIsPlaneHovered(false)}
          onClick={() => scrollToCard(activeId)}
          style={{
            top: smoothPlaneY,
          }}
          className="absolute left-[12px] sm:left-[20px] -translate-x-1/2 z-40 cursor-pointer select-none"
        >
          {/* Animated Airplane Capsule */}
          <motion.div
            animate={{
              rotate: scrollDirection === 'down' ? 135 : -45,
              scale: isPlaneHovered ? 1.25 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 20,
            }}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-950 transition-transform"
            style={{
              boxShadow: '0 0 14px var(--accent)',
            }}
            title="Flight Navigator — Click to center role"
          >
            <Plane className="w-3.5 h-3.5 text-accent-foreground drop-shadow-xs" />
          </motion.div>

          {/* Floating Thruster Exhaust Spark */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent animate-ping pointer-events-none" />

          {/* Compact Telemetry Tooltip (Positioned strictly ABOVE the plane, never overlapping cards) */}
          <AnimatePresence>
            {isPlaneHovered && activeExp && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full mb-3 left-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap px-3.5 py-2 rounded-xl bg-zinc-950/95 dark:bg-zinc-900/95 text-white border border-accent/40 shadow-2xl backdrop-blur-md pointer-events-none z-50 flex items-center gap-2.5"
                style={{
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 16px var(--accent-muted)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-bold text-zinc-100">{activeExp.role}</span>
                  <span className="text-zinc-400 font-mono text-[11px]">• {activeExp.company}</span>
                </div>
                {activeFeaturedMetric && (
                  <span className="px-1.5 py-0.5 rounded bg-accent/20 text-accent border border-accent/30 text-[10px] font-mono font-bold">
                    {activeFeaturedMetric}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {WORK_EXPERIENCE.map((exp: ExperienceItem, idx: number) => {
          const isActive = exp.id === activeId;
          const isPast = activeIndex > idx;
          const isFuture = activeIndex < idx;
          const isExpanded = !!expandedCards[exp.id];

          return (
            <InteractiveMilestoneCard
              key={exp.id}
              exp={exp}
              idx={idx}
              isActive={isActive}
              isPast={isPast}
              isFuture={isFuture}
              isExpanded={isExpanded}
              onToggleExpand={() => toggleExpand(exp.id)}
              onClickFocus={() => scrollToCard(exp.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
