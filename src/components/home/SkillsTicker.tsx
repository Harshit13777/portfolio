'use client';

import React from 'react';
import { Wifi, Zap, Cpu, Radio, Layers, Code2 } from 'lucide-react';
import skillsData from '@/data/skills.json';
import { SkillCategoryTrack, SkillItem } from '@/types/skills';

const typedSkills: SkillCategoryTrack[] = skillsData as SkillCategoryTrack[];

function renderIcon(item: SkillItem) {
  if (item.iconUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.iconUrl}
        alt={item.name}
        className="w-4 h-4 object-contain shrink-0"
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
  return (
    <section className="relative w-full py-10 border-y border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-100/50 dark:bg-zinc-900/40 overflow-hidden space-y-5">
      {/* Side edge gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* High-Contrast Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <h3 className="text-sm sm:text-base font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
            Technical Stack Ecosystem
          </h3>
        </div>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xs">
          {typedSkills.length} Core Domains • Continuously Flowing • Hover to Pause
        </span>
      </div>

      {/* Categorized Multi-Track Scrollers */}
      <div className="space-y-3.5">
        {typedSkills.map((categoryTrack, rowIdx) => {
          const isReverse = categoryTrack.direction === 'right';
          const animationClass = isReverse ? 'animate-marquee-right' : 'animate-marquee-left';

          return (
            <div key={categoryTrack.id || rowIdx} className="relative flex items-center gap-3">
              {/* Category Sticky Tag (Desktop) - Crisp High-Contrast Typography */}
              <div className="hidden lg:flex shrink-0 items-center justify-end w-48 pr-4 border-r-2 border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                {categoryTrack.category}
              </div>

              {/* Infinite Running Marquee Track */}
              <div className="flex overflow-hidden marquee-container w-full">
                <div className={`flex shrink-0 items-center ${animationClass}`}>
                  {/* Track 1 */}
                  <div className="flex shrink-0 items-center gap-3 pr-3">
                    {categoryTrack.items.map((skill, idx) => (
                      <div
                        key={`s1-${idx}`}
                        className="inline-flex shrink-0 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-xs font-bold text-zinc-900 dark:text-zinc-100 shadow-xs hover:border-accent hover:scale-[1.03] transition-all whitespace-nowrap cursor-default"
                      >
                        {renderIcon(skill)}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Track 2 - Seamless Loop */}
                  <div className="flex shrink-0 items-center gap-3 pr-3">
                    {categoryTrack.items.map((skill, idx) => (
                      <div
                        key={`s2-${idx}`}
                        className="inline-flex shrink-0 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-xs font-bold text-zinc-900 dark:text-zinc-100 shadow-xs hover:border-accent hover:scale-[1.03] transition-all whitespace-nowrap cursor-default"
                      >
                        {renderIcon(skill)}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
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
