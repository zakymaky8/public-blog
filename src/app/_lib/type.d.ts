export type TAuthor = {
  users_id: string,
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  Role: string
}

export type TComment = {
  content: string;
  createdAt: Date;
  lastUpdate: Date;
  likes: string[];
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
likes: string[]
}

export type TReplyActor = {
replier: TAuthor,
replied_to: TAuthor
}