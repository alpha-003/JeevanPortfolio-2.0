export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  dateCreated: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  datePublished: string;
  tags: string[];
  seoDescription?: string;
  imageUrl: string; // Added for display
  imageHint: string; // Added for display
  slug: string; // Added for display
};

export type Message = {
  id:string;
  name: string;
  email: string;
  message: string;
  dateReceived: string;
  isReplied: boolean;
};

export type SeoSettings = {
  siteTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export type SocialLink = {
  name: string;
  url: string;
}

export type SiteSettings = {
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
}
