export type BlogPost = {
  id: string;
  title: string;

  /**
   * SEO slug/path returned by DCM CMS.
   */
  slug?: string;
  path: string;

  date: string;
  author: string;
  category: string;

  /**
   * Backward-compatible image URL.
   * Prefer cardUrl/fullUrl for optimized rendering.
   */
  image: string;

  thumbnailUrl?: string;
  cardUrl?: string;
  fullUrl?: string;

  width?: number;
  height?: number;

  excerpt: string;
  readTime: string;
  featured?: boolean;
  bodyHtml: string;
};

export type BlogsResponse = {
  items: BlogPost[];
};
