import { useState } from "react";

type Comment = {
  id: number;
  postId: number;
  author: string;
  text: string;
  image?: string;
  createdAt: string;

  likes: number;
  dislikes: number;
};

type Props = {
  postId: number;
};

export default function CommentSection({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
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

  const deleteComment = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="mt-4 border-t border-black/10 pt-4">

      {/* INPUT */}
      <div className="space-y-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-4 py-2 rounded-full bg-white/70 border border-black/10 outline-none focus:border-pink-400"
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="w-full px-4 py-2 rounded-full bg-white/70 border border-black/10 outline-none focus:border-pink-400"
        />

        <button
          onClick={addComment}
          className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
        >
          Post comment
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {comments.length === 0 && (
          <p className="text-sm text-gray-400 text-center">
            No comments yet ✨
          </p>
        )}

        {comments.map((c) => (
          <div
            key={c.id}
            className="p-3 rounded-2xl bg-white/60 border border-black/5 space-y-2"
          >

            {/* HEADER */}
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-pink-500">
                {c.author}
              </span>

              <button
                onClick={() => deleteComment(c.id)}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                delete
              </button>
            </div>

            {/* TEXT */}
            <p className="text-sm text-gray-700">{c.text}</p>

            {/* IMAGE */}
            {c.image && (
              <img
                src={c.image}
                className="rounded-xl max-h-48 w-full object-cover"
              />
            )}

            {/* ACTIONS */}
            <div className="flex gap-4 text-sm">
              <button
                onClick={() => like(c.id)}
                className="text-pink-500"
              >
                ❤️ {c.likes}
              </button>

              <button
                onClick={() => dislike(c.id)}
                className="text-gray-500"
              >
                👎 {c.dislikes}
              </button>

              <span className="text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}