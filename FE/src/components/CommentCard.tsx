import { useState } from "react";
import type { Comment } from "../types/Comment";

type Props = {
  comment: Comment;

  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onDelete: (id: number) => void;

  onEdit: (
  id: number,
  newText: string,
  newImage?: string
) => void;

};

export default function CommentCard({
  comment,
  onLike,
  onDislike,
  onDelete,
  onEdit,
}: Props) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [editedImage, setEditedImage] = useState(comment.image || "");

  const saveEdit = () => {
    if (!editedText.trim()) return;

    onEdit(comment.id, editedText, editedImage);

    setIsEditing(false);
  };

  return (
  <div className="p-3 rounded-2xl bg-white/60 border border-black/5 space-y-3">

    {isEditing ? (

      /* ================= EDIT MODE ================= */

      <div className="space-y-3">

        <div className="flex items-center justify-between">

          <p className="text-sm font-semibold text-pink-500">
            Editing comment
          </p>

          <button
            onClick={() => setIsEditing(false)}
            className="text-xs text-gray-400 hover:text-red-500"
          >
            cancel
          </button>

        </div>

        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white/70 outline-none focus:border-pink-400"
        />

        <input
          value={editedImage}
          onChange={(e) => setEditedImage(e.target.value)}
          placeholder="Image URL..."
          className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white/70 outline-none focus:border-pink-400"
        />

        {editedImage && (
          <img
            src={editedImage}
            className="rounded-xl max-h-40 w-full object-cover"
          />
        )}

        <button
          onClick={saveEdit}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white"
        >
          Save changes
        </button>

      </div>

    ) : (

      /* ================= NORMAL MODE ================= */

      <>
        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold text-pink-500">
              {comment.author}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-gray-400 hover:text-blue-500 transition"
            >
              edit
            </button>

            <button
              onClick={() => onDelete(comment.id)}
              className="text-xs text-gray-400 hover:text-red-500 transition"
            >
              delete
            </button>

          </div>
        </div>

        {/* TEXT */}
        <p className="text-sm text-gray-700">
          {comment.text}
        </p>

        {/* IMAGE */}
        {comment.image && (
          <img
            src={comment.image}
            alt="comment"
            className="rounded-2xl max-h-52 w-full object-cover border border-black/5"
          />
        )}

        {/* ACTIONS */}
        <div className="flex items-center gap-4 pt-1">

          <button
            onClick={() => onLike(comment.id)}
            className="text-sm text-pink-500"
          >
            ❤️ {comment.likes}
          </button>

          <button
            onClick={() => onDislike(comment.id)}
            className="text-sm text-gray-500"
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