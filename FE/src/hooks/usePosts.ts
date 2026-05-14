import { useState } from "react";
import type { Post } from "../types/Post";
import { mockPosts } from "../data/mockPosts";
import { useAuth } from "../hooks/useAuth";

export function usePosts() {
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const isOwner = (post: Post) => {
    return user?.username === post.author;
  };

  const canEdit = (post: Post) => {
    return user?.username === post.author;
  };

  // ADD
  const addPost = (post: Post) => {
    setPosts((prev) => [
      { ...post, status: "Just posted" },
      ...prev,
    ]);
  };

  // DELETE (OWNER ONLY)
  const deletePost = (id: string) => {
    setPosts((prev) =>
      prev.filter((p) => {
        if (p.id !== id) return true;

        const target = prev.find((x) => x.id === id);
        if (!target) return true;

        return isOwner(target); // 🔐 guard
      })
    );
  };

  // UPDATE (OWNER ONLY)
  const updatePost = (id: string, data: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (!isOwner(p)) return p; // 🔐 guard

        return { ...p, ...data };
      })
    );
  };

  // LIKE
  const likePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  // DISLIKE
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
    canEdit,
  };
}