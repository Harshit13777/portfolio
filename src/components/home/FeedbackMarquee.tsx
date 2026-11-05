'use client';

import React from 'react';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import { FeedbackItem } from '@/types/feedback';
import { CLIENT_FEEDBACK } from '@/data/feedback';
import { LinkedinIcon } from '@/components/ui/Icons';

interface FeedbackCardProps {
  item: FeedbackItem;
}

function FeedbackCard({ item }: FeedbackCardProps) {
  const linkedin = item.linkedinUrl || item.linkedInProfile;

  return (
    <div className="shrink-0 w-[340px] sm:w-[420px] p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-accent/40 dark:hover:border-zinc-700 transition-all flex flex-col justify-between select-none group">
      <div>
        {/* Top: 5-Star Rating & Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(item.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-amber-400 text-amber-400 dark:fill-accent dark:text-accent"
              />
            ))}
          </div>
          <Quote className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-accent transition-colors" />
        </div>

        {/* Description Text */}
        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal mb-5 line-clamp-4">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Bottom Profile Row */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar with fallback ring */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0">
            {item.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.avatarUrl}
                alt={item.author}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-zinc-700 dark:text-zinc-300">
                {item.author.slice(0, 2).toUpperCase()}
              </div>
            )}
            {item.verified && (
              <span
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-accent text-accent-foreground flex items-center justify-center ring-2 ring-white dark:ring-zinc-900"
                title="Verified Client"
              >
                <CheckCircle2 className="w-2.5 h-2.5" />
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-accent transition-colors">
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {item.author}
                </a>
              ) : (
                item.author
              )}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {item.role} • <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.company}</span>
            </p>
            {item.projectContext && (
              <span className="inline-block text-[11px] font-mono text-accent truncate mt-0.5">
                {item.projectContext}
              </span>
            )}
          </div>
        </div>

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-zinc-100 hover:bg-blue-50 dark:bg-zinc-800 dark:hover:bg-blue-900/40 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
            title={`${item.author}'s LinkedIn Profile`}
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export function FeedbackMarquee() {
  // Duplicate items array to make the infinite continuous ticker seamless
  const duplicatedFeedback = [...CLIENT_FEEDBACK, ...CLIENT_FEEDBACK];

  return (
    <div className="w-full space-y-8">
      {/* Header without pause button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Client & Peer Endorsements</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Trusted by Engineering Teams & Founders
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
            Authentic feedback from technical leaders on production delivery across Bluetooth mobile apps, IoT telemetry, and distributed backends.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Track with CSS Animation */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Ambient Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-zinc-100/90 dark:from-zinc-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-zinc-100/90 dark:from-zinc-950 to-transparent z-10" />

        {/* Animated Row */}
        <div className="feedback-track flex items-stretch gap-6 w-max">
          {duplicatedFeedback.map((item, idx) => (
            <FeedbackCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes feedbackMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .feedback-track {
          animation: feedbackMarqueeScroll 38s linear infinite;
          will-change: transform;
        }

        .feedback-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
