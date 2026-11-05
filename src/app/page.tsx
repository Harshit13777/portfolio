import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/projects.service';
import { FREELANCE_SERVICES } from '@/data/services';
import { WORK_EXPERIENCE, SOCIAL_LINKS } from '@/data/experience';
import { HeroSection } from '@/components/home/HeroSection';
import { SkillsTicker } from '@/components/home/SkillsTicker';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { FeedbackMarquee } from '@/components/home/FeedbackMarquee';

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section (Clean canvas with subtle ambient gradient) */}
      <section className="w-full bg-gradient-to-b from-background via-background to-zinc-50/60 dark:to-zinc-950/40 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-16 pt-6">
        <HeroSection />
      </section>

      {/* 2. Animated Skills & Tech Marquee Ticker (Contrasting modern tech strip) */}
      <section className="w-full bg-zinc-100/70 dark:bg-zinc-900/40 border-b border-zinc-200/80 dark:border-zinc-800/80 py-12 sm:py-16">
        <SkillsTicker />
      </section>

      {/* 3. Featured Production Projects Showcase (Deep cinematic exhibition canvas for horizontal scroll) */}
      <section className="w-full bg-zinc-50/80 dark:bg-black border-b border-zinc-200/80 dark:border-zinc-800">
        <FeaturedProjectsSection projects={featuredProjects} />
      </section>

      {/* 4. Freelance Services & Value Prop (Structured slate surface with high readability) */}
      <section className="w-full bg-white dark:bg-zinc-950/70 border-b border-zinc-200/80 dark:border-zinc-800/80 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800/80 p-8 sm:p-12 shadow-sm">
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
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 hover:border-accent/40 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm"
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
        </div>
      </section>

      {/* 5. Career Experience Timeline (Dynamic 3D flip canvas) */}
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200/60 dark:border-zinc-800/60 py-20 sm:py-28">
        <ExperienceTimeline />
      </section>

      {/* 6. Feedback & Client Endorsements Bar (Infinite Marquee just above Contact) */}
      <section className="w-full bg-zinc-100/60 dark:bg-zinc-950/70 border-b border-zinc-200/80 dark:border-zinc-800/80 py-16 sm:py-24">
        <FeedbackMarquee />
      </section>

      {/* 7. Call To Action & Contact Banner */}
      <section className="w-full bg-gradient-to-b from-zinc-50/50 to-background dark:from-zinc-950/40 dark:to-background py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-zinc-100 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-8 sm:p-12 overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open for Contracts & Tech Advisory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                Ready to build or scale your next system?
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Whether you need a Flutter BLE companion app, a resilient event-driven Node.js backend, or telemetry infrastructure, let&apos;s talk architecture and timeline.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity text-center"
              >
                Start a Conversation
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-sm transition-colors text-center"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
