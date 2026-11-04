export type EngagementType = 
  | 'Full-time' 
  | 'Freelance Contract' 
  | 'Client Project (NDA)' 
  | 'Open-Source' 
  | 'Startup MVP';

export interface CompanyEngagement {
  name: string;
  logo?: string;
  role: string;
  engagementType: EngagementType;
  duration: string;
  location?: string;
}

export interface ProjectLinks {
  liveUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  docsUrl?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatarUrl?: string;
  linkedInProfile?: string;
}

export interface CaseStudyDetail {
  overview: string;
  challenge: string;
  solution: string;
  architecturePoints: string[];
  engineeringHighlights: string[];
  results: { label: string; value: string }[];
}

/**
 * Lightweight Project Summary Entity
 * Used for Home Page featured highlights and /projects directory catalog cards.
 * Avoids over-fetching full case study text in database queries.
 */
export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'mobile' | 'iot' | 'fullstack' | 'automation';
  featured: boolean;
  order: number;
  thumbnail: string;
  tags: string[];
  company: CompanyEngagement;
  links: ProjectLinks;
  topMetric?: { label: string; value: string };
  publishedAt: string;
}

/**
 * In-Depth Project Detail Entity
 * Used for /projects/[slug] deep-dive technical case study pages.
 */
export interface ProjectDetail extends ProjectSummary {
  bannerImage?: string;
  testimonial?: Testimonial;
  caseStudy: CaseStudyDetail;
}

/**
 * Backward compatibility alias
 */
export type Project = ProjectDetail;

export interface ProjectFilter {
  category?: string;
  engagementType?: string;
  searchQuery?: string;
}
