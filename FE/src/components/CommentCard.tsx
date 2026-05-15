import { useState } from "react";
import type { Comment } from "../types/Comment";
import { useAuth } from "../hooks/useAuth";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HandThumbDownIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/solid";


type Props = {
  comment: Comment;

  // onLike: (id: string) => void;
  // onDislike: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, image?: string) => void;
  canEdit: (comment: Comment) => boolean;
};

export default function CommentCard({
  comment,
  // onLike,
  // onDislike,
  onDelete,
  onEdit,
  canEdit,
}: Props) {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [image, setImage] = useState(comment.image || "");

  const isOwner = canEdit(comment);

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

        {isOwner && !editing && (
          <div className="flex gap-3 text-xs">
            <button
              onClick={() => setEditing(true)}
              className="text-purple-500 hover:text-purple-700 hover:underline transition"
            >
              edit
            </button>

            <button
              onClick={() => onDelete(comment.id)}
              className="text-pink-500 hover:text-red-700 hover:underline transition"
            >
              delete
            </button>
          </div>
        )}
      </div>

      {/* CONTENT */}
      {editing ? (
        <div className="mt-3 space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-black/10"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-black/10"
            placeholder="Image URL"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={save}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center gap-2"
            >
              Save <SparklesIcon className="w-5 h-5 text-yellow-500" />
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

          {/* <div className="flex gap-4 mt-3 text-sm">
            <button onClick={() => onLike(comment.id)}>
              <HeartIcon className="h-5 w-5 text-pink-500" />
              {comment.likes}
            </button>

            <button onClick={() => onDislike(comment.id)}>
               <HandThumbDownIcon className="w-5 h-5 text-gray-500" />{comment.dislikes}
            </button>

            <span className="ml-auto text-xs text-gray-400">
              score: {comment.likes - comment.dislikes}
            </span>
          </div> */}
        </>
      )}
    </div>
  );
}