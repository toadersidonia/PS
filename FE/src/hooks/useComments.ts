import { useEffect, useState } from "react";
import type { Comment } from "../types/Comment";
import { commentService } from "../services/commentService";

export function useComments(
  postId: string,
  currentUser: { id: string; username: string } | null
) {
  const [comments, setComments] = useState<Comment[]>([]);

  // LOAD
  useEffect(() => {
    commentService.getByPost(postId).then(setComments);
  }, [postId]);

  // OWNER CHECK
  const isOwner = (comment: Comment) =>
    comment.authorId === currentUser?.id;

  // ADD
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

  // DELETE
  const remove = async (id: string) => {
    if (!currentUser) return;

    await commentService.remove(id, currentUser.id);

    setComments((prev) =>
      prev.filter((c) => c.id !== id)
    );
  };

  // EDIT
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

  return {
    comments,
    addComment,
    remove,
    editComment,
    isOwner,
  };
}