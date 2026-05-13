import { useState } from "react";
import type { Post } from "../types/Post";
import { mockPosts } from "../data/mockPosts";

export function usePosts() {

  const [posts, setPosts] = useState<Post[]>(mockPosts);

  // ADD
  const addPost = (post: Post) => {
    setPosts((prev) => [
      {
        ...post,
        status: "Just posted",
      },
      ...prev,
    ]);
  };

  // DELETE
  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // EDIT (title/text/image)
  const updatePost = (id: number, data: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...data } : p
      )
    );
  };

  // LIKE
  const likePost = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: p.likes + 1 }
          : p
      )
    );
  };

  // DISLIKE
  const dislikePost = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, dislikes: p.dislikes + 1 }
          : p
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