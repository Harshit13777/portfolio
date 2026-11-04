import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/Icons';
import { getFeaturedProjects, getFeaturedTestimonials } from '@/lib/projects.service';
import { FREELANCE_SERVICES } from '@/data/services';
import { WORK_EXPERIENCE, SOCIAL_LINKS } from '@/data/experience';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const testimonials = await getFeaturedTestimonials();

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Freelance MVP Builds & Senior Engineering Roles</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1]">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">Offline-First Mobile Apps</span> & High-Concurrence IoT Systems.
            </h1>

            {/* Pitch */}
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Hi, I’m <strong className="text-zinc-900 dark:text-zinc-200 font-semibold">Harshit Soni</strong> — a Full-Stack Software Engineer with deep expertise in <span className="text-zinc-900 dark:text-zinc-200">React Native</span>, <span className="text-zinc-900 dark:text-zinc-200">Bluetooth Low Energy (BLE)</span> hardware integration, and scalable distributed backends.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 font-semibold text-sm shadow-md shadow-emerald-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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

            {/* Social Proof / Stats Strip */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">15k+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Active App Drivers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">99.4%</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">BLE Pairing Reliability</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">250k+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Daily Automated Tasks</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">100%</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Offline Data Integrity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Project Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Featured Engineering Projects
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
              Production systems built with enterprise companies and clients. Preview quick video demos or inspect the complete architecture case study.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors shrink-0"
          >
            Browse All Projects & Studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featuredHighlight={true} />
          ))}
        </div>
      </section>

      {/* 3. Freelance Services & Value Prop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800/80 p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              Freelance & Advisory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
              How I Help Startups & Engineering Teams
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              From building high-stakes Bluetooth mobile apps to standing up resilient backend microservices, here are the core capabilities I offer on contract.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FREELANCE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {service.badge}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">{service.timeline}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {service.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    View Deliverables
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Need a custom scope or technical evaluation? Let’s schedule a 30-minute discovery call.
            </p>
            <Link
              href="/services"
              className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
            >
              Explore Services & Process →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Client & Colleague Recommendations */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              Social Proof & Endorsements
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
              Feedback from Leaders & Clients
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(({ testimonial, projectName }, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                projectName={projectName}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Career Experience Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
              Work Experience
            </h2>
          </div>
          <Link
            href="/resume"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            View Full Resume & Skills Matrix →
          </Link>
        </div>

        <div className="space-y-4">
          {WORK_EXPERIENCE.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60 font-mono">
                    {exp.period}
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl mb-3">
                {exp.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-50 via-zinc-50 to-white dark:from-emerald-950/60 dark:via-zinc-900 dark:to-zinc-950 border border-emerald-500/20 p-8 sm:p-12 overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Have a project in mind or an engineering role to fill?
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              I’m available for freelance mobile apps, BLE IoT integrations, backend architecture, and high-impact full-time opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 text-sm font-semibold shadow-md shadow-emerald-500/20 transition-all"
            >
              Start a Conversation
            </Link>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition-colors"
            >
              Email Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
