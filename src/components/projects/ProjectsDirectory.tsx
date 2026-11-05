'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Layers, Smartphone, Cpu, Zap, Briefcase } from 'lucide-react';
import { ProjectSummary } from '@/types/project';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface Props {
  projects: ProjectSummary[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'mobile', label: 'Mobile & BLE', icon: Smartphone },
  { id: 'iot', label: 'IoT & Telemetry', icon: Cpu },
  { id: 'automation', label: 'Automation & Cloud', icon: Zap },
];

const ENGAGEMENTS: { id: string; label: string }[] = [
  { id: 'all', label: 'All Engagements' },
  { id: 'Full-time', label: 'Full-time' },
  { id: 'Freelance Contract', label: 'Freelance / Contract' },
  { id: 'Client Project (NDA)', label: 'Client (NDA)' },
];

export function ProjectsDirectory({ projects }: Props) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || searchParams.get('tag') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEngagement, setSelectedEngagement] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('tag');
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }

      // Engagement filter
      if (
        selectedEngagement !== 'all' &&
        project.company.engagementType !== selectedEngagement
      ) {
        return false;
      }

      // Search query (title, subtitle, company name, tags)
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
  }, [projects, selectedCategory, selectedEngagement, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, technology (e.g. BLE, React Native, Django), or company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950 font-semibold shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Engagement Select */}
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-zinc-400 shrink-0" />
            <select
              value={selectedEngagement}
              onChange={(e) => setSelectedEngagement(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 focus:border-emerald-500 outline-none"
            >
              {ENGAGEMENTS.map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.label}
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
        {(selectedCategory !== 'all' || selectedEngagement !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedEngagement('all');
              setSearchQuery('');
            }}
            className="text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Reset Filters
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
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">No matching projects found</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search terms or clearing category and engagement filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedEngagement('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 font-medium"
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
}
