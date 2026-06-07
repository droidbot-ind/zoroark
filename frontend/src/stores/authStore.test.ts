import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "@/stores/authStore";
import type { User } from "@/types/api";

const mockUser: User = {
  id: "u_1",
  email: "alice@example.com",
  username: "alice",
  displayName: "Alice",
  avatarUrl: null,
  bio: null,
  createdAt: new Date().toISOString(),
};

describe("authStore", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
  });

  it("starts unauthenticated", () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("sets a session", () => {
    useAuthStore.getState().setSession(mockUser, "token-abc");
    const s = useAuthStore.getState();
    expect(s.isAuthenticated).toBe(true);
    expect(s.user?.email).toBe("alice@example.com");
    expect(s.token).toBe("token-abc");
  });

  it("logs out", () => {
    useAuthStore.getState().setSession(mockUser, "token-abc");
    useAuthStore.getState().logout();
    const s = useAuthStore.getState();
    expect(s.isAuthenticated).toBe(false);
    expect(s.user).toBeNull();
    expect(s.token).toBeNull();
  });
});
