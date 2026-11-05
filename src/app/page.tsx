import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getFeaturedProjects, getFeaturedTestimonials } from '@/lib/projects.service';
import { FREELANCE_SERVICES } from '@/data/services';
import { WORK_EXPERIENCE, SOCIAL_LINKS } from '@/data/experience';
import { HeroSection } from '@/components/home/HeroSection';
import { SkillsTicker } from '@/components/home/SkillsTicker';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
import { TestimonialsRotator } from '@/components/home/TestimonialsRotator';

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const testimonials = await getFeaturedTestimonials();

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Animated Skills & Tech Marquee Ticker */}
      <SkillsTicker />

      {/* 3. Featured Production Projects Showcase (shows all featured: true projects) */}
      <FeaturedProjectsSection projects={featuredProjects} />

      {/* 4. Freelance Services & Value Prop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800/80 p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
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
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 hover:border-accent/40 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent-muted text-accent border border-accent-muted">
                      {service.badge}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">{service.timeline}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {service.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
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

      {/* 5. Auto-Rotating Client & Leader Recommendations */}
      {testimonials.length > 0 && (
        <TestimonialsRotator testimonials={testimonials} />
      )}

      {/* 6. Career Experience Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
              Work Experience Timeline
            </h2>
          </div>
          <Link
            href="/resume"
            className="text-xs font-semibold text-accent hover:underline"
          >
            View Full Resume & Skills Matrix →
          </Link>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-6">
          {WORK_EXPERIENCE.map((exp) => (
            <div
              key={exp.id}
              className="relative group p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800 hover:border-accent/40 dark:hover:border-zinc-700 transition-all shadow-xs"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-white dark:bg-zinc-950 border-2 border-accent group-hover:scale-125 transition-transform" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-xs text-accent font-semibold">
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
                    className="px-2 py-0.5 text-[11px] rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-zinc-100 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-8 sm:p-12 overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-muted rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Have an IoT project, mobile app, or engineering role?
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              I’m available for freelance mobile apps, BLE hardware integrations, distributed backends, and high-impact full-time opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground text-sm font-semibold shadow-lg shadow-accent/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
