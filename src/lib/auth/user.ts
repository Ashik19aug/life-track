import { UserStatus } from "@prisma/client";
import { prisma } from "@/src/lib/db/prisma";
import { hashPassword, verifyPassword } from "@/src/lib/auth/password";
import {
  changePasswordSchema,
  profileUpdateSchema,
  preferenceUpdateSchema,
  registerSchema,
} from "@/src/lib/auth/schemas";
import { appErrors } from "@/src/server/errors/app-error";

export async function registerUser(input: unknown) {
  const data = registerSchema.parse(input);
  const passwordHash = await hashPassword(data.password);
  try {
    return await prisma.$transaction(async (tx) =>
      tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          name: data.displayName || `${data.firstName} ${data.lastName}`,
          profile: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              displayName: data.displayName || null,
            },
          },
          preferences: { create: {} },
        },
        include: { profile: true, preferences: true },
      }),
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002")
      throw appErrors.conflict("An account with this email already exists.");
    throw error;
  }
}
export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (
    !user ||
    user.status !== UserStatus.ACTIVE ||
    !(await verifyPassword(user.passwordHash, password))
  )
    return null;
  return user;
}
export async function updateProfile(userId: string, input: unknown) {
  const data = profileUpdateSchema.parse(input);
  return prisma.userProfile.update({
    where: ownershipWhere(userId),
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName || null,
      dateOfBirth: data.dateOfBirth ? new Date(`${data.dateOfBirth}T00:00:00.000Z`) : null,
      gender: data.gender || null,
      bio: data.bio || null,
    },
  });
}
export function ownershipWhere(userId: string) {
  return { userId };
}
export async function updatePreferences(userId: string, input: unknown) {
  const data = preferenceUpdateSchema.parse(input);
  return prisma.userPreference.update({ where: ownershipWhere(userId), data });
}
export async function changePassword(userId: string, input: unknown) {
  const data = changePasswordSchema.parse(input);
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  if (!(await verifyPassword(user.passwordHash, data.currentPassword)))
    throw appErrors.validation("Current password is incorrect.");
  if (await verifyPassword(user.passwordHash, data.newPassword))
    throw appErrors.validation("New password must differ from the current password.");
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await hashPassword(data.newPassword) },
  });
}
