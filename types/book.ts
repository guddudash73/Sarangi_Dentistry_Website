export type Book = {
  id: string;
  title: string;

  /**
   * SEO slug/path returned by DCM CMS.
   */
  slug?: string;
  path: string;

  subtitle?: string;

  coverImage: string;

  thumbnailUrl?: string;
  cardUrl?: string;
  fullUrl?: string;

  width?: number;
  height?: number;

  publishedYear: string;
  genre: string;
  synopsis: string;
  excerpt?: string;
  buyLink?: string;

  pinned?: boolean;

  rating?: number;
  testimonial?: {
    quote: string;
    author?: string;
  };

  bodyHtml: string;
};
