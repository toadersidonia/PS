import { api } from "../lib/api";
import type { Comment } from "../types/Comment";

type CommentCreateResponse = {
  comment: Comment;
  postId: string;
  postStatus: "JUST_POSTED" | "FIRST_REACTION" | "EXPIRED";
};

export const commentService = {
  getByPost: async (postId: string): Promise<Comment[]> => {
    return api.get<Comment[]>(`/comments/post/${postId}`);
  },

  // create: async (
  //   postId: string,
  //   comment: Partial<Comment>,
  //   userId: string
  // ): Promise<Comment> => {
  //   return api.post<Comment>(
  //     `/comments?postId=${postId}&userId=${userId}`,
  //     comment
  //   );
  // },
//   create: async (
//   postId: string,
//   comment: Partial<Comment>,
//   userId: string
// ): Promise<{
//   comment: Comment;
//   updatedPost: {
//     id: string;
//     status: string;
//   };
// }> => {
//   return api.post(
//     `/comments?postId=${postId}&userId=${userId}`,
//     comment
//   );
// },
  create: async (
    postId: string,
    comment: Partial<Comment>,
    userId: string
  ): Promise<CommentCreateResponse> => {
    return api.post<CommentCreateResponse>(
      `/comments?postId=${postId}&userId=${userId}`,
      comment
    );
  },

  update: async (
    id: string,
    data: Partial<Comment>,
    userId: string
  ): Promise<Comment> => {
    return api.put<Comment>(
      `/comments/${id}?userId=${userId}`,
      data
    );
  },

  remove: async (id: string, userId: string): Promise<void> => {
    return api.delete<void>(
      `/comments/${id}?userId=${userId}`
    );
  },

// vote: async (
//   commentId: string,
//   userId: string,
//   type: "LIKE" | "DISLIKE"
// ): Promise<Comment> => {
// return api.put<Comment>(
//   `/comments/${commentId}/vote?userId=${userId}&type=${type}`,
//   {}
// );
// },
vote: async (
  commentId: string,
  userId: string,
  type: "LIKE" | "DISLIKE"
): Promise<{
  comment: Comment;
  voterScore: number;
  status: string;
}> => {
  return api.put(
    `/comments/${commentId}/vote?userId=${userId}&type=${type}`,
    {}
  );
},
};