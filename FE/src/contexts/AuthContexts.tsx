import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authService } from "../services/authService";
//import { mockAuthService as authService } from "../services/mockAuthService";
import type {
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/Index";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest): Promise<void> => {
    const response = await authService.login(data);
    setUser(response.user);
  };

  const register = async (data: RegisterRequest): Promise<void> => {
    const response = await authService.register(data);
    setUser(response.user);
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};