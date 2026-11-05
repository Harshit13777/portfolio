import { 
  ProjectDetail, 
  ProjectSummary, 
  ProjectFilter,
  TechStackFilterData,
  TechTagMeta,
  TechStackDomainMeta,
  EngagementTypeMeta
} from '@/types/project';
import rawProjectsJson from '@/data/projects.json';
import rawSkillsJson from '@/data/skills.json';

interface SkillJsonTrack {
  id: string;
  category: string;
  items: { name: string }[];
}

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

  /** Fetch dynamically computed tech stack filter options */
  getTechStackFilters(): Promise<TechStackFilterData>;

  /** Fetch dynamically computed engagement types */
  getEngagementTypes(): Promise<EngagementTypeMeta[]>;
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

    if (filter?.tag && filter.tag !== 'all') {
      result = result.filter((p) => 
        p.tags.some((t) => t.toLowerCase() === filter.tag!.toLowerCase())
      );
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

  async getTechStackFilters(): Promise<TechStackFilterData> {
    const rawSkills = rawSkillsJson as unknown as SkillJsonTrack[];
    
    // 1. Calculate tag frequency from all projects
    const tagCountMap = new Map<string, number>();
    for (const p of this.projects) {
      for (const t of p.tags) {
        tagCountMap.set(t, (tagCountMap.get(t) || 0) + 1);
      }
    }

    // Popular tags sorted by usage frequency descending
    const popularTags: TechTagMeta[] = Array.from(tagCountMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // 2. Build Tech Stack Domains
    // Helper to test if a project tag relates to a skill track
    const domainMatchesTag = (trackItems: string[], tag: string): boolean => {
      const lowerTag = tag.toLowerCase();
      return trackItems.some((skill) => {
        const lowerSkill = skill.toLowerCase();
        return (
          lowerTag.includes(lowerSkill) ||
          lowerSkill.includes(lowerTag) ||
          // Specific mappings for abbreviations
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
    };

    const domains: TechStackDomainMeta[] = [
      {
        id: 'all',
        label: 'All Technologies',
        count: this.projects.length,
        skills: [],
      },
    ];

    for (const track of rawSkills) {
      const trackSkills = track.items.map((i) => i.name);
      
      // Count projects that have at least one tag matching this domain
      const matchingProjects = this.projects.filter((p) =>
        p.tags.some((t) => domainMatchesTag(trackSkills, t))
      );

      domains.push({
        id: track.id,
        label: track.category,
        count: matchingProjects.length,
        skills: trackSkills,
      });
    }

    return { domains, popularTags };
  }

  async getEngagementTypes(): Promise<EngagementTypeMeta[]> {
    const counts = new Map<string, number>();
    for (const p of this.projects) {
      const eng = p.company.engagementType;
      counts.set(eng, (counts.get(eng) || 0) + 1);
    }

    const result: EngagementTypeMeta[] = [
      { id: 'all', label: 'All Engagements', count: this.projects.length }
    ];

    for (const [id, count] of counts.entries()) {
      result.push({
        id,
        label: id === 'Client Project (NDA)' ? 'Client (NDA)' : id,
        count,
      });
    }

    return result;
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
