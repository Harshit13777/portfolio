export interface FeedbackItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  quote: string;
  rating: number; // 1 - 5
  projectContext?: string;
  linkedinUrl?: string;      // LinkedIn profile link (optional)
  linkedInProfile?: string;  // Alias for backwards compatibility
  verified?: boolean;
}
