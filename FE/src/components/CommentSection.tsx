import { useState } from "react";
import CommentCard from "./CommentCard";

import type { Comment } from "../types/Comment";

import { mockComments } from "../data/mockComments";

type Props = {
  postId: number;
};

export default function CommentSection({ postId }: Props) {

  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter((c) => c.postId === postId)
  );

  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const addComment = () => {

    if (!text.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      postId,

      author: "You",

      text,
      image: image || undefined,

      createdAt: new Date().toISOString(),

      likes: 0,
      dislikes: 0,
    };

    setComments((prev) => [...prev, newComment]);

    setText("");
    setImage("");
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

  return (
    <div className="mt-4 border-t border-black/10 pt-4">

      {/* INPUT */}
      <div className="space-y-3 mb-4">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-4 py-2 rounded-xl bg-white/70 border border-black/10"
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="w-full px-4 py-2 rounded-xl bg-white/70 border border-black/10"
        />

        <button
          onClick={addComment}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white"
        >
          Add comment
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {comments.length === 0 && (
          <p className="text-sm text-gray-400 text-center">
            No comments yet
          </p>
        )}

        {comments.map((c) => (
          <CommentCard
            key={c.id}
            comment={c}
            onLike={like}
            onDislike={dislike}
            onDelete={remove}
          />
        ))}

      </div>

    </div>
  );
}