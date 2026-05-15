export type Comment = {
  id: string;

  postId: string;

  authorId: string;
  
  author: string;

  text: string;

  image?: string;

  createdAt: string;

  //likes: number;
  //dislikes: number;
};