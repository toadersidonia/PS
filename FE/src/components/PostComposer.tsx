import { useState } from "react";
import type { PostStatus } from "../types/Post";
import { useAuth } from "../hooks/useAuth";

type Props = {
  onAddPost: (post: {
    author: string;
    title: string;
    text: string;
    image?: string;
    createdAt: string;
    status: PostStatus;
    likes: number;
    dislikes: number;
  }) => void;
};

export default function PostComposer({ onAddPost }: Props) {

  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const submitPost = () => {

    if (!title || !text || !user) return;

    onAddPost({
      author: user.username,
      title,
      text,
      image: image || undefined,
      createdAt: new Date().toISOString(),
      status: "Just posted",
      likes: 0,
      dislikes: 0,
    });

    setTitle("");
    setText("");
    setImage("");
    setOpen(false);
  };

  return (
    <div className="mb-6 rounded-3xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-xl p-5">

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-pink-50 hover:bg-pink-100 transition rounded-full px-5 py-3 text-left text-gray-500"
        >
          What are you sharing today? ✨
        </button>
      ) : (
        <div className="space-y-4">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full rounded-2xl bg-white/80 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-pink-300 transition shadow-sm"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
            className="w-full rounded-2xl bg-white/80 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-pink-300 transition shadow-sm"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full rounded-2xl bg-white/80 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-pink-300 transition shadow-sm"
          />

          <div className="flex justify-end gap-3">

            <button onClick={() => setOpen(false)}>
              Cancel
            </button>

            <button
              onClick={submitPost}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-xl"
            >
              Publish ✨
            </button>

          </div>

        </div>
      )}

    </div>
  );
}