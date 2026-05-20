import { useEffect, useState } from "react";
import PostTagSelect from "./PostTagSelect";
import type { TagOption } from "./PostTagSelect";
import { getTags } from "../services/tagService";

export default function PostForm() {
  const [options, setOptions] = useState<TagOption[]>([]);
  const [value, setValue] = useState<TagOption[]>([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const tags: { name: string }[] = await getTags();

      setOptions(
        tags.map((t) => ({
          value: t.name,
          label: t.name,
        }))
      );
    } catch (err) {
      console.error("Failed to load tags", err);
    }
  };

  const handleSubmit = () => {
    const payload = {
      title: "test",
      text: "test",
      image: "",
      tags: value.map((t) => t.value),
    };

    console.log(payload);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      
      <input
        placeholder="Title"
        className="w-full p-2 rounded-lg bg-gray-800 text-white outline-none"
      />

      <textarea
        placeholder="Text"
        className="w-full p-2 rounded-lg bg-gray-800 text-white outline-none"
      />

      {/* TAG SELECT */}
      <PostTagSelect
        options={options}
        value={value}
        onChange={setValue}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg"
      >
        Create Post
      </button>
    </div>
  );
}