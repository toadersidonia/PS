import { useState } from "react";
import { useEffect } from "react";
import CommentSection from "./CommentSection";
import PostTagSelect, { TagOption } from "./PostTagSelect";
import type { Post } from "../types/Post";
import { useAuth } from "../hooks/useAuth";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import {
  HeartIcon,
  TrashIcon,
  HandThumbDownIcon,
  SparklesIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

type Props = {
  post: Post;

  onEdit: (id: string, data: Partial<Post>) => void;
  onDelete: (id: string) => void;

  onLike: (id: string) => void;
  onDislike: (id: string) => void;

  canEdit: (post: Post) => boolean;

  onCloseComments: (id: string) => void;

  onPostUpdate: (updatedPost: any) => void;
};

export default function PostCard({
  post,
  onEdit,
  onDelete,
  onLike,
  onDislike,
  canEdit,
  onCloseComments,  
  onPostUpdate
}: Props) {
  const { user } = useAuth();

  const statusLabel: Record<Post["status"], string> = {
    JUST_POSTED: "JUST POSTED",
    FIRST_REACTION: "FIRST REACTION",
    EXPIRED: "EXPIRED",
  };

  const statusColor: Record<Post["status"], string> = {
    JUST_POSTED: "bg-blue-100 text-blue-600",
    FIRST_REACTION: "bg-yellow-100 text-yellow-700",
    EXPIRED: "bg-red-100 text-red-600",
  };

  const isExpired = post.status === "EXPIRED";

  useEffect(() => {
  if (isExpired) {
    setShowComments(false);
  }
}, [isExpired]);

  const [showComments, setShowComments] = useState(false);
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [image, setImage] = useState(post.image || "");

  const [tags, setTags] = useState<string[]>(post.tags || []);

  const [warning, setWarning] = useState<string | null>(null);

  const isOwner = user?.username === post.author;

  const showWarning = (msg: string) => {
    setWarning(msg);
    setTimeout(() => setWarning(null), 2500);
  };

  const save = () => {
    if (!title.trim() || !text.trim()) return;

    onEdit(post.id, {
      title,
      text,
      image: image.trim() ? image : undefined,
      tags,
    });

    setEditing(false);
  };

  const cancel = () => {
    setTitle(post.title);
    setText(post.text);
    setImage(post.image || "");
    setTags(post.tags || []);
    setEditing(false);
  };

  const tagOptions: TagOption[] = tags.map((t) => ({
    value: t,
    label: t,
  }));

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

            <span className={`text-xs px-2 py-1 rounded-full ${statusColor[post.status]}`}>
              {statusLabel[post.status]}
            </span>
          </div>

          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>

        {/* ACTIONS */}
        {canEdit(post) && (
          <div className="ml-auto flex gap-2">

            <button
              onClick={() => {
                if (!confirm("Block comments for this post?")) return;
                onCloseComments(post.id);
              }}
              className="p-2 rounded-xl text-red-500 hover:bg-red-50"
              title="Block comments"
            >
              <LockClosedIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setEditing(true)}
              className="p-2 rounded-xl text-purple-500 hover:bg-purple-50"
            >
              <PencilIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => onDelete(post.id)}
              className="p-2 rounded-xl text-pink-400 hover:bg-pink-50"
            >
              <TrashIcon className="w-5 h-5" />
            </button>

          </div>
        )}
      </div>

      {warning && (
        <div className="mx-4 mt-2 mb-2 px-3 py-2 rounded-xl bg-red-100 text-red-600 text-sm">
          {warning}
        </div>
      )}

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

            <PostTagSelect
              options={tagOptions}
              value={tagOptions}
              onChange={(vals) => setTags(vals.map((v) => v.value))}
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={cancel}
                className="px-4 py-2 rounded-xl bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={save}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center gap-2"
              >
                Save <SparklesIcon className="w-5 h-5" />
              </button>

            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">{post.title}</h2>

            <p className="text-sm text-gray-600 mt-1">{post.text}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

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
        <div className="flex items-center justify-between px-4 py-4 border-t">

          <div className="flex items-center gap-5">

            <button
              onClick={() => {
                if (isOwner) {
                  showWarning("Cannot vote on your own post!");
                  return;
                }
                onLike(post.id);
              }}
              className="flex items-center gap-1"
            >
              <HeartIcon className="h-5 w-5 text-pink-500" />
              {post.likes}
            </button>

            <button
              onClick={() => {
                if (isOwner) {
                  showWarning("Cannot vote on your own post!");
                  return;
                }
                onDislike(post.id);
              }}
              className="flex items-center gap-1"
            >
              <HandThumbDownIcon className="w-5 h-5 text-gray-500" />
              {post.dislikes}
            </button>

            <button
              onClick={() => {
                if (isExpired) {
                  showWarning("Comments are closed for expired posts!");
                  return;
                }
                setShowComments((s) => !s);
              }}
              className="flex items-center gap-1"
            >
              <ChatBubbleLeftIcon className="w-5 h-5 text-pink-500" />
            </button>

          </div>

          <span className="text-xs text-gray-400">
            score: {post.score}
          </span>

        </div>
      )}

      {!isExpired && showComments && (
          <CommentSection
  postId={post.id}
  onPostUpdate={onPostUpdate}
/>
)}
    </div>
  );
}