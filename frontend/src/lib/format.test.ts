import { describe, it, expect } from "vitest";
import {
  formatYear,
  formatDate,
  formatRuntime,
  formatRating,
  formatMoney,
} from "@/lib/format";

describe("format helpers", () => {
  it("formats years", () => {
    expect(formatYear("2024-01-15")).toBe("2024");
    expect(formatYear(null)).toBe("—");
    expect(formatYear("invalid")).toBe("—");
  });

  it("formats runtimes", () => {
    expect(formatRuntime(150)).toBe("2h 30m");
    expect(formatRuntime(45)).toBe("45m");
    expect(formatRuntime(0)).toBe("—");
    expect(formatRuntime(null)).toBe("—");
  });

  it("formats ratings", () => {
    expect(formatRating(7.5)).toBe("7.5");
    expect(formatRating(null)).toBe("—");
  });

  it("formats money", () => {
    expect(formatMoney(1000000)).toContain("1,000,000");
    expect(formatMoney(0)).toBe("—");
  });

  it("formats dates", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate("2024-06-01")).not.toBe("—");
  });
});
