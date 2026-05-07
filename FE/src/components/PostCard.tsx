import { useState } from "react";
import CommentSection from "./CommentSection";

type Post = {
  id: number;
  author: string;
  title: string;
  text: string;
  image?: string;
};

export default function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="mb-5 rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-lg overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
          {post.author[0]}
        </div>
        <span className="font-semibold">{post.author}</span>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-bold">{post.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{post.text}</p>

        {post.image && (
          <img
            src={post.image}
            className="mt-3 rounded-xl w-full object-cover"
          />
        )}
      </div>

      {/* FOOTER */}
      <div className="flex gap-4 px-4 py-3 border-t border-black/5">
        <button
          onClick={() => setLikes(likes + 1)}
          className="text-pink-500 hover:scale-105 transition"
        >
          ❤️ {likes}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="text-gray-500 hover:text-black transition"
        >
          💬
        </button>
      </div>

      {/* COMMENTS
      {showComments && (
        <div className="px-4 pb-4 text-sm text-gray-500">
          No comments yet...
        </div>
      )} */}

      {/* COMMENTS */}
      {showComments && <CommentSection postId={post.id} />}

    </div>
  );
}