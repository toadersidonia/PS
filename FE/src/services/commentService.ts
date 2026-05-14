import type { Comment } from "../types/Comment";
import { load, save } from "../lib/utils";

const KEY = "comments";

let comments: Comment[] = load<Comment[]>(KEY) || [];

const persist = () => save(KEY, comments);

export const commentService = {
  getByPost: (postId: string) => {
    return comments.filter((c) => c.postId === postId);
  },

  create: (comment: Comment) => {
    comments = [comment, ...comments];
    persist();
  },

  update: (id: string, text: string, image: string | undefined, user: string) => {
    comments = comments.map((c) =>
      c.id === id && c.author === user
        ? { ...c, text, image }
        : c
    );
    persist();
  },

  remove: (id: string, user: string) => {
    comments = comments.filter(
      (c) => !(c.id === id && c.author === user)
    );
    persist();
  },

  like: (id: string) => {
    comments = comments.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    persist();
  },

  dislike: (id: string) => {
    comments = comments.map((c) =>
      c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c
    );
    persist();
  },
};