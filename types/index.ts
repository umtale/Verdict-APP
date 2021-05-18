export type Post = {
  slug: string;
  id: string;
  title: string;
  status: string;
  viewsCount: string;
  category: {
    slug: string;
    id: string;
    name: string;
    url: string;
  };
  featured: {
    id: string;
    name: string;
    path: string;
    source: string;
    size: {
      width: number;
      height: number;
    };
    url: string;
  };
  shortContent: string;
  author: {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    follow: boolean;
    displayName: string;
    url: string;
  };
  publishedAt: string;
  publishedAtDate: string;
  commentsCount: number;
  verdictValue: number;
  verdictUpdated: boolean | null;
  votesCount: number;
  url: string;
};

export type PostsList = {
  success: boolean;
  type: string;
  data: Post[];
  pagination: {
    next: boolean;
    prev: boolean;
    totalCount: number;
    perPage: number;
    current: number;
    pagesCount: number;
  };
};
