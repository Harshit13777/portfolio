import { 
  ProjectDetail, 
  ProjectSummary, 
  ProjectFilter 
} from '@/types/project';
import rawProjectsJson from '@/data/projects.json';

/**
 * Formal Repository Interface Contract
 * 
 * Defines abstract data access operations.
 * Server Components consume this contract without knowing
 * whether data originates from static JSON, Prisma ORM,
 * Supabase, PostgreSQL, or a Headless CMS API.
 */
export interface IProjectRepository {
  /** Fetch top featured projects for the Home Page */
  getFeaturedProjects(): Promise<ProjectSummary[]>;

  /** Fetch all projects with optional filtering for the Projects Hub */
  getAllProjects(filter?: ProjectFilter): Promise<ProjectSummary[]>;

  /** Fetch complete in-depth case study for /projects/[slug] */
  getProjectBySlug(slug: string): Promise<ProjectDetail | null>;

  /** Fetch all slugs for Next.js generateStaticParams() */
  getAllProjectSlugs(): Promise<string[]>;

  /** Fetch adjacent projects for previous/next navigation */
  getAdjacentProjects(slug: string): Promise<{ prev: ProjectSummary | null; next: ProjectSummary | null }>;
}

/**
 * Helper to map full project detail into lightweight summary
 */
function toProjectSummary(p: ProjectDetail): ProjectSummary {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    featured: p.featured,
    order: p.order,
    thumbnail: p.thumbnail,
    tags: p.tags,
    company: p.company,
    links: p.links,
    topMetric: p.caseStudy?.results?.[0],
    publishedAt: p.publishedAt,
  };
}

/**
 * JSON Storage Adapter
 * Used for zero-cost, blazing-fast static builds on GitHub Pages.
 */
export class JsonProjectRepository implements IProjectRepository {
  private projects: ProjectDetail[];

  constructor() {
    this.projects = (rawProjectsJson as unknown as ProjectDetail[]).sort(
      (a, b) => a.order - b.order
    );
  }

  async getFeaturedProjects(): Promise<ProjectSummary[]> {
    const featured = this.projects.filter((p) => p.featured);
    return featured.map(toProjectSummary);
  }

  async getAllProjects(filter?: ProjectFilter): Promise<ProjectSummary[]> {
    let result = this.projects;

    if (filter?.category && filter.category !== 'all') {
      result = result.filter((p) => p.category === filter.category);
    }

    if (filter?.engagementType && filter.engagementType !== 'all') {
      result = result.filter((p) => p.company.engagementType === filter.engagementType);
    }

    if (filter?.searchQuery && filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.company.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result.map(toProjectSummary);
  }

  async getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
    const found = this.projects.find((p) => p.slug === slug);
    return found ? { ...found } : null;
  }

  async getAllProjectSlugs(): Promise<string[]> {
    return this.projects.map((p) => p.slug);
  }

  async getAdjacentProjects(slug: string): Promise<{ prev: ProjectSummary | null; next: ProjectSummary | null }> {
    const currentIndex = this.projects.findIndex((p) => p.slug === slug);
    if (currentIndex === -1) return { prev: null, next: null };

    const prevDetail = currentIndex > 0 ? this.projects[currentIndex - 1] : null;
    const nextDetail = currentIndex < this.projects.length - 1 ? this.projects[currentIndex + 1] : null;

    return {
      prev: prevDetail ? toProjectSummary(prevDetail) : null,
      next: nextDetail ? toProjectSummary(nextDetail) : null,
    };
  }
}

/**
 * Repository Factory
 * 
 * Provides a single access point. In the future, if you switch
 * to a Database or API, simply return a DbProjectRepository here.
 */
let repositoryInstance: IProjectRepository | null = null;

export function getProjectRepository(): IProjectRepository {
  if (!repositoryInstance) {
    // In the future:
    // if (process.env.DATA_SOURCE === 'database') {
    //   repositoryInstance = new DbProjectRepository();
    // } else {
    repositoryInstance = new JsonProjectRepository();
    // }
  }
  return repositoryInstance;
}
