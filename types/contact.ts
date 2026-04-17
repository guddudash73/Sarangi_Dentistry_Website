export type ContactInfo = {
  heading: string;
  subheading: string;
  addressLines: string[];
  phone: string;
  email: string;
  mapEmbedUrl: string;
  mapTitle: string;
  hours: Array<{
    label: string;
    value: string;
  }>;
  quickHighlights: string[];
};
