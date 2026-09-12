import { ZodError } from "zod";
import { apiError, apiSuccess } from "@/src/lib/api/response";
import { allowSensitiveRequest } from "@/src/lib/auth/rate-limit";
import { registerUser } from "@/src/lib/auth/user";
import { AppError } from "@/src/server/errors/app-error";
import { logger } from "@/src/lib/logger";

export async function POST(request: Request) {
  try {
    if (!allowSensitiveRequest(`register:${request.headers.get("x-forwarded-for") ?? "local"}`))
      return apiError("RATE_LIMITED", "Please try again later.", 429);
    const user = await registerUser(await request.json());
    logger.info("Registration succeeded", { userId: user.id });
    return apiSuccess({ id: user.id, email: user.email }, 201);
  } catch (error: unknown) {
    if (error instanceof ZodError) return apiError("VALIDATION_ERROR", "Invalid input.", 400);
    if (error instanceof AppError) return apiError(error.code, error.message, error.status);
    logger.error("Registration failed");
    return apiError("INTERNAL_ERROR", "Unable to create account.", 500);
  }
}
