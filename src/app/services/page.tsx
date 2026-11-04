import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Smartphone, 
  Cpu, 
  Server, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Layers
} from 'lucide-react';
import { FREELANCE_SERVICES, ENGAGEMENT_MODELS, WORKING_PROCESS } from '@/data/services';
import { SOCIAL_LINKS } from '@/data/experience';

export const metadata: Metadata = {
  title: 'Freelance Engineering Services & Sprints | Harshit Soni',
  description: 'Specialized freelance mobile development (React Native & BLE), IoT telemetry pipelines, backend APIs, and custom workflow automations.',
};

export default function ServicesPage() {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default: return <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Freelance & Technical Consulting</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
          High-Velocity Engineering for Startups & Product Teams
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          I partner with early-stage founders, agencies, and hardware companies to design and deliver robust React Native mobile applications, Bluetooth Low Energy integrations, and scalable backend APIs on defined sprint deadlines.
        </p>
      </div>

      {/* 1. Core Services Catalog */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Specialized Service Offerings</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Turnkey engineering capabilities tailored to your product milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FREELANCE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {service.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {service.timeline}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{service.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{service.summary}</p>

                {/* Deliverables */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-300 font-semibold">
                    Key Deliverables:
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack & CTA */}
              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-emerald-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-emerald-500 text-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-950 text-xs font-semibold transition-all shadow-xs"
                >
                  Request Consultation for this Service
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Engagement Models */}
      <section className="space-y-8 p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            Collaboration Framework
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            Flexible Engagement Models
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Choose the collaboration model that fits your team structure and project budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENGAGEMENT_MODELS.map((model, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{model.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{model.description}</p>
                <div className="pt-2">
                  <p className="text-[11px] text-zinc-500 uppercase font-mono">Best For:</p>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">{model.idealFor}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 space-y-1 text-xs font-mono">
                <div className="text-zinc-500 dark:text-zinc-400">Duration: <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{model.timeline}</span></div>
                <div className="text-zinc-500 dark:text-zinc-400">Model: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{model.commitment}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The 5-Step Working Process */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            Standard Operating Procedure
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            How We Build Together
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Predictable sprints, transparent communication, and testable progress at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {WORKING_PROCESS.map((proc) => (
            <div
              key={proc.step}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/90 dark:border-zinc-800 relative space-y-3 shadow-xs"
            >
              <span className="text-2xl font-bold font-mono text-emerald-600/30 dark:text-emerald-500/40">
                {proc.step}
              </span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{proc.title}</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{proc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Ready to discuss your project?</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
          Share your timeline, technical specifications, or wireframe drafts. I will reply within 24 hours with an initial architectural roadmap.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 font-semibold text-sm shadow-md transition-colors"
          >
            Start a Project Inquiry
          </Link>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium text-sm transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
