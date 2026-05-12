
// export type Post = {
//   id: string;
//   title: string;
//   text: string;
//   authorId: string;
//   authorName: string;
//   createdAt: string;
//   image?: string;
//   status: PostStatus;
//   tags: string[];
//   voteCount: number;
// };

// export type Post = {
//   id: number;

//   author: string;

//   title: string;

//   text: string;

//   image?: string;

//   createdAt: string;

//   likes: number;
//   dislikes: number;
// };
export type PostStatus =
  | "Just posted"
  | "First reactions"
  | "Expired";

export type Post = {
  id: number;

  author: string;

  title: string;
  text: string;

  image?: string;

  createdAt: string;

  status: PostStatus;

  likes: number;
  dislikes: number;
};