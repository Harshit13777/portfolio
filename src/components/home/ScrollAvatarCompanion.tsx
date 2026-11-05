'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { Bot, Minimize2, Maximize2, Move, Volume2, VolumeX } from 'lucide-react';
import { SectionType } from './ThreeAvatarCanvas';
import { AvatarSpeechHUD, SECTION_METADATA } from './AvatarSpeechHUD';
import { soundFx } from '@/lib/soundFx';

// Dynamic lazy-load of the Three.js Canvas with zero SSR blocking
const DynamicThreeAvatar = dynamic(
  () => import('./ThreeAvatarCanvas').then((mod) => mod.ThreeAvatarCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-36 h-44 sm:w-40 sm:h-48 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    ),
  }
);

interface SectionHomeTarget {
  id: string;
  section: SectionType;
  // Normalized viewport percentage ratios (0.0 to 1.0)
  xRatio: number;
  yRatio: number;
}

const SECTION_HOME_TARGETS: SectionHomeTarget[] = [
  // 1. Hero: Top-Right
  { id: 'section-hero', section: 'hero', xRatio: 0.76, yRatio: 0.12 },
  // 2. Skills: Bottom-Left
  { id: 'section-skills', section: 'skills', xRatio: 0.05, yRatio: 0.65 },
  // 3. Projects: Mid-Right
  { id: 'section-projects', section: 'projects', xRatio: 0.78, yRatio: 0.42 },
  // 4. Services: Bottom-Right
  { id: 'section-services', section: 'services', xRatio: 0.76, yRatio: 0.65 },
  // 5. Timeline: Mid-Left
  { id: 'section-experience', section: 'experience', xRatio: 0.05, yRatio: 0.40 },
  // 6. Feedback: Bottom Center-Right
  { id: 'section-feedback', section: 'feedback', xRatio: 0.65, yRatio: 0.65 },
  // 7. CTA: Bottom-Right
  { id: 'section-cta', section: 'cta', xRatio: 0.76, yRatio: 0.65 },
];

export function ScrollAvatarCompanion() {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.isMuted);

  // Viewport dimensions
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 1200,
    height: 800,
  });

  // Track position
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 900, y: 100 });
  const lastSectionRef = useRef<SectionType>('hero');

  // Compute screen coordinates from ratio
  const calculateCoordinates = (target: SectionHomeTarget, w: number, h: number) => {
    const isMobile = w < 640;
    if (isMobile) {
      // On mobile, keep it gently near the bottom edge so it doesn't block text
      return {
        x: Math.max(12, w - 200),
        y: Math.max(80, h - 220),
      };
    }
    const computedX = Math.min(w - 380, Math.max(20, target.xRatio * w));
    const computedY = Math.min(h - 220, Math.max(70, target.yRatio * h));
    return { x: computedX, y: computedY };
  };

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowSize({ width: w, height: h });
      const currentTarget = SECTION_HOME_TARGETS.find((t) => t.section === activeSection) || SECTION_HOME_TARGETS[0];
      setTargetPos(calculateCoordinates(currentTarget, w, h));
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  // Active section tracking with scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.42;

      for (const item of SECTION_HOME_TARGETS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (lastSectionRef.current !== item.section) {
              lastSectionRef.current = item.section;
              setActiveSection(item.section);
              // Trigger smooth flight to the new section's home position!
              const newCoords = calculateCoordinates(item, window.innerWidth, window.innerHeight);
              setTargetPos(newCoords);
              // Play flight & HUD audio feedback
              soundFx.playFlightWoosh();
              soundFx.playChirpBeep();
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (targetId: string) => {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine if HUD should render on left or right of robot based on X position
  const isLeftHalf = targetPos.x < windowSize.width * 0.45;
  const hudSide: 'left' | 'right' = isLeftHalf ? 'right' : 'left';
  const currentMeta = SECTION_METADATA[activeSection];

  return (
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.12}
      onDragStart={() => {
        setIsDragging(true);
        soundFx.playGrabSound();
      }}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        soundFx.playDropSound();
        // Updates current location from user's manual hand movement
        setTargetPos((prev) => ({
          x: Math.max(10, Math.min(windowSize.width - 320, prev.x + info.offset.x)),
          y: Math.max(60, Math.min(windowSize.height - 200, prev.y + info.offset.y)),
        }));
      }}
      animate={{
        x: targetPos.x,
        y: targetPos.y,
        scale: isDragging ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 65,
        damping: 17,
        mass: 0.9,
      }}
      className="fixed top-0 left-0 z-50 pointer-events-auto select-none cursor-grab active:cursor-grabbing filter drop-shadow-2xl"
      style={{ touchAction: 'none' }}
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Compact Coin Badge */
          <motion.div
            key="minimized-dock"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
            className="p-2.5 rounded-2xl bg-zinc-950/95 dark:bg-zinc-900/95 text-white border border-emerald-500/50 shadow-2xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
            title="Expand 3D Robot Co-Pilot"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-xs font-mono font-bold pr-1">
              Co-Pilot ({currentMeta.index})
            </span>
            <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
          </motion.div>
        ) : (
          /* Expanded Full 3D Robot & Adaptive Speech HUD */
          <motion.div
            key="expanded-companion"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className={`flex items-end sm:items-center gap-2 sm:gap-3.5 ${
              hudSide === 'right'
                ? 'flex-col sm:flex-row'
                : 'flex-col-reverse sm:flex-row'
            }`}
          >
            {/* If HUD is on the left side of the robot */}
            {hudSide === 'left' && (
              <div 
                className="cursor-default" 
                onPointerDown={(e) => e.stopPropagation()}
              >
                <AvatarSpeechHUD
                  activeSection={activeSection}
                  hudSide="left"
                  onNavigate={handleNavigate}
                />
              </div>
            )}

            {/* 3D WebGL Canvas Robot Container */}
            <div className="relative flex flex-col items-center">
              {/* Hand-Draggable Handle Pill */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-zinc-950/80 text-[9px] font-mono font-bold text-zinc-300 border border-zinc-700/60 shadow-xs flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                <Move className="w-2.5 h-2.5 text-emerald-400" />
                <span>Drag me</span>
              </div>

              {/* Controls Toolbar: Mute & Minimize */}
              <div className="absolute top-1 right-1 z-10 flex items-center gap-1">
                {/* Sound Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newMuted = soundFx.toggleMute();
                    setIsMuted(newMuted);
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-sm transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
                >
                  {isMuted ? (
                    <VolumeX className="w-3 h-3 text-zinc-400" />
                  ) : (
                    <Volume2 className="w-3 h-3 text-emerald-500" />
                  )}
                </button>

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 shadow-sm transition-colors cursor-pointer"
                  title="Minimize 3D Co-Pilot"
                >
                  <Minimize2 className="w-3 h-3" />
                </button>
              </div>

              {/* Three.js Canvas with Interactive Poke Boop */}
              <div 
                className="relative"
                onClick={() => soundFx.playBoopChirp()}
              >
                <DynamicThreeAvatar activeSection={activeSection} />
              </div>
            </div>

            {/* If HUD is on the right side of the robot */}
            {hudSide === 'right' && (
              <div 
                className="cursor-default" 
                onPointerDown={(e) => e.stopPropagation()}
              >
                <AvatarSpeechHUD
                  activeSection={activeSection}
                  hudSide="right"
                  onNavigate={handleNavigate}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
