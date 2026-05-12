export type User = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  score: number;
  banned: boolean;
};