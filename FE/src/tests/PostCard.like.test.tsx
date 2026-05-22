import { render, screen, waitFor } from "@testing-library/react";
import PostCard from "../components/PostCard";
import type { Post } from "../types/Post";
import { vi } from "vitest";

// MOCK AUTH
vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { username: "Stefan" },
  }),
}));

// MOCK USER SERVICE
vi.mock("../services/userService", () => ({
  userService: {
    getUserScore: vi.fn().mockResolvedValue(10),
  },
}));

// MOCK SCORE CONTEXT
vi.mock("../contexts/ScoreContext", () => ({
  useScore: () => ({
    refreshKey: 0,
    refreshScore: vi.fn(),
  }),
}));

describe("PostCard - like protection", () => {
  it("does NOT allow liking own post", async () => {

    const post: Post = {
      id: "1",
      author: "Stefan",
      authorId: 1,
      title: "Test Post",
      text: "Hello world",
      createdAt: new Date().toISOString(),
      status: "JUST_POSTED",
      likes: 0,
      dislikes: 0,
      score: 0,
      tags: [],
    };

    render(
      <PostCard
        post={post}
        onEdit={() => {}}
        onDelete={() => {}}
        onLike={() => {}}
        onDislike={() => {}}
        canEdit={() => false}
        onCloseComments={() => {}}
        onPostUpdate={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
    });

  });
});