import PostCard from "../components/PostCard";
import PostComposer from "../components/PostComposer";
import { usePosts } from "../hooks/usePosts";

export default function PostSection() {
  const {
    posts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    canEdit,
  } = usePosts();

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">

      {/* CREATE POST */}
      <PostComposer onAddPost={addPost} />

      {/* FEED */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={updatePost}
          onDelete={deletePost}
          onLike={likePost}
          onDislike={dislikePost}
          canEdit={canEdit}
        />
      ))}

    </div>
  );
}