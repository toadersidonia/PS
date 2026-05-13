import { useState } from "react";
import CommentSection from "./CommentSection";
import type { Post } from "../types/Post";

type Props = {
  post: Post;

  onEdit: (id: number, data: Partial<Post>) => void;
  onDelete: (id: number) => void;

  onLike: (id: number) => void;
  onDislike: (id: number) => void;
};

export default function PostCard({
  post,
  onEdit,
  onDelete,
  onLike,
  onDislike,
}: Props) {

  const [showComments, setShowComments] = useState(false);

  const score = post.likes - post.dislikes;

  return (
    <div className="mb-5 rounded-2xl bg-white/70 backdrop-blur-xl shadow-md overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-4">

        {/* AVATAR */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
          {post.author[0]}
        </div>

        {/* INFO */}
        <div className="flex flex-col">

          {/* AUTHOR + STATUS */}
          <div className="flex items-center gap-2">

            <span className="font-semibold">
              {post.author}
            </span>

            <span className={`
              text-xs px-2 py-1 rounded-full
              ${post.status === "Just posted" ? "bg-pink-100 text-pink-500" : ""}
              ${post.status === "First reactions" ? "bg-purple-100 text-purple-500" : ""}
              ${post.status === "Expired" ? "bg-gray-200 text-gray-500" : ""}
            `}>
              {post.status}
            </span>

          </div>

          {/* DATE */}
          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </span>

        </div>

        {/* ACTIONS: EDIT + DELETE */}
        <div className="ml-auto flex gap-2">

          <button
            onClick={() => {
              const newTitle = prompt("Edit title:", post.title);
              const newText = prompt("Edit text:", post.text);

              if (!newTitle || !newText) return;

              onEdit(post.id, {
                title: newTitle,
                text: newText,
              });
            }}
            className="text-xs text-gray-500 hover:text-black"
          >
            ✏️
          </button>

          <button
            onClick={() => onDelete(post.id)}
            className="text-xs text-gray-400 hover:text-red-500"
          >
            🗑️
          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4">

        <h2 className="text-lg font-bold">
          {post.title}
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          {post.text}
        </p>

        {post.image && (
          <img
            src={post.image}
            className="mt-3 rounded-xl w-full object-cover"
          />
        )}

      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-black/5">

        <div className="flex items-center gap-5">

          {/* LIKE */}
          <button
            onClick={() => onLike(post.id)}
            className="text-pink-500 hover:scale-105 transition"
          >
            ❤️ {post.likes}
          </button>

          {/* DISLIKE */}
          <button
            onClick={() => onDislike(post.id)}
            className="text-gray-500 hover:scale-105 transition"
          >
            👎 {post.dislikes}
          </button>

          {/* COMMENTS TOGGLE */}
          <button
            onClick={() => setShowComments((s) => !s)}
            className="text-gray-500 hover:text-black transition"
          >
            💬
          </button>

        </div>

        {/* SCORE */}
        <span className="text-xs text-gray-400">
          score: {score}
        </span>

      </div>

      {/* COMMENTS */}
      {showComments && (
        <CommentSection postId={post.id} />
      )}

    </div>
  );
}