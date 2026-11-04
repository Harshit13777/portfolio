import React from 'react';
import { Quote } from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/Icons';
import { Testimonial } from '@/types/project';

interface Props {
  testimonial: Testimonial;
  projectName?: string;
}

export function TestimonialCard({ testimonial, projectName }: Props) {
  return (
    <div className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm flex flex-col justify-between">
      <Quote className="w-8 h-8 text-emerald-500/20 mb-3" />
      <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed italic mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{testimonial.author}</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {testimonial.title} • {testimonial.company}
          </p>
          {projectName && (
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400/90 font-medium mt-0.5">Project: {projectName}</p>
          )}
        </div>

        {testimonial.linkedInProfile && (
          <a
            href={testimonial.linkedInProfile}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Author LinkedIn"
            className="p-2 rounded-lg bg-zinc-100 hover:bg-blue-50 dark:bg-zinc-800 dark:hover:bg-blue-900/30 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
