import { describe, it, expect } from "vitest";
import {
  registerSchema,
  loginSchema,
} from "../src/validators/auth.validator";

describe("auth validators", () => {
  it("accepts a valid registration", () => {
    const r = registerSchema.safeParse({
      email: "alice@example.com",
      username: "alice_01",
      password: "supersecret",
    });
    expect(r.success).toBe(true);
  });

  it("rejects short passwords", () => {
    const r = registerSchema.safeParse({
      email: "a@b.com",
      username: "alice",
      password: "short",
    });
    expect(r.success).toBe(false);
  });

  it("rejects bad usernames", () => {
    const r = registerSchema.safeParse({
      email: "a@b.com",
      username: "no spaces",
      password: "longenough",
    });
    expect(r.success).toBe(false);
  });

  it("accepts a valid login", () => {
    expect(
      loginSchema.safeParse({ email: "a@b.com", password: "x" }).success
    ).toBe(true);
  });
});
