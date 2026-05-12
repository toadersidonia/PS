import type { Post } from "../types/Post";

export const mockPosts: Post[] = [

  {
    id: 1,

    author: "Alex",

    title: "Morning coffee ✨",

    text: "Starting the day with coffee and good vibes ☕",

    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",

    createdAt: "2026-05-10T09:30:00",

    likes: 24,
    dislikes: 2,
  },

  {
    id: 2,

    author: "Maria",

    title: "Sunset walk 🌸",

    text: "Today’s sunset was unreal honestly 😭",

    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

    createdAt: "2026-05-10T19:10:00",

    likes: 40,
    dislikes: 1,
  },

  {
    id: 3,

    author: "David",

    title: "Gaming night 🎮",

    text: "Finally finished my setup and it looks insane",

    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420",

    createdAt: "2026-05-11T00:15:00",

    likes: 18,
    dislikes: 4,
  },

  {
    id: 4,

    author: "Sofia",

    title: "Tiny life update",

    text: "Trying to survive university projects rn 💀",

    createdAt: "2026-05-11T13:40:00",

    likes: 55,
    dislikes: 0,
  },

];