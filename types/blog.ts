export type BlogContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "quote";
      text: string;
    };

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  content: BlogContentBlock[];
};
