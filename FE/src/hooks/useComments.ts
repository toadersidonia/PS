import { useState } from "react";
import type { Comment } from "../types/Comment";
import { mockComments } from "../data/mockComments";

export function useComments(postId: string, currentUser: string | null) {
  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter((c) => c.postId === postId)
  );

  //  helper ownership
  const isOwner = (comment: Comment) =>
    comment.author === currentUser;

  // ADD
  const addComment = (text: string, image?: string) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: crypto.randomUUID(),
      postId,
      author: currentUser,
      text,
      image,
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
  };

  // LIKE
  const like = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  // DISLIKE
  const dislike = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c
      )
    );
  };

  // DELETE 
  const remove = (id: string) => {
    setComments((prev) =>
      prev.filter((c) => !(c.id === id && isOwner(c)))
    );
  };

  // EDIT 
  const editComment = (id: string, text: string, image?: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id && isOwner(c)
          ? { ...c, text, image }
          : c
      )
    );
  };

  return {
    comments,
    addComment,
    like,
    dislike,
    remove,
    editComment,
    isOwner,
  };
}