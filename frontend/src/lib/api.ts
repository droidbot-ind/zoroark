import axios, { type AxiosInstance, AxiosError } from "axios";
import { env } from "./env";
import { useAuthStore } from "@/stores/authStore";
import type { ApiResponse } from "@/types/api";

export const api: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 15_000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401) {
      const { token, logout } = useAuthStore.getState();
      if (token) logout();
    }
    return Promise.reject(error);
  }
);

export const unwrap = <T>(payload: ApiResponse<T>): T => {
  if (!payload.success) throw new Error(payload.error.message);
  return payload.data;
};

export const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    const data = err.response?.data as ApiResponse<unknown> | undefined;
    if (data && !data.success) return data.error.message;
    return err.message;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong";
};
