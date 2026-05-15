import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";

type Props = {
  onAddComment: (
    text: string,
    image?: string
  ) => void;
};

export default function CommentComposer({
  onAddComment,
}: Props) {

  const [open, setOpen] = useState(false);

  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const submit = () => {

    if (!text.trim()) return;

    onAddComment(text, image || undefined);

    setText("");
    setImage("");

    setOpen(false);
  };

  return (
    <div className="mb-4">

      {!open ? (

      <button
        onClick={() => setOpen(true)}
        className="w-full py-2 rounded-2xl bg-white/60 border border-black/5 text-gray-500 hover:bg-pink-50 transition flex items-center justify-center gap-2"
      >
        Add comment
        <SparklesIcon className="w-5 h-5 text-purple-500" />
      </button>

      ) : (

        <div className="space-y-3 p-4 rounded-2xl bg-white/50 border border-black/5">

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl bg-white border border-black/10 outline-none resize-none focus:border-pink-400"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full px-4 py-2 rounded-xl bg-white border border-black/10 outline-none focus:border-pink-400"
          />

          {image && (
            <img
              src={image}
              alt="preview"
              className="rounded-2xl max-h-48 w-full object-cover"
            />
          )}

          <div className="flex justify-end gap-2">

            <button
              onClick={() => {
                setOpen(false);
                setText("");
                setImage("");
              }}
              className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={submit}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center gap-2"
            >
              Post
              <SparklesIcon className="w-5 h-5 text-yellow-300" />
            </button>

          </div>

        </div>

      )}

    </div>
  );
}