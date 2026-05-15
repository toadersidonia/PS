import { api } from "../lib/api";
import type { Post } from "../types/Post";

export const postService = {
  getAll: async (): Promise<Post[]> => {
    return api.get<Post[]>("/posts");
  },

  create: async (post: Partial<Post>, userId: number): Promise<Post> => {
    return api.post<Post>(`/posts?userId=${userId}`, post);
  },

  update: async (
    id: string,
    data: Partial<Post>,
    userId: number
  ): Promise<Post> => {
    return api.put<Post>(`/posts/${id}?userId=${userId}`, data);
  },

  remove: async (id: string, userId: number): Promise<void> => {
    return api.delete<void>(`/posts/${id}?userId=${userId}`);
  },
};