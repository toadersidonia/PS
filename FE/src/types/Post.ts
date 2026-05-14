export type PostStatus =
  | "Just posted"
  | "First reactions"
  | "Expired";

export type Post = {
  id: string;

  author: string;

  title: string;
  text: string;

  image?: string;

  createdAt: string;

  status: PostStatus;

  likes: number;
  dislikes: number;
};