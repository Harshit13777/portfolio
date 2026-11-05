'use client';

import React, { useState } from 'react';

interface Props {
  src?: string;
  fallback?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

export function Avatar({
  src,
  fallback = 'HS',
  alt = 'Harshit Soni',
  size = 'md',
  showStatus = true,
  className = '',
}: Props) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg',
    xl: 'w-28 h-28 sm:w-36 sm:h-36 text-2xl',
  };

  const statusDotSizes = {
    sm: 'w-2.5 h-2.5 bottom-0 right-0 ring-2',
    md: 'w-3 h-3 bottom-0.5 right-0.5 ring-2',
    lg: 'w-4 h-4 bottom-1 right-1 ring-3',
    xl: 'w-5 h-5 bottom-1.5 right-1.5 ring-4',
  };

  const hasValidImage = src && !imageError;

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {/* Outer Glow Ring */}
      <div
        className={`rounded-full overflow-hidden border-2 border-theme-primary shadow-theme-glow transition-all ${sizeClasses[size]}`}
      >
        {hasValidImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-bold font-mono bg-gradient-to-br from-zinc-800 to-zinc-950 text-theme-primary border border-white/10 select-none">
            {fallback}
          </div>
        )}
      </div>

      {/* Online Status Pill */}
      {showStatus && (
        <span
          className={`absolute rounded-full bg-emerald-500 ring-white dark:ring-zinc-950 animate-pulse ${statusDotSizes[size]}`}
          title="Available for hire"
        />
      )}
    </div>
  );
}
