export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  publishedAt: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  publishedAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  read: boolean;
};
