import { describe, expect, it } from "vitest";
import { apiError, apiSuccess } from "@/src/lib/api/response";
describe("API responses", () => {
  it("uses the standard success shape", async () =>
    expect(await apiSuccess({ ready: true }).json()).toEqual({
      success: true,
      data: { ready: true },
      message: null,
    }));
  it("uses the standard error shape", async () =>
    expect(await apiError("NOT_FOUND", "Missing", 404).json()).toEqual({
      success: false,
      error: { code: "NOT_FOUND", message: "Missing" },
    }));
});
