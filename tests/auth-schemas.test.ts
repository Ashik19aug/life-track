import { describe, expect, it } from "vitest";
import {
  changePasswordSchema,
  preferenceUpdateSchema,
  registerSchema,
} from "@/src/lib/auth/schemas";

const password = "ValidPass1!";
const registration = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ADA@EXAMPLE.COM",
  password,
  confirmPassword: password,
};
describe("authentication validation", () => {
  it("normalizes valid registration email", () =>
    expect(registerSchema.parse(registration).email).toBe("ada@example.com"));
  it("rejects weak passwords and mismatched confirmation", () => {
    expect(() =>
      registerSchema.parse({ ...registration, password: "weak", confirmPassword: "weak" }),
    ).toThrow();
    expect(() =>
      registerSchema.parse({ ...registration, confirmPassword: "Different1!" }),
    ).toThrow();
  });
  it("rejects invalid timezones", () =>
    expect(() =>
      preferenceUpdateSchema.parse({
        timezone: "Invalid/Zone",
        dateFormat: "YYYY_MM_DD",
        timeFormat: "HOUR_24",
        weekStartsOn: "MONDAY",
        weightUnit: "KG",
        heightUnit: "CM",
        distanceUnit: "KM",
        temperatureUnit: "CELSIUS",
        theme: "SYSTEM",
        language: "en",
      }),
    ).toThrow());
  it("rejects unmatched new passwords", () =>
    expect(() =>
      changePasswordSchema.parse({
        currentPassword: password,
        newPassword: password,
        confirmNewPassword: "OtherPass1!",
      }),
    ).toThrow());
});
