import { useState } from "react";

import PostCard from "../components/PostCard";
import PostComposer from "../components/PostComposer";

import { mockPosts } from "../data/mockPosts";

import type { Post } from "../types/Post";

export default function Index() {

  const [posts, setPosts] = useState<Post[]>(mockPosts);

  // ADD POST
  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">

      {/* CREATE POST */}
      <PostComposer onAddPost={addPost} />

      {/* FEED */}
      <div className="space-y-6">

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}

      </div>

    </div>
  );
}