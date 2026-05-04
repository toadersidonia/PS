export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  text: string;
  image?: string;
  createdAt: string;
  voteCount: number;
};