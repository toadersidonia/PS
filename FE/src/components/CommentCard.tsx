import { useState } from "react";
import type { Comment } from "../types/Comment";

type Props = {
  comment: Comment;

  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string, image?: string) => void;
};

export default function CommentCard({
  comment,
  onLike,
  onDislike,
  onDelete,
  onEdit,
}: Props) {

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [image, setImage] = useState(comment.image || "");

  const save = () => {
    if (!text.trim()) return;

    onEdit(comment.id, text, image.trim() ? image : undefined);
    setEditing(false);
  };

  return (
    <div className="p-4 rounded-2xl bg-white/60 border border-black/5 shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm font-semibold text-pink-500">
            {comment.author}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>

        {!editing && (
          <div className="flex gap-3 text-xs">

            <button
              onClick={() => setEditing(true)}
              className="text-blue-500 hover:underline"
            >
              edit
            </button>

            <button
              onClick={() => onDelete(comment.id)}
              className="text-red-400 hover:underline"
            >
              delete
            </button>

          </div>
        )}

      </div>

      {/* CONTENT / EDIT */}
      {editing ? (
        <div className="mt-3 space-y-2">

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-black/10 outline-none focus:border-pink-400"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full p-3 rounded-xl bg-white border border-black/10 outline-none focus:border-pink-400"
          />

          {image && (
            <img
              src={image}
              className="rounded-xl max-h-40 w-full object-cover"
            />
          )}

          {/* BUTTONS MODERNE */}
          <div className="flex justify-end gap-2 pt-2">

            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={save}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 transition"
            >
              Save
            </button>

          </div>

        </div>

      ) : (
        <>
          <p className="text-sm text-gray-700 mt-2">
            {comment.text}
          </p>

          {comment.image && (
            <img
              src={comment.image}
              className="mt-2 rounded-xl max-h-52 w-full object-cover"
            />
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 mt-3 text-sm">

            <button
              onClick={() => onLike(comment.id)}
              className="text-pink-500"
            >
              ❤️ {comment.likes}
            </button>

            <button
              onClick={() => onDislike(comment.id)}
              className="text-gray-500"
            >
              👎 {comment.dislikes}
            </button>

            <span className="ml-auto text-xs text-gray-400">
              score: {comment.likes - comment.dislikes}
            </span>

          </div>
        </>
      )}

    </div>
  );
}