'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Sparkles, Bot, Move } from 'lucide-react';
import { SectionType } from './ThreeAvatarCanvas';

interface SectionInfo {
  index: string;
  badge: string;
  title: string;
  quip: string;
  nextId: string;
}

export const SECTION_METADATA: Record<SectionType, SectionInfo> = {
  hero: {
    index: '01',
    badge: 'CO-PILOT ACTIVE',
    title: 'Harshit Soni',
    quip: 'Hey! I am your 3D portfolio guide. Drag me anywhere by hand or scroll down!',
    nextId: 'section-skills',
  },
  skills: {
    index: '02',
    badge: 'TECH SCANNER',
    title: 'Engineering Matrix',
    quip: 'Scanning proficiencies: React Native, BLE GATT, Django REST, Docker & PostgreSQL.',
    nextId: 'section-projects',
  },
  projects: {
    index: '03',
    badge: '3D SHOWROOM',
    title: 'Production Systems',
    quip: 'Check out these production mobile apps & distributed telemetry architectures.',
    nextId: 'section-services',
  },
  services: {
    index: '04',
    badge: 'ADVISORY & SCOPING',
    title: 'Turn-Key Blueprints',
    quip: 'Need a mobile MVP or hardware BLE integration? Calculate sprint delivery timelines.',
    nextId: 'section-experience',
  },
  experience: {
    index: '05',
    badge: 'CAREER FLIGHT PATH',
    title: 'Work Experience',
    quip: '4+ years of full-stack leadership, building offline-first systems and shipping to production.',
    nextId: 'section-feedback',
  },
  feedback: {
    index: '06',
    badge: 'CLIENT TRUST',
    title: 'Verified Endorsements',
    quip: 'Authentic reviews and engineering recommendations from founders and leads.',
    nextId: 'section-cta',
  },
  cta: {
    index: '07',
    badge: 'SYSTEM FINALE',
    title: 'Start a Conversation',
    quip: 'Ready to build or scale your next system? Let us talk architecture and timeline.',
    nextId: 'section-hero',
  },
};

interface Props {
  activeSection: SectionType;
  hudSide?: 'left' | 'right';
  onNavigate: (sectionId: string) => void;
}

export function AvatarSpeechHUD({ activeSection, hudSide = 'left', onNavigate }: Props) {
  const current = SECTION_METADATA[activeSection] || SECTION_METADATA.hero;

  return (
    <div className="relative max-w-[270px] sm:max-w-[310px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.25 }}
          className="p-3 sm:p-3.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-800/90 shadow-xl backdrop-blur-md space-y-2 pointer-events-auto"
        >
          {/* Top Badge & Counter */}
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {current.badge}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 font-semibold flex items-center gap-1">
              <Move className="w-3 h-3 text-zinc-400" />
              {current.index} / 07
            </span>
          </div>

          {/* Headline */}
          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{current.title}</span>
          </h4>

          {/* Conversational Line */}
          <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {current.quip}
          </p>

          {/* Teleport Action */}
          <button
            type="button"
            onClick={() => onNavigate(current.nextId)}
            className="w-full pt-1.5 mt-1 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group transition-colors"
          >
            <span>Jump to next section</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Holographic Anchor Pointer */}
      {hudSide === 'left' ? (
        <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-zinc-900 border-t border-r border-zinc-200 dark:border-zinc-800 rotate-45" />
      ) : (
        <div className="hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-zinc-900 border-b border-l border-zinc-200 dark:border-zinc-800 rotate-45" />
      )}
    </div>
  );
}
