import { api } from "../lib/api";
import type { User } from "../types";
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

  banUser: async (id: string): Promise<User> => {
    const apiUser = await api.put<UserApiResponse>(`/users/${id}/ban`, {});
    return mapUserFromApi(apiUser);
  },

  unbanUser: async (id: string): Promise<User> => {
    const apiUser = await api.put<UserApiResponse>(`/users/${id}/unban`, {});
    return mapUserFromApi(apiUser);
  },

  changeRole: async (id: string, newRole: string): Promise<User> => {
    const apiUser = await api.put<UserApiResponse>(`/users/${id}/role`, newRole);
    return mapUserFromApi(apiUser);
  },

  getUserScore: async (id: string): Promise<number> => {
    return await api.get<number>(`/users/${id}/score`);
  },
};