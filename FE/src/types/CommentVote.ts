// export type CommentVote = {
//   userId: string;
//   commentId: string;
//   liked: boolean;
// };

export type CommentVote = {
  id: string;

  commentId: string;
  userId: string;

  value: 1 | -1; // 1 = like, -1 = dislike
};