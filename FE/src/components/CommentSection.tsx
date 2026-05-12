import { useState } from "react";

import CommentCard from "./CommentCard";
import CommentComposer from "./CommentComposer";

import type { Comment } from "../types/Comment";

import { mockComments } from "../data/mockComments";

type Props = {
  postId: number;
};

export default function CommentSection({
  postId,
}: Props) {

  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter((c) => c.postId === postId)
  );

  const addComment = (
    text: string,
    image?: string
  ) => {

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
        c.id === id
          ? { ...c, likes: c.likes + 1 }
          : c
      )
    );
  };

  const dislike = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, dislikes: c.dislikes + 1 }
          : c
      )
    );
  };

  const remove = (id: number) => {
    setComments((prev) =>
      prev.filter((c) => c.id !== id)
    );
  };

  const editComment = (
    id: number,
    newText: string,
    newImage?: string
  ) => {

    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              text: newText,
              image: newImage,
            }
          : c
      )
    );
  };

  return (
    <div className="mt-4 border-t border-black/10 pt-4">

      {/* COMPOSER */}
      <CommentComposer
        onAddComment={addComment}
      />

      {/* LIST */}
      <div className="space-y-3">

        {comments.length === 0 && (
          <p className="text-sm text-gray-400 text-center">
            No comments yet ✨
          </p>
        )}

        {comments.map((c) => (
          <CommentCard
            key={c.id}
            comment={c}
            onLike={like}
            onDislike={dislike}
            onDelete={remove}
            onEdit={editComment}
          />
        ))}

      </div>

    </div>
  );
}