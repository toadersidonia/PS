import { api } from "../lib/api";
import type { Comment } from "../types/Comment";

export const commentService = {
  getByPost: async (postId: string): Promise<Comment[]> => {
    return api.get<Comment[]>(`/comments/post/${postId}`);
  },

  create: async (
    postId: string,
    comment: Partial<Comment>,
    userId: string
  ): Promise<Comment> => {
    return api.post<Comment>(
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
};