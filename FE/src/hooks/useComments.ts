import { useState } from "react";
import type { Comment } from "../types/Comment";
import { mockComments } from "../data/mockComments";

export function useComments(postId: number) {

  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter((c) => c.postId === postId)
  );

  const addComment = (text: string, image?: string) => {
    const newComment: Comment = {
      id: Date.now(),
      postId,
      author: "You",
      text,
      image,
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
  };

  const like = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const dislike = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c
      )
    );
  };

  const remove = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const editComment = (id: number, text: string, image?: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, text, image }
          : c
      )
    );
  };

  // ⭐ SCORE (IMPORTANT)
  const getScore = (c: Comment) => c.likes - c.dislikes;

  return {
    comments,
    addComment,
    like,
    dislike,
    remove,
    editComment,
    getScore,
  };
}