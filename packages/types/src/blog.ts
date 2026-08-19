export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'panchang-guide' | 'muhurat-guide' | 'kundali' | 'festivals' | 'rituals';
  author: {
    name: string;
    avatar?: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl?: string;
    keywords: string[];
  };
}