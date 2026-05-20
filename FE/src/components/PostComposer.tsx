import { useEffect, useState } from "react";
import type { PostStatus } from "../types/Post";
import { useAuth } from "../hooks/useAuth";
import { SparklesIcon } from "@heroicons/react/24/solid";

import PostTagSelect, { TagOption } from "../components/PostTagSelect";
import { getTags } from "../services/tagService";

type Props = {
  onAddPost: (post: {
    author: string;
    title: string;
    text: string;
    image?: string;
    tags: string[];
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

  const [options, setOptions] = useState<TagOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);

  const loadTags = async () => {
    try {
      const tags: { name: string }[] = await getTags();

      setOptions(
        (tags ?? []).map((t) => ({
          value: t.name,
          label: t.name,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  const submitPost = async () => {
    if (!title || !text || !user) return;

    onAddPost({
      author: user.username,
      title,
      text,
      image: image || undefined,
      tags: selectedTags.map((t) => t.value),
      createdAt: new Date().toISOString(),
      status: "JUST_POSTED",
      likes: 0,
      dislikes: 0,
    });

    // refresh tags (dacă backend adaugă automat noi tags)
    await loadTags();

    setTitle("");
    setText("");
    setImage("");
    setSelectedTags([]);
    setOpen(false);
  };

  return (
    <div className="mb-6 rounded-3xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-xl p-5">

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-pink-50 hover:bg-pink-100 transition rounded-full px-5 py-3 text-left text-gray-500"
        >
          What are you sharing today?
          <SparklesIcon className="w-5 h-5 text-purple-500 inline ml-2" />
        </button>
      ) : (
        <div className="space-y-4">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full rounded-2xl bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300 transition shadow-sm"
          />

          {/* TAG SELECT (IMPORTANT FIX) */}
          <PostTagSelect
            options={options}
            value={selectedTags}
            onChange={setSelectedTags}
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
            className="w-full rounded-2xl bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300 transition shadow-sm"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full rounded-2xl bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300 transition shadow-sm"
          />

          <div className="flex justify-end gap-3">

            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={submitPost}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-xl"
            >
              Publish <SparklesIcon className="w-5 h-5 text-yellow-500" />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}