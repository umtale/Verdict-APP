export type Category = {
  slug: string;
  id: string;
  name: string;
  url: string;
};

export type Post = {
  slug: string;
  id: string;
  title: string;
  status: string;
  viewsCount: string;
  category: Category;
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

export type Author = {
  id: string;
  createdAt: string;
  slug: string;
  firstName: string;
  lastName: string;
  bio: string;
  medal: null;
  points: number;
  rank: string;
  avatar: {
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
  verdictsCount: number;
  postsCount: number;
  followersCount: number;
  commentsCount: number;
  url: string;
};
