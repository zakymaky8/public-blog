export type TAuthor = {
  users_id: string,
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  Role: string,
  isWarned: boolean,
  profilePic: string | null
}

export type TComment = {
  content: string;
  createdAt: Date;
  lastUpdate: Date;
  isUpdated: boolean;
  likes: string[];
  dislikes: string[];
  user_id: string;
  comments_id: string;
  post_id: string;
}

export type TReply = {
content: string;
user_id: string;
replies_id: string;
comment_id: string;
replied_id: string;
createdAt: Date;
isUpdated: boolean;
likes: string[];
dislikes: string[]
}

export type TReplyActor = {
replier: TAuthor,
replied_to: TAuthor
}


export type TSuggestions = {
  suggns_id: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  postsToSugg: string[];
  isVisible: boolean;
  status: "PENDING" | "ADDRESSED" | "DENIED";
  content: string;
}


export interface Post {
  posts_id: string,
  title: string,
  content: string,
  likes: string[],
  excerpt: string,
  readTime: number,
  createdAt: Date,
  lastUpdate: Date,
  isUpdated: boolean,
  views: string[]

}