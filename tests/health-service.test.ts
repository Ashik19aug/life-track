import { describe, expect, it, vi } from "vitest";
import { checkHealth } from "@/src/server/services/health-service";
describe("health service", () => {
  it("verifies database connectivity and returns status", async () => {
    const query = vi.fn().mockResolvedValue([{ "?column?": 1 }]);
    const result = await checkHealth({ $queryRawUnsafe: query });
    expect(query).toHaveBeenCalledWith("SELECT 1");
    expect(result).toMatchObject({ status: "ok", database: "connected" });
  });
});
