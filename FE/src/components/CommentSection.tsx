import CommentCard from "./CommentCard";
import CommentComposer from "./CommentComposer";
import { useComments } from "../hooks/useComments";
import { useAuth } from "../hooks/useAuth";

type Props = {
  postId: string;
};

export default function CommentSection({ postId }: Props) {
  const { user } = useAuth();

  const {
    comments,
    addComment,
    like,
    dislike,
    remove,
    editComment,
    isOwner,
  } = useComments(postId, user?.username ?? null);

  return (
    <div className="mt-4 pt-4 border-t border-black/5">

      <CommentComposer onAddComment={addComment} />

      <div className="space-y-3">
        {comments.map((c) => (
          <CommentCard
            key={c.id}
            comment={c}
            onLike={like}
            onDislike={dislike}
            onDelete={remove}
            onEdit={editComment}
            canEdit={isOwner}
          />
        ))}
      </div>

    </div>
  );
}