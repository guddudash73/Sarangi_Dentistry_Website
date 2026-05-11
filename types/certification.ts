// types/certification.ts
export type CertificationItem = {
  id: string;
  title: string;

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

  issuer?: string;
  year?: string;
  category?: string;
};
