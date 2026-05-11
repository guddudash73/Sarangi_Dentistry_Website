// types/photography.ts
export type Photo = {
  id: string;
  title: string;
  alt?: string;

  /**
   * Backward-compatible image URL.
   * Prefer cardUrl/fullUrl for optimized rendering.
   */
  src: string;

  thumbnailUrl?: string;
  cardUrl?: string;
  fullUrl?: string;

  width?: number;
  height?: number;

  location?: string;
  takenAt?: string;
  camera?: string;
  description?: string;
  tags?: string[];
  spanClass?: string;

  /**
   * Used by the home-page Beyond Dentistry photography card.
   */
  featured?: boolean;
};

export type PhotoAlbum = {
  id: string;
  title: string;
  coverPhotoId: string;
  description?: string;
  photos: Photo[];
};
