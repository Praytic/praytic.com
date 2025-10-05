export interface SocialLink {
  platform: 'github' | 'itch' | 'youtube' | 'website';
  url: string;
}

export interface Project {
  id: string;
  icon: string;
  title: string;
  description: string;
  socialLinks: SocialLink[];
  status: 'Live' | 'Dev' | 'PoC';
  isDiscovered: boolean;
  url?: string;
}
