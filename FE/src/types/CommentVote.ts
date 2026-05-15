export type CommentVote = {
  id: string;

  commentId: string;
  userId: string;

  value: 1 | -1; // 1 = like, -1 = dislike
};