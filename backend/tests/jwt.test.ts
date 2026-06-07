import { describe, it, expect, beforeAll } from "vitest";
import { signJwt, verifyJwt } from "../src/utils/jwt";

beforeAll(() => {
  process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret-test-secret";
  process.env.DATABASE_URL =
    process.env.DATABASE_URL ?? "postgresql://test:test@localhost:5432/test";
  process.env.TMDB_API_KEY = process.env.TMDB_API_KEY ?? "test";
});

describe("jwt utils", () => {
  it("signs and verifies a payload", () => {
    const token = signJwt({ userId: "u1", email: "a@b.com", username: "alice" });
    expect(typeof token).toBe("string");
    const payload = verifyJwt(token);
    expect(payload.userId).toBe("u1");
    expect(payload.email).toBe("a@b.com");
    expect(payload.username).toBe("alice");
  });

  it("rejects garbage tokens", () => {
    expect(() => verifyJwt("not-a-jwt")).toThrow();
  });
});
