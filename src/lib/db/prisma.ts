import { PrismaClient } from "@prisma/client";
import { getEnvironment } from "@/src/config/env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ datasources: { db: { url: getEnvironment().DATABASE_URL } } });
if (getEnvironment().NODE_ENV !== "production") globalForPrisma.prisma = prisma;
