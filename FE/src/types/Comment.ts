export type Comment = {
  id: string;

  postId: string;

  author: string;

  text: string;

  image?: string;

  createdAt: string;

  likes: number;
  dislikes: number;
};