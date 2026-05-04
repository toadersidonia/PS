export function calculateScore(
  upvotes: number,
  downvotes: number,
  type: "post" | "comment"
): number {
  if (type === "post") {
    return upvotes * 2.5 - downvotes * 1.5;
  }

  return upvotes * 5 - downvotes * 2.5;
}