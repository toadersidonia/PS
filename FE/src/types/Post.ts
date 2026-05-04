import { PostStatus } from "./PostStatus";

export type Post = {
  id: string;
  title: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  image?: string;
  status: PostStatus;
  tags: string[];
  voteCount: number;
};