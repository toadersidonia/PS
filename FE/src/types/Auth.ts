import type { User } from "./User";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UserApiResponse {
  userId: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  score: number;
  banned: boolean;
}

export interface AuthApiResponse {
  token: string;
  user: UserApiResponse;
}

export const mapUserFromApi = (apiUser: UserApiResponse): User => ({
  id: String(apiUser.userId),
  username: apiUser.username,
  email: apiUser.email,
  role: apiUser.role,
  score: apiUser.score,
  banned: apiUser.banned,
});