import { useState } from "react";
import PostCard from "../components/PostCard";
import PostComposer from "../components/PostComposer";

type Post = {
  id: number;
  author: string;
  title: string;
  text: string;
  image?: string;
};

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Alex",
      title: "Primul post",
      text: "Salut lume!",
      image: "https://picsum.photos/500/300",
    },
    {
      id: 2,
      author: "Maria",
      title: "Hello 🌸",
      text: "Ce mai faceti?",
    },
  ]);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">

      {/* COMPOSER SUS */}
      <PostComposer onAddPost={addPost} />

      {/* FEED */}
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}

    </div>
  );
}