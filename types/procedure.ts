export type ProcedureStep = {
  title: string;
  description: string;
};

export type ProcedureFaq = {
  question: string;
  answer: string;
};

export type ProcedureItem = {
  id: string;
  title: string;

  /**
   * SEO slug returned by DCM CMS.
   */
  slug?: string;

  path: string;

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

  shortText: string;
  longDescription: string;
  steps: ProcedureStep[];
  faqs: ProcedureFaq[];
  bodyHtml: string;
};

export type ProceduresResponse = ProcedureItem[];
