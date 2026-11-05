'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Terminal, Cpu, Wifi, Shield, Code2 } from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/Icons';
import { Avatar } from '@/components/ui/Avatar';
import { SOCIAL_LINKS } from '@/data/experience';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [countDrivers, setCountDrivers] = useState(0);
  const [countTasks, setCountTasks] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Subtle count up effect for stats
    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCountDrivers(Math.floor(15 * progress));
      setCountTasks(Math.floor(250 * progress));

      if (step >= steps) {
        clearInterval(timer);
        setCountDrivers(15);
        setCountTasks(250);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-10 sm:pt-16 lg:pt-24 pb-4 overflow-hidden">
      {/* Dynamic Ambient Background Glow Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-accent-muted rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-14">
          {/* Left Column: Headlines & Pitch */}
          <div className="max-w-3xl space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for High-Impact Roles & Freelance MVPs</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.12]">
              Architecting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-hover to-cyan-500">
                Offline-First Mobile Apps
              </span>{' '}
              & Scalable IoT Systems.
            </h1>

            {/* Pitch Text */}
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Hi, I’m <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{SOCIAL_LINKS.name}</strong> — a Full-Stack Software Engineer specializing in <span className="text-zinc-900 dark:text-zinc-200 font-medium">React Native</span>, <span className="text-zinc-900 dark:text-zinc-200 font-medium">Bluetooth Low Energy (BLE)</span> protocols, and high-concurrency cloud backends.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground font-semibold text-sm shadow-lg shadow-accent/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 font-semibold text-sm shadow-xs transition-colors"
              >
                Hire for Freelance
              </Link>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-blue-50 dark:bg-zinc-900/60 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-800 text-sm transition-colors shadow-xs"
                title="Connect on LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Avatar with Floating Glyphs */}
          <div className="relative shrink-0 flex justify-center lg:justify-end">
            {/* Floating Hardware & Code Glyphs */}
            <div className="absolute -top-3 -left-4 p-2.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-md animate-float-slow hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <Wifi className="w-3.5 h-3.5 text-accent" />
              <span>BLE 5.2</span>
            </div>

            <div className="absolute -bottom-2 -left-6 p-2.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-md animate-float-reverse hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" />
              <span>IoT Telemetry</span>
            </div>

            <div className="absolute -top-4 -right-2 p-2.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 shadow-md backdrop-blur-md animate-float-slow hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <Code2 className="w-3.5 h-3.5 text-violet-500" />
              <span>React Native</span>
            </div>

            {/* Avatar Framed Container */}
            <div className="relative p-3 rounded-3xl bg-gradient-to-b from-zinc-200/60 to-zinc-100/30 dark:from-zinc-800/60 dark:to-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl backdrop-blur-xs">
              <Avatar
                src={SOCIAL_LINKS.avatarUrl}
                fallback={SOCIAL_LINKS.avatarFallback}
                size="xl"
                showStatus={true}
                className="shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Quantified Impact / Stats Strip */}
        <div className="mt-14 pt-8 border-t border-zinc-200/90 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {mounted ? `${countDrivers}k+` : '15k+'}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Active App Drivers</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-accent font-mono">
              99.4%
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">BLE Pairing Reliability</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {mounted ? `${countTasks}k+` : '250k+'}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Daily Automated Tasks</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-accent font-mono">
              100%
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Offline Data Integrity</p>
          </div>
        </div>
      </div>
    </section>
  );
}
