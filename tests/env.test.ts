import { describe, expect, it } from "vitest";
import { parseEnvironment } from "@/src/config/env";
const validEnvironment = {
  APP_URL: "http://localhost:3000",
  DATABASE_URL: "postgresql://user:pass@localhost:5432/lifetrack",
};
describe("environment validation", () => {
  it("accepts required configuration", () =>
    expect(parseEnvironment(validEnvironment).APP_NAME).toBe("LifeTrack"));
  it("rejects an invalid database URL", () =>
    expect(() =>
      parseEnvironment({ ...validEnvironment, DATABASE_URL: "mysql://localhost" }),
    ).toThrow("Invalid environment configuration"));
});
