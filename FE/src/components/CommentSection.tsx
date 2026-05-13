import CommentCard from "./CommentCard";
import CommentComposer from "./CommentComposer";
import { useComments } from "../hooks/useComments";

type Props = {
  postId: number;
};

export default function CommentSection({ postId }: Props) {

  const {
    comments,
    addComment,
    like,
    dislike,
    remove,
    editComment,
  } = useComments(postId);

  return (
    <div className="mt-4 pt-4 border-t border-black/5">

      <CommentComposer onAddComment={addComment} />

      <div className="space-y-3">

        {comments.length === 0 && (
          <p className="text-sm text-gray-400 text-center">
            No comments yet ✨
          </p>
        )}

        {comments.map((c) => (
          <CommentCard
            key={c.id}
            comment={c}
            onLike={like}
            onDislike={dislike}
            onDelete={remove}
            onEdit={editComment}
          />
        ))}

      </div>
    </div>
  );
}