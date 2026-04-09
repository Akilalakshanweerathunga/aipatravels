export type Locale = 'en' | 'it' | 'kr' | 'fr';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  language: Locale;
  translation_group_id: string;
  published_at: string;
}