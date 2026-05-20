import { api } from "../lib/api"; //obiect pentru a face cereri catre backend, configurat cu url-ul backend-ului 
import type { Post } from "../types/Post"; //tipul unui post, adica ce campuri are un post

export const postService = {
  //functie care ia toate postarile de la backend
  getAll: async (): Promise<Post[]> => {
    return api.get<Post[]>("/posts");
  },

  //functie care creeaza o postare noua, primind ca parametru un obiect cu campurile postarii 
  create: async (post: Partial<Post>, userId: number): Promise<Post> => {
    return api.post<Post>(`/posts?userId=${userId}`, post);
  },

  //functie care editeaza o postare existenta 
  update: async (
    id: string,
    data: Partial<Post>,
    userId: number
  ): Promise<Post> => {
    return api.put<Post>(`/posts/${id}?userId=${userId}`, data);
  },

  //functie care sterge o postare existenta
  remove: async (id: string, userId: number): Promise<void> => {
    return api.delete<void>(`/posts/${id}?userId=${userId}`);
  },

    like: async (id: string, userId: number) => {
    return api.post<Post>(`/posts/${id}/like?userId=${userId}`, {});
  },

  dislike: async (id: string, userId: number) => {
    return api.post<Post>(`/posts/${id}/dislike?userId=${userId}`, {});
  },

  closeComments: async (id: string, userId: number) => {
  const res = await fetch(
    `/posts/${id}/close-comments?userId=${userId}`,
    {
      method: "POST",
    }
  );

  return await res.json();
},

};