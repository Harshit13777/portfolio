'use client';

import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/Icons';
import { Testimonial } from '@/types/project';

interface Props {
  testimonials: { testimonial: Testimonial; projectName: string }[];
}

export function TestimonialsRotator({ testimonials }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [testimonials.length, isPaused]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
          Verified Endorsements
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
          Feedback from Engineering Leaders
        </h2>
      </div>

      <div
        className="relative max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-xl backdrop-blur-xs transition-all"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Quote className="w-10 h-10 text-accent/20 mb-4" />

        <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed italic mb-8 min-h-[72px] transition-opacity duration-300">
          &ldquo;{current.testimonial.quote}&rdquo;
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {current.testimonial.author}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {current.testimonial.title} • {current.testimonial.company}
            </p>
            {current.projectName && (
              <p className="text-xs text-accent font-medium mt-0.5">
                Project: {current.projectName}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {current.testimonial.linkedInProfile && (
              <a
                href={current.testimonial.linkedInProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-100 hover:bg-blue-50 dark:bg-zinc-800 dark:hover:bg-blue-900/30 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mr-2"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}

            {/* Step Indicators */}
            <div className="flex items-center gap-1.5 px-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-accent'
                      : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                  }`}
                  aria-label={`Jump to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
