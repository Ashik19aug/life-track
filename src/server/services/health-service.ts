type DatabaseClient = { $queryRawUnsafe: (query: string) => Promise<unknown> };
export type HealthStatus = { status: "ok"; database: "connected"; timestamp: string };
export async function checkHealth(database: DatabaseClient): Promise<HealthStatus> {
  await database.$queryRawUnsafe("SELECT 1");
  return { status: "ok", database: "connected", timestamp: new Date().toISOString() };
}
