import { useState } from "react";

type Props = {
  onAddPost: (post: {
    id: number;
    author: string;
    title: string;
    text: string;
    image?: string;
  }) => void;
};

export default function PostComposer({ onAddPost }: Props) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const submitPost = () => {
    if (!title || !text) return;

    onAddPost({
      id: Date.now(),
      author: "You",
      title,
      text,
      image,
    });

    setTitle("");
    setText("");
    setImage("");
    setOpen(false);
  };

  return (
    <div className="mb-6 rounded-3xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-xl p-5">

      {/* TOP */}
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
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 outline-none focus:border-pink-400"
          />

          <textarea
            placeholder="Write something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 outline-none resize-none focus:border-pink-400"
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 outline-none focus:border-pink-400"
          />

          {/* PREVIEW */}
          {image && (
            <img
              src={image}
              alt="preview"
              className="rounded-2xl max-h-[300px] w-full object-cover"
            />
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">

            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={submitPost}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 transition"
            >
              Publish ✨
            </button>

          </div>

        </div>
      )}
    </div>
  );
}