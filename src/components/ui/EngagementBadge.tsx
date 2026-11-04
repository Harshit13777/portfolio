import React from 'react';
import { Briefcase, Building2, Lock, Sparkles, Globe } from 'lucide-react';
import { EngagementType } from '@/types/project';

interface Props {
  type: EngagementType;
  companyName?: string;
  className?: string;
}

export function EngagementBadge({ type, companyName, className = '' }: Props) {
  const getBadgeConfig = () => {
    switch (type) {
      case 'Full-time':
        return {
          icon: Building2,
          label: companyName ? `${companyName} • Full-time` : 'Full-time',
          style: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
        };
      case 'Freelance Contract':
        return {
          icon: Briefcase,
          label: companyName ? `${companyName} • Contract` : 'Freelance Contract',
          style: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
        };
      case 'Client Project (NDA)':
        return {
          icon: Lock,
          label: companyName ? `${companyName} • NDA` : 'Client Project (NDA)',
          style: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
        };
      case 'Startup MVP':
        return {
          icon: Sparkles,
          label: companyName ? `${companyName} • MVP` : 'Startup MVP',
          style: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
        };
      case 'Open-Source':
      default:
        return {
          icon: Globe,
          label: companyName ? `${companyName} • Open Source` : 'Open Source',
          style: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors shadow-xs ${config.style} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="truncate">{config.label}</span>
    </span>
  );
}
