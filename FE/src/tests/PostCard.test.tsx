import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PostCard from "../components/PostCard";
import type { Post } from "../types/Post";

/* MOCK API (IMPORTANT) */
vi.mock("../lib/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

/* MOCK AUTH */
vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { username: "Stefan" },
  }),
}));

/* MOCK SCORE CONTEXT */
vi.mock("../contexts/ScoreContext", () => ({
  useScore: () => ({
    refreshKey: 0,
    refreshScore: vi.fn(),
  }),
}));

describe("PostCard", () => {
  it("renders post title", () => {

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

    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });
});