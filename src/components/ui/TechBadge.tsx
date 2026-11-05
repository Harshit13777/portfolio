'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bluetooth, 
  Radio, 
  Wifi, 
  Zap, 
  Cpu, 
  Layers, 
  Code, 
  Server, 
  Database, 
  Terminal, 
  Shield, 
  Activity 
} from 'lucide-react';
import { getTechItem, TechItem } from '@/data/techStackRegistry';

export interface TechBadgeProps {
  name: string;
  size?: 'xs' | 'sm' | 'md';
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  href?: string;
}

export function TechBadge({
  name,
  size = 'sm',
  showIcon = true,
  showLabel = true,
  className = '',
  onClick,
  interactive = false,
  href,
}: TechBadgeProps) {
  const [imageError, setImageError] = useState(false);
  const tech: TechItem = getTechItem(name);

  // Size configurations
  const sizeClasses = {
    xs: {
      pill: 'px-2 py-0.5 text-[11px] gap-1.5',
      icon: 'w-3 h-3',
    },
    sm: {
      pill: 'px-2.5 py-1 text-xs gap-1.5',
      icon: 'w-3.5 h-3.5',
    },
    md: {
      pill: 'px-3 py-1.5 text-sm gap-2',
      icon: 'w-4 h-4',
    },
  }[size];

  const renderIcon = () => {
    if (!showIcon) return null;

    if (tech.iconUrl && !imageError) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tech.iconUrl}
          alt={tech.name}
          className={`${sizeClasses.icon} object-contain shrink-0`}
          loading="lazy"
          onError={() => setImageError(true)}
        />
      );
    }

    const iconColor = tech.iconColor || 'currentColor';
    const fallbackProps = {
      className: `${sizeClasses.icon} shrink-0`,
      style: { color: iconColor },
    };

    switch (tech.fallbackIcon) {
      case 'bluetooth':
        return <Bluetooth {...fallbackProps} />;
      case 'radio':
        return <Radio {...fallbackProps} />;
      case 'wifi':
        return <Wifi {...fallbackProps} />;
      case 'zap':
        return <Zap {...fallbackProps} />;
      case 'cpu':
        return <Cpu {...fallbackProps} />;
      case 'layers':
        return <Layers {...fallbackProps} />;
      case 'server':
        return <Server {...fallbackProps} />;
      case 'database':
        return <Database {...fallbackProps} />;
      case 'terminal':
        return <Terminal {...fallbackProps} />;
      case 'shield':
        return <Shield {...fallbackProps} />;
      case 'activity':
        return <Activity {...fallbackProps} />;
      case 'code':
      default:
        return <Code {...fallbackProps} />;
    }
  };

  const isClickable = Boolean(onClick || href || interactive);

  const baseClasses = `inline-flex items-center rounded-lg font-medium transition-all ${sizeClasses.pill} ${
    isClickable
      ? 'bg-zinc-100 hover:bg-zinc-200/90 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/90 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-xs hover:shadow-sm active:scale-95'
      : 'bg-zinc-100/90 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-800/80'
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {renderIcon()}
        {showLabel && <span className="truncate">{name}</span>}
      </Link>
    );
  }

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      className={baseClasses}
    >
      {renderIcon()}
      {showLabel && <span className="truncate">{name}</span>}
    </Component>
  );
}
