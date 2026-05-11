// website/types/contact.ts
export type ContactHour = {
  label: string;
  value: string;
};

export type ContactInfo = {
  noticeEnabled: boolean;
  noticeMessage?: string;

  addressLines: string[];
  phone: string;
  email: string;
  mapEmbedUrl: string;
  mapTitle: string;
  hours: ContactHour[];
  quickHighlights: string[];
};
