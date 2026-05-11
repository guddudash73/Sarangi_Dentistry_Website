// types/gallery.ts
export type GalleryImage = {
  id: string;
  title: string;
  alt: string;

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

  category: string;
  description: string;
};
