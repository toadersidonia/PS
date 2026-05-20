import { api } from "../lib/api";
import type {
  AuthApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/Index";
import { mapUserFromApi } from "../types/Auth";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const authService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const apiResponse = await api.post<AuthApiResponse>(
      "/api/auth/register",
      data
    );

    const authResponse: AuthResponse = {
      token: apiResponse.token,
      user: mapUserFromApi(apiResponse.user),
    };

    authService.saveSession(authResponse);
    return authResponse;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const apiResponse = await api.post<AuthApiResponse>(
      "/api/auth/login",
      data
    );

    const authResponse: AuthResponse = {
      token: apiResponse.token,
      user: mapUserFromApi(apiResponse.user),
    };

    authService.saveSession(authResponse);
    return authResponse;
  },

  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  saveSession: (authResponse: AuthResponse): void => {
    localStorage.setItem(TOKEN_KEY, authResponse.token);
    localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  me: async () => {
  const res = await api.get<AuthApiResponse>("/api/users/me");

  return mapUserFromApi(res.user);
},

updateStoredUser: (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
},
};