import type { Post } from "../types/Post";
import { load, save } from "../lib/utils";

const KEY = "posts";

let posts: Post[] = load<Post[]>(KEY) || [];

const persist = () => save(KEY, posts);

export const postService = {
  getAll: () => posts,

  setInitial: (initial: Post[]) => {
    posts = load<Post[]>(KEY) || initial;
    persist();
  },

  create: (post: Post) => {
    posts = [post, ...posts];
    persist();
  },

  update: (id: string, data: Partial<Post>, user: string) => {
    posts = posts.map((p) =>
      p.id === id && p.author === user
        ? { ...p, ...data }
        : p
    );
    persist();
  },

  remove: (id: string, user: string) => {
    posts = posts.filter(
      (p) => !(p.id === id && p.author === user)
    );
    persist();
  },

  like: (id: string) => {
    posts = posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    persist();
  },

  dislike: (id: string) => {
    posts = posts.map((p) =>
      p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
    );
    persist();
  },
};