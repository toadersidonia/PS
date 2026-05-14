import type { LoginRequest, RegisterRequest, User } from "../types/Index";

const fakeUser: User = {
  id: "1",
  username: "TestUser",
  email: "test@test.com",
  role: "USER",
  score: 20,
  banned: false,
};

export const mockAuthService = {
  login: async (data: LoginRequest) => {
    return new Promise<{ user: User; token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (data.username === "TestUser" && data.password === "test1234") {
          localStorage.setItem("user", JSON.stringify(fakeUser));
          localStorage.setItem("token", "fake-token");

          resolve({
            user: fakeUser,
            token: "fake-token",
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  },

  register: async (data: RegisterRequest) => {
    return new Promise<{ user: User; token: string }>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: String(Date.now()),
          username: data.username,
          email: data.email,
          role: "USER",
          score: 0,
          banned: false,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("token", "fake-token");

        resolve({
          user: newUser,
          token: "fake-token",
        });
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};