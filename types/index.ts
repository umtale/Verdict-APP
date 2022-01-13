import { ScaledSize } from 'react-native';

export type Category = {
  slug: string;
  id: string;
  name: string;
  url: string;
};

export type Tag = {
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

export type PostFull = Post & {
  verdictOption: string;
  subtitle: string;
  body: string;
  bodyJson: {
    time: number;
    blocks: {
      type: string;
      data: any;
    }[];
    version: string;
  };
  tags: Tag[];
  author: Author;
  previous: Post;
  next: Post;
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

export type EmbedBlock = {
  type: string;
  data: {
    service: string;
    source: string;
    embed: string;
    width: number;
    height: number;
    caption: string;
  };
};

export type EmbedProps = {
  window: ScaledSize;
  block: EmbedBlock;
};

export type Comment = {
  id: string;
  status: string;
  title: string;
  postReactionString: string;
  postReaction: false;
  createdAt: string;
  isVerdict: true;
  hasReplies: false;
  user: {
    id: string;
    email: string;
    verified: false;
    slug: string;
    firstName: string;
    lastName: string;
    medal: null;
    avatar: null;
    verdictsCount: number;
    postsCount: number;
    commentsCount: number;
    follow: false;
    displayName: string;
    url: string;
  };
  votes: number;
  verdictThreshold: string;
  url: string;
  postID: string;
  body: string;
};

export type Pagination = {
  next: boolean;
  prev: boolean;
  totalCount: number;
  perPage: number;
  current: number;
  pagesCount: number;
};

export type UserProfile = {
  avatar?: {
    id: number;
    name: string;
    path: string;
    size: {
      height: number;
      width: number;
    };
    source: string;
    url: string;
  };
  bio: string;
  categories: [];
  commentsCount: number;
  countryCode: number;
  countryCodeLetters: string;
  createdAt: string;
  email: string;
  facebookLink: string;
  firstName: string;
  followersCount: number;
  id: string;
  lastName: string;
  linkedinLink: string;
  medal: any;
  phone: string;
  points: number;
  postsCount: number;
  rank: string;
  settings: {
    email_post_published: string;
    email_post_replies: string;
    email_recive_point: string;
    email_user_follow: string;
    email_verdict_replies: string;
    email_visibility: string;
    profile_visibility: string;
  };
  slug: string;
  twitterLink: string;
  url: string;
  verdictsCount: number;
  verified: boolean;
};
