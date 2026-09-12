import { z } from "zod";

const name = z.string().trim().min(1, "Required").max(100, "Must be 100 characters or fewer");
const password = z
  .string()
  .min(8, "Use at least 8 characters")
  .max(128, "Must be 128 characters or fewer")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[0-9]/, "Include a number")
  .regex(/[^A-Za-z0-9]/, "Include a special character");

export const loginSchema = z.object({
  email: z.email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(1),
});
export const registerSchema = z
  .object({
    email: z.email().transform((value) => value.trim().toLowerCase()),
    password,
    confirmPassword: z.string(),
    firstName: name,
    lastName: name,
    displayName: z.string().trim().max(100).optional().or(z.literal("")),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export const profileUpdateSchema = z
  .object({
    firstName: name,
    lastName: name,
    displayName: z.string().trim().max(100).nullable().optional().or(z.literal("")),
    dateOfBirth: z.string().date().nullable().optional().or(z.literal("")),
    gender: z
      .enum(["FEMALE", "MALE", "NON_BINARY", "PREFER_NOT_TO_SAY", "SELF_DESCRIBE"])
      .nullable()
      .optional()
      .or(z.literal("")),
    bio: z.string().trim().max(500).nullable().optional().or(z.literal("")),
  })
  .refine(
    (value) => !value.dateOfBirth || new Date(`${value.dateOfBirth}T00:00:00.000Z`) <= new Date(),
    { path: ["dateOfBirth"], message: "Date of birth cannot be in the future" },
  );
export const preferenceUpdateSchema = z.object({
  timezone: z
    .string()
    .refine(
      (value) => Intl.supportedValuesOf("timeZone").includes(value),
      "Choose a valid IANA timezone",
    ),
  dateFormat: z.enum(["YYYY_MM_DD", "DD_MM_YYYY", "MM_DD_YYYY"]),
  timeFormat: z.enum(["HOUR_12", "HOUR_24"]),
  weekStartsOn: z.enum(["MONDAY", "SUNDAY"]),
  weightUnit: z.enum(["KG", "LB"]),
  heightUnit: z.enum(["CM", "FT_IN"]),
  distanceUnit: z.enum(["KM", "MI"]),
  temperatureUnit: z.enum(["CELSIUS", "FAHRENHEIT"]),
  theme: z.enum(["SYSTEM", "LIGHT", "DARK"]),
  language: z.string().trim().min(2).max(10),
});
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: password,
    confirmNewPassword: z.string(),
  })
  .refine((value) => value.newPassword === value.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });
