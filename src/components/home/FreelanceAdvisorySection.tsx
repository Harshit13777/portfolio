'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
} from 'motion/react';
import {
  Smartphone,
  Cpu,
  Server,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Sliders,
  ShieldCheck,
  FileCode,
  Terminal,
} from 'lucide-react';
import { FREELANCE_SERVICES } from '@/data/services';
import { TechBadge } from '@/components/ui/TechBadge';

type StudioMode = 'blueprints' | 'estimator';

interface EstimatorOption {
  id: string;
  label: string;
  sub: string;
  weeks: number;
}

const ESTIMATOR_OPTIONS: EstimatorOption[] = [
  { id: 'mobile', label: 'Cross-Platform Mobile App', sub: 'React Native / Expo (iOS & Android)', weeks: 3 },
  { id: 'ble', label: 'Bluetooth / IoT Telemetry', sub: 'BLE GATT streaming & reconnection state machine', weeks: 2 },
  { id: 'backend', label: 'Custom Cloud API & DB', sub: 'Django / Node.js with PostgreSQL & Redis', weeks: 2 },
  { id: 'admin', label: 'Admin Dashboard & Webhooks', sub: 'Operational portal & third-party SaaS triggers', weeks: 1.5 },
  { id: 'devops', label: 'Docker & CI/CD Cloud Pipeline', sub: 'Automated testing, containerization & deployment', weeks: 1 },
];

export function FreelanceAdvisorySection() {
  const [activeMode, setActiveMode] = useState<StudioMode>('blueprints');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(FREELANCE_SERVICES[0].id);

  // Estimator State
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['mobile', 'ble']);
  const [isFastTrack, setIsFastTrack] = useState<boolean>(false);

  const activeService = FREELANCE_SERVICES.find((s) => s.id === selectedServiceId) || FREELANCE_SERVICES[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-accent" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-accent" />;
      case 'Server':
        return <Server className="w-5 h-5 text-accent" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-accent" />;
      default:
        return <Layers className="w-5 h-5 text-accent" />;
    }
  };

  const toggleScope = (id: string) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  // Calculate estimated timeline
  const baseWeeks = selectedScopes.reduce((acc, scopeId) => {
    const opt = ESTIMATOR_OPTIONS.find((o) => o.id === scopeId);
    return acc + (opt ? opt.weeks : 0);
  }, 0);

  // Fast-track parallel sprint efficiency
  const totalWeeksEstimated = isFastTrack ? Math.max(2, Math.round(baseWeeks * 0.7)) : Math.ceil(baseWeeks);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Studio Header & Interactive Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Scope & Advisory Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            How I Partner with Startups & Engineering Teams
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
            Choose a mode to inspect turn-key service blueprints or calculate milestone sprint delivery timelines.
          </p>
        </div>

        {/* Studio Mode Selector Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-stone-200/80 dark:bg-stone-900/90 border border-stone-300/80 dark:border-stone-800 self-start lg:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveMode('blueprints')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeMode === 'blueprints'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Service Blueprints</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('estimator')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeMode === 'estimator'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Sprint Estimator</span>
          </button>
        </div>
      </div>

      {/* Main Studio Interactive Stage */}
      <div className="relative rounded-3xl bg-white/90 dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800/90 shadow-xl overflow-hidden backdrop-blur-xs">
        <AnimatePresence mode="wait">
          {/* MODE 1: SERVICE BLUEPRINT INSPECTOR */}
          {activeMode === 'blueprints' && (
            <motion.div
              key="blueprints"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Selector Column (4 Domain Cards) */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Select a Domain Capability
                </span>

                <div className="space-y-2.5 pt-1">
                  {FREELANCE_SERVICES.map((service, idx) => {
                    const isSelected = service.id === selectedServiceId;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-stone-100/90 dark:bg-stone-800/90 border-accent shadow-sm ring-1 ring-accent/30'
                            : 'bg-stone-50/60 dark:bg-stone-900/40 border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <div
                          className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-accent-muted text-accent'
                              : 'bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}
                        >
                          {getServiceIcon(service.iconName)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono text-stone-400">0{idx + 1}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-muted text-accent font-mono">
                              {service.badge}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5 truncate">
                            {service.title}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                            Sprint: {service.timeline}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Detail Stage (Deep Inspection for Selected Service) */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-accent font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      Live Scope Blueprint
                    </span>
                    <span className="text-xs font-mono text-stone-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {activeService.timeline}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                    {activeService.title}
                  </h3>

                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {activeService.summary}
                  </p>
                </div>

                {/* Key Deliverables Checklist */}
                <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 dark:text-stone-200 font-semibold">
                    Turnkey Deliverables:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {activeService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Radar with Central TechBadge & Dynamic Project Link */}
                <div className="space-y-2.5 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <h4 className="font-mono uppercase tracking-wider text-stone-500 font-semibold">
                      Core Technologies:
                    </h4>
                    <span className="text-[11px] font-mono text-stone-400">
                      Click to explore case studies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeService.techStack.map((tech) => (
                      <TechBadge
                        key={tech}
                        name={tech}
                        size="sm"
                        href={`/projects?tag=${encodeURIComponent(tech)}`}
                        interactive
                      />
                    ))}
                  </div>
                </div>

                {/* CTA Action Bar */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    href={`/contact?service=${activeService.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all shadow-md hover:scale-102"
                  >
                    <span>Scope This Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/services"
                    className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-accent transition-colors"
                  >
                    View All 4 Service Specs →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* MODE 2: INTERACTIVE SPRINT SCOPE ESTIMATOR */}
          {activeMode === 'estimator' && (
            <motion.div
              key="estimator"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Selector (Toggle Modules) */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                    Step 1: Select Required Modules
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
                    Assemble Your Custom Project Scope
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {ESTIMATOR_OPTIONS.map((opt) => {
                    const isChecked = selectedScopes.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleScope(opt.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-stone-100/90 dark:bg-stone-800/90 border-accent shadow-xs'
                            : 'bg-stone-50/60 dark:bg-stone-900/40 border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 opacity-70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              isChecked
                                ? 'bg-accent border-accent text-accent-foreground'
                                : 'border-stone-300 dark:border-stone-600'
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                              {opt.label}
                            </h4>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400">
                              {opt.sub}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-mono text-stone-500 shrink-0">
                          ~{opt.weeks} wks
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Speed Toggle */}
                <div className="pt-2">
                  <div
                    onClick={() => setIsFastTrack(!isFastTrack)}
                    className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between cursor-pointer hover:bg-amber-500/15 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          Fast-Track MVP Sprint (Parallelized)
                        </h4>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400">
                          Accelerates timeline by compressing milestones with prioritized core features.
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isFastTrack
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {isFastTrack ? 'ACTIVE' : 'OFF'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Output Card (Live Summary) */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-stone-900 text-stone-100 dark:bg-black border border-stone-800 space-y-6">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                    Step 2: Estimated Sprint Output
                  </span>
                  <h3 className="text-2xl font-extrabold mt-1 text-white">
                    Estimated Delivery
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-400 font-mono block">Estimated Timeline:</span>
                    <span className="text-3xl font-extrabold text-accent">
                      {totalWeeksEstimated} - {totalWeeksEstimated + 1} Weeks
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    {selectedScopes.length} Module{selectedScopes.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Technical Guarantees */}
                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Production-ready, battle-tested code architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Clean TypeScript & Dockerized build artifacts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Daily async standup updates (Loom/Slack)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>14-day post-launch QA warranty & bug support</span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <Link
                  href={`/contact?scope=${selectedScopes.join(',')}&weeks=${totalWeeksEstimated}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-transform hover:scale-102 shadow-lg"
                >
                  <span>Book Discovery Call with this Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
