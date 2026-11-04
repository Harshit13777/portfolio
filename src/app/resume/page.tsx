import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Download, 
  Briefcase, 
  GraduationCap, 
  Code, 
  MapPin, 
  Mail, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { WORK_EXPERIENCE, TECHNICAL_SKILLS, SOCIAL_LINKS } from '@/data/experience';

export const metadata: Metadata = {
  title: 'Resume & Verified Experience | Harshit Soni',
  description: 'Technical resume of Harshit Soni: Full-Stack & IoT / Mobile Software Engineer. Employment history at EVI Technologies, Veblika Software, and skills matrix.',
};

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            Curriculum Vitae
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {SOCIAL_LINKS.name}
          </h1>
          <p className="text-base text-emerald-600 dark:text-emerald-400 font-semibold">
            {SOCIAL_LINKS.title}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              {SOCIAL_LINKS.location}
            </span>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              {SOCIAL_LINKS.email}
            </a>
          </div>
        </div>

        {/* PDF Download and Socials */}
        <div className="flex flex-col sm:items-end gap-3 shrink-0">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 font-semibold text-xs shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF Resume
          </a>
          <div className="flex items-center gap-2">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 hover:bg-blue-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors shadow-xs"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 1. Professional Experience */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-mono">
          <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Professional Experience</span>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
          {WORK_EXPERIENCE.map((exp) => (
            <div key={exp.id} className="relative pl-10 space-y-3">
              {/* Dot */}
              <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-slate-50 dark:bg-zinc-950 border-2 border-emerald-600 dark:border-emerald-500" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {exp.role}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {exp.company} <span className="text-zinc-500 dark:text-zinc-400 font-normal">({exp.location})</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    {exp.period}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {exp.summary}
              </p>

              {/* Achievements */}
              <ul className="space-y-2 pt-1">
                {exp.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/80 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Technical Skills Matrix */}
      <section className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-mono">
          <Code className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Technical Competencies & Matrix</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TECHNICAL_SKILLS.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800 space-y-3 shadow-xs"
            >
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {cat.title}
              </h4>
              <div className="space-y-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between text-xs py-1 border-b border-zinc-100 dark:border-zinc-800/40 last:border-0"
                  >
                    <span className="text-zinc-800 dark:text-zinc-200 font-medium">{skill.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                        skill.level === 'Expert'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30'
                          : skill.level === 'Advanced'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/30'
                          : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Education */}
      <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-mono">
          <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Education & Credentials</span>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Bachelor of Technology (B.Tech) in Computer Science & Engineering
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              Strong focus on Distributed Systems, Computer Networks, and Embedded Computing
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 shrink-0 font-medium">
            Graduated
          </span>
        </div>
      </section>

      {/* Recruiter CTA */}
      <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 text-center space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Looking for a Senior Engineer?</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          I am currently considering select technical roles and long-term contracts. Let’s connect to discuss how I can contribute to your engineering team.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 font-semibold text-xs shadow-md transition-colors"
          >
            Initiate Interview Conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
