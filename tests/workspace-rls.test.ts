import { describe, it, expect } from "vitest";

describe("workspace RLS smoke", () => {
  it("workspace module exports requireWorkspace", async () => {
    const mod = await import("@/lib/workspace");
    expect(typeof mod.requireWorkspace).toBe("function");
  });
});