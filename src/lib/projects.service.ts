import { 
  ProjectDetail, 
  ProjectSummary, 
  ProjectFilter, 
  Testimonial,
  TechStackFilterData,
  EngagementTypeMeta
} from '@/types/project';
import { getProjectRepository } from '@/lib/projects.repository';
import projectsJson from '@/data/projects.json';

/**
 * High-Level Project Service Layer
 * 
 * Provides typed methods for Server Components.
 * Delegates all underlying storage retrieval to the Repository Layer.
 */

export async function getAllProjects(filter?: ProjectFilter): Promise<ProjectSummary[]> {
  const repo = getProjectRepository();
  return repo.getAllProjects(filter);
}

export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  const repo = getProjectRepository();
  return repo.getFeaturedProjects();
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const repo = getProjectRepository();
  return repo.getProjectBySlug(slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const repo = getProjectRepository();
  return repo.getAllProjectSlugs();
}

export async function getAdjacentProjects(slug: string): Promise<{ prev: ProjectSummary | null; next: ProjectSummary | null }> {
  const repo = getProjectRepository();
  return repo.getAdjacentProjects(slug);
}

export async function getTechStackFilters(): Promise<TechStackFilterData> {
  const repo = getProjectRepository();
  return repo.getTechStackFilters();
}

export async function getEngagementTypes(): Promise<EngagementTypeMeta[]> {
  const repo = getProjectRepository();
  return repo.getEngagementTypes();
}

export async function getFeaturedTestimonials(): Promise<{ testimonial: Testimonial; projectName: string }[]> {
  const allProjects = projectsJson as unknown as ProjectDetail[];
  return allProjects
    .filter((p) => p.featured && p.testimonial)
    .map((p) => ({
      testimonial: p.testimonial!,
      projectName: p.title,
    }));
}
