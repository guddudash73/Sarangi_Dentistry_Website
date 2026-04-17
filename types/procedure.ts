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
  path: string;
  image: string;
  shortText: string;
  longDescription: string;
  steps: ProcedureStep[];
  faqs: ProcedureFaq[];
};

export type ProceduresResponse = ProcedureItem[];
