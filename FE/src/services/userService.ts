import { api } from "../lib/api";
import type { User } from "../types/Index";
import {
  mapUserFromApi,
  type UserApiResponse,
} from "../types/Auth";

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const apiUsers = await api.get<UserApiResponse[]>("/users");
    return apiUsers.map(mapUserFromApi);
  },

  getUserById: async (id: string): Promise<User> => {
    const apiUser = await api.get<UserApiResponse>(`/users/${id}`);
    return mapUserFromApi(apiUser);
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const apiUser = await api.put<UserApiResponse>(`/users/${id}`, data);
    return mapUserFromApi(apiUser);
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete<void>(`/users/${id}`);
  },
};