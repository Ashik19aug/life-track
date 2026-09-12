import { AppError } from "@/src/server/errors/app-error";
import { ZodError } from "zod";
import { apiError, apiSuccess } from "@/src/lib/api/response";
import { allowSensitiveRequest } from "@/src/lib/auth/rate-limit";
import { getCurrentUser } from "@/src/lib/auth/session";
import { changePassword } from "@/src/lib/auth/user";
import { logger } from "@/src/lib/logger";
export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", 401);
    if (!allowSensitiveRequest(`password:${user.id}`, 5))
      return apiError("RATE_LIMITED", "Please try again later.", 429);
    await changePassword(user.id, await request.json());
    logger.info("Password changed", { userId: user.id });
    return apiSuccess({ changed: true });
  } catch (error: unknown) {
    if (error instanceof ZodError || error instanceof AppError)
      return apiError(
        error instanceof AppError ? error.code : "VALIDATION_ERROR",
        error instanceof AppError ? error.message : "Invalid input.",
        error instanceof AppError ? error.status : 400,
      );
    return apiError("INTERNAL_ERROR", "Unable to change password.", 500);
  }
}
