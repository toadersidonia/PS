import type { Comment } from "../types/Comment";

type Props = {
  comment: Comment;

  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function CommentCard({
  comment,
  onLike,
  onDislike,
  onDelete,
}: Props) {
  return (
    <div className="p-3 rounded-2xl bg-white/60 border border-black/5 space-y-3">

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

        <button
          onClick={() => onDelete(comment.id)}
          className="text-xs text-gray-400 hover:text-red-500 transition"
        >
          delete
        </button>

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
          className="text-sm text-pink-500 hover:scale-105 transition"
        >
          ❤️ {comment.likes}
        </button>

        <button
          onClick={() => onDislike(comment.id)}
          className="text-sm text-gray-500 hover:scale-105 transition"
        >
          👎 {comment.dislikes}
        </button>

        <span className="ml-auto text-xs text-gray-400">
          score: {comment.likes - comment.dislikes}
        </span>

      </div>
    </div>
  );
}