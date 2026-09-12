import { describe, expect, it } from "vitest";
import { ownershipWhere } from "@/src/lib/auth/user";
describe("user ownership", () => {
  it("scopes profile and preference writes to the authenticated user id", () => {
    expect(ownershipWhere("user-a")).toEqual({ userId: "user-a" });
    expect(ownershipWhere("user-a")).not.toEqual({ userId: "user-b" });
  });
});
