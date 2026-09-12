import { ZodError } from "zod";
import { apiError, apiSuccess } from "@/src/lib/api/response";
import { getCurrentUser } from "@/src/lib/auth/session";
import { updatePreferences } from "@/src/lib/auth/user";
import { logger } from "@/src/lib/logger";
export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", 401);
    const preferences = await updatePreferences(user.id, await request.json());
    logger.info("Preferences updated", { userId: user.id });
    return apiSuccess(preferences);
  } catch (error: unknown) {
    return error instanceof ZodError
      ? apiError("VALIDATION_ERROR", "Invalid input.", 400)
      : apiError("INTERNAL_ERROR", "Unable to update preferences.", 500);
  }
}
