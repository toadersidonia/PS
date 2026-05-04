export type User = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  score: number;
  banned: boolean;
};