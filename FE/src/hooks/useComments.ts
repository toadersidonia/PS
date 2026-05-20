import { useEffect, useState } from "react";
import type { Comment } from "../types/Comment";
import { commentService } from "../services/commentService";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { toast } from "react-toastify";

export function useComments(
  postId: string,
  currentUser: { id: string; username: string } | null
) {
    const [comments, setComments] = useState<Comment[]>([]);
    const { user, setUser } = useAuth();

    useEffect(() => {
      commentService.getByPost(postId).then(setComments);
    }, [postId]);

    const isOwner = (comment: Comment) =>
    Number(comment.authorId) === Number(currentUser?.id);

    const addComment = async (text: string, image?: string) => {
      if (!currentUser) return;

    const created = await commentService.create(
      postId,
      {
        text,
        image,
        authorId: currentUser.id,
        author: currentUser.username,
      },
      currentUser.id
    );

    setComments((prev) => [created, ...prev]);
  };

  const remove = async (id: string) => {
    if (!currentUser) return;

    await commentService.remove(id, currentUser.id);

    setComments((prev) =>
      prev.filter((c) => c.id !== id)
    );
  };

  const editComment = async (
    id: string,
    text: string,
    image?: string
  ) => {
    if (!currentUser) return;

    const updated = await commentService.update(
      id,
      { text, image },
      currentUser.id
    );

    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? updated : c
      )
    );
  };

  const voteComment = async (id: string, type: "LIKE" | "DISLIKE") => {
  if (!currentUser) return;

  try {
    const res = await commentService.vote(
      id,
      currentUser.id,
      type
    );

    setComments(prev =>
      prev.map(c =>
        c.id === res.comment.id
          ? {
              ...c,
              ...res.comment
            }
          : c
      )
    );

    const updatedUser = {
      ...user!,
      score: res.voterScore
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

  } catch (err: any) {
    toast.error("Cannot vote!");
  }
};

  return {
    comments,
    addComment,
    remove,
    editComment,
    isOwner,
    voteComment,
  };
}