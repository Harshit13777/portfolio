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
  liveUrl?: string;          // Production live site / app
  videoUrl?: string;         // Full walkthrough: YouTube / Loom / MP4
  clipUrl?: string;          // Short 5-15s teaser MP4 / WebM / GIF
  githubUrl?: string;        // Source repository
  linkedInUrl?: string;      // LinkedIn showcase post
  appStoreUrl?: string;      // Apple App Store link
  playStoreUrl?: string;     // Google Play Store link
  docsUrl?: string;          // Documentation link
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
  clipUrl?: string;          // Short teaser clip
  gallery?: string[];        // Array of extra screenshot / architecture diagram URLs
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
