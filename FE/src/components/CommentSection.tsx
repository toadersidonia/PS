import { useState } from "react";

type Comment = {
  id: number;
  author: string;
  text: string;
  likes: number;
};

type Props = {
  postId: number;
};

export default function CommentSection({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  const addComment = () => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: "You",
      text,
      likes: 0,
    };

    setComments((prev) => [...prev, newComment]);
    setText("");
  };

  const likeComment = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  return (
    <div className="mt-4 border-t border-black/10 pt-4">

      {/* INPUT */}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-black/10 text-gray-700 outline-none focus:border-pink-400 transition"
        />

        <button
          onClick={addComment}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 transition"
        >
          Post
        </button>
      </div>

      {/* COMMENTS LIST */}
      <div className="space-y-2">
        {comments.length === 0 && (
          <p className="text-sm text-gray-400 text-center">
            No comments yet... be the first ✨
          </p>
        )}

        {comments.map((c) => (
          <div
            key={c.id}
            className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-black/5"
          >
            {/* LEFT */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-pink-500">
                {c.author}
              </p>
              <p className="text-sm text-gray-600">{c.text}</p>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => likeComment(c.id)}
              className="text-sm text-pink-500 hover:scale-105 transition whitespace-nowrap"
            >
              ❤️ {c.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}