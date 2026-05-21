export type PostStatus =
  | "JUST_POSTED"
  | "FIRST_REACTION"
  | "EXPIRED";

export type Post = {
  id: string;

  author: string;
  
  authorId:number;

  title: string;
  text: string;

  image?: string;

  createdAt: string;

  status: PostStatus;

  likes: number;
  dislikes: number;

  score: number;

  tags?: string[];
};