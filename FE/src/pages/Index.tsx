import { useState } from "react";

import PostCard from "../components/PostCard";
import PostComposer from "../components/PostComposer";

import { usePosts } from "../hooks/usePosts";

export default function Index() {

  const {
    posts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost
  } = usePosts();

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">

      <PostComposer onAddPost={addPost} />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={updatePost}
          onDelete={deletePost}
          onLike={likePost}
          onDislike={dislikePost}
        />
      ))}

    </div>
  );
}

