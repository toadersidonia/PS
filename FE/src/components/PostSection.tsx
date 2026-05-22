import { useMemo, useState } from "react";
import PostCard from "../components/PostCard";
import PostComposer from "../components/PostComposer";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";
import PostTagSelect from "../components/PostTagSelect";

export default function PostSection({ onlyMine = false }) {
  const {
    posts,
    setPosts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    canEdit,
    closeComments,
  } = usePosts();

  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags || []))),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (onlyMine) {
      result = result.filter((p) => p.author === user?.username);
    }

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTag) {
      result = result.filter((p) => {
        const tags = p.tags ?? [];
        return tags.includes(selectedTag);
      });
    }

    if (selectedUser) {
      result = result.filter((p) => p.author === selectedUser);
    }

    return result;
  }, [posts, onlyMine, user, search, selectedTag, selectedUser]);

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">

      {/* CREATE POST */}
      {!onlyMine && <PostComposer onAddPost={addPost} />}

      {!onlyMine && (
        <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-xl shadow-md space-y-3">

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full p-2 rounded-xl bg-white/80 border border-pink-100 focus:ring-2 focus:ring-pink-300"
          />

          <select
            value={selectedTag || ""}
            onChange={(e) => setSelectedTag(e.target.value || null)}
            className="w-full p-2 rounded-xl bg-white/80 border border-pink-100"
          >
            <option value="">All tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>

          {/* USER FILTER */}
          <input
            value={selectedUser || ""}
            onChange={(e) => setSelectedUser(e.target.value || null)}
            placeholder="Filter by user..."
            className="w-full p-2 rounded-xl bg-white/80 border border-pink-100"
          />
        </div>
      )}

      {/* POSTS */}
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={updatePost}
          onDelete={deletePost}
          onLike={likePost}
          onDislike={dislikePost}
          canEdit={canEdit}
          onCloseComments={closeComments}
          onPostUpdate={(updatedPost) => {
            setPosts((prev) =>
              prev.map((p) =>
                Number(p.id) === Number(updatedPost.id)
                  ? { ...p, status: updatedPost.status }
                  : p
              )
            );
          }}
        />
      ))}
    </div>
  );
}