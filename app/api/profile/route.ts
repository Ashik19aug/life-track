import { ZodError } from "zod";
import { apiError, apiSuccess } from "@/src/lib/api/response";
import { getCurrentUser } from "@/src/lib/auth/session";
import { updateProfile } from "@/src/lib/auth/user";
import { logger } from "@/src/lib/logger";
export async function GET() {
  const user = await getCurrentUser();
  return user
    ? apiSuccess({ email: user.email, profile: user.profile, preferences: user.preferences })
    : apiError("UNAUTHORIZED", "Authentication required.", 401);
}
export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", 401);
    const profile = await updateProfile(user.id, await request.json());
    logger.info("Profile updated", { userId: user.id });
    return apiSuccess(profile);
  } catch (error: unknown) {
    return error instanceof ZodError
      ? apiError("VALIDATION_ERROR", "Invalid input.", 400)
      : apiError("INTERNAL_ERROR", "Unable to update profile.", 500);
  }
}
