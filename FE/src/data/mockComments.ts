import type { Comment } from "../types/Comment";

export const mockComments: Comment[] = [

  {
    id: "1",

    postId: "1",

    author: "Maria",

    text: "OMG this is so cute 🌸",

    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",

    createdAt: "2026-05-10T14:20:00",

    likes: 12,
    dislikes: 1,
  },

  {
    id: "2",

    postId: "1",

    author: "Alex",

    text: "Love this vibe honestly ✨",

    createdAt: "2026-05-10T15:45:00",

    likes: 5,
    dislikes: 0,
  },

  {
    id: "3",

    postId: "3",

    author: "Sofia",

    text: "Where did you take this picture??",

    createdAt: "2026-05-11T09:12:00",

    likes: 2,
    dislikes: 0,
  },

  {
    id: "4",

    postId: "2",

    author: "David",

    text: "This post deserves more likes 😭",

    createdAt: "2026-05-11T12:00:00",

    likes: 8,
    dislikes: 2,
  },

];