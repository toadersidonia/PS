import { useEffect, useState } from "react";
import { postService } from "../services/postService";
import type { Post } from "../types/Post";
import { useAuth } from "./useAuth";

export function usePosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  // LOAD
  useEffect(() => {
    postService.getAll().then(setPosts);
  }, []);

  // CREATE
  const addPost = async (post: Partial<Post>) => {
    if (!user) return;

    const created = await postService.create(
      post,
      Number(user.id) // 🔥 IMPORTANT (backend = Long)
    );

    setPosts((prev) => [created, ...prev]);
  };

  // UPDATE (ONLY OWNER CHECK IN BACKEND)
  const updatePost = async (id: string, data: Partial<Post>) => {
    if (!user) return;

    const updated = await postService.update(
      id,
      data,
      Number(user.id)
    );

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  };

  // DELETE
  const deletePost = async (id: string) => {
    if (!user) return;

    await postService.remove(id, Number(user.id));

    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // LIKE / DISLIKE (DOAR UI SAU IGNORE BACKEND)
  const likePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const dislikePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
      )
    );
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
  };
}