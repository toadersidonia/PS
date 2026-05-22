import { useEffect, useState } from "react";
import type { Comment } from "../types/Comment";
import { commentService } from "../services/commentService";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { toast } from "react-toastify";
import { postService } from "../services/postService";

export function useComments(
  postId: string,
  currentUser: { id: string; username: string } | null,
  onPostUpdate?: (updatedPost: any) => void
) {
    const [comments, setComments] = useState<Comment[]>([]);
    const { user, setUser } = useAuth();

    useEffect(() => {
      commentService.getByPost(postId).then(setComments);
    }, [postId]);

    const isOwner = (comment: Comment) => {
    if (Number(comment.authorId) === Number(currentUser?.id)) return true;
    if (user?.role === "MODERATOR" || user?.role === "ADMIN") return true;
    return false;
    };

    const addComment = async (text: string, image?: string) => {
      if (!currentUser) return;

      const res = await commentService.create(
  postId,
  {
    text,
    image,
    authorId: currentUser.id,
    author: currentUser.username,
  },
  currentUser.id
);
   // setComments((prev) => [created, ...prev]);
   setComments((prev) => [res.comment, ...prev]);

    // const updatedPost = await postService.getById(postId);
    // onPostUpdate?.(updatedPost); 
    onPostUpdate?.({
      id: res.postId,
      status: res.postStatus,
    }); 
  };

  const remove = async (id: string) => {
    if (!currentUser) return;

    await commentService.remove(id, currentUser.id);

    setComments((prev) =>
      prev.filter((c) => c.id !== id)
    );

  };

  const editComment = async (
    id: string,
    text: string,
    image?: string
  ) => {
    if (!currentUser) return;

    const updated = await commentService.update(
      id,
      { text, image },
      currentUser.id
    );

    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? updated : c
      )
    );
  };

const voteComment = async (
  id: string,
  type: "LIKE" | "DISLIKE"
) => {
  if (!currentUser) return;

    const res = await commentService.vote(
      id,
      currentUser.id,
      type
    );

    if (res.status === "OWN_COMMENT") {
      toast.warning("Cannot vote your own comment");
      return;
    }

    if (res.status === "ALREADY_VOTED") {
      toast.warning("Already voted");
      return;
    }

    setComments(prev =>
      prev
        .map(c =>
          c.id === res.comment.id
            ? {
                ...c,
                ...res.comment
              }
            : c
        )
        .sort((a, b) => b.score - a.score)
    );

    const updatedUser = {
      ...user!,
      score: res.voterScore
    };

    setUser(updatedUser);
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  
};

  return {
    comments,
    addComment,
    remove,
    editComment,
    isOwner,
    voteComment,

  };
}