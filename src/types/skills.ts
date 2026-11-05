export interface SkillItem {
  name: string;
  iconUrl?: string;
  fallbackIcon?: 'wifi' | 'zap' | 'radio' | 'cpu' | 'layers' | 'code';
  iconColor?: string;
}

export interface SkillCategoryTrack {
  id: string;
  category: string;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  items: SkillItem[];
}
