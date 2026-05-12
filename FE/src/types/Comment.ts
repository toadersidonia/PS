// export type Comment = {
//   id: string;
//   postId: string;
//   authorId: string;
//   authorName: string;
//   text: string;
//   image?: string;
//   createdAt: string;
//   voteCount: number;
// };

// export type Comment = {
//   id: string;
//   postId: string;

//   authorId: string;
//   authorName: string;

//   text: string;
//   image?: string;

//   createdAt: string;

//   likes: number;
//   dislikes: number;

//   voteCount: number; // optional (poți să-l calculezi din likes - dislikes)
// };

export type Comment = {
  id: number;

  postId: number;

  author: string;

  text: string;

  image?: string;

  createdAt: string;

  likes: number;
  dislikes: number;
};