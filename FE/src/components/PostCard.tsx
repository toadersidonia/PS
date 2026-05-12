import { useState } from "react";
import CommentSection from "./CommentSection";

import type { Post } from "../types/Post";

export default function PostCard({ post }: { post: Post }) {

  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="mb-5 rounded-2xl bg-white/70 backdrop-blur-xl shadow-md overflow-hidden">

<div className="flex items-center gap-3 p-4">

  {/* AVATAR */}
  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
    {post.author[0]}
  </div>

  {/* INFO */}
  <div className="flex flex-col">

          {/* ROW 1: AUTHOR + STATUS */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {post.author}
            </span>

            <span className={`text-xs px-2 py-1 rounded-full
              ${post.status === "Just posted" ? "bg-pink-100 text-pink-500" : ""}
              ${post.status === "First reactions" ? "bg-purple-100 text-purple-500" : ""}
              ${post.status === "Expired" ? "bg-gray-200 text-gray-500" : ""}
            `}>
              {post.status}
            </span>
          </div>

          {/* ROW 2: DATE */}
          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </span>

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
      <div className="flex items-center justify-between px-4 py-4">

        <div className="flex items-center gap-5">

          {/* LIKE */}
          <button
            onClick={() => setLikes((l) => l + 1)}
            className="flex items-center gap-1 text-pink-500 hover:scale-105 transition"
          >
            ❤️ <span className="text-sm">{likes}</span>
          </button>

          {/* COMMENTS */}
          <button
            onClick={() => setShowComments((s) => !s)}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 hover:scale-105 transition"
          >
            💬 <span className="text-sm">Comment</span>
          </button>

        </div>

      </div>

      {/* COMMENTS */}
      {showComments && (
        <CommentSection postId={post.id} />
      )}

    </div>
  );
}