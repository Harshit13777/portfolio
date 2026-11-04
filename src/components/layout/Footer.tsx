import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUpRight, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { SOCIAL_LINKS } from '@/data/experience';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Harshit Soni</span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Full-Stack Software Engineer & IoT / Mobile Specialist. Specializing in offline-first React Native apps, BLE hardware protocols, and resilient backend systems.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                aria-label="Email"
                className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider mb-4 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  All Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Freelance Services & Sprints
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Interactive Resume
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Status & Contact */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider mb-4 font-mono">
              Availability
            </h4>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for Opportunities</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Accepting select freelance contracts, mobile MVP builds, and high-impact full-time roles.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 pt-1"
              >
                Book a consultation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Harshit Soni. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Engineered with Next.js & Tailwind CSS • Light & Dark Mode
          </p>
        </div>
      </div>
    </footer>
  );
}
