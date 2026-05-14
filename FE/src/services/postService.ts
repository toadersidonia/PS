import { api } from "../lib/api";
import type { Post } from "../types/Post";

export const postService = {
  // GET ALL
  getAll: async (): Promise<Post[]> => {
    return api.get<Post[]>("/posts");
  },

  // CREATE
  create: async (post: Partial<Post>, userId: number): Promise<Post> => {
    return api.post<Post>(`/posts?userId=${userId}`, post);
  },

  // UPDATE
  update: async (
    id: string,
    data: Partial<Post>,
    userId: number
  ): Promise<Post> => {
    return api.put<Post>(`/posts/${id}?userId=${userId}`, data);
  },

  // DELETE
  remove: async (id: string, userId: number): Promise<void> => {
    return api.delete<void>(`/posts/${id}?userId=${userId}`);
  },
};