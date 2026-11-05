import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllProjects, getTechStackFilters, getEngagementTypes } from '@/lib/projects.service';
import { ProjectsDirectory } from '@/components/projects/ProjectsDirectory';

export const metadata: Metadata = {
  title: 'Engineering Projects & Case Studies | Harshit Soni',
  description: 'Explore full-stack, React Native, and IoT projects engineered by Harshit Soni. Includes BLE communication layers, distributed load balancers, and workflow automation engines.',
};

export default async function ProjectsPage() {
  const [projects, techFilters, engagementTypes] = await Promise.all([
    getAllProjects(),
    getTechStackFilters(),
    getEngagementTypes(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-8">
      {/* Page Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
          Portfolio Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Featured Engineering Case Studies
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Detailed technical breakdowns of production systems, offline-first mobile applications, and embedded IoT architectures built for companies and private clients.
        </p>
      </div>

      {/* Filterable Directory */}
      <Suspense fallback={<div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading projects archive...</div>}>
        <ProjectsDirectory 
          projects={projects} 
          techFilters={techFilters}
          engagementTypes={engagementTypes}
        />
      </Suspense>
    </div>
  );
}
