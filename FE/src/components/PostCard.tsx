import { useState } from "react";
import CommentSection from "./CommentSection";
import type { Post } from "../types/Post";

type Props = {
  post: Post;

  onEdit: (id: string, data: Partial<Post>) => void;
  onDelete: (id: string) => void;

  // onLike: (id: string) => void;
  // onDislike: (id: string) => void;

  canEdit: (post: Post) => boolean;
};

export default function PostCard({
  post,
  onEdit,
  onDelete,
  // onLike,
  // onDislike,
  canEdit,
}: Props) {

  const [showComments, setShowComments] = useState(false);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [image, setImage] = useState(post.image || "");

  const isOwner = canEdit(post);

  //const score = post.likes - post.dislikes;

  const save = () => {
    if (!title.trim() || !text.trim()) return;

    onEdit(post.id, {
      title,
      text,
      image: image.trim() ? image : undefined,
    });

    setEditing(false);
  };

  const cancel = () => {
    setTitle(post.title);
    setText(post.text);
    setImage(post.image || "");
    setEditing(false);
  };

  return (
    <div className="mb-5 rounded-2xl bg-white/70 backdrop-blur-xl shadow-md overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-4">

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
          {post.author[0]}
        </div>

        <div className="flex flex-col">

          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.author}</span>

            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
              {post.status}
            </span>
          </div>

          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </span>

        </div>

        {/* ACTIONS */}
        {isOwner && (
          <div className="ml-auto flex gap-2">

            <button
              onClick={() => setEditing(true)}
              className="text-xs text-gray-500 hover:text-black transition"
            >
              ✏️
            </button>

            <button
              onClick={() => onDelete(post.id)}
              className="text-xs text-gray-400 hover:text-red-500 transition"
            >
              🗑️
            </button>

          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4">

        {editing ? (
          <div className="space-y-3">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-black/10"
              placeholder="Title"
            />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-black/10"
              placeholder="Text"
            />

            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="w-full p-3 rounded-xl bg-white border border-black/10"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={cancel}
                className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={save}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              >
                Save ✨
              </button>

            </div>

          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">{post.title}</h2>

            <p className="text-sm text-gray-600 mt-1">{post.text}</p>

            {post.image && (
              <img
                src={post.image}
                className="mt-3 rounded-xl w-full object-cover"
              />
            )}
          </>
        )}

      </div>

      {/* ACTIONS */}
      {!editing && (
        <div className="flex items-center justify-between px-4 py-4 border-t border-black/5">

          <div className="flex items-center gap-5">

            {/* <button onClick={() => onLike(post.id)}>
              ❤️ {post.likes}
            </button>

            <button onClick={() => onDislike(post.id)}>
              👎 {post.dislikes}
            </button> */}

            <button onClick={() => setShowComments((s) => !s)}>
              💬
            </button>

          </div>

          {/* <span className="text-xs text-gray-400">
            score: {score}
          </span> */}

        </div>
      )}

      {showComments && (
        <CommentSection postId={post.id} />
      )}

    </div>
  );
}