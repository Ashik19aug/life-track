import { apiError, apiSuccess } from "@/src/lib/api/response";
import { prisma } from "@/src/lib/db/prisma";
import { logger } from "@/src/lib/logger";
import { getErrorMessage } from "@/src/lib/utils/error";
import { checkHealth } from "@/src/server/services/health-service";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET() {
  try {
    return apiSuccess(await checkHealth(prisma));
  } catch (error: unknown) {
    logger.error("Health check database connectivity failed", { reason: getErrorMessage(error) });
    return apiError("DATABASE_UNAVAILABLE", "Database connectivity is unavailable", 503);
  }
}
