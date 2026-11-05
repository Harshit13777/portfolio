'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Layers, 
  Smartphone, 
  Server, 
  Cpu, 
  Database, 
  Briefcase, 
  Tag, 
  X,
  Sparkles
} from 'lucide-react';
import { 
  ProjectSummary, 
  TechStackFilterData, 
  EngagementTypeMeta 
} from '@/types/project';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { TechBadge } from '@/components/ui/TechBadge';

interface Props {
  projects: ProjectSummary[];
  techFilters?: TechStackFilterData;
  engagementTypes?: EngagementTypeMeta[];
}

// Icon helper for tech domains
function getDomainIcon(domainId: string) {
  switch (domainId) {
    case 'frontend-mobile':
      return Smartphone;
    case 'backend-cloud':
      return Server;
    case 'iot-protocols':
      return Cpu;
    case 'databases-state':
      return Database;
    case 'all':
    default:
      return Layers;
  }
}

export function ProjectsDirectory({ 
  projects, 
  techFilters, 
  engagementTypes 
}: Props) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  const initialTag = searchParams.get('tag') || '';
  const initialDomain = searchParams.get('techDomain') || 'all';

  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [selectedEngagement, setSelectedEngagement] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  // Sync with searchParams if navigated with URL parameters
  useEffect(() => {
    const q = searchParams.get('search');
    const t = searchParams.get('tag');
    const d = searchParams.get('techDomain');
    if (q) setSearchQuery(q);
    if (t) setSelectedTag(t);
    if (d) setSelectedDomain(d);
  }, [searchParams]);

  // Compute domains and popular tags with fallbacks if props aren't provided
  const domains = useMemo(() => {
    if (techFilters?.domains && techFilters.domains.length > 0) {
      return techFilters.domains;
    }
    return [
      { id: 'all', label: 'All Technologies', count: projects.length, skills: [] }
    ];
  }, [techFilters, projects.length]);

  const popularTags = useMemo(() => {
    if (techFilters?.popularTags && techFilters.popularTags.length > 0) {
      return techFilters.popularTags.slice(0, 10);
    }
    // Fallback: derive from projects
    const tagMap = new Map<string, number>();
    projects.forEach((p) => {
      p.tags.forEach((t) => tagMap.set(t, (tagMap.get(t) || 0) + 1));
    });
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [techFilters, projects]);

  const engagements = useMemo(() => {
    if (engagementTypes && engagementTypes.length > 0) {
      return engagementTypes;
    }
    return [
      { id: 'all', label: 'All Engagements', count: projects.length }
    ];
  }, [engagementTypes, projects.length]);

  // Filtered projects computation
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Tech Domain filter
      if (selectedDomain !== 'all') {
        const domain = domains.find((d) => d.id === selectedDomain);
        if (domain && domain.skills.length > 0) {
          const hasMatchingSkill = project.tags.some((tag) => {
            const lowerTag = tag.toLowerCase();
            return domain.skills.some((skill) => {
              const lowerSkill = skill.toLowerCase();
              return (
                lowerTag.includes(lowerSkill) ||
                lowerSkill.includes(lowerTag) ||
                (lowerTag === 'ble' && lowerSkill.includes('bluetooth')) ||
                (lowerTag.includes('websocket') && lowerSkill.includes('websocket')) ||
                (lowerTag.includes('django') && lowerSkill.includes('django')) ||
                (lowerTag.includes('react') && lowerSkill.includes('react')) ||
                (lowerTag.includes('spring') && lowerSkill.includes('spring')) ||
                (lowerTag.includes('embedded') && lowerSkill.includes('embedded')) ||
                (lowerTag.includes('time-series') && lowerSkill.includes('database')) ||
                (lowerTag.includes('encryption') && lowerSkill.includes('encryption')) ||
                (lowerTag.includes('offline') && lowerSkill.includes('offline'))
              );
            });
          });
          if (!hasMatchingSkill) return false;
        }
      }

      // 2. Specific Tech Tag filter
      if (selectedTag) {
        const matchesTag = project.tags.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        );
        if (!matchesTag) return false;
      }

      // 3. Engagement filter
      if (
        selectedEngagement !== 'all' &&
        project.company.engagementType !== selectedEngagement
      ) {
        return false;
      }

      // 4. Search query (title, subtitle, company name, tags)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesSubtitle = project.subtitle.toLowerCase().includes(query);
        const matchesCompany = project.company.name.toLowerCase().includes(query);
        const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesSubtitle && !matchesCompany && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [projects, selectedDomain, selectedTag, selectedEngagement, searchQuery, domains]);

  const handleResetFilters = () => {
    setSelectedDomain('all');
    setSelectedTag('');
    setSelectedEngagement('all');
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedDomain !== 'all' || 
    selectedTag !== '' || 
    selectedEngagement !== 'all' || 
    searchQuery.trim() !== '';

  return (
    <div className="space-y-8">
      {/* Search & Tech Stack Filter Studio */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-5">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, technology (e.g. BLE, React Native, Django), or company..."
            className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tech Stack Domains (Derived from Data Layer) */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Filter by Tech Stack Domain
            </span>
            {selectedDomain !== 'all' && (
              <button
                onClick={() => setSelectedDomain('all')}
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-mono"
              >
                Show All Domains
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => {
              const Icon = getDomainIcon(domain.id);
              const isActive = selectedDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => {
                    setSelectedDomain(domain.id);
                  }}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950 font-semibold shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{domain.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-emerald-700/60 dark:bg-zinc-950/30 text-white dark:text-zinc-950'
                        : 'bg-zinc-200 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {domain.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular Tech Stack Tags & Engagement Dropdown */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tech Tag Chips */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <Tag className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Tech Stack Tags:
              </span>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag('')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono hover:bg-emerald-500/20"
                >
                  <span>{selectedTag}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {popularTags.map((t) => {
                const isTagActive = selectedTag.toLowerCase() === t.name.toLowerCase();
                return (
                  <button
                    key={t.name}
                    onClick={() => {
                      setSelectedTag(isTagActive ? '' : t.name);
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                      isTagActive
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold shadow-sm'
                        : 'bg-zinc-100/90 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white border border-zinc-200/60 dark:border-zinc-800'
                    }`}
                  >
                    <TechBadge
                      name={t.name}
                      size="xs"
                      showLabel={false}
                      className="bg-transparent dark:bg-transparent border-0 p-0 text-inherit pointer-events-none"
                    />
                    <span>{t.name}</span>
                    <span className="text-[10px] opacity-60">({t.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Engagement Select Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 pt-2 md:pt-0">
            <Briefcase className="w-4 h-4 text-zinc-400 shrink-0" />
            <select
              value={selectedEngagement}
              onChange={(e) => setSelectedEngagement(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 focus:border-emerald-500 outline-none cursor-pointer"
            >
              {engagements.map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.label} ({eng.count})
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        <span>
          Showing {filteredProjects.length} of {projects.length} project
          {projects.length === 1 ? '' : 's'}
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
            No engineering projects match this tech stack
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Try choosing a different technical domain or clear specific technology tags to view more case studies.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 font-medium"
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
}
