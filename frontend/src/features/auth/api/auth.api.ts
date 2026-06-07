import { api, unwrap } from "@/lib/api";
import type {
  ApiResponse,
  AuthResponse,
  User,
  UserStats,
} from "@/types/api";

interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  displayName?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface UpdateProfilePayload {
  displayName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      payload
    );
    return unwrap(data);
  },
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      payload
    );
    return unwrap(data);
  },
  async me(): Promise<User> {
    const { data } = await api.get<ApiResponse<{ user: User }>>("/auth/me");
    return unwrap(data).user;
  },
  async updateProfile(payload: UpdateProfilePayload): Promise<User> {
    const { data } = await api.patch<ApiResponse<{ user: User }>>(
      "/auth/me",
      payload
    );
    return unwrap(data).user;
  },
  async stats(): Promise<UserStats> {
    const { data } = await api.get<ApiResponse<UserStats>>("/auth/me/stats");
    return unwrap(data);
  },
};
