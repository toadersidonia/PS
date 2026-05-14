import type { Post } from "../types/Post";

export const mockPosts: Post[] = [
  {
    id: "1",

    author: "Alex",

    title: "First post",
    text: "Hello everyone ✨",

    image: "https://picsum.photos/600/400",

    createdAt: new Date().toISOString(),

    status: "Just posted",

    likes: 12,
    dislikes: 1,
  },

  {
    id: "2",

    author: "Maria",

    title: "Need help",
    text: "Does anyone know React Router?",

    createdAt: new Date().toISOString(),

    status: "First reactions",

    likes: 7,
    dislikes: 0,
  },
];